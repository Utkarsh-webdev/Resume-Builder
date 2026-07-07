import React from "react";
import { LuPlus } from "react-icons/lu";

const AddButton = ({ text = "Add", onClick, className = "" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-4 py-2 mt-3 border border-dashed border-[#FF4F1F] rounded-lg text-[#FF4F1F] hover:bg-orange-50 transition-colors duration-200 ${className}`}
    >
      <LuPlus className="text-lg" />
      <span className="text-sm font-medium">{text}</span>
    </button>
  );
};

export default AddButton;