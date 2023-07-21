const express = require("express");
const router = express.Router();
const logger = require("../utils/logger");
const gallery = require("../models/gallery");
const ErrorResponse = require("../utils/errorResponse");
const path = require("path");
const authenticate = require("../middlewares/authenticate");

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB

router.get("/", authenticate, (req, res) => {
  gallery
    .find({ userId: req.jwt.userId })
    .then((gallerys) => {
      return res.json(gallerys);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

router.post("/", authenticate, (req, res) => {
  const { image, video, images } = req.files;

  // Handle image upload
  if (image) {
    if (image.size > MAX_IMAGE_SIZE) {
      let errorResponse = new ErrorResponse(
        "Image size exceeds the allowed limit",
        400
      );
      return res.status(400).json(errorResponse.getErrorResponse());
    }
    logger.info(
      "save in " + path.join(__dirname, "..") + "/upload/" + image.name
    );
    // Move the uploaded image to our upload folder
    image.mv(path.join(__dirname, "..") + "/upload/" + image.name);
  }

  // Handle video upload
  if (video) {
    if (video.size > MAX_VIDEO_SIZE) {
      let errorResponse = new ErrorResponse(
        "Video size exceeds the allowed limit",
        400
      );
      return res.status(400).json(errorResponse.getErrorResponse());
    }
    logger.info(
      "save in " + path.join(__dirname, "..") + "/upload/" + video.name
    );
    // Move the uploaded video to our upload folder
    video.mv(path.join(__dirname, "..") + "/upload/" + video.name);
  }

  // Handle images upload
  let arr = [];
  if (images && Array.isArray(images)) {
    for (let i = 0; i < images.length; i++) {
      const currentImage = images[i];
      if (currentImage.size > MAX_IMAGE_SIZE) {
        let errorResponse = new ErrorResponse(
          `Image ${currentImage.name} size exceeds the allowed limit`,
          400
        );
        return res.status(400).json(errorResponse.getErrorResponse());
      }
      arr.push(currentImage.name);
      currentImage.mv(
        path.join(__dirname, "..") + "/upload/" + currentImage.name
      );
    }
  }

  const { event } = req.body;
  gallery
    .create({
      event,
      coverImg: image ? image.name : null,
      video: video ? video.name : null,
      images: arr,
      userId: req.jwt.userId,
    })
    .then((_gallery) => {
      res.json(_gallery);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, 500);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

router.put("/", (req, res) => {
  const { id, event } = req.body;
  event
    .updateOne(
      { _id: id },
      {
        $set: { event },
      }
    )
    .then((status) => {
      return gallery.findById(id);
    })
    .then((gallery) => {
      res.json(gallery);
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);
      return res.status(500).json(errorResponse.getErrorResponse());
    });
});

router.delete("/", (req, res) => {
  const { galleryId } = req.body;
  gallery
    .deleteOne({ _id: galleryId })
    .then(() => {
      return res.json({ message: "gallery deleted", status: 200 });
    })
    .catch((e) => {
      let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);
      return res.status(400).json(errorResponse.getErrorResponse());
    });
});

module.exports = router;
