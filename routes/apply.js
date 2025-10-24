const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const { uploadCV } = require("../config/cloudinary"); // 👈 NEW IMPORT

router.post("/", async (req, res) => {
  let cvUrl = "";
  let data = req.body;
  
  // 1. Handle File Upload
  if (req.files && req.files.cvFile) {
  const cvFile = req.files.cvFile;
  if (cvFile.size > 2 * 1024 * 1024) {
    return res.status(400).json({ error: "File size exceeds 2MB limit" });
  }
  if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(cvFile.mimetype)) {
    return res.status(400).json({ error: "Invalid file format. Only PDF, DOC, DOCX allowed" });
  }
  try {
    cvUrl = await uploadCV(cvFile.tempFilePath);
    data.cvUrl = cvUrl;
  } catch (uploadError) {
    console.error("Cloudinary Upload Error:", uploadError.message);
    data.cvUrl = "";
  }
}

  try {
    // Note: The structure of req.body depends on how the client sends formData
    // If client uses FormData, req.body will contain non-file fields.
    const doc = await Application.create(data);
    res.status(201).json({ success: true, id: doc._id, cvUrl: data.cvUrl });
  } catch (err) {
    console.error("POST /apply error:", err);
    res.status(500).json({ error: "Unable to submit application." });
  }
});

router.post("/test-upload", async (req, res) => {
  if (!req.files || !req.files.cvFile) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  try {
    const cvUrl = await uploadCV(req.files.cvFile.tempFilePath);
    res.status(200).json({ success: true, cvUrl });
  } catch (err) {
    console.error("Test upload error:", err);
    res.status(500).json({ error: "File upload failed" });
  }
});

module.exports = router;