import React from "react";
import Modal from "../Modal";

const TEMPLATES = [
  { id: "01", label: "Classic", desc: "Single column, clean and traditional" },
  { id: "02", label: "Executive", desc: "Dark sidebar, bold accent highlights" },
  { id: "03", label: "Sidebar", desc: "Two-column with a colored sidebar" },
  { id: "04", label: "ATS Plain", desc: "Dense, no color — maximum ATS compatibility" },
  { id: "05", label: "Dev ATS", desc: "ATS-optimized, built for developer roles" },
];

const PALETTES = [
  { name: "Signal", colors: ["#ff4f1f", "#ffe4d8"] },
  { name: "Violet", colors: ["#6c4fff", "#ece6ff"] },
  { name: "Ink", colors: ["#16140f", "#f1ecdf"] },
  { name: "Ocean", colors: ["#0f7ea6", "#dbf1f7"] },
  { name: "Forest", colors: ["#1f7a4d", "#dcf3e5"] },
];

const ThemeSelector = ({ isOpen, onClose, template, onUpdate }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Change Theme">
    <div>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
        Layout
      </p>
      <div className="grid grid-cols-2 gap-3">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => onUpdate({ ...template, templateId: t.id })}
            className={`text-left p-3 rounded-lg border-2 ${
              template?.templateId === t.id
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <p className="text-sm font-semibold text-gray-800">{t.label}</p>
            <p className="text-xs text-gray-500 mt-0.5">{t.desc}</p>
          </button>
        ))}
      </div>

      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-5 mb-2">
        Color Palette
      </p>
      <div className="flex flex-wrap gap-2">
        {PALETTES.map((p) => (
          <button
            key={p.name}
            onClick={() => onUpdate({ ...template, colorPalette: p.name })}
            title={p.name}
            className={`flex rounded-lg overflow-hidden w-12 h-9 border-2 ${
              template?.colorPalette === p.name ? "border-purple-500" : "border-gray-200"
            }`}
          >
            <span className="flex-1" style={{ background: p.colors[0] }} />
            <span className="flex-1" style={{ background: p.colors[1] }} />
          </button>
        ))}
      </div>
    </div>
  </Modal>
);

export default ThemeSelector;