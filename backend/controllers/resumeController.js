const Resume = require("../models/Resume");

// Create Resume
const createResume = async (req, res) => {
  try {
    const { title } = req.body;

    const resume = await Resume.create({
      userId: req.user.id,
      title: title || "Untitled Resume",

      thumbnailLink: "",

      profileInfo: {
        profileImg: null,
        previewUrl: "",
        fullName: "",
        designation: "",
        summary: "",
      },

      contactInfo: {
        email: "",
        phone: "",
        location: "",
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
        }
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

// Get All Resumes
const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id }).sort({
      updatedAt: -1,
    });

    res.json({
      success: true,
      resumes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Resume By ID
const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.json({
      success: true,
      resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Resume
const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.json({
      success: true,
      resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Resume
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
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