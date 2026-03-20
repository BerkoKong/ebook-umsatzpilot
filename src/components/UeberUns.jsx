import { useState } from "react";
import { Badge } from "../shared/Badge";
import { Reveal, useInView } from "../shared/Reveal";
import { c, GRID2 } from "../shared/tokens";

function StatBlock({ value, label, delay = 0 }) {
  const [ref, v] = useInView(0.1);
  return (
    <div ref={ref} style={{ textAlign: "center", padding: "20px 8px" }}>
      <div style={{ fontSize: "clamp(20px,3.5vw,32px)", fontWeight: 800, color: c.white, lineHeight: 1, marginBottom: "8px", opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(12px)", transition: `all 0.6s cubic-bezier(.25,.46,.45,.94) ${delay}s` }}>{value}</div>
      <div style={{ fontSize: "12px", color: c.textMuted, fontWeight: 500, lineHeight: 1.4 }}>{label}</div>
    </div>
  );
}

function IconBox({ children, color }) {
  return (
    <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: `${color}10`, border: `1px solid ${color}25`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
      {children}
    </div>
  );
}

function KernwertCard({ svgPath, title, text, delay = 0 }) {
  const [h, setH] = useState(false);
  return (
    <Reveal delay={delay}>
      <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background: c.card, borderRadius: "16px", padding: "28px 24px", border: `1px solid ${h ? c.cardBorderHover : c.cardBorder}`, transition: "border-color 0.4s ease", height: "100%", boxSizing: "border-box" }}>
        <IconBox color={c.white}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={svgPath} />
          </svg>
        </IconBox>
        <h4 style={{ fontSize: "15px", fontWeight: 700, color: c.white, margin: "0 0 8px", lineHeight: 1.3 }}>{title}</h4>
        <p style={{ fontSize: "13px", color: c.textSecondary, lineHeight: 1.65, margin: 0 }}>{text}</p>
      </div>
    </Reveal>
  );
}

