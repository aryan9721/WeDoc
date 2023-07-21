const express = require("express");
const router = express.Router();
const logger = require("../utils/logger");
const association = require("../models/association");
const president = require("../models/president");
const ErrorResponse = require("../utils/errorResponse");
const doctor = require("../models/doctor");
const specialist = require("../models/specialist");

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

module.exports = router;
