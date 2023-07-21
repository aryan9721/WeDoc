const express = require("express");
const router = express.Router();
const logger = require("../utils/logger");
const request = require("../models/request");
const ErrorResponse = require("../utils/errorResponse");

router.get("/", (req, res) => {
  request
    .find({})
    .then((requests) => {
      return res.json(requests);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

router.post("/", (req, res) => {
  const { doctor, action } = req.body;
  request
    .create({ doctor, action })
    .then((_request) => {
      res.json(_request);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, 500);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

router.post("/", (req, res) => {
  const { specialist, action } = req.body;
  request
    .create({ specialist, action })
    .then((_request) => {
      res.json(_request);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, 500);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

router.put("/", (req, res) => {
  const { requestId, doctor, specialist, action } = req.body;
  request
    .updateOne(
      { _id: requestId },
      {
        $set: { doctor, specialist, action },
      }
    )
    .then((status) => {
      return request.findById(requestId);
    })
    .then((_request) => {
      res.json(_request);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

router.delete("/", (req, res) => {
  logger.debug("deleting the request");
  const { requestId } = req.body;
  request
    .deleteOne({ _id: requestId })
    .then(() => {
      return res.json({ message: "request deleted", status: 200 });
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);
      return res.status(400).json(errorResponse.getErrorResponse());
    });
});

module.exports = router;
