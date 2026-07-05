import React from "react";
import Input from "../../../components/inputs/Input";
import TextArea from "../../../components/inputs/TextArea";

import SectionHeader from "../../../components/ResumeSections/SectionHeader";
import AddButton from "../../../components/AddButton";
import ArrayItemCard from "../../../components/Cards/ArrayItemCard";

const ProjectsForm = ({ items, onUpdate, onAdd, onRemove }) => {
  return (
    <div>
      <SectionHeader title="Projects" />

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
            placeholder="Personal Portfolio"
          />

          <TextArea
            label="Description"
            value={item.description}
            onChange={(e) => onUpdate(index, "description", e.target.value)}
            rows={2}
            placeholder="What does this project do?"
          />

          <Input
            label="GitHub Link"
            value={item.github}
            onChange={(e) => onUpdate(index, "github", e.target.value)}
            placeholder="github.com/you/project"
          />

          <Input
            label="Live Demo"
            value={item.liveDemo}
            onChange={(e) => onUpdate(index, "liveDemo", e.target.value)}
            placeholder="project.com"
          />
        </ArrayItemCard>
      ))}

      <AddButton
        label="Add Project"
        onClick={() =>
          onAdd({ title: "", description: "", github: "", liveDemo: "" })
        }
      />
    </div>
  );
};

export default ProjectsForm;