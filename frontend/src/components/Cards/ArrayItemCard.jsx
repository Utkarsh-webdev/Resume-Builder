import React from "react";
import { LuTrash2 } from "react-icons/lu";

const ArrayItemCard = ({
  children,
  onDelete,
  showDelete = true,
}) => {
  return (
    <div className="relative border border-gray-200 rounded-xl p-4 mb-4 bg-white shadow-sm">
      {showDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="absolute top-3 right-3 text-red-500 hover:text-red-700"
        >
          <LuTrash2 size={18} />
        </button>
      )}

      {children}
    </div>
  );
};

export default ArrayItemCard;