const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/ContactMessage");
const Application = require("../models/Application");
const adminAuth = require("../middleware/adminAuth");

router.get("/messages", adminAuth, async (req, res) => {
  const items = await ContactMessage.find().sort({ createdAt: -1 });
  res.json(items);
});

router.get("/applications", adminAuth, async (req, res) => {
  const items = await Application.find().sort({ createdAt: -1 });
  res.json(items);
});

router.delete("/message/:id", adminAuth, async (req, res) => {
  await ContactMessage.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

router.delete("/application/:id", adminAuth, async (req, res) => {
  await Application.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
