import React from "react";
import moment from "moment";
import { getPalette } from "./paletteMap";
import ContactRow from "../ResumeSections/ContactRow";
import ProjectLinks from "../ResumeSections/ProjectLinks";

const fmt = (d) => (d ? moment(d, "YYYY-MM").format("MMM YYYY") : "");

const TemplateThree = ({ resumeData, colorPalette, containerWidth }) => {
  const {
    profileInfo, contactInfo, workExperience, education,
    skills, projects, certifications, languages,
  } = resumeData;

  const { accent } = getPalette(colorPalette);
  const scale = containerWidth ? Math.min(containerWidth / 800, 1) : 1;

  return (
    <div
      className="flex text-gray-800"
      style={{
        width: 800,
        minHeight: 1050,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        fontFamily: "Inter, -apple-system, sans-serif",
        background: "#fff",
      }}
    >
      {/* Dark sidebar */}
      <div className="w-[240px] p-6 flex-shrink-0 text-white" style={{ background: "#1c1f2b" }}>
        {profileInfo?.profilePreviewUrl && (
          <img
            src={profileInfo.profilePreviewUrl}
            alt={profileInfo?.fullName || "Profile"}
            className="w-20 h-20 rounded-full object-cover mb-5 border-2"
            style={{ borderColor: accent }}
          />
        )}

        <SideSection title="Contact" accent={accent}>
          <ContactRow contactInfo={contactInfo} tone="light" layout="column" />
        </SideSection>

        {education?.some((e) => e.school) && (
          <SideSection title="Education" accent={accent}>
            {education.map((e, i) => e.school && (
              <div key={i} className="mb-3">
                <p className="text-xs font-semibold">{e.degree}</p>
                <p className="text-[11px] opacity-80">{e.school}</p>
                <p className="text-[10px] opacity-60">{fmt(e.startDate)} – {fmt(e.endDate)}</p>
              </div>
            ))}
          </SideSection>
        )}

        {skills?.some((s) => s.name) && (
          <SideSection title="Key Skills" accent={accent}>
            <div className="flex flex-wrap gap-1.5">
              {skills.filter((s) => s.name).map((s, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2 py-1 rounded"
                  style={{ background: accent, color: "#1c1f2b", fontWeight: 600 }}
                >
                  {s.name}
                </span>
              ))}
            </div>
          </SideSection>
        )}

        {certifications?.some((c) => c.title) && (
          <SideSection title="Certifications" accent={accent}>
            {certifications.map((c, i) => c.title && (
              <p key={i} className="text-[11px] mb-1.5 opacity-90">{c.title} — {c.issuer}</p>
            ))}
          </SideSection>
        )}

        {languages?.some((l) => l.name) && (
          <SideSection title="Languages" accent={accent}>
            {languages.map((l, i) => l.name && (
              <p key={i} className="text-[11px] mb-1 opacity-90">{l.name}</p>
            ))}
          </SideSection>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: "#1c1f2b" }}>
          {profileInfo?.fullName || "Your Name"}
        </h1>
        <p className="text-sm font-semibold mt-1 uppercase tracking-wide" style={{ color: accent }}>
          {profileInfo?.designation}
        </p>

        {profileInfo?.summary && (
          <MainSection title="Professional Summary" accent={accent}>
            <p className="text-sm text-gray-700">{profileInfo.summary}</p>
          </MainSection>
        )}

        {workExperience?.some((w) => w.company) && (
          <MainSection title="Professional Experience" accent={accent}>
            {workExperience.map((w, i) => w.company && (
              <div key={i} className="mb-4">
                <div className="flex flex-wrap items-baseline justify-between">
                  <strong className="text-sm">{w.role}</strong>
                  <span className="text-xs text-gray-500">{fmt(w.startDate)} — {fmt(w.endDate) || "Present"}</span>
                </div>
                <p className="text-xs font-medium text-gray-500">{w.company}</p>
                <p className="text-sm text-gray-700 mt-1">{w.description}</p>
              </div>
            ))}
          </MainSection>
        )}

        {projects?.some((p) => p.title) && (
          <MainSection title="Projects" accent={accent} last>
            {projects.map((p, i) => p.title && (
              <div key={i} className="mb-3">
                <strong className="text-sm">{p.title}</strong>
                <p className="text-sm text-gray-700 mt-1">{p.description}</p>
                <ProjectLinks github={p.github} liveDemo={p.liveDemo} accent={accent} />
              </div>
            ))}
          </MainSection>
        )}
      </div>
    </div>
  );
};

const SideSection = ({ title, accent, children }) => (
  <div className="mb-6">
    <h2 className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: accent }}>{title}</h2>
    {children}
  </div>
);

const MainSection = ({ title, accent, children, last }) => (
  <section className={last ? "mt-5" : "mt-5 mb-1"}>
    <h2 className="text-sm font-bold uppercase tracking-wide mb-2 pb-1 border-b-2" style={{ color: "#1c1f2b", borderColor: accent }}>
      {title}
    </h2>
    {children}
  </section>
);

export default TemplateThree;