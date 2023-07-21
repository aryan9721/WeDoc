const mongoose = require("mongoose");
const membership_planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: Number
  },
  amount: {
    type: Number,
    validate : {
      validator : Number.isInteger,
      message   : '{VALUE} is not an integer value'
    }
  },
  association: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "association"
  },
  stripe_price_object:{
    type: String 
  }
});

module.exports = mongoose.model("membership_plan", membership_planSchema);
