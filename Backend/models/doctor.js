const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema({
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
  usermap: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
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
  plan: {
    type: Object,
    default: {
      id: "1",
      name: "Free Plan",
      startDate: new Date(),
      expiryDate: null,
      status: "running",
    },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("doctor", doctorSchema);
