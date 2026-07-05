import React from "react";
import { LuMail, LuPhone, LuMapPin, LuGlobe } from "react-icons/lu";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export const normalizeUrl = (url) => {
  if (!url) return "";
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

// tone="dark"  -> for light backgrounds
// tone="light" -> for dark backgrounds

const ContactRow = ({
  contactInfo,
  tone = "dark",
  iconColor,
  layout = "row",
}) => {
  const color = iconColor || (tone === "light" ? "#ffffff" : "#4b5563");

  const items = [
    contactInfo?.email && {
      icon: LuMail,
      text: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
    },

    contactInfo?.phone && {
      icon: LuPhone,
      text: contactInfo.phone,
      href: `tel:${contactInfo.phone}`,
    },

    contactInfo?.location && {
      icon: LuMapPin,
      text: contactInfo.location,
    },

    contactInfo?.linkedin && {
      icon: FaLinkedin,
      text: "LinkedIn",
      href: normalizeUrl(contactInfo.linkedin),
      isLinkOnly: true,
    },

    contactInfo?.github && {
      icon: FaGithub,
      text: "GitHub",
      href: normalizeUrl(contactInfo.github),
      isLinkOnly: true,
    },

    contactInfo?.leetcode && {
      icon: SiLeetcode,
      text: "LeetCode",
      href: normalizeUrl(contactInfo.leetcode),
      isLinkOnly: true,
    },

    contactInfo?.website && {
      icon: LuGlobe,
      text: "Website",
      href: normalizeUrl(contactInfo.website),
      isLinkOnly: true,
    },
  ].filter(Boolean);

  if (!items.length) return null;

  return (
    <div
      className={
        layout === "row"
          ? "flex flex-wrap items-center gap-x-4 gap-y-1"
          : "flex flex-col gap-2"
      }
    >
      {items.map((item, index) => {
        const Icon = item.icon;

        // Only icon for GitHub, LinkedIn, Website & LeetCode
        if (item.isLinkOnly) {
          return (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              title={item.text}
              className="hover:opacity-80 transition"
              style={{ color }}
            >
              <Icon size={14} />
            </a>
          );
        }

        // Email, Phone, Location
        const content = (
          <span
            className="flex items-center gap-1.5 text-[11px]"
            style={{ color }}
          >
            <Icon size={12} className="flex-shrink-0" />
            <span>{item.text}</span>
          </span>
        );

        return item.href ? (
          <a
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {content}
          </a>
        ) : (
          <span key={index}>{content}</span>
        );
      })}
    </div>
  );
};

export default ContactRow;