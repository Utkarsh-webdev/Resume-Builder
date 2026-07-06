import React from "react";

const TextArea = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}) => {
  return (
    <div className="mb-5">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <textarea
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="
          w-full
          rounded-lg
          border
          border-gray-200
          bg-white
          px-4
          py-3
          text-sm
          text-gray-800
          placeholder:text-gray-400
          outline-none
          resize-none
          transition-colors
          duration-200
          focus:border-[#FF4F1F]
        "
      />
    </div>
  );
};

export default TextArea;