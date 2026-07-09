const fs = require("fs");
const path = require("path");
const Resume = require("../models/Resume");
const upload = require("../middlewares/uploadMiddleware");

const uploadResumeImages = (req, res) => {
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
  ])(req, res, async (err) => {
    if (err) {
      console.error("Multer Error:", err);

      return res.status(400).json({
        success: false,
        message: err.message || "File upload failed",
      });
    }

    try {
      console.log("Upload request received");

      const resumeId = req.params.id;

      const resume = await Resume.findOne({
        _id: resumeId,
        userId: req.user._id,
      });

      if (!resume) {
        return res.status(404).json({
          success: false,
          message: "Resume not found or unauthorized",
        });
      }

      console.log("Resume found:", resume._id);

      const uploadsFolder = path.join(__dirname, "..", "uploads");

      // Always return HTTPS URL in production
      const baseUrl =
        process.env.NODE_ENV === "production"
          ? "https://resume-builder-w0b6.onrender.com"
          : `${req.protocol}://${req.get("host")}`;

      const thumbnailFile = req.files?.thumbnail?.[0];
      const profileImageFile = req.files?.profileImage?.[0];

      // -------------------------
      // Thumbnail
      // -------------------------
      if (thumbnailFile) {
        try {
          if (resume.thumbnailLink) {
            const oldThumbnail = path.join(
              uploadsFolder,
              path.basename(resume.thumbnailLink)
            );

            if (fs.existsSync(oldThumbnail)) {
              fs.unlinkSync(oldThumbnail);
            }
          }
        } catch (error) {
          console.log("Couldn't delete old thumbnail:", error.message);
        }

        resume.thumbnailLink = `${baseUrl}/uploads/${thumbnailFile.filename}`;
      }

      // -------------------------
      // Profile Image
      // -------------------------
      if (profileImageFile) {
        if (!resume.profileInfo) {
          resume.profileInfo = {};
        }

        try {
          if (resume.profileInfo.profilePreviewUrl) {
            const oldProfile = path.join(
              uploadsFolder,
              path.basename(resume.profileInfo.profilePreviewUrl)
            );

            if (fs.existsSync(oldProfile)) {
              fs.unlinkSync(oldProfile);
            }
          }
        } catch (error) {
          console.log(
            "Couldn't delete old profile image:",
            error.message
          );
        }

        resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${profileImageFile.filename}`;
      }

      await resume.save();

      console.log("Resume saved successfully");

      return res.status(200).json({
        success: true,
        message: "Images uploaded successfully",
        thumbnailLink: resume.thumbnailLink,
        profilePreviewUrl: resume.profileInfo.profilePreviewUrl,
      });
    } catch (error) {
      console.error("Upload Error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to upload images",
        error: error.message,
      });
    }
  });
};

module.exports = {
  uploadResumeImages,
};