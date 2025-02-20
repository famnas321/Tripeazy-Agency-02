const mongoose = require("mongoose")


const AgencySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  
  contactNumber: {
    type: Number,
    required: true,
  },
  managerName: {
    type: String,
    required: true,
  },
  registrationId: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Agency",AgencySchema)

