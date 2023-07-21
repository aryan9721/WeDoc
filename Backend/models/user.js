const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  location: {
    type: String,
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
  doctorId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "doctor"
  },
  specialistId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "specialist"
  },
  dob: {
    type: String
  },
  contact: {
    type: String
  },
  country: {
    type: String
  },
  blood_group: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  notificationToken:{
    type: String
  },
  profileImageUrl:{
    type: String
  }
});

module.exports = mongoose.model("user", userSchema);
