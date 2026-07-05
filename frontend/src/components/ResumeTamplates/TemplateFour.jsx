import React from "react";
import moment from "moment";
import ContactRow from "../ResumeSections/ContactRow";

const fmt = (d) => (d ? moment(d, "YYYY-MM").format("MMM YYYY") : "");

// Plain, low-color, single-column layout — maximizes ATS parsing reliability
// by avoiding tables and multi-column structure. Small inline icons are safe
// here since the underlying text remains fully selectable/parseable.
const TemplateFour = ({ resumeData, containerWidth }) => {
  const {
    profileInfo, contactInfo, workExperience, education,
    skills, projects, certifications, languages, interests,
  } = resumeData;

  const scale = containerWidth ? Math.min(containerWidth / 800, 1) : 1;

  return (
    <div
      className="bg-white text-black"
      style={{
        width: 800,
        padding: "36px 44px",
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: 13,
        lineHeight: 1.45,
      }}
    >
      <div className="text-center mb-3">
        <h1 className="text-xl font-bold tracking-wide">{(profileInfo?.fullName || "YOUR NAME").toUpperCase()}</h1>
        <div className="mt-1 flex justify-center">
          <ContactRow contactInfo={contactInfo} tone="dark" iconColor="#000000" />
        </div>
      </div>

      {education?.some((e) => e.school) && (
        <Section title="EDUCATION">
          {education.map((e, i) => e.school && (
            <div key={i} className="mb-1.5 flex justify-between">
              <span><strong>{e.school}</strong> — {e.degree}</span>
              <span>{fmt(e.startDate)} – {fmt(e.endDate)}</span>
            </div>
          ))}
        </Section>
      )}

      {skills?.some((s) => s.name) && (
        <Section title="SKILLS SUMMARY">
          <p>{skills.filter((s) => s.name).map((s) => s.name).join(", ")}</p>
        </Section>
      )}

      {workExperience?.some((w) => w.company) && (
        <Section title="EXPERIENCE">
          {workExperience.map((w, i) => w.company && (
            <div key={i} className="mb-2">
              <div className="flex justify-between">
                <strong>{w.company}</strong>
                <span>{fmt(w.startDate)} – {fmt(w.endDate) || "Present"}</span>
              </div>
              <p className="italic text-[12.5px]">{w.role}</p>
              <p className="text-[12.5px] mt-0.5">• {w.description}</p>
            </div>
          ))}
        </Section>
      )}

      {projects?.some((p) => p.title) && (
        <Section title="PROJECTS">
          {projects.map((p, i) => p.title && (
            <div key={i} className="mb-2">
              <strong>{p.title}</strong>
              <p className="text-[12.5px]">• {p.description}</p>
              {(p.github || p.liveDemo) && (
                <p className="text-[11.5px] mt-0.5">
                  {[p.github, p.liveDemo].filter(Boolean).join("  |  ")}
                </p>
              )}
            </div>
          ))}
        </Section>
      )}

      {certifications?.some((c) => c.title) && (
        <Section title="HONORS AND CERTIFICATIONS">
          {certifications.map((c, i) => c.title && (
            <p key={i} className="text-[12.5px]">• {c.title} — {c.issuer} ({c.year})</p>
          ))}
        </Section>
      )}

      {(languages?.some((l) => l.name) || interests?.some((i) => i)) && (
        <Section title="SKILLS & INTERESTS" last>
          {languages?.some((l) => l.name) && (
            <p className="text-[12.5px]"><strong>Language:</strong> {languages.filter((l) => l.name).map((l) => l.name).join(", ")}</p>
          )}
          {interests?.some((i) => i) && (
            <p className="text-[12.5px]"><strong>Interests:</strong> {interests.filter(Boolean).join(", ")}</p>
          )}
        </Section>
      )}
    </div>
  );
};

const Section = ({ title, children, last }) => (
  <div className={last ? "mt-3" : "mt-3 mb-2"}>
    <h2 className="text-xs font-bold tracking-wide border-b border-black pb-0.5 mb-1.5">{title}</h2>
    {children}
  </div>
);

export default TemplateFour;