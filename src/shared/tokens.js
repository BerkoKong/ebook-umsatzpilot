export const c = {
  // Backgrounds
  bg: "#050505",
  card: "#0c0c0c",
  cardElevated: "#0f0f0f",
  surface: "#070707",
  // Borders
  cardBorder: "#1a1a1a",
  cardBorderHover: "#2a2a2a",
  borderSubtle: "#141414",
  // Text
  white: "#ffffff",
  textPrimary: "#e5e5e5",
  textSecondary: "#888888",
  textMuted: "#555555",
  textDisabled: "#444444",
  // Accent
  green: "#22c55e",
  greenMuted: "rgba(34,197,94,0.1)",
  red: "#ef4444",
  redMuted: "rgba(239,68,68,0.1)",
  amber: "#f59e0b",
  amberMuted: "rgba(245,158,11,0.1)",
  blue: "#3b82f6",
  // Workflow node colors
  purple: "#a78bfa",
  teal: "#14b8a6",
  orange: "#f97316",
  pink: "#ec4899",
};

// Typography scale
export const fs = {
  xs:   "clamp(11px, 1.4vw, 12px)",
  sm:   "clamp(12px, 1.6vw, 13px)",
  base: "clamp(14px, 1.8vw, 15.5px)",
  md:   "clamp(15px, 2vw, 17px)",
  lg:   "clamp(17px, 2.5vw, 20px)",
  xl:   "clamp(20px, 3vw, 26px)",
  "2xl": "clamp(24px, 3.5vw, 32px)",
  "3xl": "clamp(28px, 4vw, 36px)",
  "4xl": "clamp(36px, 5vw, 48px)",
};

// Border radius
export const r = {
  sm: "8px",
  md: "12px",
  lg: "16px",
};

// Responsive grids
export const GRID2 = "repeat(auto-fit, minmax(min(100%, 340px), 1fr))";
export const GRID3 = "repeat(auto-fit, minmax(min(100%, 250px), 1fr))";

// CTA button — unified style
export const ctaStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "14px 32px",
  background: "#22c55e",
  color: "#000",
  fontSize: "clamp(14px, 1.8vw, 15.5px)",
  fontWeight: 700,
  borderRadius: "100px",
  textDecoration: "none",
  letterSpacing: "-0.01em",
  transition: "opacity 0.15s",
  cursor: "pointer",
  border: "none",
};
