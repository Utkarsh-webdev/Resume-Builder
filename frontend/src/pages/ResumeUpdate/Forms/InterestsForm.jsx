import React from "react";
import { LuTrash2 } from "react-icons/lu";
import Input from "../../../components/inputs/Input";
import SectionHeader from "../../../components/ResumeSections/SectionHeader";
import AddButton from "../../../components/AddButton";

const InterestsForm = ({ items, onUpdate, onAdd, onRemove }) => {
  return (
    <div>
      <SectionHeader title="Interests" />

      {items?.map((item, index) => (
        <div key={index} className="flex items-center gap-2 mb-3">
          <div className="flex-1">
            <Input
              value={item}
              onChange={(e) => onUpdate(index, e.target.value)}
              placeholder="Photography"
            />
          </div>
          {items.length > 1 && (
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
            >
              <LuTrash2 size={16} />
            </button>
          )}
        </div>
      ))}

      <AddButton label="Add Interest" onClick={() => onAdd("")} />
    </div>
  );
};

export default InterestsForm;