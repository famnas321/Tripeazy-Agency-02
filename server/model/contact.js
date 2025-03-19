const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    agencyId: { type: mongoose.Schema.Types.ObjectId, ref: "Agency", default: null }, // For logged-in agencies
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["user", "agency"], required: true }, // Add this field
    read: { type: Boolean, default: false },
  },
  { timestamps: true } // Automatically stores `createdAt` and `updatedAt`
);

module.exports = mongoose.model("Contact", contactSchema);