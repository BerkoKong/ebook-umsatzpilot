import { useState } from "react";
import { Badge } from "../shared/Badge";
import { Reveal } from "../shared/Reveal";
import { c, GRID3 } from "../shared/tokens";

function VC({ num, title, description, delay = 0 }) {
  const [h, setH] = useState(false);
  return (
    <Reveal delay={delay}>
      <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background: c.card, borderRadius: "16px", padding: "clamp(24px,3vw,32px) clamp(20px,3vw,28px) clamp(20px,3vw,28px)", border: `1px solid ${h ? c.cardBorderHover : c.cardBorder}`, transition: "border-color 0.4s ease, box-shadow 0.4s ease", boxShadow: h ? "0 0 60px rgba(255,255,255,0.02)" : "none", position: "relative", overflow: "hidden", height: "100%", boxSizing: "border-box" }}>
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: h ? "70%" : "30%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)", transition: "width 0.5s ease", opacity: h ? 1 : 0.2 }} />
        <div style={{ fontSize: "clamp(36px,5vw,48px)", fontWeight: 800, lineHeight: 1, color: h ? "#222" : c.cardBorder, marginBottom: "16px", transition: "color 0.4s ease" }}>{num}</div>
        <h3 style={{ fontSize: "17px", fontWeight: 700, color: c.white, margin: "0 0 10px", lineHeight: 1.35 }}>{title}</h3>
        <p style={{ fontSize: "14px", color: c.textSecondary, lineHeight: 1.65, margin: 0 }}>{description}</p>
      </div>
    </Reveal>
  );
}

export function ReportInhalt() {
  return (
    <>
      <Reveal><Badge>Report-Inhalt</Badge></Reveal>
      <Reveal delay={0.08}><h2 style={{ fontSize: "clamp(28px,4.5vw,44px)", fontWeight: 800, color: c.white, margin: "24px 0 12px", lineHeight: 1.1, letterSpacing: "-0.025em" }}>Der Fahrplan vom manuellen Chaos zum skalierbaren Umsatzsystem.</h2></Reveal>
      <Reveal delay={0.14}><p style={{ fontSize: "clamp(15px,2vw,17px)", color: c.textSecondary, lineHeight: 1.7, margin: "0 0 56px", maxWidth: "620px" }}>Schritt für Schritt zeigen wir dir, wie Vertrieb und Marketing ohne dich funktionieren. Und trotzdem bessere Ergebnisse liefern.</p></Reveal>
      <div style={{ display: "grid", gridTemplateColumns: GRID3, gap: "16px", marginBottom: "20px" }}>
        <VC num="01" title="Das Umsatz-Autopilot-System(TM)" description="Von fragmentierten Tools zu einem integrierten System, das planbar Termine und Abschlüsse produziert." delay={0.1} />
        <VC num="02" title="30h pro Woche zurückgewinnen" description="15+ Stunden im Marketing, 10 bis 15 im Vertrieb. Durch KI-Assistenten, die repetitive Arbeit übernehmen." delay={0.16} />
        <VC num="03" title="3x mehr qualifizierte Termine" description="Mit KI-Agenten rund um die Uhr qualifizieren und Termine buchen, auch am Wochenende." delay={0.22} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: GRID3, gap: "16px", marginBottom: "20px" }}>
        <VC num="04" title="Der versteckte Margenkiller" description="Warum 40 bis 60% der Vertriebszeit an unqualifizierte Leads geht. Und wie Lead-Bewertung das ändert." delay={0.12} />
        <VC num="05" title="Vertrieb auf Autopilot" description="Sales Calls analysiert, Einwände dokumentiert, Qualität in Echtzeit überwacht." delay={0.18} />
        <VC num="06" title="Dein unfairer Wissensvorsprung" description="90% nutzen KI als Spielerei. Lerne, wie du KI als Betriebssystem einsetzt." delay={0.24} />
      </div>
      <div style={{ paddingTop: "48px" }} />
      <Reveal><div style={{ textAlign: "center", maxWidth: "580px", margin: "0 auto" }}>
        <p style={{ fontSize: "16px", fontStyle: "italic", color: c.textSecondary, lineHeight: 1.7, margin: "0 0 8px" }}>Nach diesem Report weißt du genau, welche Systeme du brauchst und wo dein größter Hebel liegt.</p>
        <p style={{ fontSize: "15px", fontWeight: 600, color: c.white, margin: 0 }}>Kein Theorie-Dokument. Ein Umsetzungsfahrplan.</p>
      </div></Reveal>
    </>
  );
}
