const mongoose = require("mongoose");
const associationSchema = new mongoose.Schema({
  doctors: {
    type: mongoose.Schema.Types.ObjectId,
  },
  specialists: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  contact: {
    type: String,
  },
  president: {
    type: String,
  },
  city: {
    type: String,
  },
  emailId: {
    type: String,
  },
  
});

module.exports = mongoose.model("association", associationSchema);
