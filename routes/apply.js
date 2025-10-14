const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const doc = await Application.create(data);
    res.status(201).json({ success: true, id: doc._id });
  } catch (err) {
    console.error("POST /apply error:", err);
    res.status(500).json({ error: "Unable to submit application." });
  }
});

module.exports = router;
