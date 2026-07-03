import React, { useEffect, useState } from "react";
import { LuCirclePlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import Modal from "../../components/Modal";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ResumeSummaryCard from "../../components/Cards/ResumeSummaryCard";
import CreateResumeForm from "./CreateResumeForm";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allResumes, setAllResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllResumes = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);

      if (response.data.success) {
        setAllResumes(response.data.resumes || []);
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllResumes();
  }, []);

  return (
    <DashboardLayout>
      <div className="db-wrap">
        <div className="db-head">
          <span className="db-eyebrow">YOUR DRAFTS</span>
          <h2 className="db-title">Resumes</h2>
          {!isLoading && (
            <p className="db-count">
              {allResumes.length} {allResumes.length === 1 ? "resume" : "resumes"}
            </p>
          )}
        </div>

        <div className="db-grid">
          <div
            className="db-add-card"
            onClick={() => setOpenCreateModal(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setOpenCreateModal(true)}
          >
            <div className="db-add-icon">
              <LuCirclePlus />
            </div>
            <h3>Add New Resume</h3>
            <p>Start a fresh draft</p>
          </div>

          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="db-skeleton" />
            ))}

          {!isLoading &&
            allResumes?.map((resume) => (
              <ResumeSummaryCard
                key={resume._id}
                imgUrl={resume.thumbnailLink}
                title={resume.title}
                lastUpdated={
                  resume.updatedAt
                    ? moment(resume.updatedAt).format("Do MMM YYYY")
                    : ""
                }
                onSelect={() => navigate(`/resume/${resume._id}`)}
              />
            ))}
        </div>
      </div>

      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <div>
          <CreateResumeForm />
        </div>
      </Modal>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@700;800;900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');

        :root {
          --ink: #16140f;
          --paper: #faf7f0;
          --paper-2: #f1ecdf;
          --signal: #ff4f1f;
          --signal-dim: #ffe4d8;
          --violet: #6c4fff;
          --violet-dim: #ece6ff;
          --graphite: #6b6862;
          --line: #e4dfd3;
          --white: #ffffff;

          --font-display: "Archivo", "Arial Black", sans-serif;
          --font-body: "Inter", -apple-system, sans-serif;
          --font-mono: "JetBrains Mono", "Courier New", monospace;

          --radius-card: 20px;
          --radius-sm: 10px;
          --shadow-card: 0 20px 50px -15px rgba(22, 20, 15, 0.25);
          --shadow-soft: 0 8px 24px -8px rgba(22, 20, 15, 0.12);
        }

        .db-wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 40px 24px 96px;
        }

        .db-head {
          margin-bottom: 32px;
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 12px;
        }
        .db-eyebrow {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          color: var(--graphite);
          display: inline-block;
          padding: 6px 12px;
          border: 1px solid var(--line);
          border-radius: 999px;
          width: 100%;
          box-sizing: border-box;
          margin-bottom: 4px;
        }
        .db-title {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: clamp(1.7rem, 4vw, 2.6rem);
          letter-spacing: -0.02em;
          color: var(--ink);
          margin: 0;
        }
        .db-count {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--graphite);
          margin: 0 0 0 auto;
        }

        .db-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 24px;
        }
        @media (max-width: 1180px) { .db-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (max-width: 900px)  { .db-grid { grid-template-columns: repeat(3, 1fr); gap: 20px; } }
        @media (max-width: 680px)  { .db-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; } }
        @media (max-width: 420px)  { .db-grid { grid-template-columns: 1fr; } }

        .db-add-card {
          height: 280px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: var(--white);
          border: 1.5px dashed var(--line);
          border-radius: var(--radius-card);
          cursor: pointer;
          transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          padding: 16px;
          text-align: center;
        }
        .db-add-card:hover,
        .db-add-card:focus-visible {
          border-color: var(--signal);
          transform: translateY(-4px);
          box-shadow: var(--shadow-soft);
          outline: none;
        }
        .db-add-icon {
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--signal-dim);
          color: var(--signal);
          font-size: 1.35rem;
          margin-bottom: 4px;
          flex-shrink: 0;
        }
        .db-add-card h3 {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.98rem;
          color: var(--ink);
          margin: 0;
        }
        .db-add-card p {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--graphite);
          margin: 0;
        }

        .db-skeleton {
          height: 280px;
          border-radius: var(--radius-card);
          background: linear-gradient(90deg, var(--paper-2) 25%, #e9e3d4 37%, var(--paper-2) 63%);
          background-size: 400% 100%;
          animation: db-shimmer 1.4s ease infinite;
        }
        @keyframes db-shimmer {
          0% { background-position: 100% 50%; }
          100% { background-position: 0 50%; }
        }

        @media (max-width: 680px) {
          .db-wrap { padding: 24px 16px 64px; }
          .db-head { margin-bottom: 22px; }
          .db-add-card, .db-skeleton { height: 200px; }
        }
        @media (max-width: 420px) {
          .db-add-card, .db-skeleton { height: 180px; }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default Dashboard;