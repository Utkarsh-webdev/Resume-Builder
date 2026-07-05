import React, { forwardRef } from "react";
import TemplateOne from "./TemplateOne";
import TemplateTwo from "./TemplateTwo";
import TemplateThree from "./TemplateThree";
import TemplateFour from "./TemplateFour";
import TemplateFive from "./TemplateFive";

const TEMPLATE_MAP = {
  "01": TemplateOne,
  "02": TemplateTwo,
  "03": TemplateThree,
  "04": TemplateFour,
  "05": TemplateFive,
};

const RenderResume = forwardRef(
  ({ templateId, resumeData, colorPalette, containerWidth }, ref) => {
    const SelectedTemplate = TEMPLATE_MAP[templateId] || TemplateOne;

    return (
      <div ref={ref}>
        <SelectedTemplate
          resumeData={resumeData}
          colorPalette={colorPalette}
          containerWidth={containerWidth}
        />
      </div>
    );
  }
);

export default RenderResume;