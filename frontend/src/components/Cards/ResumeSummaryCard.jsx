import React, { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { getLightColorFromImage } from "../../utils/helper";

const ResumeSummaryCard = ({ imgUrl, title, lastUpdated, onSelect }) => {
  const [bgColor, setBgColor] = useState("#ffffff");

  useEffect(() => {
    if (imgUrl) {
      getLightColorFromImage(imgUrl)
        .then((color) => setBgColor(color))
        .catch(() => setBgColor("#ffffff"));
    } else {
      setBgColor("#ffffff");
    }
  }, [imgUrl]);

  return (
    <div
      className="rc-card"
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect?.()}
      style={{ background: bgColor }}
    >
      <div className="rc-thumb">
        {imgUrl ? (
          <img src={imgUrl} alt={title} loading="lazy" />
        ) : (
          <div className="rc-empty">
            <FileText size={40} />
            <p>No Preview</p>
          </div>
        )}
      </div>

      <div className="rc-body">
        <h5 className="rc-title">{title || "Untitled Resume"}</h5>
        <p className="rc-label">Last Updated</p>
        <p className="rc-date">{lastUpdated || "-"}</p>
      </div>

      <style>{`
        .rc-card {
          height: 280px;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--line);
          border-radius: var(--radius-card);
          overflow: hidden;
          cursor: pointer;
          box-shadow: var(--shadow-soft);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .rc-card:hover,
        .rc-card:focus-visible {
          transform: translateY(-4px);
          box-shadow: var(--shadow-card);
          outline: none;
        }

        .rc-thumb {
          height: 62%;
          background: var(--paper-2);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }
        .rc-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .rc-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--graphite);
        }
        .rc-empty p {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          margin-top: 6px;
        }

        .rc-body {
          flex: 1;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
        }
        .rc-title {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.98rem;
          color: var(--ink);
          margin: 0 0 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .rc-label {
          font-family: var(--font-mono);
          font-size: 0.66rem;
          letter-spacing: 0.04em;
          color: var(--graphite);
          margin: 0;
        }
        .rc-date {
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--ink);
          margin: 2px 0 0;
        }

        @media (max-width: 680px) {
          .rc-card { height: 200px; }
          .rc-body { padding: 10px 12px; }
          .rc-title { font-size: 0.88rem; margin-bottom: 4px; }
          .rc-label { font-size: 0.6rem; }
          .rc-date { font-size: 0.78rem; }
          .rc-empty svg { width: 30px; height: 30px; }
        }
        @media (max-width: 420px) {
          .rc-card { height: 180px; }
        }
      `}</style>
    </div>
  );
};

export default ResumeSummaryCard;