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
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@700;800&family=Inter:wght@400;500;600&display=swap');

        .dm-overlay {
          position: fixed;
          inset: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .dm-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.45);
          backdrop-filter: blur(6px);
        }

        .dm-modal {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 480px;
          max-height: 92vh;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 18px;
          box-shadow: 0 18px 45px rgba(15, 23, 42, 0.12);
          overflow: hidden;
          animation: modalIn .22s ease;
        }

        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .dm-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 22px;
          border-bottom: 1px solid #f1f5f9;
        }

        .dm-title {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 700;
          color: #111827;
        }

        .dm-header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .dm-action-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 16px;
          border: none;
          border-radius: 10px;
          background: #FF4F1F;
          color: white;
          font-size: .9rem;
          font-weight: 600;
          cursor: pointer;
          transition: .2s;
        }

        .dm-action-btn:hover {
          background: #E84618;
        }

        .dm-close-btn {
          height: 38px;
          width: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid #e5e7eb;
          background: white;
          color: #6b7280;
          cursor: pointer;
          transition: .2s;
        }

        .dm-close-btn:hover {
          background: #FFF4F1;
          color: #FF4F1F;
          border-color: #FF4F1F;
          transform: rotate(90deg);
        }

        .dm-close-btn:focus-visible {
          outline: 2px solid #FF4F1F;
          outline-offset: 2px;
        }

        .dm-close-floating {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 5;
        }

        .dm-body {
          padding: 28px 24px;
          overflow-y: auto;
          scrollbar-width: none;
        }

        .dm-body::-webkit-scrollbar {
          display: none;
        }

        @media (max-width:640px) {
          .dm-modal {
            max-width: 100%;
            border-radius: 16px;
          }

          .dm-header {
            padding: 16px 18px;
          }

          .dm-body {
            padding: 22px 18px;
          }
        }
      `}</style>
    </div>
  );
};

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M1 1L13 13M13 1L1 13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default Modal;