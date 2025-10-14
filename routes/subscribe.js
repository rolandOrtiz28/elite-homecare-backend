const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    const doc = await Subscriber.findOneAndUpdate(
      { email },
      { email, source: "newsletter" },
      { upsert: true, new: true }
    );
    res.status(201).json({ success: true, id: doc._id });
  } catch (err) {
    console.error("POST /subscribe error:", err);
    res.status(500).json({ error: "Subscription failed." });
  }
});

module.exports = router;
