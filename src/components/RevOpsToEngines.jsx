import { Badge } from "../shared/Badge";
import { Reveal } from "../shared/Reveal";
import { c } from "../shared/tokens";

// ─── Helpers ────────────────────────────────────────────────────────────────

function H2({ children }) {
  return (
    <h2 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 800, color: c.white, margin: "0 0 20px", lineHeight: 1.2 }}>
      {children}
    </h2>
  );
}

function H3({ children }) {
  return (
    <h3 style={{ fontSize: "clamp(17px,2.5vw,21px)", fontWeight: 700, color: c.white, margin: "0 0 14px", lineHeight: 1.25 }}>
      {children}
    </h3>
  );
}

function Body({ children, mb = "16px" }) {
  return (
    <p style={{ fontSize: "clamp(14px,1.8vw,15.5px)", color: c.textSecondary, lineHeight: 1.75, margin: `0 0 ${mb}` }}>
      {children}
    </p>
  );
}

function Lead({ children }) {
  return (
    <p style={{ fontSize: "clamp(15px,2vw,17px)", color: c.textPrimary, lineHeight: 1.7, margin: "0 0 20px" }}>
      {children}
    </p>
  );
}

function Bold({ children }) {
  return <strong style={{ color: c.white, fontWeight: 700 }}>{children}</strong>;
}

