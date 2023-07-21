const mongoose = require("mongoose");
const membershipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  buyDate: {
    type: Date
  },
  expiryDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ["running","pending","expired"]
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "membership_plan"
  },
  association: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "association"
  },
});

module.exports = mongoose.model("membership", membershipSchema);
