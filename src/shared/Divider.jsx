import { Reveal } from "./Reveal";

export function Divider() {
  return (
    <Reveal>
      <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />
    </Reveal>
  );
}
