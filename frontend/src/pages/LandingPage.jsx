import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../components/Modal";
import Login from "./Auth/Login";
import Signup from "./Auth/SignUp";
import { UserContext } from "../components/context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const openAuth = (page) => {
    setCurrentPage(page);
    setOpenAuthModal(true);
  };

  const handleCTA = () => {
    navigate("/dashboard");
  };

  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh" }}>
      {/* ===== Header ===== */}
      <header className="lp-header">
        <h1 className="lp-logo" onClick={() => navigate("/")}>
          Draft<span className="lp-logo-accent">ly</span>
        </h1>

        {user ? (
          <ProfileInfoCard />
        ) : (
          <button className="lp-btn-ghost" onClick={() => openAuth("login")}>
            Log in
          </button>
        )}
      </header>

      {/* ===== Hero ===== */}
      <section className="lp-hero">
        <div className="lp-hero-copy">
          <span className="lp-eyebrow">RESUME BUILDER</span>

          <h2 className="lp-headline">
            Your resume,
            <br />
            <span className="lp-headline-accent">drafted</span> to land
            the job.
          </h2>

          <p className="lp-subcopy">
            Pick a layout, fill it in, and get a clean, ATS-ready PDF —
            no design degree required.
          </p>

          <div className="lp-cta-row">
            <button className="lp-btn-primary" onClick={handleCTA}>
              Start your draft →
            </button>
            <button
              className="lp-btn-text"
              onClick={() => openAuth("signup")}
            >
              Create a free account
            </button>
          </div>
        </div>

        {/* Signature element: fanned resume cards on a desk */}
        <div className="lp-hero-art" aria-hidden="true">
          <div className="lp-card lp-card-back">
            <div className="lp-card-line" style={{ width: "60%" }} />
            <div className="lp-card-line" style={{ width: "85%" }} />
            <div className="lp-card-line" style={{ width: "40%" }} />
          </div>

          <div className="lp-card lp-card-mid">
            <div className="lp-card-bar" />
            <div className="lp-card-line" style={{ width: "70%" }} />
            <div className="lp-card-line" style={{ width: "90%" }} />
          </div>

          <div className="lp-card lp-card-front">
            <div className="lp-card-avatar" />
            <div className="lp-card-name">Jordan Lee</div>
            <div className="lp-card-role">Product Designer</div>
            <div className="lp-card-rule" />
            <div className="lp-card-line" style={{ width: "95%" }} />
            <div className="lp-card-line" style={{ width: "80%" }} />
            <div className="lp-card-line" style={{ width: "88%" }} />
          </div>

          <div className="lp-badge">ATS&#8209;READY ✓</div>
        </div>
      </section>

      {/* ===== Feature strip (swatches, not numbers) ===== */}
      <section className="lp-features">
        <div className="lp-feature">
          <span className="lp-swatch lp-swatch-signal" />
          <h3>Templates that don't look templated</h3>
          <p>Layouts built by designers, not generated from a form.</p>
        </div>

        <div className="lp-feature">
          <span className="lp-swatch lp-swatch-violet" />
          <h3>Built to pass the bots first</h3>
          <p>Every template is structured for ATS parsing, not just looks.</p>
        </div>

        <div className="lp-feature">
          <span className="lp-swatch lp-swatch-ink" />
          <h3>Export in one click</h3>
          <p>Download a polished PDF the moment you're happy with it.</p>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="lp-footer">
        <span>© {new Date().getFullYear()} Draftly</span>
        <span className="lp-footer-dot">·</span>
        <span>
          Built by{" "}
          <a
            href="https://github.com/Utkarsh-webdev"
            target="_blank"
            rel="noopener noreferrer"
            className="lp-footer-credit"
          >
            utkarsh_webdev
          </a>
        </span>
      </footer>

      {/* ===== Auth Modal ===== */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        {currentPage === "login" ? (
          <Login setCurrentPage={setCurrentPage} />
        ) : (
          <Signup setCurrentPage={setCurrentPage} />
        )}
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

        .lp-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1180px;
          margin: 0 auto;
          padding: 28px 24px 0;
        }
        .lp-logo {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 1.5rem;
          letter-spacing: -0.02em;
          cursor: pointer;
          color: var(--ink);
          margin: 0;
        }
        .lp-logo-accent { color: var(--signal); font-style: italic; }

        .lp-btn-ghost {
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 0.95rem;
          padding: 10px 20px;
          border-radius: 999px;
          border: 1.5px solid var(--ink);
          background: transparent;
          color: var(--ink);
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .lp-btn-ghost:hover { background: var(--ink); color: var(--paper); }
        .lp-btn-ghost:focus-visible { outline: 3px solid var(--violet); outline-offset: 2px; }

        .lp-hero {
          max-width: 1180px;
          margin: 0 auto;
          padding: 64px 24px 96px;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 56px;
          align-items: center;
        }
        @media (max-width: 860px) {
          .lp-hero { grid-template-columns: 1fr; padding-top: 32px; }
        }

        .lp-eyebrow {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          color: var(--graphite);
          display: inline-block;
          padding: 6px 12px;
          border: 1px solid var(--line);
          border-radius: 999px;
          margin-bottom: 24px;
        }

        .lp-headline {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          line-height: 1.04;
          letter-spacing: -0.02em;
          margin: 0;
          color: var(--ink);
        }
        .lp-headline-accent {
          color: var(--signal);
          font-style: italic;
        }

        .lp-subcopy {
          font-size: 1.1rem;
          color: var(--graphite);
          max-width: 460px;
          margin: 22px 0 36px;
          line-height: 1.55;
        }

        .lp-cta-row { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }

        .lp-btn-primary {
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 1rem;
          padding: 16px 28px;
          border-radius: var(--radius-sm);
          border: none;
          background: var(--signal);
          color: var(--white);
          cursor: pointer;
          box-shadow: var(--shadow-soft);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .lp-btn-primary:hover { transform: translateY(-2px); box-shadow: var(--shadow-card); }
        .lp-btn-primary:focus-visible { outline: 3px solid var(--violet); outline-offset: 3px; }

        .lp-btn-text {
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 0.98rem;
          background: none;
          border: none;
          color: var(--ink);
          text-decoration: underline;
          text-decoration-color: var(--line);
          text-underline-offset: 4px;
          cursor: pointer;
        }
        .lp-btn-text:hover { text-decoration-color: var(--signal); }

        /* Hero art: fanned cards */
        .lp-hero-art {
          position: relative;
          height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lp-card {
          position: absolute;
          width: 230px;
          background: var(--white);
          border: 1px solid var(--line);
          border-radius: var(--radius-card);
          padding: 22px;
          box-shadow: var(--shadow-card);
        }
        .lp-card-back {
          height: 300px;
          transform: rotate(-11deg) translate(-70px, 10px);
          background: var(--paper-2);
          opacity: 0.9;
        }
        .lp-card-mid {
          height: 310px;
          transform: rotate(7deg) translate(60px, 0px);
          background: var(--violet-dim);
        }
        .lp-card-front {
          height: 330px;
          transform: rotate(-3deg);
          z-index: 2;
          animation: lp-card-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .lp-card-front:hover { transform: rotate(0deg) translateY(-6px); }
        .lp-card-front { transition: transform 0.25s ease; }

        @keyframes lp-card-in {
          from { opacity: 0; transform: translateY(24px) rotate(-3deg) scale(0.97); }
          to { opacity: 1; transform: translateY(0) rotate(-3deg) scale(1); }
        }

        .lp-card-line {
          height: 7px;
          border-radius: 4px;
          background: var(--line);
          margin-bottom: 9px;
        }
        .lp-card-bar { height: 30px; width: 70%; border-radius: 6px; background: var(--violet); opacity: 0.4; margin-bottom: 14px; }

        .lp-card-avatar {
          width: 42px; height: 42px; border-radius: 50%;
          background: var(--signal-dim);
          border: 2px solid var(--signal);
          margin-bottom: 12px;
        }
        .lp-card-name { font-family: var(--font-display); font-weight: 800; font-size: 1.05rem; color: var(--ink); }
        .lp-card-role { font-family: var(--font-mono); font-size: 0.7rem; color: var(--graphite); margin-top: 2px; letter-spacing: 0.04em; }
        .lp-card-rule { height: 1px; background: var(--line); margin: 14px 0 12px; }

        .lp-badge {
          position: absolute;
          top: 6px;
          right: 18px;
          z-index: 3;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.03em;
          background: var(--ink);
          color: var(--paper);
          padding: 8px 12px;
          border-radius: 999px;
          transform: rotate(6deg);
          box-shadow: var(--shadow-soft);
        }

        @media (max-width: 860px) {
          .lp-hero-art { height: 320px; margin-top: 24px; }
          .lp-card { width: 190px; }
        }

        /* Features */
        .lp-features {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px 96px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          border-top: 1px solid var(--line);
          padding-top: 56px;
        }
        @media (max-width: 860px) {
          .lp-features { grid-template-columns: 1fr; gap: 32px; }
        }
        .lp-feature h3 {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.15rem;
          margin: 14px 0 8px;
          color: var(--ink);
        }
        .lp-feature p { color: var(--graphite); line-height: 1.5; margin: 0; }

        .lp-swatch {
          display: inline-block;
          width: 28px; height: 10px;
          border-radius: 4px;
        }
        .lp-swatch-signal { background: var(--signal); }
        .lp-swatch-violet { background: var(--violet); }
        .lp-swatch-ink { background: var(--ink); }

        /* Footer */
        .lp-footer {
          max-width: 1180px;
          margin: 0 auto;
          padding: 24px 24px 40px;
          border-top: 1px solid var(--line);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--graphite);
        }
        .lp-footer-dot { color: var(--line); }
        .lp-footer-credit {
          color: var(--ink);
          font-weight: 500;
          text-decoration: underline;
          text-decoration-color: var(--signal);
          text-underline-offset: 3px;
        }
        .lp-footer-credit:hover { color: var(--signal); }
        @media (max-width: 480px) {
          .lp-footer { flex-direction: column; gap: 4px; text-align: center; }
          .lp-footer-dot { display: none; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;