const mongoose = require("mongoose");
const advertismentSchema = new mongoose.Schema({
  link: {
    type: String
  },
  description: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "user"
  },
});

module.exports = mongoose.model("advertisment", advertismentSchema);
