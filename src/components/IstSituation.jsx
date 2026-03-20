import { useState } from "react";
import { Badge } from "../shared/Badge";
import { Reveal, useInView } from "../shared/Reveal";
import { c, GRID2 } from "../shared/tokens";

function PC({ num, title, stats, body, quote, delay = 0 }) {
  const [h, setH] = useState(false);
  return (
    <Reveal delay={delay}>
      <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background: c.card, borderRadius: "16px", padding: "clamp(24px,4vw,36px) clamp(20px,3vw,32px) clamp(24px,4vw,32px)", border: `1px solid ${h ? c.cardBorderHover : c.cardBorder}`, transition: "border-color 0.4s ease, box-shadow 0.4s ease", boxShadow: h ? "0 0 60px rgba(255,255,255,0.02)" : "none", height: "100%", boxSizing: "border-box", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: h ? "80%" : "40%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)", transition: "width 0.5s ease", opacity: h ? 1 : 0.3 }} />
        <Badge color={c.textMuted}>Typ {num}</Badge>
        <h3 style={{ fontSize: "clamp(20px,3vw,24px)", fontWeight: 700, color: c.white, margin: "16px 0 6px", lineHeight: 1.2 }}>{title}</h3>
        <p style={{ fontSize: "13px", color: c.textMuted, margin: "0 0 20px", fontWeight: 500 }}>{stats}</p>
        <p style={{ fontSize: "14.5px", color: c.textSecondary, lineHeight: 1.7, margin: "0 0 24px" }}>{body}</p>
        <div style={{ borderTop: `1px solid ${c.cardBorder}`, paddingTop: "20px" }}>
          <p style={{ fontSize: "13.5px", color: c.textMuted, fontStyle: "italic", lineHeight: 1.6, margin: 0, paddingLeft: "14px", borderLeft: `2px solid ${c.cardBorder}` }}>{quote}</p>
        </div>
      </div>
    </Reveal>
  );
}

