const mongoose = require("mongoose");
const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  company: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "user"
  },
});

module.exports = mongoose.model("video", videoSchema);
