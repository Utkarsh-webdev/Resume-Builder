import React from "react";

import Input from "../../../components/inputs/Input";
import SectionHeader from "../../../components/ResumeSections/SectionHeader";
import ArrayItemCard from "../../../components/Cards/ArrayItemCard";
import AddButton from "../../../components/AddButton";

const SkillsForm = ({ items, onUpdate, onAdd, onRemove }) => {
  return (
    <div>
      <SectionHeader title="Skills" />

      {items?.map((item, index) => (
        <ArrayItemCard
          key={index}
          onRemove={() => onRemove(index)}
          canRemove={items.length > 1}
        >
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Skill"
              value={item.name}
              onChange={(e) => onUpdate(index, "name", e.target.value)}
              placeholder="React"
            />
            <Input
              label="Level"
              value={item.level}
              onChange={(e) => onUpdate(index, "level", e.target.value)}
              placeholder="Expert"
            />
          </div>
        </ArrayItemCard>
      ))}

      <AddButton
        label="Add Skill"
        onClick={() => onAdd({ name: "", level: "" })}
      />
    </div>
  );
};

export default SkillsForm;