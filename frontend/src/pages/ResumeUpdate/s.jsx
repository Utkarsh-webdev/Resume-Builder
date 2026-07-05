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

import ThemeSelector from "../../components/ResumeSections/ThemeSelector";
import PreviewModal from "../../components/ResumeSections/PreviewModal";
import RenderResume from "../../components/ResumeTemplates/RenderResume";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

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

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);
  const livePreviewRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);

  const [openThemeSelector, setOpenThemeSelector] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);

  const [currentPage, setCurrentPage] = useState("profile-info");

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const [resumeData, setResumeData] = useState({
    title: "Untitled Resume",
    thumbnailLink: "",

    template: {
      templateId: "01",
      theme: "classic",
      colorPalette: "Signal",
    },

    profileInfo: {
      profileImg: null,
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
      leetcode: "",
      website: "",
    },

    workExperience: [],

    education: [],

    skills: [],

    projects: [],

    certifications: [],

    languages: [],

    interests: [],
  });

  const currentStep = STEPS.indexOf(currentPage);
  const progress = Math.round(((currentStep + 1) / STEPS.length) * 100);

  const getSerializableResumeData = () => {
    const { profileImg, ...profileInfo } = resumeData.profileInfo;

    return {
      ...resumeData,
      profileInfo,
    };
  };

  const updateSection = (section, key, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const updateArrayItem = (section, index, key, value) => {
    setResumeData((prev) => {
      const arr = [...prev[section]];

      arr[index] =
        key === null
          ? value
          : {
              ...arr[index],
              [key]: value,
            };

      return {
        ...prev,
        [section]: arr,
      };
    });
  };

  const addArrayItem = (section, item) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], item],
    }));
  };

  const removeArrayItem = (section, index) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const fetchResumeDetailsById = async () => {
    try {
      setIsLoading(true);

      const { data } = await axiosInstance.get(
        API_PATHS.RESUME.GET_BY_ID(resumeId)
      );

      if (data.success) {
        const resume = data.resume;

        setResumeData({
          title: resume.title || "Untitled Resume",
          thumbnailLink: resume.thumbnailLink || "",

          template: resume.template,

          profileInfo: {
            ...resume.profileInfo,
            profileImg: null,
          },

          contactInfo: resume.contactInfo,

          workExperience: resume.workExperience || [],
          education: resume.education || [],
          skills: resume.skills || [],
          projects: resume.projects || [],
          certifications: resume.certifications || [],
          languages: resume.languages || [],
          interests: resume.interests || [],
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Unable to load resume.");
    } finally {
      setIsLoading(false);
    }
  };

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
  }, [resumeId]);

    // -----------------------------
  // VALIDATION
  // -----------------------------
  const validateAndNext = () => {
    setErrorMsg("");

    switch (currentPage) {
      case "profile-info":
        if (!resumeData.profileInfo.fullName.trim()) {
          return setErrorMsg("Full Name is required.");
        }
        break;

      case "contact-info":
        if (!resumeData.contactInfo.email.trim()) {
          return setErrorMsg("Email is required.");
        }
        break;

      default:
        break;
    }

    goToNextStep();
  };

  // -----------------------------
  // STEP NAVIGATION
  // -----------------------------
  const goToNextStep = () => {
    const currentIndex = STEPS.indexOf(currentPage);

    if (currentIndex < STEPS.length - 1) {
      setCurrentPage(STEPS[currentIndex + 1]);
    }
  };

  const goBack = () => {
    const currentIndex = STEPS.indexOf(currentPage);

    if (currentIndex > 0) {
      setCurrentPage(STEPS[currentIndex - 1]);
    }
  };

  // -----------------------------
  // SAVE RESUME
  // -----------------------------
  const updateResumeDetails = async (
    thumbnailLink = resumeData.thumbnailLink,
    profilePreviewUrl = resumeData.profileInfo.profilePreviewUrl
  ) => {
    try {
      setIsSaving(true);

      const payload = {
        ...getSerializableResumeData(),

        title: resumeData.title || "Untitled Resume",

        thumbnailLink,

        profileInfo: {
          ...resumeData.profileInfo,
          profilePreviewUrl,
        },
      };

      const { data } = await axiosInstance.put(
        API_PATHS.RESUME.UPDATE(resumeId),
        payload
      );

      if (data.success) {
        toast.success("Resume Updated Successfully");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Update Resume Error:", err);
      toast.error("Failed to update resume.");
    } finally {
      setIsSaving(false);
    }
  };

  // -----------------------------
  // GENERATE THUMBNAIL
  // -----------------------------
  const uploadResumeImages = async () => {
    try {
      let thumbnailLink = resumeData.thumbnailLink;

      if (resumeRef.current) {
        const blob = await toBlob(resumeRef.current, {
          cacheBust: true,
          pixelRatio: 2,
          backgroundColor: "#ffffff",
        });

        if (blob) {
          thumbnailLink = URL.createObjectURL(blob);
        }
      }

      await updateResumeDetails(
        thumbnailLink,
        resumeData.profileInfo.profilePreviewUrl
      );
    } catch (err) {
      console.error(err);
      toast.error("Unable to save resume.");
    }
  };

  // -----------------------------
  // DELETE
  // -----------------------------
  const handleDeleteResume = async () => {
    const confirmDelete = window.confirm(
      "Delete this resume permanently?"
    );

    if (!confirmDelete) return;

    try {
      setIsDeleting(true);

      const { data } = await axiosInstance.delete(
        API_PATHS.RESUME.DELETE(resumeId)
      );

      if (data.success) {
        toast.success("Resume Deleted");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      toast.error("Delete failed.");
    } finally {
      setIsDeleting(false);
    }
  };

  // -----------------------------
  // DOWNLOAD
  // -----------------------------
  const reactToPrintFn = useReactToPrint({
    contentRef: resumeDownloadRef,
    documentTitle:
      resumeData.title || "Resume",
  });

  // ----------------------------------------
// RENDER CURRENT FORM
// ----------------------------------------
const renderForm = () => {
  switch (currentPage) {
    case "profile-info":
      return (
        <ProfileInfoForm
          data={resumeData.profileInfo}
          updateSection={updateSection}
        />
      );

    case "contact-info":
      return (
        <ContactInfoForm
          data={resumeData.contactInfo}
          updateSection={updateSection}
        />
      );

    case "work-experience":
      return (
        <WorkExperienceForm
          data={resumeData.workExperience}
          updateArrayItem={updateArrayItem}
          addArrayItem={addArrayItem}
          removeArrayItem={removeArrayItem}
        />
      );

    case "education":
      return (
        <EducationForm
          data={resumeData.education}
          updateArrayItem={updateArrayItem}
          addArrayItem={addArrayItem}
          removeArrayItem={removeArrayItem}
        />
      );

    case "skills":
      return (
        <SkillsForm
          data={resumeData.skills}
          updateArrayItem={updateArrayItem}
          addArrayItem={addArrayItem}
          removeArrayItem={removeArrayItem}
        />
      );

    case "projects":
      return (
        <ProjectsForm
          data={resumeData.projects}
          updateArrayItem={updateArrayItem}
          addArrayItem={addArrayItem}
          removeArrayItem={removeArrayItem}
        />
      );

    case "certifications":
      return (
        <CertificationsForm
          data={resumeData.certifications}
          updateArrayItem={updateArrayItem}
          addArrayItem={addArrayItem}
          removeArrayItem={removeArrayItem}
        />
      );

    case "languages":
      return (
        <LanguagesForm
          data={resumeData.languages}
          updateArrayItem={updateArrayItem}
          addArrayItem={addArrayItem}
          removeArrayItem={removeArrayItem}
        />
      );

    case "interests":
      return (
        <InterestsForm
          data={resumeData.interests}
          updateArrayItem={updateArrayItem}
          addArrayItem={addArrayItem}
          removeArrayItem={removeArrayItem}
        />
      );

    default:
      return null;
  }
};

return (
  <DashboardLayout>
    <div className="container mx-auto py-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <TitleInput
          title={resumeData.title}
          setTitle={(value) =>
            setResumeData((prev) => ({
              ...prev,
              title: value,
            }))
          }
        />

        <div className="flex gap-3">

          <button
            onClick={() => setOpenThemeSelector(true)}
            className="px-4 py-2 rounded-lg border flex items-center gap-2 hover:bg-gray-50"
          >
            <LuPalette />
            Theme
          </button>

          <button
            onClick={handleDeleteResume}
            className="px-4 py-2 rounded-lg border border-red-300 text-red-600 flex items-center gap-2 hover:bg-red-50"
          >
            <LuTrash2 />
            Delete
          </button>

          <button
            onClick={() => setOpenPreviewModal(true)}
            className="px-4 py-2 rounded-lg bg-primary text-white flex items-center gap-2"
          >
            <LuDownload />
            Preview
          </button>

        </div>

      </div>

      {/* Progress */}
      <div className="mb-6">
        <StepProgress progress={progress} />
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-12 gap-6">

        {/* Left */}
        <div className="col-span-5 bg-white rounded-xl shadow p-6">

          {renderForm()}

          {errorMsg && (
            <div className="mt-5 flex items-center gap-2 text-red-600 text-sm">
              <LuCircleAlert />
              {errorMsg}
            </div>
          )}

          <div className="flex justify-between mt-8">

            <button
              onClick={goBack}
              disabled={currentStep === 0}
              className="px-5 py-2 rounded-lg border flex items-center gap-2"
            >
              <LuArrowLeft />
              Back
            </button>

            <div className="flex gap-3">

              <button
                onClick={uploadResumeImages}
                disabled={isSaving}
                className="px-5 py-2 rounded-lg border flex items-center gap-2"
              >
                <LuSave />
                {isSaving ? "Saving..." : "Save"}
              </button>

              <button
                onClick={
                  currentStep === STEPS.length - 1
                    ? uploadResumeImages
                    : validateAndNext
                }
                className="px-5 py-2 rounded-lg bg-primary text-white flex items-center gap-2"
              >
                {currentStep === STEPS.length - 1 ? (
                  "Finish"
                ) : (
                  <>
                    Next
                    <LuArrowRight />
                  </>
                )}
              </button>

            </div>

          </div>

        </div>

        {/* Right Preview */}
        <div
          className="col-span-7"
          ref={livePreviewRef}
        >
          <div
            ref={resumeRef}
            className="sticky top-6 rounded-xl bg-white shadow overflow-hidden"
          >
            <RenderResume
              ref={resumeDownloadRef}
              templateId={resumeData.template.theme}
              colorPalette={resumeData.template.colorPalette}
              resumeData={resumeData}
              containerWidth={baseWidth}
            />
          </div>
        </div>

      </div>

    </div>

          {/* Theme Selector */}
      <ThemeSelector
        open={openThemeSelector}
        onClose={() => setOpenThemeSelector(false)}
        selectedTheme={resumeData.template.templateId}
        selectedColor={resumeData.template.colorPalette}
        onSelectTheme={(templateId) =>
          setResumeData((prev) => ({
            ...prev,
            template: {
              ...prev.template,
              templateId,
            },
          }))
        }
        onSelectColor={(colorPalette) =>
          setResumeData((prev) => ({
            ...prev,
            template: {
              ...prev.template,
              colorPalette,
            },
          }))
        }
      />

      {/* Preview Modal */}
      <PreviewModal
        open={openPreviewModal}
        onClose={() => setOpenPreviewModal(false)}
        onDownload={reactToPrintFn}
      >
        <div ref={resumeDownloadRef}>
          <RenderResume
            templateId={resumeData.template.templateId}
            resumeData={resumeData}
            colorPalette={resumeData.template.colorPalette}
            containerWidth={800}
          />
        </div>
      </PreviewModal>

      {/* Hidden Resume for Thumbnail */}
      <div
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: "800px",
          background: "#fff",
          zIndex: -1,
        }}
      >
        <div ref={resumeRef}>
          <RenderResume
            templateId={resumeData.template.templateId}
            resumeData={resumeData}
            colorPalette={resumeData.template.colorPalette}
            containerWidth={800}
          />
        </div>
      </div>

    </DashboardLayout>
  );
};

export default EditResume;