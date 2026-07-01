const express = require("express");

const {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
} = require("../controllers/resumeController");

const { protect } = require("../middlewares/authMiddleware");
// const { uploadResumeImages } = require("../controllers/uploadImages");

const router = express.Router();

// Create Resume
router.post("/", protect, createResume);

// Get All User Resumes
router.get("/", protect, getUserResumes);

// Get Resume By ID
router.get("/:id", protect, getResumeById);

// Update Resume
router.put("/:id", protect, updateResume);

// Upload Resume Images
// router.put("/:id/upload-images", protect, uploadResumeImages);

// Delete Resume
router.delete("/:id", protect, deleteResume);

module.exports = router;