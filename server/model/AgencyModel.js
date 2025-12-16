const mongoose = require("mongoose");

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
  countryname: {
    type: String,
    required: true,
  },
  stateName: {
    type: String,
    required: true,
  },
  cityName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  image: {
    type: String,  
    default: null,   
  },
  subscriptionStatus: {
    type: String,
    enum: ["active", "inactive", "expired"],
    default: "inactive",
  },
  subscriptionPlan: {
    type: String,
    enum: ["standard", "premium",], 
    default: null,
  },
  expiresAt: {
    type: Date,
    default: null,
  },


}, { timestamps: true });

module.exports = mongoose.model("Agency", AgencySchema);
