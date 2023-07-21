const mongoose = require("mongoose");
const presidentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
  },
  speciality: {
    type: String,
  },
  city: {
    type: String,
  },
  contact: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
  },
  yoe: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  successfulOT: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  patientRecovered: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  certificatesAchieved: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
    location: {
      type: String,
    },
  },
});

module.exports = mongoose.model("president", presidentSchema);
