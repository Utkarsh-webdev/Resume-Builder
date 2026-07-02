import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const CreateResumeForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateResume = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Please enter a resume title.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
        title,
      });

      if (response.data?._id) {
        navigate(`/resume/${response.data._id}`);
      } else if (response.data?.resume?._id) {
        navigate(`/resume/${response.data.resume._id}`);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-800">
        Create New Resume
      </h3>
      <p className="text-sm text-gray-500 mt-1 mb-4">
        Give your resume a title to get started. You can edit everything else
        later.
      </p>

      <form onSubmit={handleCreateResume}>
        <label className="text-sm font-medium text-gray-700">
          Resume Title
        </label>
        <input
          type="text"
          placeholder="e.g., Frontend Developer Resume"
          className="w-full mt-1 mb-3 px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-400 text-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-purple-500 hover:bg-purple-600 disabled:opacity-60 text-white text-sm font-medium py-2.5 rounded-lg transition"
        >
          {isLoading ? "Creating..." : "Create Resume"}
        </button>
      </form>
    </div>
  );
};

export default CreateResumeForm;