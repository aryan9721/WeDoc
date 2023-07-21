const mongoose = require("mongoose");
const storiesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String
  },
  description: {
    type: String
  }
});

module.exports = mongoose.model("stories", storiesSchema);
