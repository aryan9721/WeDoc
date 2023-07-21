const mongoose = require("mongoose");
const specialistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  association: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "association",
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
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("specialist", specialistSchema);
