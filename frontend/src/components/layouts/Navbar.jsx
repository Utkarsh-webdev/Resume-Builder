import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileInfoCard from "../Cards/ProfileInfoCard";

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`nb-outer ${scrolled ? "nb-scrolled" : ""}`}>
      <div className="nb-bar">
        <h1
          className="nb-logo"
          onClick={() => navigate("/dashboard")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && navigate("/dashboard")}
        >
          Draft<span className="nb-logo-accent">ly</span>
        </h1>

        <ProfileInfoCard />
      </div>

      <style>{`
        .nb-outer {
          position: sticky;
          top: 0;
          z-index: 30;
          width: 100%;
          background: var(--paper, #faf7f0);
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .nb-outer.nb-scrolled {
          border-bottom-color: var(--line, #e4dfd3);
          background: rgba(250, 247, 240, 0.85);
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 16px -8px rgba(22, 20, 15, 0.08);
        }

        .nb-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1180px;
          margin: 0 auto;
          padding: 18px 24px;
        }

        .nb-logo {
          font-family: var(--font-display, sans-serif);
          font-weight: 900;
          font-size: 1.35rem;
          letter-spacing: -0.02em;
          color: var(--ink, #16140f);
          cursor: pointer;
          margin: 0;
          user-select: none;
          transition: opacity 0.15s ease;
        }
        .nb-logo:hover { opacity: 0.8; }
        .nb-logo:focus-visible {
          outline: 2px solid var(--violet, #6c4fff);
          outline-offset: 4px;
          border-radius: 4px;
        }
        .nb-logo-accent { color: var(--signal, #ff4f1f); font-style: italic; }

        @media (max-width: 680px) {
          .nb-bar { padding: 14px 16px; }
          .nb-logo { font-size: 1.15rem; }
        }
      `}</style>
    </div>
  );
};

export default Navbar;