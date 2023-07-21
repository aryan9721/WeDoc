const mongoose = require("mongoose");
const objectSchema = new mongoose.Schema({
  userId: String,
  name: String,
  email: String,
  phoneNumber: String
}, { _id: false });

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startDateTime: {
    type: Date,
  },
  lastDateTime: {
    type: Date,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  timeZone: {
    type: String,
  },
  coverImg: {
    type: String,
  },
  associationId: {
    type: String,
    default: "SUPERADMIN",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  registeredUser:[objectSchema]
});

module.exports = mongoose.model("event", eventSchema);
