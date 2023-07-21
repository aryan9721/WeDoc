const mongoose = require("mongoose");
const specialist = require("./specialist");
const pendingRequestSchema = new mongoose.Schema({
  action: {
    type: String,
    default: "none",
    enum: ["approve", "reject", "none"],
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor",
  },
  specialist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "specialist",
  },
});

module.exports = mongoose.model("pendingRequest", pendingRequestSchema);
