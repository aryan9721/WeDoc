const mongoose = require("mongoose");
const careerSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  company: {
    type: String
  },
  workplaceType: {
    type: String
  },
  location: {
    type: String
  },
  description: {
    type: String
  },
  jobType: {
    type: String,
    enum: ["part_time",
  "full_time",
  "Contract",
  "Temporary",
  "other",
  "Volunteer",
  "Internship"]
  }
});

module.exports = mongoose.model("career", careerSchema);
