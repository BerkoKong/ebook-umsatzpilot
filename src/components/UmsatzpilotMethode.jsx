import { Badge } from "../shared/Badge";
import { Reveal } from "../shared/Reveal";
import { Divider } from "../shared/Divider";
import { c } from "../shared/tokens";
import { Strategie } from "./Strategie";
import { Datenbasis } from "./Datenbasis";
import { KPIs } from "./KPIs";

const BAUSTEINE = [
  {
    num: "01",
    title: "Strategie",
    desc: "Die Grundlage des Systems. ICP, Positionierung, Angebotsarchitektur, Buyer Journey und Kanalstrategie. Ohne eine klare Strategie automatisierst du in die falsche Richtung und skalierst Chaos.",
  },
  {
    num: "02",
    title: "Demand Generation Engine",
    desc: "Skalierbare Lead-Generierung über Content, Outbound-Sequenzen und bezahlte Kanäle. Das System bringt kontinuierlich qualifizierte Interessenten in deine Pipeline, ohne dass du jeden Schritt manuell anstößt.",
  },
  {
    num: "03",
    title: "Revenue Generation Engine",
    desc: "Vom ersten Gespräch bis zum Abschluss. Qualifizierung, Discovery, Angebot, Follow-up und Closing als strukturierter, messbarer Prozess. Nicht Bauchgefühl, sondern Mechanik.",
  },
  {
    num: "04",
    title: "Revenue Operations",
    desc: "Das Betriebssystem deines Umsatzes. Prozesse, CRM, Automatisierungen und Reporting. RevOps verbindet alle Bausteine und stellt sicher, dass nichts zwischen den Stufen verloren geht.",
  },
  {
    num: "05",
    title: "Datenbasis",
    desc: "Alle Systeme sind nur so gut wie die Daten dahinter. Saubere Kontaktdaten, gepflegte Pipeline-Informationen und konsistente Metriken sind die Voraussetzung, dass jede Automatisierung das Richtige tut.",
  },
];

