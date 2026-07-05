import React from "react";
import moment from "moment";
import { getPalette } from "./paletteMap";
import ContactRow from "../ResumeSections/ContactRow";
import ProjectLinks from "../ResumeSections/ProjectLinks";
import SafeImage from "../ResumeSections/SafeImage";

const fmt = (d) => (d ? moment(d, "YYYY-MM").format("MMM YYYY") : "");

// Designed for ATS parsing: single column, standard section headers, skills
// surfaced early since ATS keyword-matching for dev roles weighs tech-stack
// terms heavily. LeetCode is included in the header — recruiters and ATS
// scanners for dev roles commonly check coding-practice profiles.
const TemplateFive = ({ resumeData, colorPalette, containerWidth }) => {
  const {
    profileInfo, contactInfo, workExperience, education,
    skills, projects, certifications, languages,
  } = resumeData;

  const { accent } = getPalette(colorPalette);
  const scale = containerWidth ? Math.min(containerWidth / 800, 1) : 1;

  return (
    <div
      className="bg-white text-gray-900"
      style={{
        width: 800,
        padding: "40px 48px",
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: 13,
        lineHeight: 1.5,
      }}
    >
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{profileInfo?.fullName || "Your Name"}</h1>
        <p className="text-sm font-semibold" style={{ color: accent }}>
          {profileInfo?.designation || "Full Stack Developer"}
        </p>
        <div className="mt-1">
          <ContactRow contactInfo={contactInfo} tone="dark" iconColor="#374151" />
        </div>
      </div>

      {profileInfo?.summary && (
        <Section title="Summary" accent={accent}>
          <p className="text-sm">{profileInfo.summary}</p>
        </Section>
      )}

      {skills?.some((s) => s.name) && (
        <Section title="Technical Skills" accent={accent}>
          <p className="text-sm">
            {skills.filter((s) => s.name).map((s) => s.name).join("  •  ")}
          </p>
        </Section>
      )}

      {workExperience?.some((w) => w.company) && (
        <Section title="Experience" accent={accent}>
          {workExperience.map((w, i) => w.company && (
            <div key={i} className="mb-3">
              <div className="flex justify-between flex-wrap">
                <strong className="text-sm">{w.role}, {w.company}</strong>
                <span className="text-xs text-gray-500">{fmt(w.startDate)} – {fmt(w.endDate) || "Present"}</span>
              </div>
              {w.description
                ?.split(/\n|(?<=\.)\s+(?=[A-Z])/)
                .filter(Boolean)
                .map((line, li) => (
                  <p key={li} className="text-sm mt-1">• {line.trim()}</p>
                ))}
            </div>
          ))}
        </Section>
      )}

      {projects?.some((p) => p.title) && (
        <Section title="Projects" accent={accent}>
          {projects.map((p, i) => p.title && (
            <div key={i} className="mb-2.5">
              <strong className="text-sm">{p.title}</strong>
              <p className="text-sm mt-0.5">{p.description}</p>
              <ProjectLinks github={p.github} liveDemo={p.liveDemo} accent={accent} />
            </div>
          ))}
        </Section>
      )}

      {education?.some((e) => e.school) && (
        <Section title="Education" accent={accent}>
          {education.map((e, i) => e.school && (
            <div key={i} className="flex justify-between mb-1">
              <span className="text-sm"><strong>{e.degree}</strong> — {e.school}</span>
              <span className="text-xs text-gray-500">{fmt(e.startDate)} – {fmt(e.endDate)}</span>
            </div>
          ))}
        </Section>
      )}

      {certifications?.some((c) => c.title) && (
        <Section title="Certifications" accent={accent}>
          {certifications.map((c, i) => c.title && (
            <p key={i} className="text-sm">{c.title} — {c.issuer} ({c.year})</p>
          ))}
        </Section>
      )}

      {languages?.some((l) => l.name) && (
        <Section title="Languages" accent={accent} last>
          <p className="text-sm">{languages.filter((l) => l.name).map((l) => l.name).join("  •  ")}</p>
        </Section>
      )}
    </div>
  );
};

const Section = ({ title, accent, children, last }) => (
  <div className={last ? "mt-4" : "mt-4 mb-1"}>
    <h2
      className="text-xs font-bold uppercase tracking-wide pb-1 mb-2"
      style={{ borderBottom: `2px solid ${accent}` }}
    >
      {title}
    </h2>
    {children}
  </div>
);

export default TemplateFive;