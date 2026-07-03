import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  LuArrowLeft,
  LuCircleAlert,
  LuDownload,
  LuPalette,
  LuSave,
  LuTrash2,
} from "react-icons/lu";

import toast from "react-hot-toast";
import { useReactToPrint } from "react-to-print";

// --- PLACEHOLDERS FOR COMPILATION (Replace with your actual import paths) ---
const axiosInstance = { get: async () => ({ data: {} }), post: async () => ({}) };
const API_PATHS = { RESUME: { GET_BY_ID: (id) => `/resume/${id}` } };
const DashboardLayout = ({ children }) => <div>{children}</div>;
const TitleInput = ({ title, setTitle }) => <input value={title} onChange={(e) => setTitle(e.target.value)} />;
// ----------------------------------------------------------------------------

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
      }
    ],
    education: [
      {
        degree: "",
        school: "",
        startDate: "", // e.g. "2018-09"
        endDate: "", // e.g. "2022-06"
        description: "",
      }
    ],
    skills: [
      {
        name: "",
        level: "", // e.g. "Beginner", "Expert"
      }
    ],
    projects: [
      {
        title: "",
        description: "",
        github: "",
        liveDemo: "",
      }
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

  // Validate Inputs
  const validateAndNext = (e) => {};

  // Function to navigate to the next page
  const goToNextStep = () => {};

  // Function to navigate to the previous page
  const goBack = () => {};

  const renderForm = () => {};

  // Update simple nested object (like profileInfo, contactInfo, etc.)
  const updateSection = (section, key, value) => {};

  // Update array item (like workExperience[0], skills[1], etc.)
  const updateArrayItem = (section, index, key, value) => {};

  // Add item to array
  const addArrayItem = (section, newItem) => {};

  // Remove item from array
  const removeArrayItem = (section, index) => {};

  // Fetch resume info by ID
  const fetchResumeDetailsById = async () => {
    try {
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
          workExperience: resumeInfo?.workExperience || prevState?.workExperience,
          education: resumeInfo?.education || prevState?.education,
          skills: resumeInfo?.skills || prevState?.skills,
          projects: resumeInfo?.projects || prevState?.projects,
          certifications: resumeInfo?.certifications || prevState?.certifications,
          languages: resumeInfo?.languages || prevState?.languages,
          interests: resumeInfo?.interests || prevState?.interests,
        }));
      }
    } catch (error) {
      console.error("Error fetching resume details:", error);
    }
  };

  // upload thumbnail and resume profile img
  const uploadResumeImages = async () => {};

  const updateResumeDetails = async (thumbnailLink, profilePreviewUrl) => {};

  // Delete Resume
  const handleDeleteResume = async () => {};

  // download resume
  const reactToPrintFn = useReactToPrint({ contentRef: resumeDownloadRef });

  // Function to update baseWidth based on the resume container size
  const updateBaseWidth = () => {};

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);

    if (resumeId) {
      fetchResumeDetailsById();
    }

    return () => {
      window.removeEventListener("resize", updateBaseWidth);
    };
  }, []);

  return (
    <DashboardLayout>
            <div className="container mx-auto">
        <div className="flex items-center justify-between gap-5 bg-white rounded-lg p-4 shadow-sm">
          {/* Top layout header contents go here */}
        </div>

        <div className="">
          <div className="">
            {renderForm()}

            <div className="">
              {errorMsg && (
                <div className="flex items-center gap-2 text-red-500">
                  <LuCircleAlert className="" /> {errorMsg}
                </div>
              )}
            </div>

            <div className="">
              <button
                className=""
                onClick={goBack}
                disabled={isLoading}
              >
        <LuArrowLeft className="" />
        Back
      </button>

      <button
        className=""
        onClick={uploadResumeImages}
        disabled={isLoading}
      >
        <LuSave className="" />
        {isLoading ? "Updating..." : "Save & Exit"}
      </button>

      <button
        className=""
        onClick={validateAndNext}
        disabled={isLoading}
      >
        {currentPage === "additionalInfo" && (

        )


              </button>
            </div>
          </div>
        </div>
      </div>

    </DashboardLayout>
  );
};

export default EditResume;
