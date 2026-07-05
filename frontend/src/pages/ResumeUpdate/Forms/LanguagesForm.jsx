import React from "react";
import AddButton from "../../../components/AddButton";
import Input from "../../../components/inputs/Input";
import SectionHeader from "../../../components/ResumeSections/SectionHeader";
import ArrayItemCard from "../../../components/Cards/ArrayItemCard";

const LanguagesForm = ({ items, onUpdate, onAdd, onRemove }) => {
  return (
    <div>
      <SectionHeader title="Languages" />

      {items?.map((item, index) => (
        <ArrayItemCard
          key={index}
          onRemove={() => onRemove(index)}
          canRemove={items.length > 1}
        >
          <Input
            label="Language"
            value={item.name}
            onChange={(e) => onUpdate(index, "name", e.target.value)}
            placeholder="English"
          />

          <Input
            label="Proficiency (%)"
            type="number"
            value={item.progress}
            onChange={(e) =>
              onUpdate(
                index,
                "progress",
                Math.min(100, Math.max(0, Number(e.target.value) || 0))
              )
            }
            placeholder="80"
          />
        </ArrayItemCard>
      ))}

      <AddButton
        label="Add Language"
        onClick={() => onAdd({ name: "", progress: 50 })}
      />
    </div>
  );
};

export default LanguagesForm;