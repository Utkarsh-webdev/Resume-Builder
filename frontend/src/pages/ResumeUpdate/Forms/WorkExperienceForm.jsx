import React from "react";
import Input from "../../../components/inputs/Input";
import TextArea from "../../../components/inputs/TextArea";

import SectionHeader from "../../../components/ResumeSections/SectionHeader";
import ArrayItemCard from "../../../components/Cards/ArrayItemCard";
import AddButton from "../../../components/AddButton";

const WorkExperienceForm = ({ items, onUpdate, onAdd, onRemove }) => {
  return (
    <div>
      <SectionHeader
        title="Work Experience"
        subtitle="Most recent role first."
      />

      {items?.map((item, index) => (
        <ArrayItemCard
          key={index}
          onRemove={() => onRemove(index)}
          canRemove={items.length > 1}
        >
          <Input
            label="Company"
            value={item.company}
            onChange={(e) => onUpdate(index, "company", e.target.value)}
            placeholder="Acme Inc."
          />

          <Input
            label="Role"
            value={item.role}
            onChange={(e) => onUpdate(index, "role", e.target.value)}
            placeholder="Software Engineer"
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Start Date"
              type="month"
              value={item.startDate}
              onChange={(e) => onUpdate(index, "startDate", e.target.value)}
            />
            <Input
              label="End Date"
              type="month"
              value={item.endDate}
              onChange={(e) => onUpdate(index, "endDate", e.target.value)}
            />
          </div>

          <TextArea
            label="Description"
            value={item.description}
            onChange={(e) => onUpdate(index, "description", e.target.value)}
            placeholder="What did you work on and achieve?"
          />
        </ArrayItemCard>
      ))}

      <AddButton
        label="Add Experience"
        onClick={() =>
          onAdd({
            company: "",
            role: "",
            startDate: "",
            endDate: "",
            description: "",
          })
        }
      />
    </div>
  );
};

export default WorkExperienceForm;