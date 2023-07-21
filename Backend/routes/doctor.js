const express = require("express");
const router = express.Router();
const logger = require("../utils/logger");
const doctor = require("../models/doctor");
const Membership = require('../models/membership_plan');
const ErrorResponse = require("../utils/errorResponse");
let mongoose = require("mongoose");
const associations = require("../models/association");
const user = require("../models/user");
const util = require('util');
const secretKeyUtil = require('../utils/secretKeyUtil');
const apiUtils = require('../utils/apiUtils');
const errorMessages = require('../utils/errorMessages');
const HttpStatus = require('http-status-codes');
const sendEmail = require('./emailSender');



router.get("/association", (req, res) => {
  const { doctorId } = req.query;
  console.log(doctorId);
  let _find = {};
  _find = {
    _id: mongoose.Types.ObjectId(doctorId),
  };
  doctor
    .findOne(_find)
    .then((doctor) => {
      console.log(doctor);
      let { association } = doctor;
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
  console.log(req.body)
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
    userId,
    plan
  } = req.body;
  logger.debug('add doctor triggered')
  // Validate the presence of required fields
  if (!name || !email) {
    let errorResponse = new ErrorResponse("Name and email are required.", 400);
    return res.status(400).json(errorResponse.getErrorResponse());
  }
  associations.findOne({ _id: association }).then((_association) => {
    if (!_association) {
      logger.error("_association not found hence create the association first");
    }
  });
  doctor
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
      userId,
    })
    .then((_doctor) => {
      res.json(_doctor);
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
    plan,
  } = req.body;
  let d;
  associations.findOne({ _id: association }).then((_association) => {
    if (!_association) {
      logger.error("_association not found hence create the association first");
    }
  });
  user.create({ email, name, contact })
  .then((userInfo)=>{
    const userId = userInfo._id;
    logger.debug(`user created ${util.inspect(req.body)}`);
    doctor
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
      userId: userInfo._id,
      plan,
    })
    .then((_doctor) => {
      logger.debug(`add doctor triggered ${util.inspect(_doctor)}`)
      const receiverEmail = 'aryanvora68@gmail.com'; // Replace with the receiver's email address
      const subject = 'Welcome to Wedoc';
      const text = 'You have been succefully added to wedoc application please download from playstore.';
      
      sendEmail(_doctor.email, subject, text);
      res.json(_doctor);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, 500);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
  });
});

router.get("/validate", (req, res) => {
  const { doctorId } = req.query;
  const { associationId } = req.query;
  console.log(doctorId);
  let _find = {};
  _find = {
    _id: mongoose.Types.ObjectId(doctorId),
  };
  doctor
    .findOne(_find)
    .then((doctor) => {
      console.log(doctor);
      let { association } = doctor;
      console.log(association, associationId);
      return res.json({ isInAssociation: association == associationId });
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, 400);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

router.get("/associationforDoctor", (req, res) => {
  const { doctorId } = req.query;
  console.log(doctorId);
  let _find = {};
  _find = {
    _id: mongoose.Types.ObjectId(doctorId),
  };
  doctor
    .findOne(_find)
    .then((doctor) => {
      console.log(doctor);
      let { association } = doctor;
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
  logger.debug("deleting the doctor");
  const { doctorId } = req.body;
  doctor
    .deleteOne({ _id: doctorId })
    .then(() => {
      return res.json({ message: "doctor deleted", status: 200 });
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, 400);
      return res.status(400).json(errorResponse.getErrorResponse());
    });
});

router.get("/", (req, res) => {
  const { doctorId, searchQuery } = req.query;
  let _find = {};

  if (doctorId) {
    _find._id = mongoose.Types.ObjectId(doctorId);
  }

  if (searchQuery) {
    _find.$or = [
      { name: { $regex: searchQuery, $options: "i" } },
      { speciality: { $regex: searchQuery, $options: "i" } },
      { city: { $regex: searchQuery, $options: "i" } },
    ];
  }

  doctor
    .find(_find)
    .then((doctors) => {
      return res.json(doctors);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, 400);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

router.put('/updateMembershipPlan', async (req, res) => {
  try {
    logger.debug(`planutil ${util.inspect(req.body)}`)
    const mid = req.body.id;
    // Find the user by apiKey and update the plan
    const token = req.headers['x-api-key'];
    if(token){
        const secretKey = secretKeyUtil.readPublicPEMFile;
        await apiUtils.verifyToken(token,secretKey)
        .then(decoded => {
            if(decoded){
                logger.debug('user decoded');
                req.jwt = decoded;
                logger.debug(util.inspect(req.jwt.userId))
            }else{
                logger.error(errorMessages.TOKEN_NOT_VERIFY);
                return Promise.reject(errorMessages.TOKEN_NOT_VERIFY);
            }
        })
        .catch(error =>{
            logger.error(`unauthorized :: ${error.message}`);
            res.status(HttpStatus.UNAUTHORIZED).json(
            apiUtils.getError(
            `unauthorized :: ${error}` || 'unauthorized',
            HttpStatus.UNAUTHORIZED))
        })
    }else{
        logger.error(`unauthorized :: token not send`);
        res.status(HttpStatus.UNAUTHORIZED).json(
        apiUtils.getError(
        'unauthorized :: token not send',
        HttpStatus.UNAUTHORIZED))
    }

    logger.debug(util.inspect(mid))
    const membershipDetials = await Membership.findById(mid);
    logger.debug(util.inspect(membershipDetials))
    const currentDate = new Date();
    const expDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + membershipDetials.duration, currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());    
    const newPlan = {
      id: mid,
      name: membershipDetials.name,
      startDate: currentDate,
      expiryDate: expDate,
      status: 'running',
    }
    const updatedUser = await doctor.updateOne({userId: req.jwt.userId}, {plan: newPlan});
    
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(updatedUser);

    
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;
