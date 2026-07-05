import React, { forwardRef } from "react";
import moment from "moment";

const ACCENTS = {
  Signal: "#ff4f1f",
  Violet: "#6c4fff",
  Ink: "#16140f",
  Ocean: "#0f7ea6",
  Forest: "#1f7a4d",
};

const ResumePreview = forwardRef(({ resumeData }, ref) => {
  const {
    profileInfo, contactInfo, workExperience, education,
    skills, projects, certifications, languages, interests, template,
  } = resumeData;

  const accent = ACCENTS[template?.colorPalette] || ACCENTS.Signal;
  const fmt = (d) => (d ? moment(d, "YYYY-MM").format("MMM YYYY") : "");

  return (
    <div ref={ref} className="bg-white p-10 max-w-3xl mx-auto text-gray-800">
      <div className="flex items-center gap-5 border-b-4 pb-4 mb-5" style={{ borderColor: accent }}>
        {profileInfo?.profilePreviewUrl && (
          <img
            src={profileInfo.profilePreviewUrl}
            alt={profileInfo?.fullName || "Profile"}
            className="w-20 h-20 rounded-full object-cover border border-gray-200 flex-shrink-0"
          />
        )}

        <div>
          <h1 className="text-3xl font-bold">{profileInfo?.fullName || "Your Name"}</h1>
          <p className="font-semibold mt-1" style={{ color: accent }}>
            {profileInfo?.designation}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {[contactInfo?.email, contactInfo?.phone, contactInfo?.location, contactInfo?.linkedin, contactInfo?.github, contactInfo?.website]
              .filter(Boolean)
              .join("  ·  ")}
          </p>
        </div>
      </div>

      {profileInfo?.summary && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: accent }}>Summary</h2>
          <p className="text-sm">{profileInfo.summary}</p>
        </section>
      )}

      {workExperience?.some((w) => w.company) && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: accent }}>Experience</h2>
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
        </section>
      )}

      {education?.some((e) => e.school) && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: accent }}>Education</h2>
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
        </section>
      )}

      {skills?.some((s) => s.name) && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: accent }}>Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.filter((s) => s.name).map((s, i) => (
              <span key={i} className="text-xs px-3 py-1 rounded-full border" style={{ borderColor: accent }}>
                {s.name}{s.level ? ` · ${s.level}` : ""}
              </span>
            ))}
          </div>
        </section>
      )}

      {projects?.some((p) => p.title) && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: accent }}>Projects</h2>
          {projects.map((p, i) => p.title && (
            <div key={i} className="mb-3">
              <strong className="text-sm">{p.title}</strong>
              <p className="text-sm text-gray-600 mt-1">{p.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                {[p.github, p.liveDemo].filter(Boolean).join("  ·  ")}
              </p>
            </div>
          ))}
        </section>
      )}

      {certifications?.some((c) => c.title) && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: accent }}>Certifications</h2>
          {certifications.map((c, i) => c.title && (
            <p key={i} className="text-sm">{c.title} — {c.issuer} ({c.year})</p>
          ))}
        </section>
      )}

      {languages?.some((l) => l.name) && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: accent }}>Languages</h2>
          {languages.map((l, i) => l.name && (
            <div key={i} className="flex items-center gap-3 mb-2">
              <span className="text-sm w-24">{l.name}</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${l.progress}%`, background: accent }} />
              </div>
            </div>
          ))}
        </section>
      )}

      {interests?.some((i) => i) && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: accent }}>Interests</h2>
          <p className="text-sm">{interests.filter(Boolean).join(" · ")}</p>
        </section>
      )}
    </div>
  );
});

export default ResumePreview;