const express = require("express");
const router = express.Router();
const logger = require("../utils/logger");
const cme = require("../models/cme");
const USER = require("../models/user");
const DOCTOR = require("../models/doctor");
const ASSOCIATION = require("../models/association");
const ErrorResponse = require("../utils/errorResponse");
const authenticate = require("../middlewares/authenticate");
var path = require("path");
const util = require("util");
const { sendExpoPushNotification } = require('./notify');

async function getAssociation(userId) {
  const userDetails = await USER.findById(userId);
  const docDetails = await DOCTOR.findOne({ userId: userId });
  logger.debug(util.inspect(userDetails));
  let association = null;
  if (docDetails) {
    association = await ASSOCIATION.findById(docDetails.association);
    logger.debug("doctor");
    logger.debug(util.inspect(association));
  } else {
    association = await ASSOCIATION.findOne({ emailId: userDetails.email });
    logger.debug("president");
    logger.debug(util.inspect(association));
  }
  return association;
}
router.put('/:eventId',authenticate, async (req, res) => {
  const eventId = req.params.eventId;
  const userId = req.jwt.userId;
  const newObject = await USER.findById(userId);
  cme.findByIdAndUpdate(
    eventId,
    { $push: { registeredUser: newObject } },
    { new: true },
    (error, updatedDocument) => {
      if (error) {
        console.error('Failed to add object to the array:', error);
        res.status(500).json({ error: 'Failed to add object to the array' });
      } else {
        res.json(updatedDocument);
      }
    }
  );
});

router.get("/", authenticate, async (req, res) => {
  const userId = req.jwt.userId;
  let association = await getAssociation(userId);
  if (association) {
    cme
      .find({
        $or: [
          { associationId: association._id },
          { associationId: "SUPERADMIN" },
        ],
      })
      .then((cmes) => {
        logger.debug(cmes);
        return res.json(cmes);
      })
      .catch((e) => {
        let errorResponse = new ErrorResponse(
          e.message,
          HttpStatus.BAD_REQUEST
        );
        return res.status(500).json(errorResponse.getErrorResponse());
      });
  } else {
    cme
      .find({})
      .then((cmes) => {
        return res.json(cmes);
      })
      .catch((e) => {
        let errorResponse = new ErrorResponse(
          e.message,
          HttpStatus.BAD_REQUEST
        );
        return res.status(500).json(errorResponse.getErrorResponse());
      });
  }
});

router.post("/", authenticate, async (req, res) => {
  const userId = req.jwt.userId;
  let association = await getAssociation(userId);
  logger.debug("organize the cme");
  const { image } = req.files;
  if (!image) return res.sendStatus(400);
  logger.info(
    "save in " + path.join(__dirname, "..") + "/upload/" + image.name
  );
  // Move the uploaded image to our upload folder
  image.mv(path.join(__dirname, "..") + "/upload/" + image.name);
  const {
    name,
    startDateTime,
    lastDateTime,
    location,
    description,
    isOnline,
    timeZone,
  } = req.body;
  cme
    .create({
      name,
      startDateTime,
      lastDateTime,
      location,
      description,
      isOnline,
      timeZone,
      coverImg: image.name,
      userId: req.jwt.userId,
      associationId: association ? association._id : "SUPERADMIN",
    })
    .then(async(_event) => {
      const messageBody = _event.name + ' CME has been added! checkout Here.';
      await sendExpoPushNotification(messageBody);   
      res.json(_event);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, 500);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

router.put("/", (req, res) => {
  logger.debug("edit the cme");
  const {
    cmeId,
    name,
    startDateTime,
    lastDateTime,
    location,
    description,
    isOnline,
    timeZone,
  } = req.body;
  // console.log(cmeId)
  logger.debug(`logg ${name} id ${cmeId}`);
  cme
    .updateOne(
      { _id: cmeId },
      {
        $set: {
          name,
          startDateTime,
          lastDateTime,
          location,
          description,
          isOnline,
          timeZone,
        },
      }
    )
    .then((status) => {
      return cme.findById(cmeId);
    })
    .then((_cme) => {
      res.json(_cme);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

router.delete("/", (req, res) => {
  logger.debug("deleting the cme");
  const { cmeId } = req.body;
  cme
    .deleteOne({ _id: cmeId })
    .then(() => {
      return res.json({ message: "cme deleted", status: 200 });
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);
      return res.status(400).json(errorResponse.getErrorResponse());
    });
});

module.exports = router;
