const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/authController");

const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

// Upload Image
router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://resume-builder-w0b6.onrender.com"
    : `${req.protocol}://${req.get("host")}`;

const imageUrl = `${baseUrl}/uploads/${req.file.filename}`;

  res.status(200).json({ imageUrl });
});

module.exports = router;