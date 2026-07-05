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
        <span className="text-xs font-medium text-purple-600">{progress}%</span>
      </div>
      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-purple-600 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default StepProgress;