import React, { useEffect, useRef, useState } from "react";
import { LuUpload, LuTrash } from "react-icons/lu";

const MAX_FILE_SIZE_MB = 5;

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileError, setFileError] = useState("");

  const inputRef = useRef(null);

  // Revoke any locally-created object URL on unmount to avoid leaking memory
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewUrl]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setFileError("");

    if (!file.type.startsWith("image/")) {
      setFileError("Please choose an image file.");
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setFileError(`Image must be under ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    // Update image state
    setImage(file);

    // Revoke the previous object URL before creating a new one
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const nextPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(nextPreviewUrl);

    if (setPreview) {
      setPreview(nextPreviewUrl);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setFileError("");

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(null);

    if (setPreview) {
      setPreview(null);
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const onChooseFile = () => {
    inputRef.current?.click();
  };

  const displayedSrc = preview || previewUrl;

  return (
    <div className="pps-wrap">
      <div className="pps-avatar">
        {displayedSrc ? (
          <img src={displayedSrc} alt="Profile preview" className="pps-img" />
        ) : (
          <span className="pps-placeholder">No photo</span>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="pps-hidden-input"
      />

      <div className="pps-actions">
        <button type="button" onClick={onChooseFile} className="pps-btn-upload">
          <LuUpload size={16} />
          Upload
        </button>

        {displayedSrc && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="pps-btn-remove"
          >
            <LuTrash size={16} />
            Remove
          </button>
        )}
      </div>

      {fileError && <p className="pps-error">{fileError}</p>}

      <style>{`
        .pps-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }

        .pps-avatar {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid var(--line, #e4dfd3);
          background: var(--paper-2, #f1ecdf);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pps-img { width: 100%; height: 100%; object-fit: cover; }

        .pps-placeholder {
          font-family: var(--font-mono, "JetBrains Mono", monospace);
          font-size: 0.68rem;
          letter-spacing: 0.04em;
          color: var(--graphite, #6b6862);
          text-transform: uppercase;
        }

        .pps-hidden-input { display: none; }

        .pps-actions { display: flex; gap: 10px; }

        .pps-btn-upload {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body, "Inter", sans-serif);
          font-weight: 600;
          font-size: 0.85rem;
          padding: 9px 16px;
          border-radius: 999px;
          border: none;
          background: var(--ink, #16140f);
          color: var(--paper, #faf7f0);
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .pps-btn-upload:hover { background: var(--signal, #ff4f1f); }
        .pps-btn-upload:focus-visible { outline: 3px solid var(--violet, #6c4fff); outline-offset: 2px; }

        .pps-btn-remove {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body, "Inter", sans-serif);
          font-weight: 600;
          font-size: 0.85rem;
          padding: 9px 16px;
          border-radius: 999px;
          border: 1.5px solid var(--signal, #ff4f1f);
          background: transparent;
          color: var(--signal, #ff4f1f);
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .pps-btn-remove:hover { background: var(--signal, #ff4f1f); color: var(--white, #fff); }
        .pps-btn-remove:focus-visible { outline: 3px solid var(--violet, #6c4fff); outline-offset: 2px; }

        .pps-error {
          font-size: 0.8rem;
          color: #9a2c10;
          margin: 0;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default ProfilePhotoSelector;