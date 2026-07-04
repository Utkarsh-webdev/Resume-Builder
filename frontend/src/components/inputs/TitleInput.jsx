import React, { useState } from "react";
import { LuCheck, LuPencil } from "react-icons/lu";

const TitleInput = ({ title, setTitle }) => {
  const [showInput, setShowInput] = useState(false);

  return (
    <div className="flex items-center gap-2">
      {showInput ? (
        <>
          <input
            type="text"
            placeholder="Resume title"
            className="border px-2 py-1 rounded text-lg font-medium focus:outline-purple-500"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            autoFocus
          />

          <button
            className="p-1 text-green-600 hover:bg-gray-100 rounded"
            onClick={() => setShowInput((prevState) => !prevState)}
          >
            <LuCheck className="text-xl" />
          </button>
        </>
      ) : (
        <>
          <h1 className="text-xl font-semibold text-gray-800">
            {title || "Untitled Resume"}
          </h1>
          <button
            className="p-1 text-gray-500 hover:bg-gray-100 rounded"
            onClick={() => setShowInput((prevState) => !prevState)}
          >
            <LuPencil className="text-lg" />
          </button>
        </>
      )}
    </div>
  );
};

export default TitleInput;