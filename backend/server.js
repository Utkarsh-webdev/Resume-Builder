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
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Connect Database
connectDB();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
  setHeaders: (res, path) => {
    res.set("Access-Control-Allow-Origin", "http://localhost:5173")
  }
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});