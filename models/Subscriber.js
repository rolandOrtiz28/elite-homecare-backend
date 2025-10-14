const mongoose = require("mongoose");

const SubscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    source: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscriber", SubscriberSchema);
