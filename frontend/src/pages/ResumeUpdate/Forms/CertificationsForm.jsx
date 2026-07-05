import React from "react";
import AddButton from "../../../components/AddButton";
import Input from "../../../components/inputs/Input";
import SectionHeader from "../../../components/ResumeSections/SectionHeader";
import ArrayItemCard from "../../../components/Cards/ArrayItemCard";

const CertificationsForm = ({ items, onUpdate, onAdd, onRemove }) => {
  return (
    <div>
      <SectionHeader title="Certifications" />

      {items?.map((item, index) => (
        <ArrayItemCard
          key={index}
          onRemove={() => onRemove(index)}
          canRemove={items.length > 1}
        >
          <Input
            label="Title"
            value={item.title}
            onChange={(e) => onUpdate(index, "title", e.target.value)}
            placeholder="AWS Certified Developer"
          />

          <Input
            label="Issuer"
            value={item.issuer}
            onChange={(e) => onUpdate(index, "issuer", e.target.value)}
            placeholder="Amazon Web Services"
          />

          <Input
            label="Year"
            value={item.year}
            onChange={(e) => onUpdate(index, "year", e.target.value)}
            placeholder="2024"
          />
        </ArrayItemCard>
      ))}

      <AddButton
        label="Add Certification"
        onClick={() => onAdd({ title: "", issuer: "", year: "" })}
      />
    </div>
  );
};

export default CertificationsForm;