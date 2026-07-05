import React from "react";

const TextArea = ({ label, value, onChange, placeholder, rows = 4 }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        value={value || ""}
        placeholder={placeholder}
        onChange={onChange}
        rows={rows}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 resize-y"
      />
    </div>
  );
};

export default TextArea;