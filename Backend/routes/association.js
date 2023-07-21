const express = require("express");
const router = express.Router();
const logger = require("../utils/logger");
const association = require("../models/association");
const presidents = require("../models/president");
const ErrorResponse = require("../utils/errorResponse");
const doctor = require("../models/doctor");
const specialist = require("../models/specialist");
const user = require("../models/user");
const membership = require("../models/membership");
const membership_plan = require("../models/membership_plan");

router.get("/", (req, res) => {
  association
    .find({})
    .then((associations) => {
      return res.json(associations);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

router.get("/doctors", (req, res) => {
  const { association } = req.query;
  doctor
    .find({ association })
    .then((doctors) => {
      return res.json(doctors);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

router.get("/specialists", (req, res) => {
  const { association } = req.query;
  specialist
    .find({ association })
    .then((specialists) => {
      return res.json(specialists);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

router.get("/membership_plan", (req, res) => {
  const { association } = req.query;
  membership_plan
    .find({ association })
    .then((membership_plans) => {
      return res.json(membership_plans);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

router.post("/", (req, res) => {
  const { president, emailId } = req.body;
  let __association;
  association
    .create(req.body)
    .then((_association) => {
      __association = _association;
      return presidents.create({ name: president, email: emailId });
    })
    .then((_) => {
      return user.create({ email: emailId, name: president });
    })
    .then(() => {
      return res.json(__association);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, 500);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

router.get("/membership", (req, res) => {
  const { association } = req.query;
  membership
    .find({ association })
    .then((memberships) => {
      return res.json(memberships);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

module.exports = router;
