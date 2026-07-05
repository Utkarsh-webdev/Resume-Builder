import React from "react";

const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-5">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;