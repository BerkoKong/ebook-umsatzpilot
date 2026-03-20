import { useState } from "react";
import { Badge } from "../shared/Badge";
import { Reveal } from "../shared/Reveal";
import { c } from "../shared/tokens";

function FC({ num, title, erkennbar, realitaet, kosten, delay = 0 }) {
  const [h, setH] = useState(false);
  return (
    <Reveal delay={delay}>
      <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background: c.card, borderRadius: "16px", padding: "clamp(20px,3vw,28px)", border: `1px solid ${h ? "rgba(239,68,68,0.2)" : c.cardBorder}`, transition: "border-color 0.4s ease", boxShadow: h ? "0 0 40px rgba(239,68,68,0.03)" : "none", position: "relative", overflow: "hidden", marginBottom: "12px" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${c.red}44, transparent)`, opacity: h ? 1 : 0.3, transition: "opacity 0.4s ease" }} />
        <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "20px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "10px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)" }}>
            <span style={{ fontSize: "14px", fontWeight: 800, color: c.red }}>{num}</span>
          </div>
          <h3 style={{ fontSize: "clamp(15px,2vw,17px)", fontWeight: 700, color: c.white, margin: 0, lineHeight: 1.35, paddingTop: "6px" }}>{title}</h3>
        </div>
        <div style={{ marginBottom: "16px" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, color: c.red, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 8px" }}>Das erkennst du daran</p>
          {erkennbar.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "6px" }}>
              <span style={{ color: c.textMuted, fontSize: "11px", marginTop: "5px", flexShrink: 0 }}>&#9656;</span>
              <span style={{ fontSize: "13.5px", color: c.textSecondary, lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: "16px" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, color: c.amber, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 8px" }}>Warum das passiert</p>
          <p style={{ fontSize: "13.5px", color: c.textSecondary, lineHeight: 1.65, margin: 0 }}>{realitaet}</p>
        </div>
        <div style={{ background: "rgba(239,68,68,0.04)", borderRadius: "10px", padding: "16px 18px", border: "1px solid rgba(239,68,68,0.1)" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, color: c.red, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 6px" }}>Die versteckten Kosten</p>
          <p style={{ fontSize: "13.5px", color: c.textPrimary, lineHeight: 1.6, margin: 0 }}>{kosten}</p>
        </div>
      </div>
    </Reveal>
  );
}

export function SechsFehler() {
  return (
    <>
      <Reveal><Badge color={c.red}>Problembewusstsein</Badge></Reveal>
      <Reveal delay={0.08}><h2 style={{ fontSize: "clamp(28px,4.5vw,44px)", fontWeight: 800, color: c.white, margin: "24px 0 12px", lineHeight: 1.1, letterSpacing: "-0.025em" }}>Die 6 häufigsten Fehler, die dein Wachstum blockieren.</h2></Reveal>
      <Reveal delay={0.14}><p style={{ fontSize: "clamp(15px,2vw,17px)", color: c.textSecondary, lineHeight: 1.7, margin: "0 0 48px", maxWidth: "620px" }}>Was B2B-Unternehmen systematisch ausbremst.</p></Reveal>
      <FC num="01" title="Du automatisierst den falschen Teil" erkennbar={["Teams automatisieren 28% Verkaufszeit und ignorieren 72% Verwaltung.", "CRMs pflegen, Leads recherchieren, Daten kopieren, Follow-ups schreiben."]} realitaet="Tod durch 1.000 Kleinstaufgaben. Und das bevor das erste Gespräch beginnt." kosten="3 Vertriebler à 10h Admin pro Woche = 120h pro Monat = ca. 18.000 Euro verlorene Kapazität." delay={0.1} />
      <FC num="02" title="Undokumentierte oder kaputte Prozesse" erkennbar={["Marketing-Budget fühlt sich an wie Glücksspiel.", "Prozesse existieren nur in Köpfen. Kein Standard."]} realitaet="Du kannst nicht automatisieren, was kein wiederholbarer Prozess ist." kosten="Jeder Mitarbeiterwechsel = 3 bis 6 Monate Einarbeitung. Ohne SOPs geht alles Wissen verloren." delay={0.14} />
      <FC num="03" title="Kein sauberes KPI-Tracking" erkennbar={["Entscheidungen nach Bauchgefühl.", "Ads performen nicht? Du vermutest Marketing, dabei liegt es am Sales-Prozess."]} realitaet="Ohne Metriken optimierst du blind." kosten="30 bis 40% des Marketing-Budgets fließt in Kanäle, die nicht konvertieren." delay={0.18} />
      <FC num="04" title="Daten vorhanden, aber nicht nutzbar" erkennbar={["Leadlisten veraltet, verstreut über Excel und verschiedene Systeme.", "Tools kommunizieren nicht."]} realitaet="Daten ohne Struktur sind kein Asset." kosten="15 bis 25% Umsatzverlust durch verlorene Leads und falsche Priorisierung." delay={0.22} />
      <FC num="05" title="Skalierung über Köpfe statt Systeme" erkennbar={["Kaltakquise funktioniert, aber ist nicht auf Knopfdruck skalierbar.", "Vertriebspersönlichkeiten extrem selten."]} realitaet="Jeder Hire: Recruiting, Ausbildung, Führung. Geht er nach 6 Monaten, fängst du von vorne an." kosten="Ein fehlgeschlagener Hire: 30.000 bis 60.000 Euro. Kein Ergebnis." delay={0.26} />
      <FC num="06" title="Keine KI-Strategie, nur Tools" erkennbar={["Chatbot hier, Tool dort. Kein strategischer Plan.", "Keine KPIs, keine Integration in Geschäftsergebnisse."]} realitaet="Deine Wettbewerber verbinden KI bereits mit Umsatz und ROI." kosten="Unternehmen mit KI-Strategie wachsen 2 bis 3x schneller." delay={0.3} />
      <div style={{ paddingTop: "40px" }} />
      <Reveal><div style={{ background: c.card, borderRadius: "16px", padding: "clamp(28px,4vw,36px) clamp(24px,3vw,32px)", textAlign: "center", border: `1px solid ${c.cardBorder}`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "60%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }} />
        <p style={{ fontSize: "clamp(17px,2.5vw,20px)", fontWeight: 700, color: c.white, margin: "0 0 16px" }}>Kommt dir das bekannt vor?</p>
        <p style={{ fontSize: "15px", color: c.textSecondary, lineHeight: 1.7, margin: 0, maxWidth: "560px", marginLeft: "auto", marginRight: "auto" }}>Keiner dieser Fehler ist ein Todesurteil. Jeder lässt sich systematisch lösen.</p>
      </div></Reveal>
    </>
  );
}
