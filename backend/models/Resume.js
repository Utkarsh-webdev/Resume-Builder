const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    thumbnailLink: {
      type: String,
    },

    template: {
      templateId: String,
      theme: String,
      colorPalette: String, // was [String] — this was the bug
    },

    profileInfo: {
      profilePreviewUrl: String,
      previewUrl: String,
      fullName: String,
      designation: String,
      summary: String,
    },

    contactInfo: {
      email: String,
      phone: String,
      location: String,
      linkedin: String,
      github: String,
      leetcode: String,
      website: String,
    },

    workExperience: [
      {
        company: String,
        role: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],

    education: [
      {
        degree: String,
        school: String, // was "institution" — didn't match frontend
        startDate: String,
        endDate: String,
        description: String,
      },
    ],

    skills: [
      {
        name: String,
        level: String, // was "progress: Number" — didn't match frontend
      },
    ],

    projects: [
      {
        title: String,
        description: String,
        github: String,
        liveDemo: String,
      },
    ],

    certifications: [
      {
        title: String,
        issuer: String,
        year: String,
      },
    ],

    languages: [
      {
        name: String,
        progress: Number,
      },
    ],

    interests: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resume", ResumeSchema);