export const PALETTE_MAP = {
  Signal: { accent: "#ff4f1f", accentSoft: "#ffe4d8" },
  Violet: { accent: "#6c4fff", accentSoft: "#ece6ff" },
  Ink: { accent: "#16140f", accentSoft: "#f1ecdf" },
  Ocean: { accent: "#0f7ea6", accentSoft: "#dbf1f7" },
  Forest: { accent: "#1f7a4d", accentSoft: "#dcf3e5" },
};

export const getPalette = (name) => PALETTE_MAP[name] || PALETTE_MAP.Signal;