function SectionLabel({ children }) {
  return (
    <p style={{ fontSize: "11px", fontWeight: 700, color: c.textMuted, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 12px" }}>
      {children}
    </p>
  );
}

function HR() {
  return <div style={{ height: "1px", background: `linear-gradient(to right, transparent, ${c.cardBorder}, transparent)`, margin: "48px 0" }} />;
}

function MisconceptionCard({ title, children }) {
  return (
    <div style={{ background: c.card, border: `1px solid ${c.cardBorder}`, borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
      <p style={{ fontSize: "13px", fontWeight: 700, color: c.amber, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 10px" }}>
        {title}
      </p>
      <div style={{ fontSize: "clamp(14px,1.8vw,15px)", color: c.textSecondary, lineHeight: 1.75 }}>
        {children}
      </div>
    </div>
  );
}

function EngineCard({ title, subtitle, steps, color = c.green }) {
  return (
    <div style={{ background: c.card, border: `1px solid ${c.cardBorder}`, borderRadius: "14px", padding: "24px", borderTop: `3px solid ${color}`, flex: "1 1 0", minWidth: "min(100%, 260px)" }}>
      <p style={{ fontSize: "12px", fontWeight: 700, color, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 8px" }}>{subtitle}</p>
      <p style={{ fontSize: "clamp(16px,2.2vw,19px)", fontWeight: 800, color: c.white, margin: "0 0 16px", lineHeight: 1.2 }}>{title}</p>
      {steps.map((s, i) => (
        <p key={i} style={{ fontSize: "13px", color: c.textSecondary, margin: "0 0 5px", lineHeight: 1.5 }}>
          {i < steps.length - 1 ? `${s} →` : s}
        </p>
      ))}
    </div>
  );
}

// ─── Diagramm 1: Architektur RevOps → Engines ───────────────────────────────

function DiagramArchitektur() {
  return (
    <Reveal>
      <div style={{ background: c.card, border: `1px solid ${c.cardBorder}`, borderRadius: "16px", padding: "clamp(24px,4vw,40px)", margin: "40px 0" }}>
        <SectionLabel>Diagramm: Die Architektur</SectionLabel>

        {/* Ergebnis oben */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{ display: "inline-block", background: `${c.amber}12`, border: `1px solid ${c.amber}40`, borderRadius: "12px", padding: "14px 28px" }}>
            <p style={{ fontSize: "13px", fontWeight: 700, color: c.amber, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 4px" }}>Ergebnis</p>
            <p style={{ fontSize: "clamp(15px,2vw,18px)", fontWeight: 800, color: c.white, margin: 0 }}>Planbarer, skalierbarer Umsatz</p>
          </div>
        </div>

        {/* Pfeil nach unten von Ergebnis */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
          <div style={{ width: "2px", height: "32px", background: `linear-gradient(to bottom, ${c.amber}60, ${c.green}60)` }} />
        </div>

        {/* Zwei Engines */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "24px" }}>
          <EngineCard
            title="Demand Generation Engine"
            subtitle="Nachfrage erzeugen"
            steps={["Lead Research", "Outreach", "Qualifizierung", "Termin"]}
            color={c.green}
          />
          <EngineCard
            title="Revenue Generation Engine"
            subtitle="Umsatz generieren"
            steps={["Angebot", "Abschluss", "Onboarding", "Upsell"]}
            color={c.green}
          />
        </div>

        {/* Verbindungspfeil mit Label */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "24px" }}>
          <div style={{ fontSize: "11px", color: c.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>gibt den Rahmen vor</div>
          <div style={{ width: "2px", height: "28px", background: `${c.green}40` }} />
        </div>

        {/* RevOps Fundament */}
        <div style={{ background: `${c.green}08`, border: `1px solid ${c.green}25`, borderRadius: "12px", padding: "18px 24px", borderBottom: `3px solid ${c.green}40`, textAlign: "center" }}>
          <p style={{ fontSize: "12px", fontWeight: 700, color: c.green, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>Fundament</p>
          <p style={{ fontSize: "clamp(15px,2vw,18px)", fontWeight: 800, color: c.white, margin: "0 0 6px" }}>Revenue Operations — Dein Regelwerk</p>
          <p style={{ fontSize: "13px", color: c.textMuted, margin: 0 }}>Definiert Prozesse, KPIs, Abläufe und Übergaben</p>
        </div>

        {/* Annotation */}
        <div style={{ marginTop: "20px", padding: "12px 16px", background: `${c.amber}08`, border: `1px solid ${c.amber}22`, borderRadius: "8px", textAlign: "center" }}>
          <p style={{ fontSize: "12.5px", color: c.amber, margin: 0 }}>
            ca. 70% der Prozesse durch Software, Automatisierung und KI ausfuehrbar — Tendenz steigend
          </p>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Diagramm 2: Vier Prozesstypen Spektrum ─────────────────────────────────

function DiagramSpektrum() {
  const types = [
    {
      label: "Vollautomatisiert",
      desc: "Engine übernimmt zu 100%. Kein menschlicher Eingriff.",
      example: "Lead-Scoring, Follow-up-Sequenzen, CRM-Updates",
      icon: "⚡",
      color: c.green,
      pos: "0%",
    },
    {
      label: "Human-in-the-Loop",
      desc: "Engine liefert 80 bis 90% fertig. Mensch prüft und gibt frei.",
      example: "Angebotsentwurf, Content-Erstellung, Grenzfall-Qualifizierung",
      icon: "🤝",
      color: "#4ade80",
      pos: "33%",
    },
    {
      label: "Unterstuetzend",
      desc: "Engine liefert die Grundlage. Mensch handelt.",
      example: "Erstgesprächs-Briefing, Churn-Warnung, Wettbewerbsanalyse",
      icon: "📋",
      color: c.amber,
      pos: "66%",
    },
    {
      label: "Co-Piloten",
      desc: "KI-Assistenten auf Abruf. Mensch beauftragt flexibel.",
      example: "Lead-Magnet-Erstellung, Follow-up-Mail, Einwandtraining",
      icon: "🧠",
      color: c.textSecondary,
      pos: "100%",
    },
  ];

  return (
    <Reveal>
      <div style={{ background: c.card, border: `1px solid ${c.cardBorder}`, borderRadius: "16px", padding: "clamp(24px,4vw,40px)", margin: "40px 0" }}>
        <SectionLabel>Diagramm: Die vier Prozesstypen</SectionLabel>

        {/* Spektrum-Achse */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: c.green }}>100% Automatisiert</span>
            <span style={{ fontSize: "12px", fontWeight: 700, color: c.textSecondary }}>100% Manuell</span>
          </div>
          <div style={{ height: "8px", borderRadius: "100px", background: `linear-gradient(to right, ${c.green}, ${c.amber}, ${c.textMuted})` }} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
            <span style={{ fontSize: "11px", color: c.textMuted }}>Läuft ohne dich</span>
            <span style={{ fontSize: "11px", color: c.textMuted }}>Unterstuetzt dich</span>
          </div>
        </div>

        {/* Vier Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: "12px" }}>
          {types.map(({ label, desc, example, icon, color }) => (
            <div key={label} style={{ background: "#101010", border: `1px solid ${c.cardBorder}`, borderRadius: "12px", padding: "18px 16px", borderTop: `2px solid ${color}` }}>
              <div style={{ fontSize: "20px", marginBottom: "8px" }}>{icon}</div>
              <p style={{ fontSize: "13px", fontWeight: 700, color, margin: "0 0 8px" }}>{label}</p>
              <p style={{ fontSize: "12.5px", color: c.textSecondary, lineHeight: 1.6, margin: "0 0 10px" }}>{desc}</p>
              <p style={{ fontSize: "11.5px", color: c.textMuted, lineHeight: 1.5, margin: 0, borderTop: `1px solid ${c.cardBorder}`, paddingTop: "8px" }}>
                <span style={{ color: c.textMuted, fontWeight: 600 }}>z.B.:</span> {example}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

// ─── Diagramm 3: Engine vs. Tool vs. CRM ────────────────────────────────────

function FlowBox({ label, color = c.cardBorder }) {
  return (
    <div style={{ background: "#101010", border: `1px solid ${color}`, borderRadius: "8px", padding: "8px 12px", fontSize: "12px", color: c.textSecondary, textAlign: "center", whiteSpace: "nowrap" }}>
      {label}
    </div>
  );
}

function Arrow({ vertical = false }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      width: vertical ? "100%" : "20px", height: vertical ? "20px" : "100%",
      fontSize: "14px", color: c.textMuted, flexShrink: 0,
    }}>
      {vertical ? "↓" : "→"}
    </div>
  );
}

function DiagramVergleich() {
  return (
    <Reveal>
      <div style={{ background: c.card, border: `1px solid ${c.cardBorder}`, borderRadius: "16px", padding: "clamp(24px,4vw,40px)", margin: "40px 0" }}>
        <SectionLabel>Diagramm: Engine vs. Tool vs. CRM</SectionLabel>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "20px" }}>

          {/* Spalte 1: Zapier-Zap */}
          <div style={{ border: `1px solid ${c.cardBorder}`, borderRadius: "12px", padding: "20px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, color: c.red, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 4px" }}>Das Fließband</p>
            <p style={{ fontSize: "15px", fontWeight: 700, color: c.white, margin: "0 0 16px" }}>Ein Zapier-Zap</p>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "16px", flexWrap: "wrap" }}>
              <FlowBox label="Formular" />
              <Arrow />
              <FlowBox label="CRM-Eintrag" />
            </div>
            <p style={{ fontSize: "12px", color: c.textMuted, margin: 0, lineHeight: 1.6 }}>Einzelne Wenn-Dann-Verbindung. Deckt einen Schritt ab.</p>
          </div>

          {/* Spalte 2: CRM */}
          <div style={{ border: `1px solid ${c.cardBorder}`, borderRadius: "12px", padding: "20px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, color: c.amber, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 4px" }}>Das Gedächtnis</p>
            <p style={{ fontSize: "15px", fontWeight: 700, color: c.white, margin: "0 0 16px" }}>Ein CRM</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "16px" }}>
              {["Kontakte", "Deals", "Aktivitäten"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ fontSize: "11px", color: c.textMuted }}>→</div>
                  <FlowBox label={item} />
                </div>
              ))}
            </div>
            <p style={{ fontSize: "12px", color: c.textMuted, margin: 0, lineHeight: 1.6 }}>Speichert Daten. Handelt nicht. Wartet auf dich.</p>
          </div>

          {/* Spalte 3: Engine */}
          <div style={{ border: `1px solid ${c.green}40`, borderRadius: "12px", padding: "20px", background: `${c.green}05` }}>
            <p style={{ fontSize: "11px", fontWeight: 700, color: c.green, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 4px" }}>Die Fabrik</p>
            <p style={{ fontSize: "15px", fontWeight: 700, color: c.white, margin: "0 0 16px" }}>Eine Engine</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "16px" }}>
              {[
                { label: "Lead rein", isStart: true },
                { label: "Anreichern" },
                { label: "Scoren" },
                { label: "Qualifiziert?" },
                { label: "Outreach-Sequenz" },
                { label: "Termin buchen", isEnd: true },
              ].map(({ label, isStart, isEnd }, i) => (
                <div key={label}>
                  <FlowBox label={label} color={isStart ? c.cardBorder : isEnd ? c.green : c.cardBorder} />
                  {!isEnd && <Arrow vertical />}
                </div>
              ))}
            </div>
            <p style={{ fontSize: "12px", color: c.textMuted, margin: 0, lineHeight: 1.6 }}>Orchestriertes System aus Software, KI und Daten. Deckt einen kompletten Prozessbereich ab.</p>
          </div>
        </div>

        <div style={{ marginTop: "20px", padding: "12px 16px", background: "#101010", borderRadius: "8px", textAlign: "center" }}>
          <p style={{ fontSize: "12px", color: c.textMuted, margin: 0 }}>Einzelschritt → Datenspeicher → Komplettes System</p>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Diagramm 4: Revenue Cycle Flow ─────────────────────────────────────────

function CycleStep({ label, highlight = false }) {
  return (
    <div style={{
      background: highlight ? `${c.amber}12` : "#101010",
      border: `1px solid ${highlight ? c.amber + "50" : c.cardBorder}`,
      borderRadius: "8px", padding: "8px 12px",
      fontSize: "12px", fontWeight: highlight ? 700 : 400,
      color: highlight ? c.amber : c.textSecondary,
      textAlign: "center", whiteSpace: "nowrap",
      boxShadow: highlight ? `0 0 12px ${c.amber}20` : "none",
    }}>
      {label}
    </div>
  );
}

function DiagramRevenueCycle() {
  return (
    <Reveal>
      <div style={{ background: c.card, border: `1px solid ${c.cardBorder}`, borderRadius: "16px", padding: "clamp(24px,4vw,40px)", margin: "40px 0" }}>
        <SectionLabel>Diagramm: Die zwei Engines im Revenue Cycle</SectionLabel>

        {/* Startpunkt */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <span style={{ fontSize: "12px", color: c.textMuted, border: `1px solid ${c.cardBorder}`, borderRadius: "100px", padding: "4px 14px" }}>
            Zielmarkt / Potenzielle Kunden
          </span>
        </div>

        {/* Zwei Engine-Boxen */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "20px" }}>

          {/* Demand Generation Engine */}
          <div style={{ flex: "1 1 0", minWidth: "min(100%, 280px)", border: `1px dashed ${c.green}40`, borderRadius: "12px", padding: "16px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, color: c.green, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 14px" }}>
              Demand Generation Engine
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {["Identifizieren und Recherchieren", "Ansprechen und Qualifizieren", "Termin buchen"].map((step, i, arr) => (
                <div key={step}>
                  <CycleStep label={step} />
                  {i < arr.length - 1 && <Arrow vertical />}
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Generation Engine */}
          <div style={{ flex: "1 1 0", minWidth: "min(100%, 280px)", border: `1px dashed ${c.green}40`, borderRadius: "12px", padding: "16px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, color: c.green, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 14px" }}>
              Revenue Generation Engine
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {["Vorbereiten und Beraten", "Anbieten und Abschließen", "Onboarden", "Betreuen und Ausbauen"].map((step, i, arr) => (
                <div key={step}>
                  <CycleStep label={step} />
                  {i < arr.length - 1 && <Arrow vertical />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Übergabepunkt */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{ display: "inline-block" }}>
            <CycleStep label="Gebuchtes Erstgespräch" highlight />
            <p style={{ fontSize: "11px", color: c.textMuted, margin: "6px 0 0", textAlign: "center" }}>Übergabe an Vertrieb</p>
          </div>
        </div>

        {/* Endpunkt */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <span style={{ fontSize: "12px", color: c.textPrimary, border: `1px solid ${c.green}40`, borderRadius: "100px", padding: "6px 16px", background: `${c.green}08` }}>
            Loyaler Bestandskunde mit steigendem LTV
          </span>
        </div>

        {/* Feedback-Loop */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <p style={{ fontSize: "11px", color: c.textMuted, margin: 0, fontStyle: "italic" }}>
            ↩ Empfehlungen und Referrals fließen zurueck in die Demand Engine
          </p>
        </div>

        {/* RevOps Fundament */}
        <div style={{ background: `${c.green}06`, border: `1px solid ${c.green}20`, borderRadius: "8px", padding: "12px 16px", textAlign: "center" }}>
          <p style={{ fontSize: "11px", color: c.green, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 4px" }}>Fundament</p>
          <p style={{ fontSize: "12.5px", color: c.textMuted, margin: 0 }}>Revenue Operations — Prozesse, KPIs, Daten</p>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Prozesstyp-Abschnitt ────────────────────────────────────────────────────

function ProzessTypBlock({ nummer, title, merkmal, examples, accentColor = c.green }) {
  return (
    <div style={{ background: c.card, border: `1px solid ${c.cardBorder}`, borderRadius: "12px", padding: "24px", marginBottom: "16px", borderLeft: `3px solid ${accentColor}` }}>
      <p style={{ fontSize: "11px", fontWeight: 700, color: accentColor, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>
        {nummer}
      </p>
      <h4 style={{ fontSize: "clamp(15px,2vw,17px)", fontWeight: 700, color: c.white, margin: "0 0 12px" }}>{title}</h4>
      <ul style={{ margin: "0 0 12px", paddingLeft: "18px" }}>
        {examples.map((ex, i) => (
          <li key={i} style={{ fontSize: "13.5px", color: c.textSecondary, lineHeight: 1.65, marginBottom: "4px" }}>{ex}</li>
        ))}
      </ul>
      <p style={{ fontSize: "12.5px", color: c.textMuted, margin: 0, borderTop: `1px solid ${c.cardBorder}`, paddingTop: "12px", lineHeight: 1.6 }}>
        <span style={{ color: accentColor, fontWeight: 700 }}>Merkmal:</span> {merkmal}
      </p>
    </div>
  );
}

// ─── Engine Overview Cards ───────────────────────────────────────────────────

function EngineOverviewCard({ title, subtitle, coverage, doList, result, color = c.green }) {
  return (
    <div style={{ background: c.card, border: `1px solid ${c.cardBorder}`, borderRadius: "14px", padding: "28px", borderTop: `3px solid ${color}` }}>
      <p style={{ fontSize: "12px", fontWeight: 700, color, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>{subtitle}</p>
      <h3 style={{ fontSize: "clamp(17px,2.5vw,21px)", fontWeight: 800, color: c.white, margin: "0 0 16px" }}>{title}</h3>
      <p style={{ fontSize: "13px", color: c.textMuted, margin: "0 0 6px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Abdeckung</p>
      <p style={{ fontSize: "14px", color: c.textSecondary, margin: "0 0 16px", lineHeight: 1.6 }}>{coverage}</p>
      <p style={{ fontSize: "13px", color: c.textMuted, margin: "0 0 8px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Was sie tut</p>
      <ul style={{ margin: "0 0 16px", paddingLeft: "18px" }}>
        {doList.map((item, i) => (
          <li key={i} style={{ fontSize: "13.5px", color: c.textSecondary, lineHeight: 1.65, marginBottom: "4px" }}>{item}</li>
        ))}
      </ul>
      <div style={{ background: `${color}08`, border: `1px solid ${color}20`, borderRadius: "8px", padding: "12px 14px" }}>
        <p style={{ fontSize: "13px", color, fontWeight: 600, margin: "0 0 4px" }}>Ergebnis</p>
        <p style={{ fontSize: "13px", color: c.textSecondary, margin: 0, lineHeight: 1.6 }}>{result}</p>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function RevOpsToEngines() {
  return (
    <section>
      {/* Badge */}
      <Reveal>
        <Badge>Von RevOps zu den Engines</Badge>
      </Reveal>

      {/* Haupttitel */}
      <Reveal>
        <H2>Das Kapitel, das alles verbindet</H2>
        <Lead>
          Du hast jetzt verstanden, was Revenue Operations ist: Die operative Klammer um deinen gesamten Umsatzprozess.
          Du kennst die Bereiche, die KPIs und weißt, was davon heute schon automatisierbar ist.
        </Lead>
        <Lead>
          Aber RevOps ist das Regelwerk — nicht die Maschine.
        </Lead>
      </Reveal>

      {/* Warum RevOps allein nicht reicht */}
      <Reveal>
        <H3>Warum RevOps allein nicht reicht</H3>
        <Body>
          RevOps definiert, <Bold>WAS</Bold> passieren soll: Welche Schritte ein Lead durchläuft, wann ein Follow-up kommt,
          welche Kriterien ein qualifizierter Lead erfüllen muss, wie ein Onboarding abläuft.
          Es ist dein Betriebssystem — die dokumentierten, wiederholbaren Prozesse in Vertrieb und Marketing.
        </Body>
        <Body>
          Die Frage ist: Wer führt diese Prozesse aus?
        </Body>
        <Body>
          Bisher war die Antwort: Menschen. Dein Team. Du selbst. Manuell, Schritt für Schritt, jeden Tag aufs Neue.
          Genau hier setzen die <Bold>Engines</Bold> an.
        </Body>
      </Reveal>

      <HR />

      {/* Was sind Engines */}
      <Reveal>
        <H3>Was sind Engines — und was nicht?</H3>
        <Body>
          Eine Engine ist kein Tool. Keine einzelne Automatisierung. Kein Zapier-Zap mit drei Schritten.
        </Body>
        <div style={{ background: `${c.green}08`, border: `1px solid ${c.green}25`, borderRadius: "12px", padding: "20px 24px", margin: "0 0 20px" }}>
          <p style={{ fontSize: "clamp(14px,1.8vw,16px)", color: c.white, lineHeight: 1.7, margin: 0, fontWeight: 600 }}>
            Eine Engine ist ein orchestriertes System aus Software, Automatisierungen, KI-Agenten und Daten,
            die zusammen einen kompletten Prozessbereich abdecken.
          </p>
        </div>
        <Body>
          Stell dir den Unterschied so vor: Eine Zapier-Automation ist ein einzelnes Fließband, das Kisten von A nach B schiebt.
          Eine Engine ist die gesamte Fabrik — mit Wareneingang, Qualitätskontrolle, Montage, Verpackung und Versand.
          Jedes Fließband hat eine Aufgabe, aber erst das Zusammenspiel aller Bänder produziert das fertige Produkt.
        </Body>
        <Body mb="8px">Im Umsatz-Autopilot-System gibt es zwei Engines:</Body>
        <Body>
          <Bold>Die Demand Generation Engine</Bold> — Sie erzeugt Nachfrage. Sie sorgt dafür, dass die richtigen Menschen
          auf dich aufmerksam werden, sich qualifizieren und als Termin in deinem Kalender landen.
          Vom ersten Touchpoint bis zum gebuchten Erstgespräch.
        </Body>
        <Body>
          <Bold>Die Revenue Generation Engine</Bold> — Sie verwandelt Nachfrage in Umsatz. Sie sorgt dafür, dass aus
          Terminen Angebote werden, aus Angeboten Abschlüsse und aus Neukunden loyale Bestandskunden mit steigendem
          Lifetime Value. Vom Erstgespräch bis zum Upsell.
        </Body>
      </Reveal>

      <DiagramArchitektur />

      <HR />

      {/* Wie Engines auf RevOps aufbauen */}
      <Reveal>
        <H3>Wie Engines auf RevOps aufbauen</H3>
        <Body>
          Die Beziehung zwischen RevOps und den Engines ist keine Entweder-oder-Entscheidung — es ist eine Abhängigkeit.
        </Body>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "12px", margin: "0 0 20px" }}>
          <div style={{ background: c.card, border: `1px solid ${c.cardBorder}`, borderRadius: "10px", padding: "16px 18px" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: c.textMuted, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>RevOps</p>
            <p style={{ fontSize: "15px", fontWeight: 700, color: c.white, margin: 0 }}>Was passieren soll</p>
          </div>
          <div style={{ background: `${c.green}08`, border: `1px solid ${c.green}25`, borderRadius: "10px", padding: "16px 18px" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: c.green, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>Engines</p>
            <p style={{ fontSize: "15px", fontWeight: 700, color: c.white, margin: 0 }}>Wie es passiert</p>
          </div>
        </div>
        <Body>
          Deine RevOps-Prozesse legen fest: "Nach dem Erstgespräch wird innerhalb von 24 Stunden ein Angebot versendet.
          Drei Tage später folgt ein Follow-up. Nach sieben Tagen ohne Antwort eine letzte Nachfassung mit einem alternativen Vorschlag."
        </Body>
        <Body>
          Die Engine führt genau das aus — automatisch, zuverlässig, ohne dass jemand daran denken muss.
        </Body>
        <Body>
          Das bedeutet auch: <Bold>Ohne saubere RevOps-Prozesse sind Engines wirkungslos.</Bold> Du kannst die beste
          Automatisierung der Welt bauen — wenn der zugrundeliegende Prozess nicht definiert ist, automatisierst du Chaos.
          RevOps ist das Fundament. Die Engines sind die Maschine, die darauf gebaut wird.
        </Body>
        <Body>
          Aktuell lassen sich bereits rund 70% aller Revenue-Operations-Prozesse durch Software, Automatisierungen und KI
          ausführen. Und dieser Anteil wird in den nächsten Jahren deutlich steigen. Die Frage ist nicht, ob das passiert —
          sondern ob du es nutzt, bevor es dein Wettbewerb tut.
        </Body>
      </Reveal>

      <HR />

      {/* Vier Prozesstypen */}
      <Reveal>
        <H3>Die vier Prozesstypen innerhalb einer Engine</H3>
        <Body>
          Nicht alles wird vollautomatisch. Das ist entscheidend zu verstehen. Innerhalb jeder Engine gibt es vier Typen
          von Prozessen, die unterschiedlich stark von Mensch und Maschine getragen werden:
        </Body>
      </Reveal>

      <Reveal>
        <ProzessTypBlock
          nummer="Prozesstyp 01"
          title="Vollautomatisierte Prozesse"
          accentColor={c.green}
          examples={[
            "Lead-Scoring: Ein neuer Kontakt wird automatisch anhand von Firmendaten, Verhaltensdaten und ICP-Kriterien bewertet und priorisiert.",
            "Follow-up-Sequenzen: Nach einem Erstgespräch ohne Rückmeldung startet automatisch eine mehrstufige Nachfass-Sequenz — personalisiert, terminiert, mit Eskalationslogik.",
            "CRM-Updates: Jeder Call, jede Mail, jedes Meeting wird automatisch im CRM geloggt, Deal-Stages werden aktualisiert, Aufgaben erstellt.",
            "Meeting-Erinnerungen und No-Show-Recovery: Automatische Bestätigungen, Erinnerungen 24h und 1h vorher, bei No-Show sofortige Rescheduling-Sequenz.",
          ]}
          merkmal="Läuft im Hintergrund. Dein Team merkt es nur daran, dass Dinge erledigt sind, die früher auf ihrer To-Do-Liste standen."
        />
      </Reveal>

      <Reveal>
        <ProzessTypBlock
          nummer="Prozesstyp 02"
          title="Teilautomatisierte Prozesse (Human-in-the-Loop)"
          accentColor="#4ade80"
          examples={[
            "Angebotserstellung: Die Engine erstellt auf Basis der CRM-Daten, Gesprächsnotizen und Templates einen vollständigen Angebotsentwurf. Ein Vertriebsmitarbeiter prüft, passt Pricing oder Scope an und versendet.",
            "Content-Erstellung: Der KI-Co-Pilot erstellt einen Entwurf für einen Blog-Beitrag oder eine Case Study. Ein Mitarbeiter überprüft Tonalität und Fachkorrektheit, gibt frei.",
            "Lead-Qualifizierung bei Grenzfällen: Das Scoring ist eindeutig bei 80% der Leads. Bei den restlichen 20% legt die Engine den Lead mit einer Empfehlung einem Mitarbeiter vor.",
          ]}
          merkmal="Die Engine liefert einen Output, der zu 80 bis 90% fertig ist. Der Mensch fügt die letzten 10 bis 20% hinzu — Urteilsvermögen, Kontext, Beziehungsintelligenz."
        />
      </Reveal>

      <Reveal>
        <ProzessTypBlock
          nummer="Prozesstyp 03"
          title="Unterstuetzende Prozesse (Engine als Zuarbeiter)"
          accentColor={c.amber}
          examples={[
            "Vorbereitungsdokument für Erstgespräch: Vor jedem Sales-Call erstellt die Engine ein Briefing — Firmenprofil, Entscheider-Info, relevante Signale, vorgeschlagene Gesprächsthemen. Dein Vertriebler geht vorbereitet in den Call statt fünf Minuten vorher LinkedIn aufzumachen.",
            "Churn-Warnung mit Handlungsempfehlung: Die Engine erkennt, dass ein Bestandskunde seit drei Wochen nicht reagiert hat, das Engagement sinkt und der Vertrag in 60 Tagen ausläuft. Sie erstellt eine Warnung mit konkretem Handlungsvorschlag.",
            "Wettbewerbsanalyse: Die Engine sammelt automatisch öffentliche Informationen über Wettbewerber und stellt sie deinem Team als wöchentlichen Bericht zusammen.",
          ]}
          merkmal="Der Mensch bleibt der Handelnde. Aber er handelt mit besserer Information, schneller und ohne eigene Vorbereitungszeit."
        />
      </Reveal>

      <Reveal>
        <ProzessTypBlock
          nummer="Prozesstyp 04"
          title="Co-Piloten (flexibel einsetzbare KI-Assistenten)"
          accentColor={c.textSecondary}
          examples={[
            "Marketing Co-Piloten: Lead-Magnet-Ersteller, Blog-Content-Generator, Social-Media-Stratege, Ad-Copy-Optimierer.",
            "Vertriebs-Co-Piloten: Einwandbehandlungs-Coach, Proposal-Writer, Win/Loss-Analyst, Follow-up-Formulierer.",
            "Der Unterschied zu ChatGPT: Dein Co-Pilot kennt dein Unternehmen, deine Prozesse, deine Kundendaten, dein Wording und deine Strategie — du gibst nicht jedes Mal Kontext.",
          ]}
          merkmal="Kein fixer Workflow, sondern ein spezialisierter KI-Assistent mit Zugang zu deinem Unternehmenswissen. Du sagst was, er macht es."
        />
      </Reveal>

      <DiagramSpektrum />

      <HR />

      {/* Missverständnisse */}
      <Reveal>
        <H3>Engines sind keine Tools — die häufigsten Missverständnisse</H3>
      </Reveal>

      <Reveal>
        <MisconceptionCard title={'„Das ist doch einfach nur Zapier / Make mit ein paar Automations."'}>
          <p style={{ margin: "0 0 10px" }}>
            Nein. Zapier-Automationen sind einzelne Wenn-Dann-Verbindungen.
            Das ist ein Fließband.
          </p>
          <p style={{ margin: 0 }}>
            Eine Engine ist die Fabrik: Sie nimmt den ausgefüllten Formular-Lead, reichert ihn mit Firmendaten an,
            prüft ihn gegen dein ICP, bewertet ihn mit einem Score, ordnet ihn dem richtigen Vertriebsmitarbeiter zu,
            startet eine personalisierte Outreach-Sequenz, loggt alles im CRM, überwacht die Reaktion, passt die
            Folge-Schritte dynamisch an und bucht bei positivem Signal einen Termin — automatisch. Das ist kein Zap.
          </p>
        </MisconceptionCard>
      </Reveal>

      <Reveal>
        <MisconceptionCard title={'„Das ersetzt mein Team."'}>
          <p style={{ margin: "0 0 10px" }}>
            Nein. Die Engine ersetzt repetitive Handgriffe — nicht dein Team.
          </p>
          <p style={{ margin: 0 }}>
            Dein Vertriebsmitarbeiter verbringt heute vielleicht 60% seiner Zeit mit CRM-Pflege, Lead-Recherche,
            Follow-up-Erinnerungen und Angebote-Formatieren. Die Engine übernimmt genau das. Dein Mitarbeiter
            konzentriert sich auf die 40%, die kein System übernehmen kann: Beziehungen aufbauen, verhandeln,
            strategisch denken, komplexe Deals navigieren. Ein Vertriebler mit Engine ist nicht überflüssig — er ist
            drei Mal so wirksam.
          </p>
        </MisconceptionCard>
      </Reveal>

      <Reveal>
        <MisconceptionCard title={'„Das ist nur was für große Unternehmen mit großem Budget."'}>
          <p style={{ margin: "0 0 10px" }}>
            Im Gegenteil. Bei Konzernen mit 500 oder mehr Mitarbeitern gibt es ganze Abteilungen für RevOps,
            Sales Enablement und Marketing Automation. Die haben 15 Leute, die das manuell orchestrieren.
          </p>
          <p style={{ margin: 0 }}>
            Du hast diese 15 Leute nicht. Genau deshalb brauchst du ein System. Gerade für Unternehmen zwischen
            5 und 50 Mitarbeitern ist der Hebel am größten. Jede eingesparte Stunde und jeder automatisierte Prozess
            schlägt direkt auf die Marge durch.
          </p>
        </MisconceptionCard>
      </Reveal>

      <Reveal>
        <MisconceptionCard title={'„Das ist im Prinzip ein besseres CRM."'}>
          <p style={{ margin: "0 0 10px" }}>
            Ein CRM speichert Daten. Eine Engine handelt auf Basis dieser Daten.
          </p>
          <p style={{ margin: "0 0 10px" }}>
            Dein CRM zeigt dir, dass ein Lead seit drei Tagen nicht kontaktiert wurde.
            Es liegt an dir, das zu bemerken, eine Mail zu schreiben und sie abzuschicken.
          </p>
          <p style={{ margin: 0 }}>
            Die Engine hat den Lead längst kontaktiert. Am Tag eins eine personalisierte Follow-up-Mail. Am Tag zwei
            eine LinkedIn-Nachricht. Am Tag drei, nach Analyse der Öffnungs- und Klickdaten, eine angepasste dritte
            Nachricht — oder, wenn alle Signale negativ sind, eine automatische Deprioritisierung und Überführung in
            eine Langzeit-Nurturing-Sequenz. Das CRM ist das Gedächtnis. Die Engine ist der Handelnde.
          </p>
        </MisconceptionCard>
      </Reveal>

      <DiagramVergleich />

      <HR />

      {/* Zwei Engines im Überblick */}
      <Reveal>
        <H3>Die zwei Engines im Überblick</H3>
        <Body>
          Bevor wir in den nächsten Kapiteln tief in jede Engine eintauchen, hier der Überblick — was jede Engine abdeckt
          und wo sie im Revenue Cycle sitzt.
        </Body>
      </Reveal>

      <Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "20px", margin: "8px 0 0" }}>
          <EngineOverviewCard
            title="Demand Generation Engine"
            subtitle="Nachfrage erzeugen"
            coverage="Vom ersten Touchpoint bis zum gebuchten Erstgespräch."
            doList={[
              "Identifiziert und recherchiert potenzielle Kunden automatisch",
              "Bewertet und priorisiert Leads nach deinen ICP-Kriterien",
              "Führt Multi-Channel-Outreach durch — personalisiert und in Sequenzen",
              "Qualifiziert Leads durch automatisierte Vor-Gespräche oder Fragebögen",
              "Bucht qualifizierte Termine direkt in den Kalender deines Vertriebs",
              "Betreibt Content-Marketing auf Autopilot über Co-Piloten",
            ]}
            result="Dein Vertrieb öffnet morgens den Kalender und hat qualifizierte Gespräche — ohne selbst einen Finger für die Akquise gerührt zu haben."
            color={c.green}
          />
          <EngineOverviewCard
            title="Revenue Generation Engine"
            subtitle="Umsatz generieren"
            coverage="Vom Erstgespräch bis zum Upsell und Renewal."
            doList={[
              "Erstellt Vorbereitungsdokumente und Briefings vor jedem Sales-Call",
              "Generiert Angebotsentwürfe auf Basis von CRM-Daten und Gesprächsnotizen",
              "Automatisiert Follow-ups nach Angeboten und Gesprächen",
              "Steuert den Onboarding-Prozess nach Vertragsabschluss",
              "Überwacht Kundenzufriedenheit und erkennt Churn-Signale",
              "Identifiziert Upsell- und Cross-Sell-Möglichkeiten bei Bestandskunden",
              "Erstellt Win/Loss-Analysen und verbessert den Prozess kontinuierlich",
            ]}
            result="Höhere Abschlussquote, kürzere Sales Cycles, weniger Churn und mehr Umsatz pro Kunde — bei weniger manueller Arbeit."
            color={c.green}
          />
        </div>
      </Reveal>

      <DiagramRevenueCycle />

      <HR />

      {/* Warum Zusammenspiel entscheidend */}
      <Reveal>
        <H3>Warum das Zusammenspiel entscheidend ist</H3>
        <Body>
          Die Demand Generation Engine ist nutzlos, wenn die Revenue Generation Engine die Termine nicht in Umsatz verwandelt.
          Und die Revenue Generation Engine kann noch so gut sein — wenn keine qualifizierten Termine reinkommen, dreht sie im Leerlauf.
        </Body>
        <Body>
          Genau hier wird der Vorteil des Umsatz-Autopilot-Systems deutlich: Die beiden Engines sind keine Insellösungen.
          Sie teilen sich dieselbe Datenbasis, dieselben RevOps-Prozesse und fließen ineinander über.
        </Body>
        <div style={{ background: `${c.amber}08`, border: `1px solid ${c.amber}22`, borderRadius: "12px", padding: "18px 20px 16px", margin: "0 0 20px" }}>
          <p style={{ fontSize: "13px", fontWeight: 700, color: c.amber, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 8px" }}>
            Beispiel: Datenfluss zwischen den Engines
          </p>
          <p style={{ fontSize: "14px", color: c.textSecondary, lineHeight: 1.7, margin: 0 }}>
            Die Revenue Generation Engine erkennt, dass Kunden aus einer bestimmten Branche eine 45% höhere Win Rate haben.
            Dieses Insight fließt zurück in die Demand Generation Engine, die daraufhin ihre Outreach-Sequenzen stärker auf
            diese Branche ausrichtet. Mehr qualifizierte Leads aus der richtigen Branche, höhere Abschlussquote, mehr Umsatz
            bei gleichem Aufwand.
          </p>
        </div>
        <Body>
          Das ist keine Theorie. Das ist der Unterschied zwischen einem Unternehmen, das Werkzeuge benutzt,
          und einem Unternehmen, das ein System betreibt.
        </Body>
      </Reveal>

      <HR />

      {/* Ausblick */}
      <Reveal>
        <div style={{ background: `${c.green}06`, border: `1px solid ${c.green}20`, borderRadius: "12px", padding: "24px 28px" }}>
          <p style={{ fontSize: "12px", fontWeight: 700, color: c.green, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 8px" }}>
            Als Nächstes
          </p>
          <p style={{ fontSize: "clamp(15px,2vw,17px)", fontWeight: 700, color: c.white, margin: "0 0 8px" }}>
            Die Demand Generation Engine — Das System, das deinen Kalender füllt
          </p>
          <p style={{ fontSize: "14px", color: c.textSecondary, margin: 0, lineHeight: 1.7 }}>
            In den folgenden Kapiteln zerlegen wir jede Engine im Detail: Welche Workflows drin stecken, wie die einzelnen
            Bausteine zusammenspielen, welche Co-Piloten zur Verfügung stehen und wie die Implementierung in der Praxis aussieht.
            Zuerst: Die Demand Generation Engine.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
