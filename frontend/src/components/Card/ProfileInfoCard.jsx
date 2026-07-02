import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearUser();
    navigate("/");
  };

  return (
    user && (
      <div className="pic-wrap">
        <img
          src={user?.profileImageUrl || "/default-avatar.png"}
          alt={user?.name}
          className="pic-avatar"
        />

        <div className="pic-meta">
          <h4 className="pic-name">{user?.name}</h4>
          <button className="pic-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <style>{`
          .pic-wrap {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .pic-avatar {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid var(--signal, #ff4f1f);
          }
          .pic-meta {
            display: flex;
            flex-direction: column;
            line-height: 1.15;
          }
          .pic-name {
            font-family: var(--font-display, "Archivo", sans-serif);
            font-weight: 800;
            font-size: 0.92rem;
            color: var(--ink, #16140f);
            margin: 0;
          }
          .pic-logout {
            font-family: var(--font-mono, "JetBrains Mono", monospace);
            font-size: 0.7rem;
            letter-spacing: 0.04em;
            color: var(--graphite, #6b6862);
            background: none;
            border: none;
            padding: 0;
            text-align: left;
            cursor: pointer;
            text-decoration: underline;
            text-decoration-color: var(--line, #e4dfd3);
            text-underline-offset: 2px;
          }
          .pic-logout:hover { color: var(--signal, #ff4f1f); text-decoration-color: var(--signal, #ff4f1f); }
        `}</style>
      </div>
    )
  );
};

export default ProfileInfoCard;