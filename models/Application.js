// models/Application.js
const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    // Personal Information
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    // Contact Information
    email: { type: String, required: true },
    phone: { type: String, required: true },

    // Position & Experience
    position: { type: String, required: true },
    experience: { type: String, default: "" },

    // Education
    education: { type: String, default: "" },

    // Languages
    languages: { type: String, default: "" },

    // Availability
    availability: { type: String, default: "" },

    // Additional Message
    message: { type: String, default: "" },

    // Optional fields (future-proof)
    cvUrl: { type: String, default: "" },
    coverLetter: { type: String, default: "" },

    // Status tracking
    status: {
      type: String,
      enum: ["new", "reviewed", "shortlisted", "rejected", "hired"],
      default: "new",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", ApplicationSchema);