function BausteinCard({ num, title, desc, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", padding: "clamp(20px,3vw,28px) clamp(16px,3vw,24px)", background: c.card, borderRadius: "16px", border: `1px solid ${c.cardBorder}`, marginBottom: "12px" }}>
        <div style={{ flexShrink: 0, width: "40px", height: "40px", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: `1px solid ${c.cardBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: "12px", fontWeight: 800, color: c.textMuted }}>{num}</span>
        </div>
        <div>
          <h3 style={{ fontSize: "17px", fontWeight: 700, color: c.white, margin: "0 0 10px", lineHeight: 1.3 }}>{title}</h3>
          <p style={{ fontSize: "14px", color: c.textSecondary, lineHeight: 1.65, margin: 0 }}>{desc}</p>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Architektur-Diagramm mit Interaktionen ──────────────────────────────────

function ArchitekturDiagramm() {
  const nodeStyle = {
    background: "#111",
    border: `1px solid ${c.cardBorderHover}`,
    borderRadius: "12px",
    textAlign: "center",
  };

  const labelStyle = {
    fontSize: "11px",
    color: c.textMuted,
    whiteSpace: "nowrap",
    letterSpacing: "0.02em",
  };

  return (
    <div style={{ background: c.card, borderRadius: "20px", border: `1px solid ${c.cardBorder}`, padding: "clamp(24px,4vw,40px)", marginBottom: "64px", position: "relative", overflow: "visible" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", borderRadius: "20px 20px 0 0", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />

      {/* Strategie */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "0" }}>
        <div style={{ ...nodeStyle, padding: "14px 40px", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", borderRadius: "12px 12px 0 0", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)" }} />
          <p style={{ fontSize: "15px", fontWeight: 700, color: c.white, margin: 0 }}>Strategie</p>
        </div>
      </div>

      {/* Connector: Strategie → RevOps */}
      <div style={{ display: "flex", justifyContent: "center", position: "relative", height: "32px", alignItems: "center" }}>
        <div style={{ width: "1px", height: "28px", background: `linear-gradient(180deg, ${c.cardBorderHover}, ${c.cardBorder})` }} />
        <span style={{ ...labelStyle, position: "absolute", left: "calc(50% + 10px)", top: "6px" }}>bestimmt Rahmen &amp; Prozesslogik</span>
        <span style={{ ...labelStyle, position: "absolute", right: "calc(50% + 10px)", top: "6px", color: "rgba(255,255,255,0.15)" }}>&#8593; gibt Performance-Daten</span>
      </div>

      {/* Revenue Operations */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "0" }}>
        <div style={{ ...nodeStyle, padding: "14px", width: "100%", boxSizing: "border-box" }}>
          <p style={{ fontSize: "15px", fontWeight: 700, color: c.white, margin: 0 }}>Revenue Operations</p>
        </div>
      </div>

      {/* Connector: RevOps → Engines (split) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", marginBottom: "0" }}>
        {/* Left connector */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", height: "32px", justifyContent: "center" }}>
          <div style={{ width: "1px", height: "28px", background: `linear-gradient(180deg, ${c.cardBorderHover}, ${c.cardBorder})` }} />
          <span style={{ ...labelStyle, position: "absolute", bottom: "0px", whiteSpace: "nowrap" }}>koordiniert Outreach</span>
        </div>
        {/* Right connector */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", height: "32px", justifyContent: "center" }}>
          <div style={{ width: "1px", height: "28px", background: `linear-gradient(180deg, ${c.cardBorderHover}, ${c.cardBorder})` }} />
          <span style={{ ...labelStyle, position: "absolute", bottom: "0px", whiteSpace: "nowrap" }}>koordiniert Abschluss</span>
        </div>
      </div>

      {/* Engines */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "0" }}>
        <div style={{ ...nodeStyle, padding: "14px 16px" }}>
          <p style={{ fontSize: "clamp(12px,1.8vw,14px)", fontWeight: 700, color: c.white, margin: 0, lineHeight: 1.3 }}>Demand Generation Engine</p>
        </div>
        <div style={{ ...nodeStyle, padding: "14px 16px" }}>
          <p style={{ fontSize: "clamp(12px,1.8vw,14px)", fontWeight: 700, color: c.white, margin: 0, lineHeight: 1.3 }}>Revenue Generation Engine</p>
        </div>
      </div>

      {/* Connector: Engines → Datenbasis (converge) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", marginBottom: "0" }}>
        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", height: "32px", justifyContent: "center" }}>
          <div style={{ width: "1px", height: "28px", background: `linear-gradient(180deg, ${c.cardBorderHover}, ${c.cardBorder})` }} />
          <span style={{ ...labelStyle, position: "absolute", bottom: "0px", whiteSpace: "nowrap" }}>liefert Lead-Daten</span>
        </div>
        {/* Right */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", height: "32px", justifyContent: "center" }}>
          <div style={{ width: "1px", height: "28px", background: `linear-gradient(180deg, ${c.cardBorderHover}, ${c.cardBorder})` }} />
          <span style={{ ...labelStyle, position: "absolute", bottom: "0px", whiteSpace: "nowrap" }}>liefert Deal-Daten</span>
        </div>
      </div>

      {/* Datenbasis */}
      <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${c.cardBorderHover}`, borderRadius: "12px", padding: "14px", textAlign: "center", width: "100%", boxSizing: "border-box", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }} />
        <p style={{ fontSize: "15px", fontWeight: 700, color: c.white, margin: 0 }}>Datenbasis</p>
      </div>

      {/* Legende */}
      <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: `1px solid ${c.cardBorder}`, display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
        {[
          { color: c.cardBorderHover, label: "Steuerungsfluss (oben nach unten)" },
          { color: "rgba(255,255,255,0.15)", label: "Feedback (unten nach oben)" },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "16px", height: "1px", background: color }} />
            <span style={{ fontSize: "11px", color: c.textMuted }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function UmsatzpilotMethode() {
  return (
    <>
      {/* Section Header */}
      <Reveal><Badge color={c.amber}>Die Methode</Badge></Reveal>
      <Reveal delay={0.08}>
        <h2 style={{ fontSize: "clamp(28px,4.5vw,44px)", fontWeight: 800, color: c.white, margin: "24px 0 16px", lineHeight: 1.1, letterSpacing: "-0.025em" }}>
          Das Umsatzpilot-System.
        </h2>
      </Reveal>
      <Reveal delay={0.14}>
        <p style={{ fontSize: "clamp(15px,2vw,17px)", color: c.textSecondary, lineHeight: 1.7, margin: "0 0 56px", maxWidth: "620px" }}>
          Fünf integrierte Bausteine, die aus einem fragmentierten Vertrieb ein System machen, das ohne dich funktioniert. Kein einzelnes Tool, kein Hack, sondern eine Architektur.
        </p>
      </Reveal>

      {/* Architecture Diagram */}
      <Reveal delay={0.2}>
        <ArchitekturDiagramm />
      </Reveal>

      {/* Bausteine Overview List */}
      <Reveal>
        <p style={{ fontSize: "12px", fontWeight: 600, color: c.textMuted, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 20px" }}>
          Die 5 Bausteine im Überblick
        </p>
      </Reveal>
      {BAUSTEINE.map((b, i) => (
        <BausteinCard key={b.num} {...b} delay={i * 0.07} />
      ))}

      <div style={{ paddingTop: "56px" }} />
      <Divider />

      <div style={{ paddingTop: "80px" }} />
      <Strategie />

      <div style={{ paddingTop: "56px" }} />
      <Divider />

      <div style={{ paddingTop: "80px" }} />
      <Datenbasis />

      <div style={{ paddingTop: "56px" }} />
      <Divider />

      <div style={{ paddingTop: "80px" }} />
      <KPIs />
    </>
  );
}