function Milestone({ year, text, highlight, delay = 0 }) {
  const [ref, v] = useInView(0.1);
  return (
    <Reveal delay={delay}>
      <div style={{ display: "flex", gap: "16px", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: "20px" }}>
          <div ref={ref} style={{ width: "8px", height: "8px", borderRadius: "50%", background: v ? c.white : "#333", transition: "all 0.5s ease", flexShrink: 0, marginTop: "7px" }} />
          <div style={{ width: "1px", flex: 1, background: c.cardBorder, minHeight: "24px" }} />
        </div>
        <div style={{ paddingBottom: "24px" }}>
          <span style={{ fontSize: "12px", fontWeight: 700, color: c.textMuted, letterSpacing: "0.06em" }}>{year}</span>
          <p style={{ fontSize: "14.5px", color: c.textPrimary, lineHeight: 1.6, margin: "4px 0 0" }}>
            {text}{highlight && <strong style={{ color: c.white }}> {highlight}</strong>}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export function UeberUns() {
  return (
    <>
      <Reveal><Badge>Wer dahinter steht</Badge></Reveal>
      <Reveal delay={0.08}>
        <h2 style={{ fontSize: "clamp(28px,4.5vw,44px)", fontWeight: 800, color: c.white, margin: "24px 0 16px", lineHeight: 1.1, letterSpacing: "-0.025em" }}>
          Kein Berater, der redet.{" "}
          <span style={{ color: c.textMuted }}>Ein Ingenieur, der baut.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.14}>
        <p style={{ fontSize: "clamp(15px,2vw,17px)", color: c.textSecondary, lineHeight: 1.7, margin: "0 0 56px", maxWidth: "620px" }}>
          Umsatzpilot ist kein Coaching-Programm und keine klassische Agentur. Sondern ein KI-Transformationspartner, der Umsatzsysteme baut. Gegründet von jemandem, der beide Seiten versteht: die Technologie und das Business.
        </p>
      </Reveal>

      {/* Founder Card */}
      <Reveal delay={0.18}>
        <div style={{ background: c.card, borderRadius: "20px", border: `1px solid ${c.cardBorder}`, marginBottom: "48px", position: "relative", overflow: "hidden" }}>
          <div style={{ height: "3px", background: "linear-gradient(90deg, rgba(255,255,255,0.1), transparent)" }} />
          <div style={{ padding: "clamp(28px,4vw,40px) clamp(24px,4vw,36px) clamp(28px,4vw,36px)" }}>
            <div style={{ marginBottom: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "14px", overflow: "hidden", border: `1px solid ${c.cardBorder}`, flexShrink: 0 }}>
                  <img src="/images/Headshot_Berk copy.png" alt="Berk Celikkol" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "22px", fontWeight: 800, color: c.white, margin: 0, lineHeight: 1.2 }}>Berk Celikkol</h3>
                  <p style={{ fontSize: "13px", color: c.textMuted, margin: "2px 0 0", fontWeight: 500 }}>Gründer & Geschäftsführer, Umsatzpilot</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "14px" }}>
                {["Wirtschaftsinformatiker", "KI-Ingenieur", "SaaS-Founder"].map((t, i) => (
                  <span key={i} style={{ padding: "4px 12px", borderRadius: "100px", border: `1px solid ${c.cardBorder}`, fontSize: "11px", fontWeight: 600, color: c.textMuted, letterSpacing: "0.04em" }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: "32px" }}>
              <p style={{ fontSize: "15.5px", color: c.textPrimary, lineHeight: 1.75, margin: "0 0 16px" }}>
                Wirtschaftsinformatiker, KI-Ingenieur und Gründer der Unternehmensgruppe BetaGamma. Mit über 300 betreuten Kunden, mehr als 1.000 gebauten KI-Systemen und einer eigenen Vertriebssoftware mit 200 aktiven Nutzern. Ausgezeichnet mit Fachpreisen der Deutschen Mathematiker-Vereinigung, der Deutschen Physikalischen Gesellschaft und der Gesellschaft für Informatik.
              </p>
              <p style={{ fontSize: "15.5px", color: c.textPrimary, lineHeight: 1.75, margin: "0 0 16px" }}>
                Ich kenne die Situation aus erster Hand: Alles hängt an einer Person, 16-Stunden-Tage, Vertrieblern vertraut, die nach wenigen Monaten die Motivation verlieren. Umsatzeinbrüche ohne Planbarkeit. Umsatz war immer an Köpfe gekoppelt.
              </p>
              <p style={{ fontSize: "15.5px", color: c.textPrimary, lineHeight: 1.75, margin: "0 0 16px" }}>
                In der Arbeit mit dutzenden Kunden habe ich immer dasselbe Muster gesehen: Die Wachstumsbremse war nie die Leistung, sondern die fehlende Infrastruktur, um Systeme für sich arbeiten zu lassen.
              </p>
              <p style={{ fontSize: "15.5px", color: c.textSecondary, lineHeight: 1.75, margin: 0 }}>
                <strong style={{ color: c.white }}>Der Wendepunkt:</strong> Eigene Vertriebssoftware entwickelt und KI-gestützte Prozessautomatisierung als entscheidenden Hebel erkannt. Die Erkenntnis: Wachstum muss nicht von Menschen abhängen, sondern kann von Systemen getragen werden. Deswegen seit Oktober 2024: <strong style={{ color: c.white }}>Umsatzpilot.</strong> Keine Beratung die redet, sondern ein KI-Transformationspartner, der Umsatzsysteme baut.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Social Proof Numbers */}
      <Reveal>
        <div style={{ background: c.card, borderRadius: "16px", padding: "12px 16px", border: `1px solid ${c.cardBorder}`, marginBottom: "48px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: "4px" }}>
            <StatBlock value="100.000+" label="Qualifizierte Leads" delay={0.1} />
            <StatBlock value="12.000+" label="Qualifizierte Termine" delay={0.2} />
            <StatBlock value="1.000+" label="Aktive RevOps-Systeme" delay={0.3} />
            <StatBlock value="300+" label="Betreute Kunden" delay={0.4} />
          </div>
        </div>
      </Reveal>

      {/* Timeline */}
      <Reveal>
        <div style={{ background: c.card, borderRadius: "16px", padding: "clamp(24px,3vw,32px) clamp(20px,3vw,28px)", border: `1px solid ${c.cardBorder}`, marginBottom: "48px" }}>
          <h3 style={{ fontSize: "17px", fontWeight: 700, color: c.white, margin: "0 0 24px" }}>Der Weg zu Umsatzpilot</h3>
          <Milestone year="2021" text="Erstes Unternehmen gegründet. Harte Lektion gelernt:" highlight="Systeme schlagen Hustle." delay={0.08} />
          <Milestone year="2022" text="Studium Wirtschaftsinformatik. Abitur 1,0 mit drei Fachpreisen (Mathematik, Physik, Informatik)." delay={0.12} />
          <Milestone year="Jan 2023" text="Gründung der Unternehmensgruppe BetaGamma." highlight="Skalierung auf 150.000+ Euro monatlich." delay={0.16} />
          <Milestone year="2023 bis 2024" text="Über 300 Kunden betreut, eigene Vertriebssoftware mit 200 aktiven Nutzern gelauncht." highlight="Mehr als 1.000 KI-Systeme gebaut." delay={0.2} />
          <Milestone year="Okt 2024" text="Umsatzpilot geht live. Fokus: KI-gestützte Umsatzsysteme für B2B-Dienstleister." delay={0.24} />
        </div>
      </Reveal>

      {/* Kernwerte */}
      <Reveal><h3 style={{ fontSize: "20px", fontWeight: 700, color: c.white, margin: "0 0 20px" }}>Wofür Umsatzpilot steht</h3></Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))", gap: "14px", marginBottom: "48px" }}>
        <KernwertCard svgPath="M13 2L3 14h9l-1 8 10-12h-9l1-8z" title="Unabhängigkeit" text="Unternehmerische Freiheit ist das Ziel. Frei von Headcount, externen Dienstleistern und einzelnen Personen. Dein System läuft, unabhängig von dir." delay={0.1} />
        <KernwertCard svgPath="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" title="System-First Ansatz" text="Keine isolierten Taktiken. Fünf Bausteine, die ineinandergreifen. Das unterscheidet uns fundamental von Agenturen." delay={0.16} />
        <KernwertCard svgPath="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8zM22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" title="Partnerschaft" text="Seite an Seite. Keine Blackbox-Übergabe, sondern Adoption, Schulung und Ownership. Deswegen begrenzte Plätze." delay={0.22} />
        <KernwertCard svgPath="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" title="Nachhaltigkeit & Stabilität" text="Keine Quick-Fixes. Datenbasis, RevOps, Engines: Systeme die einmal stehen und dann tragen." delay={0.28} />
      </div>

      {/* Closing quote */}
      <Reveal>
        <div style={{ background: c.card, borderRadius: "16px", padding: "clamp(28px,4vw,36px) clamp(24px,3vw,32px)", border: `1px solid ${c.cardBorder}`, textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "60%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }} />
          <p style={{ fontSize: "clamp(16px,2.5vw,18px)", fontWeight: 700, color: c.white, margin: "0 0 12px", lineHeight: 1.35 }}>
            {`"Die meisten Unternehmen stellen neue Leute ein, um zu wachsen. Wir bauen Umsatzsysteme."`}
          </p>
          <p style={{ fontSize: "15px", color: c.textSecondary, lineHeight: 1.7, margin: 0, maxWidth: "520px", marginLeft: "auto", marginRight: "auto" }}>
            Der größte Wettbewerbsvorteil der nächsten Jahre wird nicht das beste Team sein, sondern die beste Infrastruktur.
          </p>
        </div>
      </Reveal>
    </>
  );
}
