require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || "development";
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "http://localhost:5173").split(",");

// DB
connectDB();

// Security
app.use(cors({ origin: ALLOWED_ORIGINS, credentials: true }));
app.use(helmet());
app.use(morgan(NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json({ limit: "2mb" }));

// Rate limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use(limiter);

// Routes
app.use("/api/contact", require("./routes/contact"));
app.use("/api/apply", require("./routes/apply"));
app.use("/api/subscribe", require("./routes/subscribe"));
app.use("/api/admin", require("./routes/admin"));

// Root
app.get("/", (req, res) => res.send("Backend is running"));
app.use((req, res) => res.status(404).json({ error: "Route not found" }));

// Start
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} (${NODE_ENV})`));
