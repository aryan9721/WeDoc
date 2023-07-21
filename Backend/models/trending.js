const mongoose = require("mongoose");
const trendingSchema = new mongoose.Schema({
  link: {
    type: String
  },
  description: {
    type: String
  }
});

module.exports = mongoose.model("trending", trendingSchema);
