import { c } from "./tokens";

export function Badge({ children, color = c.textMuted }) {
  return (
    <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: "100px", border: `1px solid ${color}33`, fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color }}>
      {children}
    </span>
  );
}
