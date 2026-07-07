import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { toBlob } from "html-to-image";

import {
  LuArrowLeft,
  LuArrowRight,
  LuCircleAlert,
  LuDownload,
  LuPalette,
  LuSave,
  LuTrash2,
} from "react-icons/lu";

import toast from "react-hot-toast";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import TitleInput from "../../components/inputs/TitleInput";
import StepProgress from "../../components/StepProgress";

import ProfileInfoForm from "./Forms/ProfileInfoForm";
import ContactInfoForm from "./Forms/ContactInfoForm";
import WorkExperienceForm from "./Forms/WorkExperienceForm";
import EducationForm from "./Forms/EducationForm";
import SkillsForm from "./Forms/SkillsForm";
import ProjectsForm from "./Forms/ProjectsForm";
import CertificationsForm from "./Forms/CertificationsForm";
import LanguagesForm from "./Forms/LanguagesForm";
import InterestsForm from "./Forms/InterestsForm";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

import ThemeSelector from "../../components/ResumeSections/ThemeSelector";
import PreviewModal from "../../components/ResumeSections/PreviewModal";
import RenderResume from "../../components/ResumeTamplates/RenderResume";

const STEPS = [
  "profile-info",
  "contact-info",
  "work-experience",
  "education",
  "skills",
  "projects",
  "certifications",
  "languages",
  "interests",
];

const EditResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const resumeRef = useRef(null); // hidden, off-screen — used for thumbnail capture
  const livePreviewRef = useRef(null); // visible side panel — for width measurement
  const resumeDownloadRef = useRef(null); // used by react-to-print inside PreviewModal

  const [baseWidth, setBaseWidth] = useState(800);

  const [openThemeSelector, setOpenThemeSelector] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);

  const [currentPage, setCurrentPage] = useState("profile-info");

  const [resumeData, setResumeData] = useState({
    title: "",
    thumbnailLink: "",
    profileInfo: {
      profileImg: null,
      profilePreviewUrl: "",
      fullName: "",
      designation: "",
      summary: "",
    },
    template: { templateId: "01", theme: "classic", colorPalette: "Signal" },
    contactInfo: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      leetcode: "",
      website: "",
    },
    workExperience: [
      { company: "", role: "", startDate: "", endDate: "", description: "" },
    ],
    education: [
      { degree: "", school: "", startDate: "", endDate: "", description: "" },
    ],
    skills: [{ name: "", level: "" }],
    projects: [{ title: "", description: "", github: "", liveDemo: "" }],
    certifications: [{ title: "", issuer: "", year: "" }],
    languages: [{ name: "", progress: 0 }],
    interests: [""],
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Local-only preview URL for a freshly-picked photo, used purely for
  // rendering (Live Preview + hidden thumbnail capture). Never sent to the
  // backend — a real server URL only ever lands in resumeData.profileInfo
  // .profilePreviewUrl after a successful upload in uploadResumeImages().
  const [localPhotoPreview, setLocalPhotoPreview] = useState("");

  useEffect(() => {
    const file = resumeData.profileInfo.profileImg;
    if (file instanceof File) {
      const objectUrl = URL.createObjectURL(file);
      setLocalPhotoPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    setLocalPhotoPreview("");
  }, [resumeData.profileInfo.profileImg]);

  const currentIndex = STEPS.indexOf(currentPage);
  const progress = Math.round(((currentIndex + 1) / STEPS.length) * 100);

  // ---- generic section/array updaters ----
  const updateSection = (section, key, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  const updateArrayItem = (section, index, key, value) => {
    setResumeData((prev) => {
      const list = [...prev[section]];
      list[index] = key === null ? value : { ...list[index], [key]: value };
      return { ...prev, [section]: list };
    });
  };

  const addArrayItem = (section, newItem) => {
    setResumeData((prev) => ({ ...prev, [section]: [...prev[section], newItem] }));
  };

  const removeArrayItem = (section, index) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  // Builds a clean, JSON-safe copy of resumeData — strips the non-serializable
  // File object (profileImg) so it's never sent in a JSON body to the server.
  const getSerializableResumeData = () => {
    const { profileImg, ...restProfileInfo } = resumeData.profileInfo;
    return { ...resumeData, profileInfo: restProfileInfo };
  };

  // ---- step navigation ----
  const validateAndNext = () => {
    if (currentPage === "profile-info") {
      if (!resumeData.profileInfo.fullName?.trim()) {
        setErrorMsg("Full name is required.");
        return;
      }
      if (!resumeData.profileInfo.designation?.trim()) {
        setErrorMsg("Designation is required.");
        return;
      }
    }
    if (currentPage === "contact-info") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(resumeData.contactInfo.email || "")) {
        setErrorMsg("Enter a valid email.");
        return;
      }
    }

    setErrorMsg("");

    if (currentIndex === STEPS.length - 1) {
      setOpenPreviewModal(true);
      return;
    }

    setCurrentPage(STEPS[currentIndex + 1]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    if (currentIndex === 0) {
      navigate("/dashboard");
      return;
    }
    setCurrentPage(STEPS[currentIndex - 1]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---- persistence ----
  const fetchResumeDetailsById = async () => {
    try {
      setIsLoading(true);

      const response = await axiosInstance.get(
        API_PATHS.RESUME.GET_BY_ID(resumeId)
      );

      if (response.data.success) {
        const resumeInfo = response.data.resume;

        setResumeData((prev) => ({
          ...prev,
          title: resumeInfo.title || "Untitled Resume",
          thumbnailLink: resumeInfo.thumbnailLink || "",
          template: resumeInfo.template || prev.template,
          profileInfo: {
            ...prev.profileInfo,
            ...resumeInfo.profileInfo,
          },
          contactInfo: resumeInfo.contactInfo || prev.contactInfo,
          workExperience: resumeInfo.workExperience || [],
          education: resumeInfo.education || [],
          skills: resumeInfo.skills || [],
          projects: resumeInfo.projects || [],
          certifications: resumeInfo.certifications || [],
          languages: resumeInfo.languages || [],
          interests: resumeInfo.interests || [],
        }));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load resume");
    } finally {
      setIsLoading(false);
    }
  };

  // Saves the resume, then navigates back to the dashboard.
  // thumbnailLink / profilePreviewUrl are optional overrides — pass the
  // freshly-uploaded values right after an image upload; otherwise the
  // current state values are used as-is.
  const updateResumeDetails = async (thumbnailLink, profilePreviewUrl) => {
    try {
      setIsSaving(true);

      const cleanData = getSerializableResumeData();
      const payload = {
        ...cleanData,
        thumbnailLink: thumbnailLink ?? resumeData.thumbnailLink,
        profileInfo: {
          ...cleanData.profileInfo,
          profilePreviewUrl: profilePreviewUrl ?? resumeData.profileInfo.profilePreviewUrl,
        },
      };

      const response = await axiosInstance.put(
        API_PATHS.RESUME.UPDATE(resumeId),
        payload
      );

      if (response.data.success) {
        toast.success("Resume updated successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error("Could not save resume.");
    } finally {
      setIsSaving(false);
    }
  };

  // Saves without navigating away — used by the top "Save" button, so the
  // user can keep editing instead of being sent back to the dashboard.
  const saveResumeInPlace = async () => {
    try {
      setIsSaving(true);

      const payload = {
        ...getSerializableResumeData(),
        title: resumeData.title || "Untitled Resume",
      };

      const response = await axiosInstance.put(
        API_PATHS.RESUME.UPDATE(resumeId),
        payload
      );

      if (response.data.success) {
        toast.success("Resume updated successfully");
      }
    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error("Could not save resume.");
    } finally {
      setIsSaving(false);
    }
  };

  // Captures a thumbnail snapshot from the hidden RenderResume instance via
  // html-to-image, uploads it (and a new profile photo, if any) to
  // PUT /api/resume/:id/upload-images, then saves the rest of the resume
  // and navigates to the dashboard.
  const uploadResumeImages = async () => {
    try {
      setIsLoading(true);

      const { profileImg } = resumeData.profileInfo;
      const profileImageFile = profileImg instanceof File ? profileImg : null;

      let thumbnailFile = null;
      if (resumeRef.current) {
        try {
          const blob = await toBlob(resumeRef.current, {
            cacheBust: true,
            pixelRatio: 1,
            backgroundColor: "#ffffff",
          });
          if (blob) thumbnailFile = new File([blob], "thumbnail.png", { type: "image/png" });
        } catch (captureError) {
          // Thumbnail generation failing (e.g. a broken image reference)
          // should never block saving the resume itself.
          console.warn("Thumbnail capture failed, saving without a new thumbnail:", captureError);
        }
      }

      let thumbnailLink = resumeData.thumbnailLink;
      let profilePreviewUrl = resumeData.profileInfo.profilePreviewUrl;

      if (thumbnailFile || profileImageFile) {
        const formData = new FormData();
        if (thumbnailFile) formData.append("thumbnail", thumbnailFile);
        if (profileImageFile) formData.append("profileImage", profileImageFile);

        const uploadResponse = await axiosInstance.put(
          API_PATHS.RESUME.UPLOAD_IMAGES(resumeId),
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        thumbnailLink = uploadResponse.data.thumbnailLink || thumbnailLink;
        profilePreviewUrl = uploadResponse.data.profilePreviewUrl || profilePreviewUrl;
      }

      await updateResumeDetails(thumbnailLink, profilePreviewUrl);
    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error("Failed to save resume");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteResume = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume? This cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      setIsDeleting(true);
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeId));
      toast.success("Resume deleted.");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error("Could not delete resume.");
    } finally {
      setIsDeleting(false);
    }
  };

  const reactToPrintFn = useReactToPrint({
    contentRef: resumeDownloadRef,
    documentTitle: resumeData.title || "Resume",
  });

  const updateBaseWidth = () => {
    if (livePreviewRef.current) {
      setBaseWidth(livePreviewRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);

    if (resumeId) {
      fetchResumeDetailsById();
    }

    return () => {
      window.removeEventListener("resize", updateBaseWidth);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeId]);

  const renderForm = () => {
    switch (currentPage) {
      case "profile-info":
        return (
          <ProfileInfoForm
            data={resumeData.profileInfo}
            onChange={(k, v) => updateSection("profileInfo", k, v)}
          />
        );
      case "contact-info":
        return (
          <ContactInfoForm
            data={resumeData.contactInfo}
            onChange={(k, v) => updateSection("contactInfo", k, v)}
          />
        );
      case "work-experience":
        return (
          <WorkExperienceForm
            items={resumeData.workExperience}
            onUpdate={(i, k, v) => updateArrayItem("workExperience", i, k, v)}
            onAdd={(item) => addArrayItem("workExperience", item)}
            onRemove={(i) => removeArrayItem("workExperience", i)}
          />
        );
      case "education":
        return (
          <EducationForm
            items={resumeData.education}
            onUpdate={(i, k, v) => updateArrayItem("education", i, k, v)}
            onAdd={(item) => addArrayItem("education", item)}
            onRemove={(i) => removeArrayItem("education", i)}
          />
        );
      case "skills":
        return (
          <SkillsForm
            items={resumeData.skills}
            onUpdate={(i, k, v) => updateArrayItem("skills", i, k, v)}
            onAdd={(item) => addArrayItem("skills", item)}
            onRemove={(i) => removeArrayItem("skills", i)}
          />
        );
      case "projects":
        return (
          <ProjectsForm
            items={resumeData.projects}
            onUpdate={(i, k, v) => updateArrayItem("projects", i, k, v)}
            onAdd={(item) => addArrayItem("projects", item)}
            onRemove={(i) => removeArrayItem("projects", i)}
          />
        );
      case "certifications":
        return (
          <CertificationsForm
            items={resumeData.certifications}
            onUpdate={(i, k, v) => updateArrayItem("certifications", i, k, v)}
            onAdd={(item) => addArrayItem("certifications", item)}
            onRemove={(i) => removeArrayItem("certifications", i)}
          />
        );
      case "languages":
        return (
          <LanguagesForm
            items={resumeData.languages}
            onUpdate={(i, k, v) => updateArrayItem("languages", i, k, v)}
            onAdd={(item) => addArrayItem("languages", item)}
            onRemove={(i) => removeArrayItem("languages", i)}
          />
        );
      case "interests":
        return (
          <InterestsForm
            items={resumeData.interests}
            onUpdate={(i, v) => updateArrayItem("interests", i, null, v)}
            onAdd={(item) => addArrayItem("interests", item)}
            onRemove={(i) => removeArrayItem("interests", i)}
          />
        );
      default:
        return null;
    }
  };

  const isLastStep = currentIndex === STEPS.length - 1;

  // Used only for rendering (Live Preview + hidden thumbnail capture) — shows
  // the freshly picked photo immediately, before it's uploaded/saved.
  const previewResumeData = {
    ...resumeData,
    profileInfo: {
      ...resumeData.profileInfo,
      profilePreviewUrl: localPhotoPreview || resumeData.profileInfo.profilePreviewUrl,
    },
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 px-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <button
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800"
            onClick={() => navigate("/dashboard")}
          >
            <LuArrowLeft />
            <span>Back</span>
          </button>

          <TitleInput
            title={resumeData.title}
            setTitle={(value) =>
              setResumeData((prevState) => ({ ...prevState, title: value }))
            }
          />

          <div className="flex items-center gap-3">
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700"
              onClick={() => setOpenThemeSelector(true)}
            >
              <LuPalette className="text-base" />
              <span>Change Theme</span>
            </button>

            <button
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-red-100 hover:text-red-600 text-sm font-medium text-gray-700 disabled:opacity-50"
              onClick={handleDeleteResume}
              disabled={isDeleting}
            >
              <LuTrash2 className="text-base" />
              <span>{isDeleting ? "Deleting..." : "Delete"}</span>
            </button>

            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-sm font-medium text-white"
              onClick={() => setOpenPreviewModal(true)}
            >
              <LuDownload className="text-base" />
              <span>Preview & Download</span>
            </button>

            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-purple-600 text-purple-600 hover:bg-purple-50 text-sm font-medium disabled:opacity-50"
              onClick={saveResumeInPlace}
              disabled={isSaving}
            >
              <LuSave className="text-base" />
              <span>{isSaving ? "Saving..." : "Save"}</span>
            </button>
          </div>
        </div>

        <StepProgress
          progress={progress}
          currentPage={currentPage}
          stepNumber={currentIndex + 1}
          totalSteps={STEPS.length}
        />

        {errorMsg && (
          <div className="flex items-center gap-2 mt-2 mb-2 text-red-600 text-sm">
            <LuCircleAlert className="text-base" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form + live preview side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            {isLoading ? (
              <p className="text-sm text-gray-500">Loading resume...</p>
            ) : (
              renderForm()
            )}
          </div>

          {/* Live preview panel — updates instantly as you type */}
          <div className="hidden lg:block">
            <div className="sticky top-4">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                Live Preview
              </p>
              <div
                ref={livePreviewRef}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                style={{ maxHeight: "75vh", overflowY: "auto" }}
              >
                <RenderResume
                  templateId={resumeData.template?.templateId}
                  resumeData={previewResumeData}
                  colorPalette={resumeData.template?.colorPalette}
                  containerWidth={baseWidth}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="flex items-center justify-between gap-3 mt-6 flex-wrap">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700 disabled:opacity-50"
            onClick={goBack}
            disabled={isLoading}
          >
            <LuArrowLeft className="text-base" />
            Back
          </button>

          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-purple-600 text-purple-600 hover:bg-purple-50 text-sm font-medium disabled:opacity-50"
            onClick={uploadResumeImages}
            disabled={isLoading}
          >
            <LuSave className="text-base" />
            {isLoading ? "Updating..." : "Save & Exit"}
          </button>

          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-sm font-medium text-white disabled:opacity-50"
            onClick={validateAndNext}
            disabled={isLoading}
          >
            {isLastStep ? (
              <>
                <LuDownload className="text-base" />
                Preview & Download
              </>
            ) : (
              <>
                Next
                <LuArrowRight className="text-base" />
              </>
            )}
          </button>
        </div>

        {/* Hidden, off-screen instance used only for html-to-image thumbnail
            capture. Positioned off-canvas rather than display:none, since
            hidden elements produce blank/empty captures. */}
        <div style={{ position: "fixed", top: 0, left: "-9999px", zIndex: -1 }}>
          <RenderResume
            ref={resumeRef}
            templateId={resumeData.template?.templateId}
            resumeData={previewResumeData}
            colorPalette={resumeData.template?.colorPalette}
            containerWidth={800}
          />
        </div>
      </div>

      <ThemeSelector
        isOpen={openThemeSelector}
        onClose={() => setOpenThemeSelector(false)}
        template={resumeData.template}
        onUpdate={(template) => setResumeData((prev) => ({ ...prev, template }))}
      />

      <PreviewModal
        isOpen={openPreviewModal}
        onClose={() => setOpenPreviewModal(false)}
        resumeData={previewResumeData}
        onDownload={reactToPrintFn}
        downloadRef={resumeDownloadRef}
      />
    </DashboardLayout>
  );
};

export default EditResume;