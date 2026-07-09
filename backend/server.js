require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db.js");
const authRoutes = require('./routes/authRoutes.js')
const resumeRoutes = require("./routes/resumeRoutes");


const app = express();

// Middleware to handle CORS
// NOTE: when credentials: true, origin must be a specific URL, never "*"
const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://resume-builder-livid-alpha.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect Database
connectDB();

// Static Folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});