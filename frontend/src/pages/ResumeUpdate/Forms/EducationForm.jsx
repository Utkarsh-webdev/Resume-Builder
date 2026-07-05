import React from "react";

import Input from "../../../components/inputs/Input";
import TextArea from "../../../components/inputs/TextArea";

import SectionHeader from "../../../components/ResumeSections/SectionHeader";
import ArrayItemCard from "../../../components/Cards/ArrayItemCard";
import AddButton from "../../../components/AddButton";

const EducationForm = ({ items, onUpdate, onAdd, onRemove }) => {
  return (
    <div>
      <SectionHeader title="Education" />

      {items?.map((item, index) => (
        <ArrayItemCard
          key={index}
          onRemove={() => onRemove(index)}
          canRemove={items.length > 1}
        >
          <Input
            label="Degree"
            value={item.degree}
            onChange={(e) => onUpdate(index, "degree", e.target.value)}
            placeholder="B.Sc. Computer Science"
          />

          <Input
            label="School"
            value={item.school}
            onChange={(e) => onUpdate(index, "school", e.target.value)}
            placeholder="University name"
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
            rows={2}
            placeholder="Honors, coursework, activities"
          />
        </ArrayItemCard>
      ))}

      <AddButton
        label="Add Education"
        onClick={() =>
          onAdd({ degree: "", school: "", startDate: "", endDate: "", description: "" })
        }
      />
    </div>
  );
};

export default EducationForm;