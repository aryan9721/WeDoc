const express = require("express");
const router = express.Router();
const logger = require("../utils/logger");
const specialist = require("../models/specialist");
const ErrorResponse = require("../utils/errorResponse");
let mongoose = require("mongoose");
const associations = require("../models/association");
const user = require("../models/user");
const { utils } = require("mocha");
const util = require('util');
router.get("/association", (req, res) => {
  const { specialistId } = req.query;
  console.log(specialistId);
  let _find = {};
  _find = {
    _id: mongoose.Types.ObjectId(specialistId),
  };
  specialist
    .findOne(_find)
    .then((specialist) => {
      console.log(specialist);
      let { association } = specialist;
      console.log(association);
      return associations.findOne({ _id: association });
    })
    .then((_association) => {
      return res.json(_association);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, 400);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

router.post("/add", (req, res) => {
  const {
    name,
    association,
    degree,
    contact,
    email,
    designation,
    yoe,
    successfulOT,
    patientRecovered,
    certificatesAchieved,
    speciality,
    city,
    userId,
  } = req.body;
  associations.findOne({ _id: association }).then((_association) => {
    if (!_association) {
      logger.error("_association not found hence create the association first");
    }
  });
  specialist
    .create({
      name,
      association,
      degree,
      contact,
      email,
      designation,
      yoe,
      successfulOT,
      patientRecovered,
      certificatesAchieved,
      speciality,
      city,
      userId,
    })
    .then((_specialist) => {
      res.json(_specialist);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, 500);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

router.post("/", (req, res) => {
  const {
    name,
    association,
    degree,
    contact,
    email,
    designation,
    yoe,
    successfulOT,
    patientRecovered,
    certificatesAchieved,
    speciality,
    city,
  } = req.body;
  associations.findOne({ _id: association }).then((_association) => {
    if (!_association) {
      logger.error("_association not found hence create the association first");
    }
  });

  user.create({ email, name }).then((userInfo)=>{
    logger.debug(util.inspect(userInfo))
    const userId = userInfo._id;
    specialist
    .create({
      name,
      association,
      degree,
      contact,
      email,
      designation,
      yoe,
      successfulOT,
      patientRecovered,
      certificatesAchieved,
      speciality,
      city,
      userId,
    })
    .then((_specialist) => {
      res.json(_specialist);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, 500);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
  })
  
});

router.get("/validate", (req, res) => {
  const { specialistId } = req.query;
  const { associationId } = req.query;
  console.log(specialistId);
  let _find = {};
  _find = {
    _id: mongoose.Types.ObjectId(specialistId),
  };
  specialist
    .findOne(_find)
    .then((specialist) => {
      console.log(specialist);
      let { association } = specialist;
      console.log(association, associationId);
      return res.json({ isInAssociation: association == associationId });
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, 400);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

router.get("/associationforSpecialist", (req, res) => {
  const { specialistId } = req.query;
  console.log(specialistId);
  let _find = {};
  _find = {
    _id: mongoose.Types.ObjectId(specialistId),
  };
  specialist
    .findOne(_find)
    .then((specialist) => {
      console.log(specialist);
      let { association } = specialist;
      console.log(association);
      return associations.findOne({ _id: association });
    })
    .then((_association) => {
      return res.json(_association);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, 400);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

router.delete("/", (req, res) => {
  logger.debug("deleting the specialist");
  const { specialistId } = req.body;
  specialist
    .deleteOne({ _id: specialistId })
    .then(() => {
      return res.json({ message: "specialist deleted", status: 200 });
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, 400);
      return res.status(400).json(errorResponse.getErrorResponse());
    });
});

router.get("/", (req, res) => {
  const { specialistId, searchQuery } = req.query;
  console.log(specialistId);
  let _find = {};
  if (specialistId) {
    _find = {
      _id: mongoose.Types.ObjectId(specialistId),
    };
  }
  if (searchQuery) {
    _find.$or = [
      { name: { $regex: searchQuery, $options: "i" } },
      { speciality: { $regex: searchQuery, $options: "i" } },
      { city: { $regex: searchQuery, $options: "i" } },
    ];
  }
  specialist
    .find(_find)
    .then((specialists) => {
      return res.json(specialists);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, 400);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

module.exports = router;
