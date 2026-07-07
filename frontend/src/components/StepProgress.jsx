import React from "react";

const STEP_LABELS = {
  "profile-info": "Profile",
  "contact-info": "Contact",
  "work-experience": "Experience",
  "education": "Education",
  "skills": "Skills",
  "projects": "Projects",
  "certifications": "Certifications",
  "languages": "Languages",
  "interests": "Interests",
};

const StepProgress = ({ progress, currentPage, stepNumber, totalSteps }) => {
  return (
    <div className="mt-6 mb-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          {stepNumber && totalSteps
            ? `Step ${stepNumber} of ${totalSteps}${
                currentPage ? ` — ${STEP_LABELS[currentPage] || ""}` : ""
              }`
            : "Progress"}
        </span>

        <span className="text-xs font-medium text-[#FF4F1F]">
          {progress}%
        </span>
      </div>

      <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-[#FF4F1F] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default StepProgress;