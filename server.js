require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const connectDB = require("./config/db");
const fileUpload = require("express-fileupload");

const app = express();
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || "development";
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "http://localhost:5173").split(",");

// ✅ Trust Namecheap's reverse proxy (fixes express-rate-limit error)
app.set("trust proxy", 1);

// ✅ Connect to MongoDB
connectDB();

// ✅ Security Middlewares
app.use(cors({ origin: ALLOWED_ORIGINS, credentials: true }));
app.use(helmet());
app.use(morgan(NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json({ limit: "2mb" }));
app.use(fileUpload({ useTempFiles: true }));

// ✅ Rate Limiter (fixed)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  standardHeaders: true, // return rate limit info in headers
  legacyHeaders: false,  // disable the `X-RateLimit-*` headers
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// ✅ Routes
app.use("/api/contact", require("./routes/contact"));
app.use("/api/apply", require("./routes/apply"));
app.use("/api/subscribe", require("./routes/subscribe"));
app.use("/api/admin", require("./routes/admin"));

// ✅ Root route
app.get("/", (req, res) => res.send("Backend is running"));

// ✅ 404 fallback
app.use((req, res) => res.status(404).json({ error: "Route not found" }));

// ✅ Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} (${NODE_ENV})`));
