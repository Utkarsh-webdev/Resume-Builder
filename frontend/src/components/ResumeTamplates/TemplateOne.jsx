import React from "react";
import moment from "moment";
import { getPalette } from "./paletteMap";
import ContactRow from "../ResumeSections/ContactRow";
import ProjectLinks from "../ResumeSections/ProjectLinks";
import SafeImage from "../ResumeSections/SafeImage";

const fmt = (d) => (d ? moment(d, "YYYY-MM").format("MMM YYYY") : "");

// Classic single-column resume. Ordered summary -> skills -> experience ->
// education -> projects, since ATS parsers and recruiters both read
// top-to-bottom and weight what's near the top most heavily.
const TemplateOne = ({ resumeData, colorPalette, containerWidth }) => {
  const {
    profileInfo, contactInfo, workExperience, education,
    skills, projects, certifications, languages, interests,
  } = resumeData;

  const { accent } = getPalette(colorPalette);
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
      <div className="flex items-center gap-5 border-b-4 pb-4 mb-5" style={{ borderColor: accent }}>
        <SafeImage
          src={profileInfo?.profilePreviewUrl}
          alt={profileInfo?.fullName || "Profile"}
          className="w-20 h-20 rounded-full object-cover border border-gray-200 flex-shrink-0"
        />
        <div>
          <h1 className="text-3xl font-bold">{profileInfo?.fullName || "Your Name"}</h1>
          <p className="font-semibold mt-1" style={{ color: accent }}>
            {profileInfo?.designation}
          </p>
          <div className="mt-2">
            <ContactRow contactInfo={contactInfo} tone="dark" />
          </div>
        </div>
      </div>

      {profileInfo?.summary && (
        <Section title="Summary" accent={accent}>
          <p className="text-sm">{profileInfo.summary}</p>
        </Section>
      )}

      {skills?.some((s) => s.name) && (
        <Section title="Skills" accent={accent}>
          <div className="flex flex-wrap gap-2">
            {skills.filter((s) => s.name).map((s, i) => (
              <span key={i} className="text-xs px-3 py-1 rounded-full border" style={{ borderColor: accent }}>
                {s.name}{s.level ? ` · ${s.level}` : ""}
              </span>
            ))}
          </div>
        </Section>
      )}

      {workExperience?.some((w) => w.company) && (
        <Section title="Experience" accent={accent}>
          {workExperience.map((w, i) => w.company && (
            <div key={i} className="mb-3">
              <div className="flex flex-wrap items-baseline gap-1">
                <strong className="text-sm">{w.role}</strong>
                <span className="text-sm">· {w.company}</span>
                <span className="ml-auto text-xs text-gray-500">
                  {fmt(w.startDate)} — {fmt(w.endDate) || "Present"}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{w.description}</p>
            </div>
          ))}
        </Section>
      )}

      {education?.some((e) => e.school) && (
        <Section title="Education" accent={accent}>
          {education.map((e, i) => e.school && (
            <div key={i} className="mb-3">
              <div className="flex flex-wrap items-baseline gap-1">
                <strong className="text-sm">{e.degree}</strong>
                <span className="text-sm">· {e.school}</span>
                <span className="ml-auto text-xs text-gray-500">
                  {fmt(e.startDate)} — {fmt(e.endDate)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{e.description}</p>
            </div>
          ))}
        </Section>
      )}

      {projects?.some((p) => p.title) && (
        <Section title="Projects" accent={accent}>
          {projects.map((p, i) => p.title && (
            <div key={i} className="mb-3">
              <strong className="text-sm">{p.title}</strong>
              <p className="text-sm text-gray-600 mt-1">{p.description}</p>
              <ProjectLinks github={p.github} liveDemo={p.liveDemo} accent={accent} />
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
        <Section title="Languages" accent={accent}>
          {languages.map((l, i) => l.name && (
            <div key={i} className="flex items-center gap-3 mb-2">
              <span className="text-sm w-24">{l.name}</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${l.progress}%`, background: accent }} />
              </div>
            </div>
          ))}
        </Section>
      )}

      {interests?.some((i) => i) && (
        <Section title="Interests" accent={accent} last>
          <p className="text-sm">{interests.filter(Boolean).join(" · ")}</p>
        </Section>
      )}
    </div>
  );
};

const Section = ({ title, accent, children, last }) => (
  <section className={last ? "" : "mb-5"}>
    <h2 className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: accent }}>
      {title}
    </h2>
    {children}
  </section>
);

export default TemplateOne;