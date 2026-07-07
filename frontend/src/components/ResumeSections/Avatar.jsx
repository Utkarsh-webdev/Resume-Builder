import React, { useState } from "react";

const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
};

// Shows the profile photo if one loads successfully; otherwise falls back to
// an initials avatar instead of leaving blank space or a broken-image icon.
// This also protects html-to-image's thumbnail capture, which otherwise
// rejects on a broken <img> reference.
const Avatar = ({ src, name, size = 80, accent = "#ff4f1f", borderColor, className }) => {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: "9999px",
        overflow: "hidden",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: borderColor ? `2px solid ${borderColor}` : "none",
        background: showImage ? "transparent" : accent,
      }}
    >
      {showImage ? (
        <img
          src={src}
          alt={name || "Profile"}
          onError={() => setFailed(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <span
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: size * 0.34,
            fontFamily: "Inter, -apple-system, sans-serif",
          }}
        >
          {getInitials(name)}
        </span>
      )}
    </div>
  );
};

export default Avatar;