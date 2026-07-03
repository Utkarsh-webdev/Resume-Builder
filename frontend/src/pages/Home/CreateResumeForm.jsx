import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const CreateResumeForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
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

      const newId = response.data?._id || response.data?.resume?._id;
      if (newId) navigate(`/resume/${newId}`);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="cr-wrap">
      <span className="cr-eyebrow">NEW DRAFT</span>
      <h3 className="cr-title">Create New Resume</h3>
      <p className="cr-sub">
        Give it a title — you can change everything else later.
      </p>

      <form onSubmit={handleCreateResume}>
        <label className="cr-label">Resume Title</label>
        <input
          type="text"
          placeholder="e.g., Frontend Developer Resume"
          className="cr-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />

        {error && <p className="cr-error">{error}</p>}

        <button type="submit" disabled={isLoading} className="cr-btn">
          {isLoading ? "Creating..." : "Create Resume →"}
        </button>
      </form>

      <style>{`
        .cr-eyebrow {
          font-family: var(--font-mono, monospace);
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          color: var(--graphite, #6b6862);
          display: inline-block;
          padding: 5px 10px;
          border: 1px solid var(--line, #e4dfd3);
          border-radius: 999px;
          margin-bottom: 14px;
        }
        .cr-title {
          font-family: var(--font-display, sans-serif);
          font-weight: 900;
          font-size: 1.35rem;
          color: var(--ink, #16140f);
          margin: 0 0 8px;
        }
        .cr-sub {
          font-family: var(--font-body, sans-serif);
          font-size: 0.9rem;
          color: var(--graphite, #6b6862);
          margin: 0 0 22px;
          line-height: 1.5;
        }
        .cr-label {
          font-family: var(--font-body, sans-serif);
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--ink, #16140f);
        }
        .cr-input {
          width: 100%;
          margin: 8px 0 4px;
          padding: 13px 14px;
          font-family: var(--font-body, sans-serif);
          font-size: 1rem;
          border: 1.5px solid var(--line, #e4dfd3);
          border-radius: 10px;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s ease;
        }
        .cr-input:focus { border-color: var(--violet, #6c4fff); }
        .cr-error {
          font-family: var(--font-body, sans-serif);
          font-size: 0.8rem;
          color: var(--signal, #ff4f1f);
          margin: 6px 0 0;
        }
        .cr-btn {
          width: 100%;
          margin-top: 18px;
          padding: 14px;
          font-family: var(--font-body, sans-serif);
          font-weight: 700;
          font-size: 0.95rem;
          background: var(--signal, #ff4f1f);
          color: #fff;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          box-shadow: var(--shadow-soft, 0 8px 24px -8px rgba(0,0,0,0.15));
          transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
        }
        .cr-btn:disabled { opacity: 0.6; cursor: default; }
        .cr-btn:not(:disabled):hover { transform: translateY(-2px); box-shadow: var(--shadow-card, 0 20px 50px -15px rgba(0,0,0,0.25)); }
      `}</style>
    </div>
  );
};

export default CreateResumeForm;