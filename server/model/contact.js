const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // Store userId if logged in
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true } // ✅ This automatically stores `createdAt` and `updatedAt`
);

module.exports = mongoose.model("Contact", contactSchema);