function CB({ label, hours, total, color, delay = 0 }) {
  const [ref, v] = useInView(0.1);
  const pct = (hours / total) * 100;
  return (
    <div ref={ref} style={{ marginBottom: "14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontSize: "13px", color: c.textSecondary }}>{label}</span>
        <span style={{ fontSize: "13px", fontWeight: 600, color: c.white }}>{hours}h/Wo.</span>
      </div>
      <div style={{ height: "6px", borderRadius: "3px", background: c.cardBorder, overflow: "hidden" }}>
        <div style={{ height: "100%", borderRadius: "3px", background: color, width: v ? `${pct}%` : "0%", transition: `width 1s cubic-bezier(.25,.46,.45,.94) ${delay}s` }} />
      </div>
    </div>
  );
}

export function IstSituation() {
  return (
    <>
      <Reveal><Badge>Deine Ausgangssituation</Badge></Reveal>
      <Reveal delay={0.08}><h2 style={{ fontSize: "clamp(28px,4.5vw,44px)", fontWeight: 800, color: c.white, margin: "24px 0 12px", lineHeight: 1.1, letterSpacing: "-0.025em" }}>Erkennst du dich wieder?</h2></Reveal>
      <Reveal delay={0.14}><p style={{ fontSize: "clamp(15px,2vw,17px)", color: c.textSecondary, lineHeight: 1.7, margin: "0 0 48px", maxWidth: "620px" }}>Zwei Typen. Beide erfolgreich. Beide stoßen an dieselbe Decke.</p></Reveal>
      <div style={{ display: "grid", gridTemplateColumns: GRID2, gap: "20px", marginBottom: "56px" }}>
        <PC num="01" title="Der Chaos-Skalierer" stats="120k bis 350k Euro / Monat | 15 bis 40 MA" body="Jeden Tag Feuerlöschen. CRM da, kaum genutzt. Fünfstellige Marketingausgaben, ohne zu wissen, was funktioniert." quote={'"Wir geben fünfstellig für Marketing aus, aber ich kann nicht sagen, was davon funktioniert."'} delay={0.15} />
        <PC num="02" title="Der Einmann-Flaschenhals" stats="25k bis 120k Euro / Monat | 3 bis 15 MA" body="Alles hängt an dir. Pipeline voll wenn du akquirierst, leer wenn du lieferst." quote={'"Wenn ich nicht akquiriere, kommt nichts rein. Wenn ich akquiriere, leidet die Delivery."'} delay={0.25} />
      </div>
      <Reveal><div style={{ background: c.card, borderRadius: "16px", padding: "clamp(28px,4vw,36px) clamp(24px,3vw,32px)", border: `1px solid ${c.cardBorder}`, marginBottom: "56px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${c.red}66, transparent)` }} />
        <h3 style={{ fontSize: "clamp(18px,3vw,22px)", fontWeight: 700, color: c.white, margin: "0 0 24px" }}>Der endlose Kreislauf:</h3>
        <div style={{ display: "grid", gridTemplateColumns: GRID2, gap: "28px" }}>
          <div>{["Zu wenig Aufträge, dann keine Zeit für Vertrieb. Endlosschleife.", "Ohne dich steht der Laden still. Urlaub = Handy-Dauerbetrieb.", "Prozesse existieren nur in deinem Kopf.", "Du machst +80% der Verkäufe selbst."].map((t, i) => (
            <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "14px" }}>
              <span style={{ color: c.red, fontSize: "11px", marginTop: "6px", flexShrink: 0 }}>{"\u25A0"}</span>
              <span style={{ fontSize: "14.5px", color: c.textSecondary, lineHeight: 1.65 }}>{t}</span>
            </div>
          ))}</div>
          <div>{["Vertriebler gehen nach 6 Monaten. Jeder verkauft anders.", "2 bis 3 Bestandskunden tragen deinen Umsatz.", "50% deiner Zeit = manuelle Leadgenerierung.", "Du traust dich nicht, Prozesse automatisieren zu lassen."].map((t, i) => (
            <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "14px" }}>
              <span style={{ color: c.red, fontSize: "11px", marginTop: "6px", flexShrink: 0 }}>{"\u25A0"}</span>
              <span style={{ fontSize: "14.5px", color: c.textSecondary, lineHeight: 1.65 }}>{t}</span>
            </div>
          ))}</div>
        </div>
      </div></Reveal>
      <Reveal><div style={{ background: c.card, borderRadius: "16px", padding: "clamp(24px,3vw,32px) clamp(20px,3vw,28px)", border: `1px solid ${c.cardBorder}`, marginBottom: "56px" }}>
        <h3 style={{ fontSize: "17px", fontWeight: 700, color: c.white, margin: "0 0 6px" }}>Wo deine Arbeitszeit wirklich hingeht</h3>
        <p style={{ fontSize: "13px", color: c.textMuted, margin: "0 0 24px" }}>50h/Woche Durchschnitt</p>
        <CB label="Manuelle Leadgenerierung" hours={15} total={50} color={c.red} delay={0.1} />
        <CB label="CRM-Pflege & Admin" hours={10} total={50} color={c.red} delay={0.2} />
        <CB label="Angebote & Follow-ups" hours={8} total={50} color={c.amber} delay={0.3} />
        <CB label="Kundenarbeit" hours={12} total={50} color={c.green} delay={0.4} />
        <CB label="Strategische Arbeit" hours={5} total={50} color={c.green} delay={0.5} />
        <div style={{ marginTop: "20px", padding: "16px 18px", background: "rgba(239,68,68,0.04)", borderRadius: "10px", border: "1px solid rgba(239,68,68,0.1)" }}>
          <p style={{ fontSize: "14px", color: c.textPrimary, margin: 0, lineHeight: 1.6 }}><strong style={{ color: c.red }}>66% deiner Zeit</strong> könnte automatisiert werden = <strong style={{ color: c.red }}>ca. 25.000 Euro Opportunitätskosten pro Monat.</strong></p>
        </div>
      </div></Reveal>
    </>
  );
}
