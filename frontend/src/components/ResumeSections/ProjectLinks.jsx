import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { normalizeUrl } from "./ContactRow";

const ProjectLinks = ({ github, liveDemo, accent = "#4b5563" }) => {
  if (!github && !liveDemo) return null;

  return (
    <div className="flex items-center gap-3 mt-1">
      {github && (
        <a
          href={normalizeUrl(github)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[11px] hover:underline"
          style={{ color: accent }}
        >
          <FaGithub size={12} />
          <span>Code</span>
        </a>
      )}

      {liveDemo && (
        <a
          href={normalizeUrl(liveDemo)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[11px] hover:underline"
          style={{ color: accent }}
        >
          <FaExternalLinkAlt size={11} />
          <span>Live Demo</span>
        </a>
      )}
    </div>
  );
};

export default ProjectLinks;