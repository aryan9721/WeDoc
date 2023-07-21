const express = require("express");
const logger = require("../utils/logger");
const router = express.Router();
const ErrorResponse = require("../utils/errorResponse");
const HttpStatus = require("http-status-codes");
const authenticate = require("../middlewares/authenticate");
const superadmin = require("../middlewares/superadmin_logic");
const superadminverify = require("../middlewares/superadminverify");
const decode_phonenum = require("../middlewares/decode_phone_number");
let mongoose = require("mongoose");
const util = require('util');
const {
  generateHash,
  generateHashByOTP,
  generateXApiRefreshToken,
} = require("../utils/apiUtils");
const { readPrivatePEMFile } = require("../utils/secretKeyUtil");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const globalConstants = require("../utils/globalConstant");
const user = require("../models/user");
const { utils } = require("mocha");

router.post(
  "/register",superadminverify,
  async (req, res) => {
    try {
      const {email,location,name,designation,successfulOT,yoe,patientRecovered,certificatesAchieved} = req.body;
      let userId;
      logger.debug("check for user in database");
      user.findOne({email})
      .then(_user => {
        if(_user==null){
          return user.create({ email,location,name,designation,successfulOT,yoe,patientRecovered,certificatesAchieved});
        }
        throw new ErrorResponse(`user already exist `, 400);
      })
      .then((_user) => {
        userId = _user[globalConstants.UNDERSCORE_ID];
        return res.json({ email, userId });
      })
      .catch((e) => {
        let errorResponse = new ErrorResponse(
          e.message,
          HttpStatus.BAD_REQUEST
        );
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(errorResponse.getErrorResponse());
      });
  } catch (e) {
    let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json(errorResponse.getErrorResponse());
  }
});

router.post("/login", (req, res) => {
  logger.debug("inside user login");
  const { email } = req.body;
  user
    .findOne({ $or: [{ email: email }, { contact: email }] })
    .then((user) => {
      if (user != null) {
        logger.debug(`login a user`);
        const hash = generateHash(email);
        return res.json({ hash, email });
      } else {
        throw new ErrorResponse(`user not exist`, 400);
      }
    })
    .catch((err) => {
      if (!err.status) err.status = 500;
      return res
        .status(err.status)
        .json(new ErrorResponse(err.message, err.status));
    });
});

router.post("/loginByOTP", (req, res) => {
  logger.debug("inside user login");
  const { email } = req.body;
  logger.debug(util.inspect(email))
  user
    .findOne({ contact: email })
    .then((user) => {
      if (user != null) {
        logger.debug(`login a user`);
        const hash = generateHash(email,true);
        return res.json({ hash, email });
      } else {
        throw new ErrorResponse(`user not exist`, 400);
      }
    })
    .catch((err) => {
      if (!err.status) err.status = 500;
      return res
        .status(err.status)
        .json(new ErrorResponse(err.message, err.status));
    });
});

router.get("/profile", authenticate, (req, res) => {
  logger.debug("inside user profile");
  const { userId } = req.jwt;
  logger.debug(`${userId}`)
  user
    .findById(userId)
    .then((user) => {
      if (user != null) {
        return res.json(user);
      } else {
        throw new ErrorResponse(`user not exist`, 400);
      }
    })
    .catch((err) => {
      if (!err.status) err.status = 500;
      return res
        .status(err.status)
        .json(new ErrorResponse(err.message, err.status));
    });
});

router.post("/verifyOTP", decode_phonenum, async (req, res) => {
  logger.debug("verifying otp");
  try {
    const { hash, email, otp,notificationToken } = req.body;
    const [hashValue, expires] = hash.split(".");
    logger.debug("check for otp expiration");
    if (Date.now() > expires)
      throw new ErrorResponse("provided otp is expired", 400);
    logger.debug("validate opt");
    if (generateHashByOTP(email, otp, expires) == hashValue) {
      if(notificationToken)
      {
        logger.debug(util.inspect(notificationToken))
        const filter = { $or: [{ email: email }, { contact: email }] };
        const update = { notificationToken: notificationToken };
        const updatedUser = await user.findOneAndUpdate(filter, update, {
          new: true,
        });
        logger.debug(util.inspect(updatedUser))

      }
      const userFullJson = { userId: req.userId };
      let x_api_token = generateXApiRefreshToken(
        globalConstants.X_API_KEY,
        userFullJson,
        globalConstants.JWT_TOKEN_EXPIRY_TIME,
        readPrivatePEMFile,
        config.passphrase
      );
      let refresh_token = generateXApiRefreshToken(
        globalConstants.REFRESH_TOKEN,
        userFullJson,
        globalConstants.REFRESH_TOKEN_EXPIRY_TIME,
        readPrivatePEMFile,
        config.passphrase
      );
      res.json({
        "x-api-key": x_api_token,
        "refresh-token": refresh_token,
      });
    } else {
      throw new ErrorResponse("provided otp is invalid", 400);
    }
  } catch (e) {
    console.log(e);
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json(new ErrorResponse(e.message, HttpStatus.BAD_REQUEST));
  }
});

router.post("/login/superadmin", superadmin, (req, res) => {
  logger.debug("inside super admin login");
  const username = req.header("username");
  const password = req.header("password");
  let super_admin_token  = Buffer.from(`${username}:${password}`).toString('base64');
  return res.json({"message": "super admin logged in","admin_token":`base64-token=${super_admin_token}`});
});

router.get("/", (req, res) => {
  const { userId } = req.query;
  console.log(userId);
  let _find = {};
  if (userId) {
    _find = {
      _id: mongoose.Types.ObjectId(userId),
    };
  }
  logger.debug("get the user");
  user
    .find(_find)
    .then((users) => {
      return res.json(users);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

router.put("/profile", authenticate, (req, res) => {
  logger.debug("edit the profile");
  const { userId } = req.jwt;
  console.log(userId);
  const { name, dob, city, state, blood_group, contact, country, profileImageUrl } = req.body;
  user
    .updateOne(
      { _id: userId },
      {
        $set: { name, dob, city, state, blood_group, contact, country, profileImageUrl },
      }
    )
    .then((status) => {
      return user.findById(userId);
    })
    .then((_user) => {
      res.json(_user);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

router.put("/profile/basic", authenticate, (req, res) => {
  logger.debug("edit the profile basic");
  const { userId } = req.jwt;
  console.log(userId);
  const { name, blood_group, dob, contact, email, location } = req.body;
  user
    .updateOne(
      { _id: userId },
      {
        $set: { name, blood_group, dob, contact, email, location },
      }
    )
    .then((status) => {
      return user.findById(userId);
    })
    .then((_user) => {
      res.json(_user);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

router.put("/profile", authenticate, (req, res) => {
  logger.debug("edit the profile");
  const { userId } = req.jwt;
  console.log(userId);
  const { name, dob, city, state, blood_group, contact, country } = req.body;
  user
    .updateOne(
      { _id: userId },
      {
        $set: { name, dob, city, state, blood_group, contact, country },
      }
    )
    .then((status) => {
      return user.findById(userId);
    })
    .then((_user) => {
      res.json(_user);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

module.exports = router;
