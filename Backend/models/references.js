const mongoose = require("mongoose");
const referencesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  referenceDateTime: {
    type: Date,
    default: Date.now
  },
  reason: {
    type: String,
  },
  contact: {
    type: String,
  },
  referredFrom: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "user"
  },
  referredTo: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "user"
  }
});

module.exports = mongoose.model("references", referencesSchema);
