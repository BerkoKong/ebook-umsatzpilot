import { Badge } from "../shared/Badge";
import { Reveal } from "../shared/Reveal";
import { c } from "../shared/tokens";

// ─── Helpers ────────────────────────────────────────────────────────────────

function CalloutBox({ title, titleColor = c.amber, borderColor = c.amber, children }) {
  return (
    <div style={{ background: `${borderColor}08`, borderRadius: "12px", padding: "18px 20px 16px", border: `1px solid ${borderColor}22`, borderLeft: `3px solid ${borderColor}`, marginBottom: "24px" }}>
      {title && <p style={{ fontSize: "11px", fontWeight: 600, color: titleColor, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 8px" }}>{title}</p>}
      <div style={{ fontSize: "14px", color: c.textSecondary, lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

function SectionH3({ children }) {
  return <h3 style={{ fontSize: "clamp(18px,2.5vw,22px)", fontWeight: 700, color: c.white, margin: "0 0 16px", lineHeight: 1.2 }}>{children}</h3>;
}

function Body({ children, mb = "16px" }) {
  return <p style={{ fontSize: "clamp(14px,1.8vw,15.5px)", color: c.textSecondary, lineHeight: 1.75, margin: `0 0 ${mb}` }}>{children}</p>;
}

// ─── Vier Ausführende (4-Spalten Diagramm) ──────────────────────────────────

function AusfuehrendeGrid() {
  const items = [
    { title: "Mitarbeiter", color: "#60a5fa", items: ["Strategische Aufgaben", "Beziehungsarbeit", "Entscheidungen"] },
    { title: "Software", color: c.textSecondary, items: ["Regelbasierte Abläufe", "Datenverwaltung", "Benachrichtigungen"] },
    { title: "Automatisierung", color: c.amber, items: ["Wiederkehrende Workflows", "Datenübertragung", "Triggerbasierte Aktionen"] },
    { title: "KI-Agent", color: c.green, items: ["Content-Erstellung", "Lead Research", "Qualifizierung, Analyse"] },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))", gap: "12px", marginBottom: "24px" }}>
      {items.map(({ title, color, items: rows }) => (
        <div key={title} style={{ background: c.card, borderRadius: "12px", border: `1px solid ${c.cardBorder}`, padding: "16px 14px", borderTop: `2px solid ${color}` }}>
          <p style={{ fontSize: "13px", fontWeight: 700, color, margin: "0 0 10px" }}>{title}</p>
          {rows.map((row, i) => (
            <p key={i} style={{ fontSize: "12.5px", color: c.textSecondary, lineHeight: 1.5, margin: "0 0 4px" }}>{row}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── Vier Säulen Tabelle ────────────────────────────────────────────────────

const SAEULEN = [
  {
    title: "Lead-Generierung & Qualifizierung",
    desc: "Wie kommen Leads rein? Inbound-Funnels, Outbound-Sequenzen, Lead Scoring, ICP-Matching, Übergabe-Kriterien an den Vertrieb.",
  },
  {
    title: "Pipeline & Sales Process",
    desc: "Vom qualifizierten Lead zum Abschluss: CRM-Disziplin, Deal Stages, Follow-up-Kadenzen, Angebotsprozess, Forecasting, Win/Loss-Analyse.",
  },
  {
    title: "After-Sales & Customer Success",
    desc: "Übergabe an Delivery, Onboarding-Workflows, Bestandskunden-Pflege, Upsell-/Cross-Sell-Trigger, Churn-Prävention.",
  },
  {
    title: "Daten, Tools & Reporting",
    desc: "CRM, Automations, Dashboards, Datenflüsse zwischen Systemen. Das Nervensystem deines Umsatzprozesses.",
  },
];

function SaeulenTabelle() {
  return (
    <div style={{ border: `1px solid ${c.cardBorder}`, borderRadius: "12px", overflow: "hidden", marginBottom: "28px" }}>
      <div style={{ overflowX: "auto" }}>
        <div style={{ minWidth: "400px" }}>
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", background: "rgba(255,255,255,0.03)", borderBottom: `1px solid ${c.cardBorder}` }}>
            <div style={{ padding: "10px 16px", fontSize: "11px", fontWeight: 700, color: c.textMuted, letterSpacing: "0.08em", textTransform: "uppercase" }}>Säule</div>
            <div style={{ padding: "10px 16px", fontSize: "11px", fontWeight: 700, color: c.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", borderLeft: `1px solid ${c.cardBorder}` }}>Was gehört dazu?</div>
          </div>
          {SAEULEN.map((row, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 2fr", borderBottom: i < SAEULEN.length - 1 ? `1px solid ${c.cardBorder}` : "none" }}>
              <div style={{ padding: "14px 16px", fontSize: "13px", fontWeight: 700, color: c.textPrimary, lineHeight: 1.4 }}>{row.title}</div>
              <div style={{ padding: "14px 16px", fontSize: "13px", color: c.textSecondary, lineHeight: 1.6, borderLeft: `1px solid ${c.cardBorder}` }}>{row.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Primäre vs. unterstützende Prozesse ────────────────────────────────────

function PrimaerTabelle() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "12px", marginBottom: "28px" }}>
      <div style={{ background: c.card, border: `1px solid ${c.cardBorder}`, borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ background: "rgba(34,197,94,0.08)", padding: "12px 16px", borderBottom: `1px solid ${c.cardBorder}` }}>
          <p style={{ fontSize: "12px", fontWeight: 700, color: c.green, margin: 0 }}>Primäre Prozesse (Kernprozesse)</p>
        </div>
        <div style={{ padding: "14px 16px" }}>
          <p style={{ fontSize: "13px", color: c.textSecondary, lineHeight: 1.6, margin: "0 0 12px" }}>Tragen direkt zur Umsatzgenerierung bei und sind eng mit der Customer Journey verbunden:</p>
          {["Lead-Generierung & Outreach", "Qualifizierung & Erstgespräche", "Angebotserstellung & Abschluss", "Onboarding & Upselling"].map((t, i) => (
            <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "6px" }}>
              <span style={{ color: c.green, fontSize: "12px", flexShrink: 0 }}>•</span>
              <span style={{ fontSize: "13px", color: c.textSecondary }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: c.card, border: `1px solid ${c.cardBorder}`, borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ background: "rgba(255,255,255,0.03)", padding: "12px 16px", borderBottom: `1px solid ${c.cardBorder}` }}>
          <p style={{ fontSize: "12px", fontWeight: 700, color: c.textSecondary, margin: 0 }}>Unterstützende Prozesse (Support)</p>
        </div>
        <div style={{ padding: "14px 16px" }}>
          <p style={{ fontSize: "13px", color: c.textSecondary, lineHeight: 1.6, margin: "0 0 12px" }}>Ermöglichen die primären Prozesse, generieren aber nicht direkt Umsatz:</p>
          {["CRM-Datenpflege & Hygiene", "Reporting & Dashboards", "Content-Produktion", "Termin- & Kalendermanagement"].map((t, i) => (
            <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "6px" }}>
              <span style={{ color: c.textMuted, fontSize: "12px", flexShrink: 0 }}>•</span>
              <span style={{ fontSize: "13px", color: c.textSecondary }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Automatisierungsmatrix ──────────────────────────────────────────────────

function AutomatisierungsMatrix() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "28px" }}>
      {/* Vollständig automatisierbar */}
      <div style={{ background: "rgba(34,197,94,0.05)", border: `1px solid rgba(34,197,94,0.2)`, borderRadius: "12px", padding: "20px" }}>
        <p style={{ fontSize: "13px", fontWeight: 700, color: c.green, margin: "0 0 14px" }}>{'✓'} Vollständig automatisierbar (heute, sofort)</p>
        {[
          { label: "Lead Research & Enrichment", desc: "Firmendaten anreichern, Entscheider identifizieren, ICP-Matching, Social-Selling-Signale erkennen" },
          { label: "Outreach & Follow-ups", desc: "Personalisierte Erstansprache, automatische Follow-up-Ketten, Meeting-Buchung ohne Ping-Pong" },
          { label: "CRM-Hygiene", desc: "Automatisches Logging, Deal-Stage-Updates, Duplikat-Erkennung, Kontaktdaten aktuell halten" },
          { label: "Reporting & Dashboards", desc: "KPI-Zusammenstellung, Anomalie-Erkennung, Pipeline-Forecasting" },
          { label: "Termin-Management", desc: "Bestätigungen, Erinnerungen, No-Show-Follow-ups, Meeting-Briefings" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "8px" }}>
            <span style={{ color: c.green, fontSize: "12px", flexShrink: 0, marginTop: "2px" }}>•</span>
            <span style={{ fontSize: "13.5px", color: c.textSecondary, lineHeight: 1.55 }}>
              <span style={{ color: c.textPrimary, fontWeight: 600 }}>{item.label}:</span>{" "}{item.desc}
            </span>
          </div>
        ))}
      </div>

      {/* Teilweise automatisierbar */}
      <div style={{ background: "rgba(245,158,11,0.05)", border: `1px solid rgba(245,158,11,0.2)`, borderRadius: "12px", padding: "20px" }}>
        <p style={{ fontSize: "13px", fontWeight: 700, color: c.amber, margin: "0 0 14px" }}>{'◐'} Teilweise automatisierbar (KI unterstützt, Mensch entscheidet)</p>
        {[
          { label: "Lead-Qualifizierung & Scoring", desc: "KI bewertet und priorisiert, du entscheidest, ob der Lead wirklich passt" },
          { label: "Content-Erstellung", desc: "KI liefert Entwürfe für E-Mails, Posts, Case Studies, du gibst die strategische Richtung vor" },
          { label: "Angebotserstellung", desc: "System generiert fertigen Entwurf auf Basis von Templates und Deal-Daten, du passt Pricing und Scope an" },
          { label: "Kunden-Onboarding", desc: "Automatische Willkommens-Sequenzen und Projekt-Setup, persönlicher Kick-off bleibt Mensch-zu-Mensch" },
          { label: "Churn-Prävention", desc: "KI erkennt Warnsignale (sinkende Engagement-Werte, ausbleibende Antworten), das Gespräch führst du" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "8px" }}>
            <span style={{ color: c.amber, fontSize: "12px", flexShrink: 0, marginTop: "2px" }}>•</span>
            <span style={{ fontSize: "13.5px", color: c.textSecondary, lineHeight: 1.55 }}>
              <span style={{ color: c.textPrimary, fontWeight: 600 }}>{item.label}:</span>{" "}{item.desc}
            </span>
          </div>
        ))}
      </div>

      {/* Nicht automatisierbar */}
      <div style={{ background: "rgba(239,68,68,0.05)", border: `1px solid rgba(239,68,68,0.2)`, borderRadius: "12px", padding: "20px" }}>
        <p style={{ fontSize: "13px", fontWeight: 700, color: c.red, margin: "0 0 14px" }}>{'✗'} Nicht automatisierbar (bleibt Mensch)</p>
        {[
          { label: "Strategische Verkaufsgespräche & Verhandlungen", desc: "Discovery Calls, Bedarfsanalyse, Einwandbehandlung, Preisverhandlung" },
          { label: "Beziehungsaufbau & Vertrauen", desc: "Im B2B kauft der Kunde den Menschen. Empathie und Chemie sind nicht automatisierbar" },
          { label: "Strategische Entscheidungen", desc: "Positionierung, Zielmarkt, Pricing-Strategie, das bleibt Führungsaufgabe" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "8px" }}>
            <span style={{ color: c.red, fontSize: "12px", flexShrink: 0, marginTop: "2px" }}>•</span>
            <span style={{ fontSize: "13.5px", color: c.textSecondary, lineHeight: 1.55 }}>
              <span style={{ color: c.textPrimary, fontWeight: 600 }}>{item.label}:</span>{" "}{item.desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Export ────────────────────────────────────────────────────────────

export function RevOps() {
  return (
    <section>
      {/* ── Chapter Badge + Heading ── */}
      <Reveal>
        <Badge color={c.amber}>Baustein 04</Badge>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, color: c.white, margin: "20px 0 12px", lineHeight: 1.1, letterSpacing: "-0.025em" }}>
          Revenue Operations: Das Betriebssystem deines Umsatzes
        </h2>
      </Reveal>
      <Reveal delay={0.13}>
        <p style={{ fontSize: "clamp(14px,1.8vw,16px)", color: c.amber, fontStyle: "italic", margin: "0 0 32px", lineHeight: 1.6 }}>
          Warum dein Vertrieb kein Talent-Problem hat, sondern ein System-Problem.
        </p>
      </Reveal>

      {/* ── Intro ── */}
      <Reveal delay={0.16}>
        <Body>
          Stell dir vor, du betreibst eine Agentur mit 15 Mitarbeitern. Dein Umsatz wächst, aber nur, wenn du persönlich jeden Deal vorantreibst. Dein Kalender ist voll, dein CRM halb gepflegt, und wenn du eine Woche im Urlaub bist, passiert im Vertrieb: nichts.
        </Body>
        <Body>
          Das ist kein Zufall. Das ist das Symptom eines fehlenden Systems.
        </Body>
        <Body mb="32px">
          Revenue Operations (RevOps) ist die Antwort auf genau dieses Problem. Es ist der strukturierte Ansatz, deinen gesamten Umsatzprozess, von der ersten Kontaktaufnahme bis zum wiederkehrenden Bestandskunden-Umsatz, als einen durchgängigen, messbaren Prozess zu behandeln. Nicht als Sammlung von Einzelaktionen, die im Kopf des Geschäftsführers zusammenlaufen.
        </Body>
      </Reveal>

      {/* ── Was ist RevOps ── */}
      <Reveal>
        <SectionH3>Was ist Revenue Operations, und was nicht?</SectionH3>
        <Body>
          RevOps ist die operative Klammer um alles, was direkt deinen Umsatz beeinflusst. Der Kern: Marketing, Vertrieb und After-Sales werden nicht als isolierte Abteilungen betrachtet, sondern als ein zusammenhängender Umsatzprozess, mit gemeinsamen Daten, gemeinsamen KPIs und gemeinsamen Zielen.
        </Body>
      </Reveal>
      <Reveal>
        <CalloutBox title="Der entscheidende Perspektivwechsel" borderColor="#60a5fa" titleColor="#60a5fa">
          Dein Unternehmen ist nichts anderes als eine Verkettung von hunderten kleinen Geschäftsprozessen. Jeder Prozess hat einen Auslöser, eine Abfolge von Schritten und ein Ergebnis. Deine Aufgabe als Geschäftsführer ist es, diese Prozesse sichtbar zu machen, zu messen und systematisch zu verbessern.
        </CalloutBox>
      </Reveal>

      {/* ── Vier Säulen ── */}
      <Reveal>
        <p style={{ fontSize: "13px", fontWeight: 700, color: c.textSecondary, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Die vier Säulen deines Umsatzprozesses</p>
        <SaeulenTabelle />
        <Body mb="28px">
          Was gehört nicht zu RevOps? Alles ohne direkten, messbaren Einfluss auf den Umsatzprozess: reines Branding ohne Conversion-Ziel, HR, Produktentwicklung, Buchhaltung, IT-Infrastruktur ohne Revenue-Bezug. Diese Bereiche sind wichtig, aber sie sind nicht Teil des Umsatzprozesses.
        </Body>
      </Reveal>

      {/* ── Prozesse nicht Bauchgefühl ── */}
      <Reveal>
        <SectionH3>Vertrieb {'&'} Marketing bestehen aus Prozessen, nicht aus Bauchgefühl</SectionH3>
        <Body>
          Das klingt offensichtlich, wird aber in der Praxis von den meisten B2B-Unternehmen ignoriert. Vertrieb passiert {'"'}irgendwie{'"'}: Der GF telefoniert, wenn er Zeit hat. Follow-ups passieren, wenn jemand daran denkt. Angebote werden geschrieben, wenn der Kunde zum dritten Mal nachfragt.
        </Body>
        <Body mb="24px">
          RevOps dreht diese Denkweise um: Jeder Umsatzprozess hat einen definierten Auslöser (Trigger), eine klare Abfolge von Schritten und ein messbares Ergebnis. Und jeder dieser Schritte wird von einem von vier {'"'}Ausführenden{'"'} erledigt:
        </Body>
        <AusfuehrendeGrid />
      </Reveal>

      <Reveal>
        <Body mb="20px">
          <strong style={{ color: c.textPrimary }}>Die zentrale Frage bei jedem Prozessschritt lautet:</strong> Muss das noch ein Mensch machen, oder kann das eine Software, ein Workflow oder eine KI übernehmen?
        </Body>
        <CalloutBox title="Wichtig zu verstehen" borderColor="#60a5fa" titleColor="#60a5fa">
          Es muss nicht zwingend der gesamte Prozess automatisiert werden. Schon die Automatisierung einzelner Teilschritte, z.B. das automatische Versenden einer Follow-up-Mail nach dem Erstgespräch, bringt einen erheblichen Mehrwert. Digitalisierung beginnt mit der Festlegung fester Prozesse. Diese können später angepasst und erweitert werden.
        </CalloutBox>
      </Reveal>

      {/* ── Primäre vs. unterstützende Prozesse ── */}
      <Reveal>
        <p style={{ fontSize: "13px", fontWeight: 700, color: c.textSecondary, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Primäre vs. unterstützende Umsatzprozesse</p>
        <Body mb="16px">
          Nicht jeder Prozess hat den gleichen Umsatz-Impact. Die Unterscheidung hilft dir, Prioritäten für die Automatisierung zu setzen:
        </Body>
        <PrimaerTabelle />
      </Reveal>

      {/* ── RevOps mit KI ── */}
      <Reveal>
        <SectionH3>Die neue Perspektive: RevOps mit KI {'&'} Automatisierung</SectionH3>
        <Body>
          Bis vor wenigen Jahren war RevOps eine Disziplin für Unternehmen mit großen Revenue-Teams und eigenen Ops-Abteilungen. Das hat sich fundamental geändert. Durch KI-Agenten und Workflow-Automatisierung kann heute ein 10-Personen-Unternehmen RevOps auf einem Niveau betreiben, das früher nur Enterprise-Firmen möglich war.
        </Body>
        <Body mb="28px">
          <strong style={{ color: c.textPrimary }}>Die 70/30-Regel als Denkmodell:</strong> Rund 70% der operativen, wiederkehrenden Revenue-Operations-Aufgaben sind heute automatisierbar. Die verbleibenden 30%, Beziehung, Strategie, Verhandlung, werden dadurch sogar wertvoller, weil du endlich Zeit dafür hast.
        </Body>
      </Reveal>

      {/* ── Automatisierungsmatrix ── */}
      <Reveal>
        <p style={{ fontSize: "13px", fontWeight: 700, color: c.textSecondary, margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Automatisierungsmatrix: Was kann KI heute übernehmen?</p>
        <AutomatisierungsMatrix />
      </Reveal>

      {/* ── Kernaussage ── */}
      <Reveal>
        <div style={{ background: "rgba(255,255,255,0.025)", border: `1px solid ${c.cardBorderHover}`, borderRadius: "16px", padding: "clamp(24px,4vw,36px)", textAlign: "center", marginBottom: "40px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)` }} />
          <p style={{ fontSize: "10px", fontWeight: 700, color: c.textMuted, letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 14px" }}>Kernaussage</p>
          <p style={{ fontSize: "clamp(18px,2.5vw,22px)", fontWeight: 800, color: c.white, lineHeight: 1.3, margin: "0 0 14px" }}>
            KI ersetzt nicht den Vertriebler, sondern die Arbeit, die ihn vom Verkaufen abhält.
          </p>
          <p style={{ fontSize: "14px", color: c.textSecondary, lineHeight: 1.7, margin: 0, maxWidth: "560px", marginLeft: "auto", marginRight: "auto" }}>
            Der GF einer 15-Mann-Agentur verbringt heute vielleicht 20% seiner Zeit mit echtem Verkaufen und 80% mit Admin, CRM-Pflege und Angebote-Basteln. Das Umsatz-Autopilot-System dreht dieses Verhältnis um.
          </p>
        </div>
      </Reveal>

      {/* ── Prozess vor Technologie ── */}
      <Reveal>
        <SectionH3>Voraussetzung: Prozess vor Technologie</SectionH3>
        <Body>
          Bevor du über KI oder Automatisierung nachdenkst, brauchst du eine ehrliche Bestandsaufnahme: Welche Prozesse existieren heute tatsächlich, und welche laufen nur {'"'}irgendwie{'"'}?
        </Body>
        <Body mb="20px">
          <strong style={{ color: c.textPrimary }}>Der Engpass ist nicht die Technologie, sondern der Prozess.</strong> KI automatisiert Prozesse, wenn keiner existiert, automatisierst du Chaos. Die Grundlage jeder Digitalisierung ist die Festlegung und Dokumentation fester, wiederholbarer Abläufe.
        </Body>
        <p style={{ fontSize: "13px", fontWeight: 700, color: c.textSecondary, margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Die drei Fragen, die du für jeden Prozessschritt beantworten musst:
        </p>
        {[
          { num: "1.", q: "Was ist der Auslöser (Trigger)?", a: "Wann startet dieser Schritt?" },
          { num: "2.", q: "Was passiert genau (Aktivität)?", a: "Welche Aktion wird ausgeführt, mit welchem Input und Output?" },
          { num: "3.", q: "Wer oder was führt ihn aus?", a: "Mitarbeiter, Software, Automatisierung oder KI-Agent?" },
        ].map(({ num, q, a }) => (
          <div key={num} style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "12px" }}>
            <span style={{ color: c.amber, fontSize: "13px", fontWeight: 700, flexShrink: 0, minWidth: "20px" }}>{num}</span>
            <span style={{ fontSize: "14.5px", color: c.textSecondary, lineHeight: 1.65 }}>
              <strong style={{ color: c.textPrimary }}>{q}</strong>{" "}{a}
            </span>
          </div>
        ))}
      </Reveal>

      {/* ── Wie geht es weiter ── */}
      <Reveal>
        <div style={{ marginTop: "32px" }}>
          <CalloutBox title="Wie geht es weiter?" borderColor={c.green} titleColor={c.green}>
            In den folgenden Kapiteln zeigen wir dir, wie du das Umsatz-Autopilot-System Schritt für Schritt auf deinen Vertrieb und dein Marketing anwendest, von der Lead-Generierung über die Pipeline bis zur Bestandskunden-Pflege. Aber zuerst: Welche KPIs sollte jedes B2B-Unternehmen tracken, um überhaupt zu wissen, wo die Hebel liegen?
          </CalloutBox>
        </div>
      </Reveal>
    </section>
  );
}
