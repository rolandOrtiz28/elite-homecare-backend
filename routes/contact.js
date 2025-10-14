// routes/contact.js
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const ContactMessage = require("../models/ContactMessage");

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // 1️⃣ Save to MongoDB
    const doc = await ContactMessage.create({ name, email, phone, subject, message });

    // 2️⃣ Send Email via Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Elite HomeCare Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // send to your own inbox
      subject: subject || "New Contact Message from Elite HomeCare Website",
      html: `
        <h2>📩 New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Subject:</strong> ${subject || "N/A"}</p>
        <p><strong>Message:</strong><br>${message}</p>
        <hr/>
        <p><small>This message was sent from the Elite HomeCare website contact form.</small></p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      id: doc._id,
      message: "Message sent successfully.",
    });
  } catch (err) {
    console.error("POST /contact error:", err);
    res.status(500).json({ error: "Unable to send message." });
  }
});

module.exports = router;
