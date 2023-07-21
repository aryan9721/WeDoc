const mongoose = require("mongoose");
const gallerySchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "event"
  },
  coverImg: {
    type: String
  },
  video: {
    type: String
  },
  images: {
    type: Array
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "user"
  },
  
});

module.exports = mongoose.model("gallery", gallerySchema);
