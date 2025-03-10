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
  
  contactNO: {
    type: Number,
    required: true,
  },
  nameOfManager: {
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
  city: {
    type: String,
    required: true,
  },
  status:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model("Agency",AgencySchema)

