// config/db.js
const mongoose = require("mongoose");
const dbUrl = process.env.NODE_ENV === "production" ? process.env.MONGODB_URI : process.env.MONGODB_URI_DEV;
async function connectDB() {
  try {
    await mongoose.connect(dbUrl, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 20000,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
