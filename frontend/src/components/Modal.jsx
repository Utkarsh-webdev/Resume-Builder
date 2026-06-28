import React from "react";

const Modal = ({
  children,
  isOpen,
  onClose = () => {},
  title = "",
  hideHeader = false,
  hideCloseButton = false,
  showActionBtn = false,
  actionBtnIcon = null,
  actionBtnText = "",
  onActionClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className="dm-overlay">
      <div className="dm-backdrop" onClick={onClose}></div>

      <div className="dm-modal">
        {!hideHeader && (
          <div className="dm-header">
            <h2 className="dm-title">{title}</h2>

            <div className="dm-header-actions">
              {showActionBtn && (
                <button className="dm-action-btn" onClick={onActionClick}>
                  {actionBtnIcon}
                  {actionBtnText}
                </button>
              )}

              {!hideCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="dm-close-btn"
                  aria-label="Close"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          </div>
        )}

        {hideHeader && !hideCloseButton && (
          <button
            type="button"
            onClick={onClose}
            className="dm-close-btn dm-close-floating"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        )}

        <div className="dm-body">{children}</div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@800;900&family=Inter:wght@400;500;600&display=swap');

        .dm-overlay {
          position: fixed;
          inset: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
        .dm-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(22, 20, 15, 0.55);
          backdrop-filter: blur(4px);
        }
        .dm-modal {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 460px;
          background: var(--paper, #faf7f0);
          border: 1px solid var(--line, #e4dfd3);
          border-radius: 22px;
          box-shadow: 0 24px 60px -16px rgba(22, 20, 15, 0.35);
          overflow: hidden;
          animation: dm-pop 0.25s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes dm-pop {
          from { opacity: 0; transform: translateY(14px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .dm-modal { animation: none; }
        }

        .dm-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--line, #e4dfd3);
          padding: 20px 24px;
        }
        .dm-title {
          font-family: var(--font-display, "Archivo", sans-serif);
          font-weight: 800;
          font-size: 1.15rem;
          color: var(--ink, #16140f);
          margin: 0;
        }
        .dm-header-actions { display: flex; align-items: center; gap: 10px; }

        .dm-action-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body, "Inter", sans-serif);
          font-weight: 600;
          font-size: 0.9rem;
          padding: 9px 16px;
          border-radius: 10px;
          border: none;
          background: var(--ink, #16140f);
          color: var(--paper, #faf7f0);
          cursor: pointer;
        }

        .dm-close-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 38px;
          width: 38px;
          border-radius: 50%;
          border: 1px solid var(--line, #e4dfd3);
          background: var(--paper, #faf7f0);
          color: var(--ink, #16140f);
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }
        .dm-close-btn:hover {
          background: var(--ink, #16140f);
          color: var(--paper, #faf7f0);
          transform: rotate(90deg);
        }
        .dm-close-btn:focus-visible {
          outline: 3px solid var(--violet, #6c4fff);
          outline-offset: 2px;
        }
        .dm-close-floating {
          position: absolute;
          top: 18px;
          right: 18px;
          z-index: 5;
        }

        .dm-body { padding: 36px 32px; }
        @media (max-width: 480px) {
          .dm-body { padding: 30px 22px; }
        }
      `}</style>
    </div>
  );
};

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M1 1l6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
    />
  </svg>
);

export default Modal;