import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Input = ({ label, type = "text", placeholder, value, onChange, name }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="di-field">
      <label htmlFor={name} className="di-label">
        {label}
      </label>

      <div className="di-box">
        <input
          id={name}
          name={name}
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={type === "password" ? "current-password" : "off"}
          className="di-input"
        />

        {type === "password" && (
          <button
            type="button"
            onClick={toggleShowPassword}
            tabIndex={-1}
            className="di-eye-btn"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500&family=Inter:wght@400;500&display=swap');

        .di-field { width: 100%; }

        .di-label {
          display: block;
          font-family: var(--font-mono, "JetBrains Mono", monospace);
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--graphite, #6b6862);
          margin-bottom: 8px;
        }

        .di-box {
          position: relative;
          display: flex;
          align-items: center;
          border-bottom: 2px solid var(--line, #e4dfd3);
          transition: border-color 0.2s ease;
        }
        .di-box:focus-within {
          border-color: var(--signal, #ff4f1f);
        }

        .di-input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          padding: 10px 36px 10px 2px;
          font-family: var(--font-body, "Inter", sans-serif);
          font-size: 1rem;
          color: var(--ink, #16140f);
        }
        .di-input::placeholder { color: #b3ada0; }

        .di-eye-btn {
          position: absolute;
          right: 2px;
          background: none;
          border: none;
          color: var(--graphite, #6b6862);
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 4px;
        }
        .di-eye-btn:hover { color: var(--ink, #16140f); }
        .di-eye-btn:focus-visible {
          outline: 2px solid var(--violet, #6c4fff);
          outline-offset: 2px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default Input;