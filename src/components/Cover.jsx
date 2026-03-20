import { Badge } from "../shared/Badge";
import { Reveal } from "../shared/Reveal";
import { c } from "../shared/tokens";

export function Cover() {
  return (
    <div style={{ minHeight: "clamp(500px,80vh,800px)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", marginBottom: "80px" }}>

      {/* Logo */}
      <Reveal delay={0.05}>
        <div style={{ marginBottom: "40px" }}>
          <img
            src="/images/umsatzpilot_logo_text.png"
            alt="Umsatzpilot"
            style={{ height: "clamp(32px, 5vw, 48px)", width: "auto", opacity: 0.95 }}
          />
        </div>
      </Reveal>

      {/* Badge */}
      <Reveal delay={0.1}>
        <div style={{ marginBottom: "24px" }}>
          <Badge>B2B Report 2026</Badge>
        </div>
      </Reveal>

      {/* Title */}
      <Reveal delay={0.15}>
        <h1 style={{
          fontSize: "clamp(36px,7vw,68px)", fontWeight: 800, color: c.white,
          margin: "0 0 20px", lineHeight: 1.05, letterSpacing: "-0.035em",
          maxWidth: "700px",
        }}>
          Skalieren ohne Neueinstellungen
        </h1>
      </Reveal>

      {/* Subtitle */}
      <Reveal delay={0.2}>
        <p style={{
          fontSize: "clamp(15px,2vw,18px)", color: c.textSecondary, lineHeight: 1.7,
          margin: "0 0 56px", maxWidth: "560px",
        }}>
          Wie B2B-Unternehmen in 2026 ihren Umsatz mit KI-gestützten Systemen skalieren, ohne mehr Personal einzustellen.
        </p>
      </Reveal>

      {/* Architecture Diagram: 5 Building Blocks */}
      <Reveal delay={0.3}>
        <div style={{ width: "100%", maxWidth: "560px" }}>

          {/* Level 1: Strategie */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
            <div style={{
              background: c.card, border: `1px solid ${c.cardBorderHover}`, borderRadius: "12px",
              padding: "14px 32px", textAlign: "center", position: "relative",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", borderRadius: "12px 12px 0 0", background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)` }} />
              <p style={{ fontSize: "15px", fontWeight: 700, color: c.white, margin: 0 }}>Strategie</p>
            </div>
          </div>

          {/* Connector */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
            <div style={{ width: "1px", height: "16px", background: `linear-gradient(180deg, ${c.cardBorderHover}, ${c.cardBorder})` }} />
          </div>

          {/* Level 2: RevOps */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
            <div style={{
              background: c.card, border: `1px solid ${c.cardBorderHover}`, borderRadius: "12px",
              padding: "14px 48px", textAlign: "center", width: "100%", boxSizing: "border-box",
            }}>
              <p style={{ fontSize: "15px", fontWeight: 700, color: c.white, margin: 0 }}>Revenue Operations</p>
            </div>
          </div>

          {/* Connector */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
            <div style={{ width: "1px", height: "16px", background: `linear-gradient(180deg, ${c.cardBorderHover}, ${c.cardBorder})` }} />
          </div>

          {/* Level 3: Two Engines */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "8px" }}>
            <div style={{
              background: c.card, border: `1px solid ${c.cardBorderHover}`, borderRadius: "12px",
              padding: "14px 16px", textAlign: "center",
            }}>
              <p style={{ fontSize: "clamp(12px,2vw,14px)", fontWeight: 700, color: c.white, margin: 0, lineHeight: 1.3 }}>Demand Generation Engine</p>
            </div>
            <div style={{
              background: c.card, border: `1px solid ${c.cardBorderHover}`, borderRadius: "12px",
              padding: "14px 16px", textAlign: "center",
            }}>
              <p style={{ fontSize: "clamp(12px,2vw,14px)", fontWeight: 700, color: c.white, margin: 0, lineHeight: 1.3 }}>Revenue Generation Engine</p>
            </div>
          </div>

          {/* Connector */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
            <div style={{ width: "1px", height: "16px", background: `linear-gradient(180deg, ${c.cardBorderHover}, ${c.cardBorder})` }} />
          </div>

          {/* Level 4: Datenbasis */}
          <div style={{
            background: c.card, borderRadius: "12px", padding: "16px 48px", textAlign: "center",
            width: "100%", boxSizing: "border-box",
            border: `1px solid ${c.cardBorderHover}`,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)` }} />
            <p style={{ fontSize: "15px", fontWeight: 700, color: c.white, margin: 0 }}>Datenbasis</p>
          </div>
        </div>
      </Reveal>

      {/* Scroll indicator */}
      <Reveal delay={0.5}>
        <div style={{ marginTop: "56px", opacity: 0.4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c.textMuted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </Reveal>
    </div>
  );
}
