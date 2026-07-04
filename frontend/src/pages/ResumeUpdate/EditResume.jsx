import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import {
  LuArrowLeft,
  LuCircleAlert,
  LuDownload,
  LuPalette,
  LuSave,
  LuTrash2,
} from "react-icons/lu";

import toast from "react-hot-toast";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import TitleInput from "../../components/inputs/TitleInput";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const EditResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);

  const [openThemeSelector, setOpenThemeSelector] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);

  const [currentPage, setCurrentPage] = useState("profile-info");
  const [progress, setProgress] = useState(0);

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
    template: {
      theme: "",
      colorPalette: "",
    },
    contactInfo: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: "",
    },
    workExperience: [
      {
        company: "",
        role: "",
        startDate: "", // e.g. "2022-01"
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        degree: "",
        school: "",
        startDate: "", // e.g. "2018-09"
        endDate: "", // e.g. "2022-06"
        description: "",
      },
    ],
    skills: [
      {
        name: "",
        level: "", // e.g. "Beginner", "Expert"
      },
    ],
    projects: [
      {
        title: "",
        description: "",
        github: "",
        liveDemo: "",
      },
    ],
    certifications: [
      {
        title: "",
        issuer: "",
        year: "",
      },
    ],
    languages: [
      {
        name: "",
        progress: 0, // percentage value (0-100)
      },
    ],
    interests: [""],
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch resume info by ID
  const fetchResumeDetailsById = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        API_PATHS.RESUME.GET_BY_ID(resumeId)
      );

      if (response.data && response.data.profileInfo) {
        const resumeInfo = response.data;

        setResumeData((prevState) => ({
          ...prevState,
          title: resumeInfo?.title || "Untitled",
          template: resumeInfo?.template || prevState?.template,
          profileInfo: resumeInfo?.profileInfo || prevState?.profileInfo,
          contactInfo: resumeInfo?.contactInfo || prevState?.contactInfo,
          workExperience:
            resumeInfo?.workExperience || prevState?.workExperience,
          education: resumeInfo?.education || prevState?.education,
          skills: resumeInfo?.skills || prevState?.skills,
          projects: resumeInfo?.projects || prevState?.projects,
          certifications:
            resumeInfo?.certifications || prevState?.certifications,
          languages: resumeInfo?.languages || prevState?.languages,
          interests: resumeInfo?.interests || prevState?.interests,
        }));
      }
    } catch (error) {
      console.error("Error fetching resume details:", error);
      toast.error("Could not load this resume.");
    } finally {
      setIsLoading(false);
    }
  };

  // Save resume
  const updateResumeDetails = async () => {
    try {
      setIsSaving(true);
      const response = await axiosInstance.put(
        API_PATHS.RESUME.UPDATE(resumeId),
        resumeData
      );

      if (response.data) {
        toast.success("Resume saved successfully.");
      }
    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error("Could not save resume.");
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Resume
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

  // download resume
  const reactToPrintFn = useReactToPrint({
    contentRef: resumeDownloadRef,
    documentTitle: resumeData.title || "Resume",
  });

  // Function to update baseWidth based on the resume container size
  const updateBaseWidth = () => {
    if (resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth);
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
              setResumeData((prevState) => ({
                ...prevState,
                title: value,
              }))
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
              onClick={updateResumeDetails}
              disabled={isSaving}
            >
              <LuSave className="text-base" />
              <span>{isSaving ? "Saving..." : "Save"}</span>
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="flex items-center gap-2 mt-4 text-red-600 text-sm">
            <LuCircleAlert className="text-base" />
            <span>{errorMsg}</span>
          </div>
        )}

        {isLoading && (
          <p className="mt-6 text-sm text-gray-500">Loading resume...</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EditResume;