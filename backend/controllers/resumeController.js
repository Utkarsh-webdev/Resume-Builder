const Resume = require("../models/Resume");

// ===============================
// Create Resume
// POST /api/resume
// ===============================
const createResume = async (req, res) => {
  try {
    const { title } = req.body;

    const resume = await Resume.create({
      userId: req.user._id,
      title: title || "Untitled Resume",

      thumbnailLink: "",

      template: {
        theme: "",
        colorPalette: [],
      },

      profileInfo: {
        profilePreviewUrl: "",
        fullName: "",
        designation: "",
        summary: "",
      },

      contactInfo: {
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        github: "",
        website: "",
      },

      workExperience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: [],
      languages: [
        {
          name: "",
          progress: 0,
        },
      ],
      interests: [],
    });

    res.status(201).json({
      success: true,
      resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create resume",
      error: error.message,
    });
  }
};

// ===============================
// Get All Resumes
// GET /api/resume
// ===============================
const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({
      userId: req.user._id,
    }).sort({
      updatedAt: -1,
    });

    res.status(200).json({
      success: true,
      resumes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch resumes",
      error: error.message,
    });
  }
};

// ===============================
// Get Resume By ID
// GET /api/resume/:id
// ===============================
const getResumeById = async (req, res) => {
  try {
    console.log("Requested resume id:", req.params.id);
    console.log("Requesting user id:", req.user._id.toString());

    const rawMatch = await Resume.findById(req.params.id);
    console.log("Exists at all (ignoring user)?", rawMatch ? rawMatch._id : null);
    console.log("Owned by userId:", rawMatch ? rawMatch.userId.toString() : "N/A");

    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch resume",
      error: error.message,
    });
  }
};

// ===============================
// Update Resume
// PUT /api/resume/:id
// ===============================
const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found or unauthorized",
      });
    }

    // Merge updates from req.body into the existing resume
    Object.assign(resume, req.body);

    // Save updated resume (runs schema validators automatically)
    const savedResume = await resume.save();

    res.status(200).json({
      success: true,
      resume: savedResume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update resume",
      error: error.message,
    });
  }
};

// ===============================
// Delete Resume
// DELETE /api/resume/:id
// ===============================
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete resume",
      error: error.message,
    });
  }
};

module.exports = {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
};