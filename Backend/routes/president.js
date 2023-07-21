const express = require("express");
const router = express.Router();
const logger = require("../utils/logger");
const ErrorResponse = require("../utils/errorResponse");
let mongoose = require("mongoose");
const presidents = require("../models/president");
const association = require("../models/association");
const doctor = require("../models/doctor");
const specialist = require("../models/specialist");

router.get("/", (req, res) => {
  const { email, searchQuery } = req.query;
  let _find = {};
  if (email) {
    _find = {
      email,
      searchQuery,
    };
  }
  if (searchQuery) {
    _find.$or = [
      { name: { $regex: searchQuery, $options: "i" } },
      { email: { $regex: searchQuery, $options: "i" } },
      { speciality: { $regex: searchQuery, $options: "i" } },
      { city: { $regex: searchQuery, $options: "i" } },
    ];
  }
  presidents
    .find(_find)
    .then((presidents) => {
      return res.json(presidents);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, 400);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

router.put("/", (req, res) => {
  logger.debug("edit the president");
  const { email } = req.body;
  presidents
    .updateOne(
      { email },
      {
        $set: req.body,
      }
    )
    .then((status) => {
      return presidents.findOne({ email });
    })
    .then((_user) => {
      res.json(_user);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, 400);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

router.get("/association", (req, res) => {
  const { email } = req.query;
  let _find = {};
  // if (presidentId) {
  _find = {
    emailId: email,
  };
  // }
  association
    .findOne(_find)
    .then((a) => {
      return res.json(a);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, 400);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

router.get("/doctors", (req, res) => {
  const { email } = req.query;
  let _find = {};
  // if (presidentId) {
  _find = {
    emailId: email,
  };
  // }
  association
    .findOne(_find)
    .then((a) => {
      return doctor.find({ association: a["_id"] });
    })
    .then((doctors) => {
      return res.json(doctors);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, 400);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

router.get("/specialists", (req, res) => {
  const { email } = req.query;
  let _find = {};
  // if (presidentId) {
  _find = {
    emailId: email,
  };
  // }
  association
    .findOne(_find)
    .then((a) => {
      return specialist.find({ association: a["_id"] });
    })
    .then((specialists) => {
      return res.json(specialists);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, 400);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});
module.exports = router;
