const fs = require("fs");
const path = require("path");
const Resume = require("../models/Resume");
const upload = require("../middlewares/uploadMiddleware");

const uploadResumeImages = (req, res) => {
  upload.fields([{ name: "thumbnail" }, { name: "profileImage" }])(req, res, async (err) => {
    // 1. Handle Multer file parsing errors
    if (err) {
      return res.status(400).json({ message: "File upload failed", error: err.message });
    }

    try {
      const resumeId = req.params.id;
      const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });

      if (!resume) {
        return res.status(404).json({ message: "Resume not found or unauthorized" });
      }

      const uploadsFolder = path.join(__dirname, "..", "uploads");
      const baseUrl = `${req.protocol}://${req.get("host")}`;

      const newThumbnail = req.files?.thumbnail?.[0];
      const newProfileImage = req.files?.profileImage?.[0];

      // 2. Handle Thumbnail cleanup and update
      if (newThumbnail) {
        if (resume.thumbnailLink) {
          const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
          if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
        }
        resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
      }

      // 3. Handle Profile Image cleanup and update
      if (newProfileImage) {
        // Initialize profileInfo object if it doesn't exist to prevent undefined errors
        if (!resume.profileInfo) {
          resume.profileInfo = {};
        }

        if (resume.profileInfo?.profilePreviewUrl) {
          const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));
          if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
        }
        resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
      }

      // 4. Save updates to database
      await resume.save();

      return res.status(200).json({
        message: "Images uploaded successfully",
        thumbnailLink: resume.thumbnailLink,
        profilePreviewUrl: resume.profileInfo?.profilePreviewUrl,
      });

    } catch (dbErr) {
      // 5. Catch any database, saving, or file system errors here
      console.error("Error processing database or files:", dbErr);
      return res.status(500).json({ message: "Failed to upload images", error: dbErr.message });
    }
  });
};

module.exports = { uploadResumeImages };
