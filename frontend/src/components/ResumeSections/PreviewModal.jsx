import React from "react";
import { createPortal } from "react-dom";
import { LuDownload, LuX } from "react-icons/lu";
import RenderResume from "../ResumeTamplates/RenderResume";

const hasAnyContent = (resumeData) => {
  const {
    profileInfo, workExperience, education, skills,
    projects, certifications, languages, interests,
  } = resumeData;

  return (
    profileInfo?.summary ||
    workExperience?.some((w) => w.company) ||
    education?.some((e) => e.school) ||
    skills?.some((s) => s.name) ||
    projects?.some((p) => p.title) ||
    certifications?.some((c) => c.title) ||
    languages?.some((l) => l.name) ||
    interests?.some((i) => i)
  );
};

const PreviewModal = ({ isOpen, onClose, resumeData, onDownload, downloadRef }) => {
  if (!isOpen) return null;

  const showEmptyState = !hasAnyContent(resumeData);

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full min-h-0">
        <div className="flex justify-between px-5 py-4 flex-shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-gray-800 text-sm font-medium shadow"
          >
            <LuX /> Close
          </button>
          <button
            onClick={onDownload}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600 text-white text-sm font-medium shadow"
          >
            <LuDownload /> Download PDF
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pb-10 min-h-0 flex justify-center">
          <div className="bg-white rounded-lg shadow-xl">
            {showEmptyState && (
              <div className="m-4 p-4 text-sm text-gray-600 border border-gray-200 rounded-lg">
                Your Profile and Contact details are filled in, but the rest of
                your resume (Experience, Education, Skills, etc.) is still
                empty — those sections won't appear until you add content in
                their steps.
              </div>
            )}
            <RenderResume
              ref={downloadRef}
              templateId={resumeData?.template?.templateId}
              resumeData={resumeData}
              colorPalette={resumeData?.template?.colorPalette}
              containerWidth={800}
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PreviewModal;