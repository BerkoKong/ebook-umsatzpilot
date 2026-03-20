import { useState } from "react";
import { Badge } from "../shared/Badge";
import { Reveal } from "../shared/Reveal";
import { c } from "../shared/tokens";

// ─── Helpers ────────────────────────────────────────────────────────────────

function SectionH2({ children }) {
  return (
    <h2 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, color: c.white, margin: "20px 0 12px", lineHeight: 1.1, letterSpacing: "-0.025em" }}>
      {children}
    </h2>
  );
}

function SectionH3({ children, mt = "0px" }) {
  return <h3 style={{ fontSize: "clamp(18px,2.5vw,22px)", fontWeight: 700, color: c.white, margin: `${mt} 0 16px`, lineHeight: 1.2 }}>{children}</h3>;
}

function CalloutBox({ title, titleColor = c.amber, borderColor = c.amber, children }) {
  return (
    <div style={{ background: `${borderColor}08`, borderRadius: "12px", padding: "18px 20px 16px", border: `1px solid ${borderColor}22`, borderLeft: `3px solid ${borderColor}`, marginBottom: "24px" }}>
      {title && <p style={{ fontSize: "11px", fontWeight: 600, color: titleColor, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 8px" }}>{title}</p>}
      <div style={{ fontSize: "14px", color: c.textSecondary, lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

function Body({ children, mb = "16px", center = false }) {
  return (
    <p style={{ fontSize: "clamp(14px,1.8vw,15.5px)", color: c.textSecondary, lineHeight: 1.75, margin: `0 0 ${mb}`, textAlign: center ? "center" : "left" }}>
      {children}
    </p>
  );
}

// ─── Block 5: 3 Nutzen-Cards ─────────────────────────────────────────────────

const NUTZEN_CARDS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={c.amber} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: "Engpässe sichtbar machen",
    text: "Ohne KPIs weißt du nicht, ob du ein Problem hast, geschweige denn wo. Zu wenig Leads? Schlechte Abschlussquote? Kunden, die nach 3 Monaten abspringen? KPIs zeigen dir exakt, wo die Pipeline leckt.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={c.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /><line x1="12" y1="2" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="22" /><line x1="2" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="22" y2="12" />
      </svg>
    ),
    title: "Daten statt Bauchgefühl",
    text: '„Wir brauchen mehr Leads" ist die häufigste Fehldiagnose im B2B. Oft ist das Problem nicht die Menge, sondern die Qualität, der Follow-up-Prozess oder die Marge. KPIs verhindern, dass du Geld in den falschen Hebel steckst.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /><path d="M4.93 4.93a10 10 0 0 0 0 14.14" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M8.46 8.46a5 5 0 0 0 0 7.07" />
      </svg>
    ),
    title: "Ohne Zahlen keine Automatisierung",
    text: "KI kann nur optimieren, was messbar ist. Wenn du nicht weißt, wie dein Funnel performt, automatisierst du Chaos. KPIs sind die Voraussetzung dafür, dass das Umsatz-Autopilot-System funktioniert.",
  },
];

function NutzenCards() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "16px", marginBottom: "56px" }}>
      {NUTZEN_CARDS.map(({ icon, title, text }, i) => (
        <Reveal key={i} delay={i * 0.07}>
          <div style={{ background: c.card, border: `1px solid ${c.cardBorder}`, borderRadius: "16px", padding: "clamp(20px,3vw,28px)", height: "100%", boxSizing: "border-box", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />
            <div style={{ marginBottom: "14px" }}>{icon}</div>
            <p style={{ fontSize: "15px", fontWeight: 700, color: c.white, margin: "0 0 10px", lineHeight: 1.3 }}>{title}</p>
            <p style={{ fontSize: "13.5px", color: c.textSecondary, lineHeight: 1.65, margin: 0 }}>{text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

// ─── Block 6: Accordion KPI-Kategorien ──────────────────────────────────────

const KPI_KATEGORIEN = [
  {
    num: "01",
    title: "Lead-Generierung & Marketing",
    color: "#60a5fa",
    kpis: [
      { name: "Qualifizierte Leads / Monat", desc: "Echte Gesprächskandidaten, nicht Besucher, nicht Follower. Aufgeteilt nach Kanal." },
      { name: "Cost per Lead (CPL)", desc: "Was kostet ein Lead pro Kanal? Zeigt, wo du investierst und wo du abschaltest." },
      { name: "Lead-to-Meeting-Rate", desc: "Wie viel % werden zum Termin? Misst deine Targeting- und Qualifizierungs-Qualität." },
    ],
  },
  {
    num: "02",
    title: "Sales & Pipeline",
    color: c.green,
    kpis: [
      { name: "Gebuchte Erstgespräche / Monat", desc: "Frühindikator Nr. 1: sinkt diese Zahl, hast du in 60 Tagen ein Umsatzproblem." },
      { name: "Pipeline Value", desc: "Gesamtwert offener Deals. Faustregel: muss mindestens 3× dein Ziel-Umsatz sein." },
      { name: "Win Rate", desc: "% der Angebote → Kunde. B2B-Schnitt: 20–30%. Darunter = Problem in Qualifizierung oder Prozess." },
      { name: "Average Deal Size", desc: "Ø Auftragswert. Damit rechnest du: X Abschlüsse × Y Euro = Ziel." },
      { name: "Sales Cycle Length", desc: "Tage vom Erstgespräch bis Abschluss. Für Cashflow-Planung und Deal-Hygiene." },
      { name: "Pipeline Velocity", desc: "(Deals × Win Rate × Deal Size) ÷ Cycle = Umsatzgeschwindigkeit deiner Maschine." },
    ],
  },
  {
    num: "03",
    title: "Umsatz & Profitabilität",
    color: c.amber,
    kpis: [
      { name: "MRR / Monatlicher Umsatz", desc: "Retainer → MRR. Projektgeschäft → monatlicher Umsatz." },
      { name: "Revenue pro Mitarbeiter", desc: "Skalierst du Umsatz, oder nur Kosten?" },
      { name: "Gewinnmarge pro Kunde", desc: "Umsatz bei 10% Marge ist ein Hamsterrad, kein Wachstum." },
      { name: "Customer Acquisition Cost (CAC)", desc: "Marketing + Sales-Zeit + Tools ÷ Neukunden = deine wahren Akquisekosten." },
      { name: "Fulfillment-Kosten pro Kunde", desc: "Was kostet die Betreuung? Der blinde Fleck bei der Margenberechnung." },
    ],
  },
  {
    num: "04",
    title: "Bestandskunden & Retention",
    color: "#f472b6",
    kpis: [
      { name: "Customer Lifetime Value (LTV)", desc: "Gesamtwert über die Vertragsdauer. Muss mindestens 3× CAC sein." },
      { name: "Churn Rate", desc: "% verlorene Kunden pro Monat/Quartal. Bei Agenturen oft komplett ignoriert." },
      { name: "Expansion Revenue / Upsell-Rate", desc: "Zusatzumsatz aus Bestandskunden, der profitabelste Umsatz überhaupt." },
      { name: "Net Revenue Retention (NRR)", desc: "Über 100% = du wächst allein durch Bestandskunden, ohne einen neuen Lead." },
    ],
  },
  {
    num: "05",
    title: "Effizienz & Kapazität",
    color: "#a78bfa",
    kpis: [
      { name: "Touchpoints bis Abschluss", desc: "Wie viele Calls, Mails, Follow-ups pro Deal? Zeigt dein Automatisierungspotenzial." },
      { name: "Zeit pro Deal-Stage", desc: "Wo bleiben Deals hängen? Zeigt den Engpass in deinem Prozess." },
      { name: "Kapazitätsauslastung", desc: "Kannst du überhaupt neue Kunden aufnehmen, bevor du akquirierst?" },
    ],
  },
];

function KPIAccordion() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "56px" }}>
      {KPI_KATEGORIEN.map(({ num, title, color, kpis }, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{ background: c.card, border: `1px solid ${isOpen ? color + "44" : c.cardBorder}`, borderRadius: "14px", overflow: "hidden", transition: "border-color 0.2s" }}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              style={{ width: "100%", background: "transparent", color: "inherit", border: "none", cursor: "pointer", padding: "18px 20px", display: "flex", alignItems: "center", gap: "14px", textAlign: "left" }}
            >
              <span style={{ flexShrink: 0, width: "32px", height: "32px", borderRadius: "10px", background: color + "15", border: `1px solid ${color}33`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "11px", fontWeight: 800, color }}>{num}</span>
              </span>
              <span style={{ flex: 1, fontSize: "clamp(14px,2vw,16px)", fontWeight: 700, color: c.white }}>{title}</span>
              <span style={{ fontSize: "18px", color: isOpen ? color : c.textMuted, transition: "transform 0.2s, color 0.2s", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", lineHeight: 1 }}>+</span>
            </button>

            {isOpen && (
              <div style={{ borderTop: `1px solid ${c.cardBorder}` }}>
                {kpis.map(({ name, desc }, j) => (
                  <div key={j} style={{ padding: "14px 20px", borderTop: j > 0 ? `1px solid ${c.cardBorder}` : "none" }}>
                    <p style={{ fontSize: "13.5px", fontWeight: 600, color: c.textPrimary, margin: "0 0 4px", lineHeight: 1.4 }}>{name}</p>
                    <p style={{ fontSize: "13px", color: c.textSecondary, lineHeight: 1.6, margin: 0 }}>{desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Block 7: Vergleichstabelle ──────────────────────────────────────────────

const VERGLEICH_ROWS = [
  { kpi: "Qualifizierte Leads / Monat", ist: "25", ziel: "60", delta: "+140%", up: true },
  { kpi: "Gebuchte Erstgespräche / Monat", ist: "8", ziel: "22", delta: "+175%", up: true },
  { kpi: "Lead-to-Meeting-Rate", ist: "32%", ziel: "37%", delta: "+5 Pp.", up: true },
  { kpi: "Win Rate", ist: "20%", ziel: "32%", delta: "+12 Pp.", up: true },
  { kpi: "Average Deal Size", ist: "4.500 Euro", ziel: "6.200 Euro", delta: "+38%", up: true },
  { kpi: "Sales Cycle Length", ist: "38 Tage", ziel: "24 Tage", delta: "–37%", up: false, positiv: true },
  { kpi: "Pipeline Velocity", ist: "4.263 Euro/Tag", ziel: "17.653 Euro/Tag", delta: "+314%", up: true, highlight: true },
  { kpi: "Monatlicher Umsatz", ist: "150.000 Euro", ziel: "280.000 Euro", delta: "+87%", up: true },
  { kpi: "Gewinnmarge", ist: "18%", ziel: "42%", delta: "+24 Pp.", up: true, highlight: true },
  { kpi: "CAC", ist: "3.800 Euro", ziel: "1.900 Euro", delta: "–50%", up: false, positiv: true },
  { kpi: "LTV", ist: "18.000 Euro", ziel: "37.200 Euro", delta: "+107%", up: true },
  { kpi: "LTV:CAC Ratio", ist: "4,7×", ziel: "19,6×", delta: "+317%", up: true },
  { kpi: "Churn Rate (monatl.)", ist: "6%", ziel: "2,5%", delta: "–58%", up: false, positiv: true },
  { kpi: "Revenue / Mitarbeiter", ist: "10.000 Euro", ziel: "18.700 Euro", delta: "+87%", up: true },
  { kpi: "Fulfillment-Kosten / Kunde", ist: "2.800 Euro", ziel: "1.600 Euro", delta: "–43%", up: false, positiv: true },
  { kpi: "NRR", ist: "94%", ziel: "112%", delta: "+18 Pp.", up: true },
];

function VergleichsTabelle() {
  return (
    <div style={{ background: c.card, border: `1px solid ${c.cardBorder}`, borderRadius: "16px", overflow: "hidden", marginBottom: "24px" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "520px", background: "transparent" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.03)", borderBottom: `1px solid ${c.cardBorder}` }}>
              {["KPI", "Ist-Zustand", "Mit System", "Delta"].map((h, i) => (
                <th key={i} style={{ padding: "12px 16px", fontSize: "11px", fontWeight: 700, color: c.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", textAlign: i === 0 ? "left" : "right", whiteSpace: "nowrap", background: "transparent" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {VERGLEICH_ROWS.map(({ kpi, ist, ziel, delta, up, positiv, highlight }, i) => {
              const deltaColor = (up || positiv) ? c.green : c.red;
              const arrow = up ? "↑" : "↓";
              return (
                <tr key={i} style={{ borderBottom: i < VERGLEICH_ROWS.length - 1 ? `1px solid ${c.cardBorder}` : "none", background: highlight ? "rgba(34,197,94,0.03)" : "transparent" }}>
                  <td style={{ padding: "11px 16px", fontSize: "13px", fontWeight: highlight ? 600 : 400, color: highlight ? c.white : c.textPrimary, whiteSpace: "nowrap" }}>{kpi}</td>
                  <td style={{ padding: "11px 16px", fontSize: "13px", color: c.textMuted, textAlign: "right", whiteSpace: "nowrap" }}>{ist}</td>
                  <td style={{ padding: "11px 16px", fontSize: "13px", color: c.green, fontWeight: 600, textAlign: "right", whiteSpace: "nowrap" }}>{ziel}</td>
                  <td style={{ padding: "11px 16px", fontSize: "13px", color: deltaColor, fontWeight: 700, textAlign: "right", whiteSpace: "nowrap" }}>{arrow} {delta}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Block 8: Minimum Viable Dashboard ──────────────────────────────────────

const MVD_CARDS = [
  { num: "01", kpi: "Qualifizierte Leads / Monat", sub: "Zufluss", value: "42" },
  { num: "02", kpi: "Gebuchte Erstgespräche / Monat", sub: "Frühindikator", value: "14" },
  { num: "03", kpi: "Win Rate", sub: "Effizienz", value: "28%" },
  { num: "04", kpi: "Average Deal Size", sub: "Hebel", value: "5.200 Euro" },
  { num: "05", kpi: "Monatl. Umsatz + Marge", sub: "Ergebnis", value: "195k · 34%" },
];

function MVDDashboard() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: "10px", marginBottom: "28px" }}>
      {MVD_CARDS.map(({ num, kpi, sub, value }, i) => (
        <div key={i} style={{ background: c.card, border: `1px solid ${c.cardBorder}`, borderRadius: "14px", padding: "18px 14px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${c.green}40, transparent)` }} />
          <span style={{ fontSize: "10px", fontWeight: 800, color: c.textMuted, letterSpacing: "0.12em" }}>{num}</span>
          <p style={{ fontSize: "clamp(24px,3.5vw,32px)", fontWeight: 800, color: c.white, margin: "8px 0 4px", lineHeight: 1 }}>{value}</p>
          <p style={{ fontSize: "11px", fontWeight: 600, color: c.green, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 6px" }}>{sub}</p>
          <p style={{ fontSize: "11.5px", color: c.textMuted, lineHeight: 1.45, margin: 0 }}>{kpi}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Main Export ────────────────────────────────────────────────────────────

export function KPIs() {
  return (
    <section>
      {/* ── Überleitung ── */}
      <Reveal>
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 60px", padding: "0 8px" }}>
          <p style={{ fontSize: "clamp(16px,2.2vw,19px)", color: c.textSecondary, lineHeight: 1.75, margin: 0 }}>
            Bevor du irgendetwas automatisierst, brauchst du Klarheit über eine Sache: Deine Zahlen. Denn der Engpass ist nicht die Technologie, es ist der fehlende Prozess. Und jeder Prozess beginnt damit, dass du weißt, wo du heute stehst.
          </p>
        </div>
      </Reveal>

      {/* ── Block 5: Heading ── */}
      <Reveal>
        <Badge color={c.amber}>Zahlen & KPIs</Badge>
      </Reveal>
      <Reveal delay={0.08}>
        <SectionH2>Deine Zahlen lügen nicht.</SectionH2>
      </Reveal>
      <Reveal delay={0.13}>
        <p style={{ fontSize: "clamp(15px,2vw,17px)", color: c.textSecondary, lineHeight: 1.7, margin: "0 0 40px", maxWidth: "620px" }}>
          Die meisten B2B-Unternehmen treffen Wachstumsentscheidungen aus dem Bauch. Ohne klare Kennzahlen erkennst du weder Engpässe noch Hebel, du steuerst blind. KPIs sind kein Reporting-Overhead, sondern dein Frühwarnsystem.
        </p>
      </Reveal>

      {/* ── 3 Nutzen-Cards ── */}
      <NutzenCards />

      {/* ── Block 6: Accordion ── */}
      <Reveal>
        <Badge color={c.textMuted}>Die KPI-Bibliothek</Badge>
      </Reveal>
      <Reveal delay={0.08}>
        <SectionH3 mt="20px">Die KPIs, die jedes B2B-Unternehmen kennen muss</SectionH3>
      </Reveal>
      <Reveal delay={0.12}>
        <Body mb="28px">
          Fünf Kategorien, aufgeteilt nach Funnel-Stufe. Klick dich durch und sieh, welche Zahlen du heute noch nicht trackst.
        </Body>
      </Reveal>
      <Reveal delay={0.16}>
        <KPIAccordion />
      </Reveal>

      {/* ── Block 7: Vergleichstabelle ── */}
      <Reveal>
        <Badge color={c.textMuted}>Vorher / Nachher</Badge>
      </Reveal>
      <Reveal delay={0.08}>
        <SectionH3 mt="20px">So sieht dein KPI-Dashboard in der Praxis aus</SectionH3>
      </Reveal>
      <Reveal delay={0.12}>
        <Body mb="28px">
          Theorie ist nutzlos ohne Kontext. Hier ein realistisches Beispiel für eine B2B-Agentur mit 15 Mitarbeitern und 150.000 Euro Monatsumsatz, vorher im Vergleich zu nachher mit dem Umsatz-Autopilot-System.
        </Body>
      </Reveal>
      <Reveal delay={0.16}>
        <VergleichsTabelle />
      </Reveal>
      <Reveal delay={0.2}>
        <div style={{ marginBottom: "56px" }}>
          <CalloutBox title="Insight">
            Die größten Hebel sitzen nicht dort, wo die meisten hinschauen. Nicht {'"'}mehr Leads{'"'} hat den Umsatz fast verdoppelt, sondern die Kombination aus höherer Win Rate, kürzerem Sales Cycle und besserer Marge. Genau das ist der Unterschied zwischen {'"'}härter arbeiten{'"'} und {'"'}klüger skalieren{'"'}.
          </CalloutBox>
        </div>
      </Reveal>

      {/* ── Block 8: Minimum Viable Dashboard ── */}
      <Reveal>
        <Badge color={c.textMuted}>Starter-Dashboard</Badge>
      </Reveal>
      <Reveal delay={0.08}>
        <SectionH3 mt="20px">Du brauchst kein BI-Tool. Du brauchst diese 5 Zahlen.</SectionH3>
      </Reveal>
      <Reveal delay={0.12}>
        <Body mb="28px">
          Nicht jeder startet mit einem vollständigen Dashboard. Diese fünf Metriken sind dein Minimum, bevor du auch nur einen Euro in Automatisierung investierst.
        </Body>
      </Reveal>
      <Reveal delay={0.16}>
        <MVDDashboard />
      </Reveal>
      <Reveal delay={0.2}>
        <p style={{ fontSize: "14px", color: c.textMuted, textAlign: "center", lineHeight: 1.6, margin: "0 0 40px" }}>
          Ohne diese fünf Zahlen ist jede KI-Automatisierung Blindflug. Starte hier, alles andere baut darauf auf.
        </p>
      </Reveal>

      {/* ── CTA ── */}
      <Reveal delay={0.24}>
        <div style={{ background: "rgba(34,197,94,0.04)", border: `1px solid rgba(34,197,94,0.2)`, borderRadius: "16px", padding: "clamp(28px,4vw,40px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${c.green}60, transparent)` }} />
          <p style={{ fontSize: "clamp(18px,2.5vw,22px)", fontWeight: 800, color: c.white, margin: "0 0 12px", lineHeight: 1.3 }}>
            Du kennst deine Zahlen nicht, oder sie gefallen dir nicht?
          </p>
          <p style={{ fontSize: "14.5px", color: c.textSecondary, lineHeight: 1.7, margin: "0 0 28px", maxWidth: "520px", marginLeft: "auto", marginRight: "auto" }}>
            In unserem kostenlosen Analysegespräch gehen wir gemeinsam dein Revenue-Dashboard durch, identifizieren deine Engpässe und zeigen dir, wo dein größter Hebel liegt.
          </p>
          <a
            href="https://cal.com/umsatzpilot"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-block", background: c.green, color: "#000", fontWeight: 700, fontSize: "15px", padding: "14px 32px", borderRadius: "100px", textDecoration: "none", letterSpacing: "-0.01em", transition: "opacity 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Kostenloses Analysegespräch buchen
          </a>
        </div>
      </Reveal>
    </section>
  );
}
