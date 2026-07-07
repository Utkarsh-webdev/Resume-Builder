import React from "react";
import moment from "moment";
import { getPalette } from "./paletteMap";
import ContactRow from "../ResumeSections/ContactRow";
import ProjectLinks from "../ResumeSections/ProjectLinks";
import SafeImage from "../ResumeSections/SafeImage";

const fmt = (d) => (d ? moment(d, "YYYY-MM").format("MMM YYYY") : "");

// Data Analytics resume. Single column (not a sidebar layout) — data/BI
// roles are among the most heavily ATS-screened, so this template prioritizes
// parse reliability over visual flourish. Technical Skills sits right under
// the summary since keyword-matching on tools (SQL, Python, Tableau, Excel,
// Power BI) is what most analyst-role ATS filters weigh first.
const TemplateTwo = ({ resumeData, colorPalette, containerWidth }) => {
  const {
    profileInfo, contactInfo, workExperience, education,
    skills, projects, certifications, languages,
  } = resumeData;

  const { accent, accentSoft } = getPalette(colorPalette);
  const scale = containerWidth ? Math.min(containerWidth / 800, 1) : 1;

  return (
    <div
      className="bg-white text-gray-800"
      style={{
        width: 800,
        padding: 40,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        fontFamily: "Inter, -apple-system, sans-serif",
      }}
    >
      <div className="flex items-center gap-5 pb-4 mb-5" style={{ borderBottom: `3px solid ${accent}` }}>
        <SafeImage
          src={profileInfo?.profilePreviewUrl}
          alt={profileInfo?.fullName || "Profile"}
          className="w-20 h-20 rounded-full object-cover border border-gray-200 flex-shrink-0"
        />
        <div>
          <h1 className="text-3xl font-bold">{profileInfo?.fullName || "Your Name"}</h1>
          <p className="font-semibold mt-1 uppercase tracking-wide text-sm" style={{ color: accent }}>
            {profileInfo?.designation || "Data Analyst"}
          </p>
          <div className="mt-2">
            <ContactRow contactInfo={contactInfo} tone="dark" />
          </div>
        </div>
      </div>

      {profileInfo?.summary && (
        <Section title="Professional Summary" accent={accent} accentSoft={accentSoft}>
          <p className="text-sm">{profileInfo.summary}</p>
        </Section>
      )}

      {skills?.some((s) => s.name) && (
        <Section title="Technical Skills" accent={accent} accentSoft={accentSoft}>
          <p className="text-sm">
            {skills.filter((s) => s.name).map((s) => s.name).join("  •  ")}
          </p>
        </Section>
      )}

      {workExperience?.some((w) => w.company) && (
        <Section title="Professional Experience" accent={accent} accentSoft={accentSoft}>
          {workExperience.map((w, i) => w.company && (
            <div key={i} className="mb-3">
              <div className="flex flex-wrap items-baseline gap-1">
                <strong className="text-sm">{w.role}</strong>
                <span className="text-sm">· {w.company}</span>
                <span className="ml-auto text-xs text-gray-500">
                  {fmt(w.startDate)} — {fmt(w.endDate) || "Present"}
                </span>
              </div>
              {w.description
                ?.split(/\n|(?<=\.)\s+(?=[A-Z])/)
                .filter(Boolean)
                .map((line, li) => (
                  <p key={li} className="text-sm text-gray-600 mt-1">• {line.trim()}</p>
                ))}
            </div>
          ))}
        </Section>
      )}

      {projects?.some((p) => p.title) && (
        <Section title="Data Projects" accent={accent} accentSoft={accentSoft}>
          {projects.map((p, i) => p.title && (
            <div key={i} className="mb-3">
              <strong className="text-sm">{p.title}</strong>
              <p className="text-sm text-gray-600 mt-1">{p.description}</p>
              <ProjectLinks github={p.github} liveDemo={p.liveDemo} accent={accent} />
            </div>
          ))}
        </Section>
      )}

      {education?.some((e) => e.school) && (
        <Section title="Education" accent={accent} accentSoft={accentSoft}>
          {education.map((e, i) => e.school && (
            <div key={i} className="mb-2">
              <div className="flex flex-wrap items-baseline gap-1">
                <strong className="text-sm">{e.degree}</strong>
                <span className="text-sm">· {e.school}</span>
                <span className="ml-auto text-xs text-gray-500">
                  {fmt(e.startDate)} — {fmt(e.endDate)}
                </span>
              </div>
            </div>
          ))}
        </Section>
      )}

      {certifications?.some((c) => c.title) && (
        <Section title="Certifications" accent={accent} accentSoft={accentSoft} last>
          {certifications.map((c, i) => c.title && (
            <p key={i} className="text-sm">{c.title} — {c.issuer} ({c.year})</p>
          ))}
        </Section>
      )}
    </div>
  );
};

const Section = ({ title, accent, accentSoft, children, last }) => (
  <section className={last ? "" : "mb-5"}>
    <h2
      className="text-xs font-bold uppercase tracking-wide mb-2 inline-block px-2 py-1 rounded"
      style={{ color: accent, background: accentSoft }}
    >
      {title}
    </h2>
    {children}
  </section>
);

export default TemplateTwo;