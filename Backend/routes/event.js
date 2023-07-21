const express = require("express");
const router = express.Router();
const logger = require("../utils/logger");
const event = require("../models/event");
const USER = require("../models/user");
const DOCTOR = require("../models/doctor");
const ASSOCIATION = require("../models/association");
const ErrorResponse = require("../utils/errorResponse");
const authenticate = require("../middlewares/authenticate");
var path = require("path");
let mongoose = require("mongoose");
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
router.get("/", authenticate, async (req, res) => {
  const userId = req.jwt.userId;
  let association = await getAssociation(userId);
  if (association) {
    event
      .find({
        $or: [
          { associationId: association._id },
          { associationId: "SUPERADMIN" },
        ],
      })
      .then((events) => {
        logger.debug(events);
        return res.json(events);
      })
      .catch((e) => {
        let errorResponse = new ErrorResponse(
          e.message,
          HttpStatus.BAD_REQUEST
        );
        return res.status(500).json(errorResponse.getErrorResponse());
      });
  } else {
    event
      .find({})
      .then((events) => {
        return res.json(events);
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
  logger.debug("organize the event");
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
  event
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
      const messageBody = _event.name + ' has been added! checkout Here.';
      await sendExpoPushNotification(messageBody);    
      res.json(_event);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, 500);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

router.put("/", authenticate, (req, res) => {
  logger.debug("edit the event");
  const {
    eventId,
    name,
    startDateTime,
    lastDateTime,
    location,
    description,
    isOnline,
    timeZone,
  } = req.body;
  event
    .updateOne(
      { _id: eventId },
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
      return event.findById(eventId);
    })
    .then((_event) => {
      res.json(_event);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

router.delete("/", authenticate, (req, res) => {
  logger.debug("deleting the event");
  const { eventId } = req.body;
  event
    .deleteOne({ _id: eventId })
    .then(() => {
      return res.json({ message: "event deleted", status: 200 });
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);
      return res.status(400).json(errorResponse.getErrorResponse());
    });
});
// Update the array of objects
router.put('/:eventId',authenticate, async (req, res) => {
  const eventId = req.params.eventId;
  const userId = req.jwt.userId;
  const newObject = await USER.findById(userId);
  event.findByIdAndUpdate(
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
router.post("/upload", (req, res) => {
  // Get the file that was set to our field named "image"
  const { image } = req.files;
  if (!image) return res.sendStatus(400);
  logger.info(
    "save in " + path.join(__dirname, "..") + "/upload/" + image.name
  );
  // Move the uploaded image to our upload folder
  image.mv(path.join(__dirname, "..") + "/upload/" + image.name);
  res.sendStatus(200);
});

module.exports = router;
