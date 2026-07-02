import React, { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { getLightColorFromImage } from "../../utils/helper";

const ResumeSummaryCard = ({
  imgUrl,
  title,
  lastUpdated,
  onSelect,
}) => {
  const [bgColor, setBgColor] = useState("#ffffff");

  useEffect(() => {
    if (imgUrl) {
      getLightColorFromImage(imgUrl)
        .then((color) => {
          setBgColor(color);
        })
        .catch(() => {
          setBgColor("#ffffff");
        });
    } else {
      setBgColor("#ffffff");
    }
  }, [imgUrl]);

  return (
    <div
      onClick={onSelect}
      className="rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-200 hover:-translate-y-1 h-80 flex flex-col"
      style={{ backgroundColor: bgColor }}
    >
      {/* Resume Thumbnail */}
      <div className="h-55 flex items-center justify-center overflow-hidden bg-gray-100">
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <FileText size={60} />
            <p className="mt-2 text-sm">No Preview</p>
          </div>
        )}
      </div>

      {/* Resume Details */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h5 className="text-lg font-semibold text-gray-800 truncate">
            {title || "Untitled Resume"}
          </h5>

          <p className="text-sm text-gray-500 mt-2">
            Last Updated
          </p>

          <p className="text-sm font-medium text-gray-700">
            {lastUpdated || "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumeSummaryCard;