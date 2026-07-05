import React from "react";
import moment from "moment";
import { getPalette } from "./paletteMap";
import ContactRow from "../ResumeSections/ContactRow";
import ProjectLinks from "../ResumeSections/ProjectLinks";

const fmt = (d) => (d ? moment(d, "YYYY-MM").format("MMM YYYY") : "");

const TemplateTwo = ({ resumeData, colorPalette, containerWidth }) => {
  const {
    profileInfo, contactInfo, workExperience, education,
    skills, projects, certifications, languages, interests,
  } = resumeData;

  const { accent, accentSoft } = getPalette(colorPalette);
  const scale = containerWidth ? Math.min(containerWidth / 800, 1) : 1;

  return (
    <div
      className="bg-white text-gray-800 flex"
      style={{
        width: 800,
        minHeight: 1000,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        fontFamily: "Inter, -apple-system, sans-serif",
      }}
    >
      {/* Sidebar */}
      <div className="w-[260px] p-7 text-white flex-shrink-0" style={{ background: accent }}>
        {profileInfo?.profilePreviewUrl && (
          <img
            src={profileInfo.profilePreviewUrl}
            alt={profileInfo?.fullName || "Profile"}
            className="w-24 h-24 rounded-full object-cover border-2 border-white mb-4"
          />
        )}
        <h1 className="text-xl font-bold leading-tight">{profileInfo?.fullName || "Your Name"}</h1>
        <p className="text-sm opacity-90 mt-1">{profileInfo?.designation}</p>

        <div className="mt-6">
          <ContactRow contactInfo={contactInfo} tone="light" layout="column" />
        </div>

        {skills?.some((s) => s.name) && (
          <div className="mt-7">
            <h2 className="text-xs font-bold uppercase tracking-wide mb-2 opacity-80">Skills</h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.filter((s) => s.name).map((s, i) => (
                <span key={i} className="text-[11px] px-2 py-1 rounded bg-white/15">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {languages?.some((l) => l.name) && (
          <div className="mt-7">
            <h2 className="text-xs font-bold uppercase tracking-wide mb-2 opacity-80">Languages</h2>
            {languages.map((l, i) => l.name && (
              <div key={i} className="mb-2">
                <p className="text-xs mb-1">{l.name}</p>
                <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: `${l.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {interests?.some((i) => i) && (
          <div className="mt-7">
            <h2 className="text-xs font-bold uppercase tracking-wide mb-2 opacity-80">Interests</h2>
            <p className="text-xs opacity-90">{interests.filter(Boolean).join(" · ")}</p>
          </div>
        )}
      </div>

      {/* Main column */}
      <div className="flex-1 p-8">
        {profileInfo?.summary && (
          <Section title="Summary" accent={accent} accentSoft={accentSoft}>
            <p className="text-sm">{profileInfo.summary}</p>
          </Section>
        )}

        {workExperience?.some((w) => w.company) && (
          <Section title="Experience" accent={accent} accentSoft={accentSoft}>
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

        {projects?.some((p) => p.title) && (
          <Section title="Projects" accent={accent} accentSoft={accentSoft}>
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

        {certifications?.some((c) => c.title) && (
          <Section title="Certifications" accent={accent} accentSoft={accentSoft} last>
            {certifications.map((c, i) => c.title && (
              <p key={i} className="text-sm">{c.title} — {c.issuer} ({c.year})</p>
            ))}
          </Section>
        )}
      </div>
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