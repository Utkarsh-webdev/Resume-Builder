import React, { useState } from "react";
import { LuCheck, LuPencil } from "react-icons/lu";

const TitleInput = ({ title, setTitle }) => {
  const [editing, setEditing] = useState(false);

  return (
    <div className="flex items-center gap-2">
      {editing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            className="border-b border-[#FF4F1F] outline-none text-xl font-semibold bg-transparent"
          />

          <button
            onClick={() => setEditing(false)}
            className="text-[#FF4F1F] hover:opacity-80"
          >
            <LuCheck size={18} />
          </button>
        </>
      ) : (
        <>
          <h1 className="text-xl font-semibold text-gray-900">
            {title || "Untitled Resume"}
          </h1>

          <button
            onClick={() => setEditing(true)}
            className="text-gray-400 hover:text-[#FF4F1F]"
          >
            <LuPencil size={18} />
          </button>
        </>
      )}
    </div>
  );
};

export default TitleInput;