import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileInfoCard from "../Cards/ProfileInfoCard";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="nb-bar">
      <h1 className="nb-logo" onClick={() => navigate("/dashboard")}>
        Draft<span className="nb-logo-accent">ly</span>
      </h1>

      <ProfileInfoCard />

      <style>{`
        .nb-bar {
          position: sticky;
          top: 0;
          z-index: 30;
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1180px;
          margin: 0 auto;
          padding: 22px 24px 0;
          background: var(--paper, #faf7f0);
        }
        .nb-logo {
          font-family: var(--font-display, sans-serif);
          font-weight: 900;
          font-size: 1.35rem;
          letter-spacing: -0.02em;
          color: var(--ink, #16140f);
          cursor: pointer;
          margin: 0;
        }
        .nb-logo-accent { color: var(--signal, #ff4f1f); font-style: italic; }

        @media (max-width: 680px) {
          .nb-bar { padding: 16px 16px 0; }
          .nb-logo { font-size: 1.15rem; }
        }
      `}</style>
    </div>
  );
};

export default Navbar;