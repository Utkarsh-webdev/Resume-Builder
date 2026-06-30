const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Register User
router.post("/register", registerUser);
// Login User
router.post("/login", loginUser);
// Get Logged In User Profile
router.get("/profile", protect, getUserProfile);

module.exports = router;