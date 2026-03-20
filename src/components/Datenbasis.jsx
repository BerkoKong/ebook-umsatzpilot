import { useState } from "react";
import { Badge } from "../shared/Badge";
import { Reveal } from "../shared/Reveal";
import { c, GRID2, GRID3 } from "../shared/tokens";

// ─── Helpers ────────────────────────────────────────────────────────────────

function CalloutBox({ title, titleColor = c.amber, borderColor = c.amber, children }) {
  return (
    <div style={{ background: `${borderColor}08`, borderRadius: "12px", padding: "18px 20px 16px", border: `1px solid ${borderColor}22`, borderLeft: `3px solid ${borderColor}`, marginBottom: "24px" }}>
      {title && <p style={{ fontSize: "11px", fontWeight: 600, color: titleColor, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 8px" }}>{title}</p>}
      <div style={{ fontSize: "14px", color: c.textSecondary, lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

function BulletItem({ icon = "•", iconColor = c.textMuted, children }) {
  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "10px" }}>
      <span style={{ color: iconColor, fontSize: "13px", fontWeight: 700, flexShrink: 0, marginTop: "2px" }}>{icon}</span>
      <span style={{ fontSize: "14.5px", color: c.textSecondary, lineHeight: 1.65 }}>{children}</span>
    </div>
  );
}

function CompareItem({ text, type }) {
  const isGood = type === "good";
  const col = isGood ? c.green : c.red;
  const ic = isGood ? "✓" : "✗";
  const dashIdx = text.indexOf(" – ");
  const main = dashIdx !== -1 ? text.slice(0, dashIdx) : text;
  const reason = dashIdx !== -1 ? text.slice(dashIdx + 3) : "";
  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "14px" }}>
      <span style={{ color: col, fontSize: "13px", fontWeight: 700, flexShrink: 0, marginTop: "3px" }}>{ic}</span>
      <span style={{ fontSize: "14px", lineHeight: 1.65 }}>
        <span style={{ color: c.textPrimary }}>{main}</span>
        {reason && <span style={{ color: c.textSecondary }}>{" – "}{reason}</span>}
      </span>
    </div>
  );
}

function SectionH3({ children }) {
  return <h3 style={{ fontSize: "clamp(18px,2.5vw,22px)", fontWeight: 700, color: c.white, margin: "0 0 16px", lineHeight: 1.2 }}>{children}</h3>;
}

function Body({ children, mb = "16px" }) {
  return <p style={{ fontSize: "clamp(14px,1.8vw,15.5px)", color: c.textSecondary, lineHeight: 1.75, margin: `0 0 ${mb}` }}>{children}</p>;
}

function Expander({ label, title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderRadius: "8px", border: `1px solid ${c.cardBorder}`, marginBottom: "20px", overflow: "hidden", background: "#0a0a0a" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: "100%", background: "transparent", border: "none", cursor: "pointer", padding: "14px 20px", textAlign: "left", display: "flex", flexDirection: "column", gap: "2px" }}
      >
        {label && <span style={{ fontSize: "10px", fontWeight: 600, color: "#666", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "14px", fontWeight: 600, color: open ? c.white : "#999", transition: "color 0.2s" }}>{title}</span>
          <span style={{ color: "#555", fontSize: "11px", flexShrink: 0, marginLeft: "12px", transition: "transform 0.3s", display: "inline-block", transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>▶</span>
        </div>
      </button>
      <div style={{ maxHeight: open ? "10000px" : "0", overflow: "hidden", transition: "max-height 0.4s ease" }}>
        <div style={{ padding: "0 20px 24px", borderTop: `1px solid ${c.cardBorder}` }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── Wissenspyramide (SVG) ───────────────────────────────────────────────────

function Wissenspyramide() {
  // Pyramid: apex (200,28), base corners (50,292) and (350,292)
  // Layer boundaries at y=124 and y=208
  // Left edge: x = 200 - 150*(y-28)/264
  // Right edge: x = 200 + 150*(y-28)/264
  // At y=124: dx=150*(96/264)=54.5 → L=145.5, R=254.5
  // At y=208: dx=150*(180/264)=102.3 → L=97.7, R=302.3
  return (
    <div style={{ background: "#070707", borderRadius: "14px", border: `1px solid ${c.cardBorder}`, padding: "clamp(16px,2.5vw,24px) clamp(12px,2vw,20px) 16px", marginBottom: "40px" }}>
      <p style={{ fontSize: "10px", fontWeight: 600, color: c.textMuted, letterSpacing: "0.12em", textTransform: "uppercase", textAlign: "center", margin: "0 0 2px" }}>Abbildung</p>
      <p style={{ fontSize: "13px", fontWeight: 600, color: c.textSecondary, textAlign: "center", margin: "0 0 8px" }}>Die Wissenspyramide — Von Daten zu Entscheidungen</p>
      <svg viewBox="0 0 580 310" style={{ width: "100%", height: "auto" }}>
        {/* Layer fills */}
        <polygon points="200,28 254,124 146,124" fill="rgba(34,197,94,0.10)" stroke="#22c55e" strokeWidth="1.5" />
        <polygon points="146,124 254,124 302,208 98,208" fill="rgba(96,165,250,0.07)" stroke="#60a5fa" strokeWidth="1.5" />
        <polygon points="98,208 302,208 350,292 50,292" fill="rgba(255,255,255,0.025)" stroke="#303030" strokeWidth="1.5" />
        {/* Labels inside pyramid */}
        <text x="200" y="83" textAnchor="middle" fill="#22c55e" fontSize="9.5" fontWeight="800" fontFamily="Inter, sans-serif" letterSpacing="1">WISSEN</text>
        <text x="200" y="168" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="800" fontFamily="Inter, sans-serif" letterSpacing="0.5">INFO</text>
        <text x="200" y="254" textAnchor="middle" fill="#666" fontSize="9" fontWeight="800" fontFamily="Inter, sans-serif" letterSpacing="1">DATEN</text>
        {/* Divider lines extended to right */}
        <line x1="254" y1="124" x2="565" y2="124" stroke="#1c1c1c" strokeWidth="1" />
        <line x1="302" y1="208" x2="565" y2="208" stroke="#1c1c1c" strokeWidth="1" />
        {/* WISSEN section */}
        <text x="375" y="52" fill="#22c55e" fontSize="11" fontWeight="700" fontFamily="Inter, sans-serif">Wissen</text>
        <text x="375" y="68" fill="#555" fontSize="9" fontFamily="Inter, sans-serif">Handlungsfähigkeit durch Erfahrung</text>
        <text x="375" y="85" fill="#444" fontSize="8.5" fontFamily="Inter, sans-serif" fontStyle="italic">GF + Q1 + Pricing-Interesse</text>
        <text x="375" y="98" fill="#444" fontSize="8.5" fontFamily="Inter, sans-serif" fontStyle="italic">= Termin anbieten, kein Whitepaper</text>
        {/* INFORMATIONEN section */}
        <text x="375" y="143" fill="#60a5fa" fontSize="11" fontWeight="700" fontFamily="Inter, sans-serif">Informationen</text>
        <text x="375" y="159" fill="#555" fontSize="9" fontFamily="Inter, sans-serif">Daten mit Bedeutung & Kontext</text>
        <text x="375" y="176" fill="#444" fontSize="8.5" fontFamily="Inter, sans-serif" fontStyle="italic">Max ist GF einer 12-MA-Agentur,</text>
        <text x="375" y="189" fill="#444" fontSize="8.5" fontFamily="Inter, sans-serif" fontStyle="italic">hat 3x die Pricing-Seite besucht</text>
        {/* DATEN section */}
        <text x="375" y="228" fill="#888" fontSize="11" fontWeight="700" fontFamily="Inter, sans-serif">Daten</text>
        <text x="375" y="244" fill="#555" fontSize="9" fontFamily="Inter, sans-serif">Rohe Fakten ohne Bedeutung</text>
        <text x="375" y="261" fill="#444" fontSize="8.5" fontFamily="Inter, sans-serif" fontStyle="italic">max@firma.de · 15.03.2025</text>
        <text x="375" y="274" fill="#444" fontSize="8.5" fontFamily="Inter, sans-serif" fontStyle="italic">47 Seitenaufrufe · 3 E-Mails geöffnet</text>
        {/* Connection dots */}
        <circle cx="270" cy="124" r="3" fill="rgba(96,165,250,0.4)" />
        <circle cx="318" cy="208" r="3" fill="rgba(255,255,255,0.2)" />
      </svg>
      <p style={{ fontSize: "10.5px", color: c.textMuted, textAlign: "center", fontStyle: "italic", margin: "4px 0 0" }}>
        Von Rohdaten zu Vertriebsintelligenz — jede Ebene erhöht den Wert für dein Unternehmen
      </p>
    </div>
  );
}

// ─── Hub-Spoke-Architektur (SVG) ─────────────────────────────────────────────

function HubSpokeZeichnung() {
  const cx = 280, cy = 195, orbitR = 155, spokeR = 38;
  const spokes = [
    { label: "CRM", sub: "Kontakte & Deals" },
    { label: "E-Mail", sub: "Outreach" },
    { label: "Kalender", sub: "Termine" },
    { label: "Website", sub: "Tracking" },
    { label: "Komm.", sub: "Slack & Co." },
    { label: "LinkedIn", sub: "Prospecting" },
    { label: "PM-Tool", sub: "Aufgaben" },
  ];
  const positions = spokes.map((_, i) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / spokes.length;
    return {
      x: Math.round(cx + orbitR * Math.cos(angle)),
      y: Math.round(cy + orbitR * Math.sin(angle)),
    };
  });
  return (
    <div style={{ background: "#070707", borderRadius: "12px", border: `1px solid ${c.cardBorder}`, padding: "clamp(14px,2vw,20px) clamp(10px,2vw,16px) 10px", marginBottom: "20px" }}>
      <p style={{ fontSize: "10px", fontWeight: 600, color: c.textMuted, textAlign: "center", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 2px" }}>Abbildung 1</p>
      <p style={{ fontSize: "12px", color: c.textSecondary, textAlign: "center", margin: "0 0 4px" }}>Hub-Spoke-Architektur: Alle Tools verbunden über n8n</p>
      <svg viewBox="0 0 560 390" style={{ width: "100%", height: "auto" }}>
        {/* Hub glow */}
        <circle cx={cx} cy={cy} r="76" fill="rgba(34,197,94,0.04)" />
        {/* Connection lines (drawn behind circles) */}
        {positions.map((pos, i) => (
          <line key={i} x1={cx} y1={cy} x2={pos.x} y2={pos.y} stroke="rgba(34,197,94,0.2)" strokeWidth="1.5" />
        ))}
        {/* Midpoint arrow indicators */}
        {positions.map((pos, i) => (
          <circle key={i} cx={Math.round((cx + pos.x) / 2)} cy={Math.round((cy + pos.y) / 2)} r="2.5" fill="rgba(34,197,94,0.45)" />
        ))}
        {/* Spoke nodes */}
        {positions.map((pos, i) => (
          <g key={i}>
            <circle cx={pos.x} cy={pos.y} r={spokeR} fill="#0e0e0e" stroke="#252525" strokeWidth="1.5" />
            <text x={pos.x} y={pos.y - 4} textAnchor="middle" fill="#e5e5e5" fontSize="10.5" fontWeight="700" fontFamily="Inter, sans-serif">{spokes[i].label}</text>
            <text x={pos.x} y={pos.y + 10} textAnchor="middle" fill="#555" fontSize="8" fontFamily="Inter, sans-serif">{spokes[i].sub}</text>
          </g>
        ))}
        {/* Hub circle (drawn last, on top) */}
        <circle cx={cx} cy={cy} r="57" fill="#0c0c0c" stroke="#22c55e" strokeWidth="2" />
        <circle cx={cx} cy={cy} r="52" fill="transparent" stroke="rgba(34,197,94,0.18)" strokeWidth="1" />
        <text x={cx} y={cy - 7} textAnchor="middle" fill="#22c55e" fontSize="20" fontWeight="800" fontFamily="Inter, sans-serif">n8n</text>
        <text x={cx} y={cy + 9} textAnchor="middle" fill="#444" fontSize="8" fontFamily="Inter, sans-serif" letterSpacing="1.5">ZENTRALER HUB</text>
      </svg>
    </div>
  );
}

// ─── Datenspeicher-Tabelle ───────────────────────────────────────────────────

const DATENSPEICHER_ROWS = [
  { label: "Was sie speichert", sql: "Strukturierte Daten in Tabellen mit festen Spalten", nosql: "Flexible Dokumente (JSON) ohne festes Schema", vektor: "Bedeutungsrepräsentationen (Embeddings) von Texten" },
  { label: "Typische Abfrage", sql: "\"Alle Leads mit Deal > 10k Euro aus Branche IT\"", nosql: "\"Alle Dokumente zu Kunde X\" (auch verschachtelte)", vektor: "\"Welche Inhalte sind ähnlich zu dieser Frage?\"" },
  { label: "Stärke", sql: "Exakte Abfragen, Konsistenz, Reporting", nosql: "Flexibilität, schnelle Änderungen, verschachtelte Daten", vektor: "Semantische Suche, KI-Kontext, Wissensmanagement" },
  { label: "Vertriebsbeispiel", sql: "CRM-Daten, Pipeline, KPIs, Kontaktlisten", nosql: "CRM mit flexiblen Custom Fields, Activity Logs", vektor: "Sales Playbooks, E-Mail-Vorlagen, Call-Transkripte" },
  { label: "Typische Tools", sql: "PostgreSQL, MySQL, Supabase", nosql: "MongoDB, Firebase, Airtable (vereinfacht)", vektor: "Pinecone, Weaviate, Qdrant, pgvector" },
];

function DatenbankTabelle() {
  const headers = [
    { label: "Relationale DB (SQL)", color: "#60a5fa" },
    { label: "Dokumenten-DB (NoSQL)", color: c.amber },
    { label: "Vektordatenbank", color: c.green },
  ];
  return (
    <div style={{ background: "#070707", borderRadius: "14px", border: `1px solid ${c.cardBorder}`, overflow: "hidden", marginBottom: "24px" }}>
      {/* Header row */}
      <div style={{ display: "grid", gridTemplateColumns: "140px 1fr 1fr 1fr", borderBottom: `1px solid ${c.cardBorder}` }}>
        <div style={{ padding: "14px 14px", borderRight: `1px solid ${c.cardBorder}` }} />
        {headers.map((h, i) => (
          <div key={i} style={{ padding: "14px 14px", borderRight: i < headers.length - 1 ? `1px solid ${c.cardBorder}` : undefined }}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: h.color, margin: 0, lineHeight: 1.3 }}>{h.label}</p>
          </div>
        ))}
      </div>
      {/* Data rows */}
      {DATENSPEICHER_ROWS.map((row, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "140px 1fr 1fr 1fr", borderBottom: i < DATENSPEICHER_ROWS.length - 1 ? `1px solid ${c.cardBorder}` : undefined, background: i % 2 === 1 ? "rgba(255,255,255,0.01)" : "transparent" }}>
          <div style={{ padding: "12px 14px", borderRight: `1px solid ${c.cardBorder}` }}>
            <p style={{ fontSize: "12px", fontWeight: 600, color: c.textMuted, margin: 0, lineHeight: 1.4 }}>{row.label}</p>
          </div>
          {[row.sql, row.nosql, row.vektor].map((cell, j) => (
            <div key={j} style={{ padding: "12px 14px", borderRight: j < 2 ? `1px solid ${c.cardBorder}` : undefined }}>
              <p style={{ fontSize: "12.5px", color: c.textSecondary, margin: 0, lineHeight: 1.55 }}>{cell}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── 5 Fehler ────────────────────────────────────────────────────────────────

const FUENF_FEHLER = [
  {
    title: '"Wir haben ja ein CRM"',
    body: "Ein CRM zu haben ist nicht dasselbe wie eine funktionierende Datenbasis. Wenn dein CRM halb gepflegt ist, Pflichtfelder leer sind und jeder Vertriebler seine eigene Logik für Deal-Stages verwendet, hast du eine teure Kontaktliste – kein System.",
    bold: "Ein CRM ohne Datenstandards ist wie ein Lager ohne Regalsystem.",
    note: null,
  },
  {
    title: 'Google Sheets oder Airtable als "Datenbank"',
    body: "Google Sheets und Airtable sind hervorragende Tools für Prototypen, Übersichten und kleine Teams. Aber sie sind keine skalierbaren Datenbanken. Sie haben keine echte Relationenlogik, keine robusten API-Schnittstellen für Automatisierungen, keine granularen Zugriffsrechte und keine Performance bei wachsendem Datenvolumen.",
    bold: "Was bei 500 Kontakten funktioniert, bricht bei 5.000 zusammen.",
    note: { title: "Einordnung: Airtable", text: "Airtable kann als Zwischenlösung fungieren – es bietet tabellarische Datenstrukturen mit No-Code-Workflows, Berichten und kleinen Apps. Für Unternehmen in der Frühphase (3 bis 8 Mitarbeiter) kann es als leichtgewichtige Datenbasis dienen. Aber es ersetzt keine echte Datenbank, sobald Automatisierungen, KI-Agenten oder komplexe Reporting-Anforderungen ins Spiel kommen." },
  },
  {
    title: "Keine Master-System-Regeln",
    body: "Wenn nicht definiert ist, welches System für welchen Datentyp führend ist, entstehen Widersprüche. Der Vertrieb ändert eine Telefonnummer im CRM, aber das E-Mail-Tool hat noch die alte. Automatisierungen greifen auf veraltete Daten zu.",
    bold: "Ohne Master-System-Regeln automatisierst du Inkonsistenz.",
    note: null,
  },
  {
    title: "Datenqualität ignorieren",
    body: "Kontaktdaten veralten mit einer Rate von ca. 30% pro Jahr – Menschen wechseln Jobs, E-Mail-Adressen ändern sich, Unternehmen fusionieren. Ohne regelmäßige Datenhygiene (Duplikate bereinigen, veraltete Kontakte markieren, fehlende Felder ergänzen) erodiert deine Datenbasis von innen.",
    bold: "Garbage in, garbage out – das gilt für jede Automatisierung und jeden KI-Agenten.",
    note: null,
  },
  {
    title: "Daten sammeln ohne Ziel",
    body: "Mehr Daten sind nicht automatisch besser. Wenn du 50 Custom Fields in deinem CRM hast, die niemand pflegt, hast du kein Informationssystem – du hast Datenschutt.",
    bold: "Erfasse nur Daten, die du tatsächlich für Entscheidungen, Automatisierungen oder KI-Kontexte brauchst. Alles andere ist Rauschen.",
    note: null,
  },
];

// ─── SSOT Diagramme ──────────────────────────────────────────────────────────

function DiagramFrame({ num, title, children }) {
  return (
    <div style={{ background: "#070707", borderRadius: "14px", border: `1px solid ${c.cardBorder}`, padding: "clamp(14px,2vw,20px) clamp(12px,2vw,18px) 12px", marginBottom: "28px" }}>
      <p style={{ fontSize: "10px", fontWeight: 600, color: c.textMuted, textAlign: "center", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 2px" }}>Abbildung {num}</p>
      <p style={{ fontSize: "12px", fontWeight: 600, color: c.textSecondary, textAlign: "center", margin: "0 0 6px" }}>{title}</p>
      {children}
    </div>
  );
}

function SSOTArchitektur() {
  const cx = 350;
  const inputTools = [
    { label: "CRM", y: 55 },
    { label: "E-Mail-Tool", y: 125 },
    { label: "Website / Tracking", y: 195 },
    { label: "LinkedIn", y: 265 },
  ];
  const outputTools = [
    { label: "KI-Agenten", y: 75 },
    { label: "Dashboards / BI", y: 165 },
    { label: "Team-Interfaces", y: 255 },
  ];
  const n8nY = 100, dbY = 210;
  const leftCx = 90, rightCx = 610;
  return (
    <DiagramFrame num={1} title="SSOT-Architektur: Zentrale Datenbank als Kern aller Systeme">
      <svg viewBox="0 0 700 370" style={{ width: "100%", height: "auto" }}>
        <circle cx={cx} cy={dbY} r={70} fill="rgba(59,130,246,0.04)" />
        {inputTools.map((t, i) => (
          <line key={i} x1={155} y1={t.y} x2={cx - 58} y2={n8nY} stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
        ))}
        {inputTools.map((t, i) => (
          <g key={i}>
            <rect x={leftCx - 65} y={t.y - 18} width={130} height={36} rx="8" fill="#0e0e0e" stroke="#222" strokeWidth="1.5" />
            <text x={leftCx} y={t.y + 5} textAnchor="middle" fill="#e5e5e5" fontSize="10.5" fontWeight="600" fontFamily="Inter, sans-serif">{t.label}</text>
          </g>
        ))}
        <line x1={cx} y1={n8nY + 30} x2={cx} y2={dbY - 42} stroke="#22c55e" strokeWidth="1.5" />
        <polygon points={`${cx},${dbY - 42} ${cx - 5},${dbY - 52} ${cx + 5},${dbY - 52}`} fill="#22c55e" />
        <rect x={cx - 56} y={n8nY - 30} width={112} height={60} rx="12" fill="#0c0c0c" stroke="#22c55e" strokeWidth="2" />
        <text x={cx} y={n8nY - 6} textAnchor="middle" fill="#22c55e" fontSize="16" fontWeight="800" fontFamily="Inter, sans-serif">n8n</text>
        <text x={cx} y={n8nY + 13} textAnchor="middle" fill="#444" fontSize="8" fontFamily="Inter, sans-serif" letterSpacing="1.5">ORCHESTRIERUNG</text>
        <ellipse cx={cx} cy={dbY - 42} rx={66} ry={13} fill="#0d1422" stroke="#3b82f6" strokeWidth="2" />
        <rect x={cx - 66} y={dbY - 42} width={132} height={84} fill="#0c0c0c" />
        <ellipse cx={cx} cy={dbY + 42} rx={66} ry={13} fill="#0c0c0c" stroke="#3b82f6" strokeWidth="2" />
        <line x1={cx - 66} y1={dbY - 42} x2={cx - 66} y2={dbY + 42} stroke="#3b82f6" strokeWidth="2" />
        <line x1={cx + 66} y1={dbY - 42} x2={cx + 66} y2={dbY + 42} stroke="#3b82f6" strokeWidth="2" />
        <text x={cx} y={dbY + 5} textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="700" fontFamily="Inter, sans-serif">ZENTRALE DB</text>
        <text x={cx} y={dbY + 22} textAnchor="middle" fill="#555" fontSize="8.5" fontFamily="Inter, sans-serif">Single Source of Truth</text>
        {outputTools.map((t, i) => (
          <line key={i} x1={cx + 66} y1={dbY} x2={rightCx - 65} y2={t.y} stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
        ))}
        {outputTools.map((t, i) => (
          <g key={i}>
            <rect x={rightCx - 65} y={t.y - 18} width={130} height={36} rx="8" fill="#0e0e0e" stroke="#222" strokeWidth="1.5" />
            <text x={rightCx} y={t.y + 5} textAnchor="middle" fill="#e5e5e5" fontSize="10.5" fontWeight="600" fontFamily="Inter, sans-serif">{t.label}</text>
          </g>
        ))}
        <line x1={cx} y1={dbY + 42} x2={cx} y2={326} stroke="rgba(168,85,247,0.4)" strokeWidth="1.5" strokeDasharray="4,3" />
        <rect x={cx - 82} y={326} width={164} height={36} rx="8" fill="#0e0e0e" stroke="rgba(168,85,247,0.5)" strokeWidth="1.5" />
        <text x={cx} y={342} textAnchor="middle" fill="rgba(168,85,247,0.9)" fontSize="10" fontWeight="600" fontFamily="Inter, sans-serif">Vektordatenbank (RAG)</text>
        <text x={cx} y={356} textAnchor="middle" fill="#444" fontSize="8" fontFamily="Inter, sans-serif">Unternehmens-Wissen</text>
        <text x={leftCx} y={312} textAnchor="middle" fill="#2a2a2a" fontSize="8.5" fontFamily="Inter, sans-serif">INGESTION</text>
        <text x={rightCx} y={312} textAnchor="middle" fill="#2a2a2a" fontSize="8.5" fontFamily="Inter, sans-serif">DISTRIBUTION</text>
      </svg>
    </DiagramFrame>
  );
}

function DatenflussZyklus() {
  const steps = [
    { label: "INGESTION", sub: "Aufnehmen, normalisieren, deduplizieren", color: "#3b82f6" },
    { label: "TRANSFORMATION", sub: "Lead Score, Engagement-Index, Segmentierung", color: "#22c55e" },
    { label: "DISTRIBUTION", sub: "Eine Abfrage, vollständiger Kontext", color: "#f59e0b" },
    { label: "FEEDBACK", sub: "Scores aktualisieren, Loops schließen", color: "#a855f7" },
  ];
  const bw = 140, bh = 88, startX = 30, gap = 16, aY = 80;
  return (
    <DiagramFrame num={2} title="Datenfluss-Zyklus: Ingestion – Transformation – Distribution – Feedback">
      <svg viewBox="0 0 700 200" style={{ width: "100%", height: "auto" }}>
        <rect x={250} y={8} width={200} height={26} rx="6" fill="rgba(59,130,246,0.06)" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
        <text x={350} y={26} textAnchor="middle" fill="#3b82f6" fontSize="9.5" fontWeight="600" fontFamily="Inter, sans-serif">SSOT – Zentrale Datenbank</text>
        {steps.map((s, i) => {
          const x = startX + i * (bw + gap);
          return (
            <g key={i}>
              <rect x={x} y={44} width={bw} height={bh} rx="10" fill="#0e0e0e" stroke={s.color + "40"} strokeWidth="1.5" />
              <rect x={x} y={44} width={bw} height={24} rx="10" fill={s.color + "15"} />
              <rect x={x} y={56} width={bw} height={12} fill={s.color + "15"} />
              <text x={x + bw / 2} y={60} textAnchor="middle" fill={s.color} fontSize="8.5" fontWeight="700" fontFamily="Inter, sans-serif" letterSpacing="0.5">{s.label}</text>
              <text x={x + bw / 2} y={80} textAnchor="middle" fill="#555" fontSize="8" fontFamily="Inter, sans-serif">{s.sub.split(",")[0]}</text>
              <text x={x + bw / 2} y={93} textAnchor="middle" fill="#444" fontSize="7.5" fontFamily="Inter, sans-serif">{s.sub.split(",")[1]}</text>
              <text x={x + bw / 2} y={106} textAnchor="middle" fill="#444" fontSize="7.5" fontFamily="Inter, sans-serif">{s.sub.split(",")[2] || ""}</text>
            </g>
          );
        })}
        {[0, 1, 2].map(i => {
          const x1 = startX + (i + 1) * (bw + gap) - gap;
          return (
            <g key={i}>
              <line x1={x1} y1={aY} x2={x1 + gap - 2} y2={aY} stroke={steps[i].color + "88"} strokeWidth="2" />
              <polygon points={`${x1 + gap - 2},${aY} ${x1 + gap - 10},${aY - 5} ${x1 + gap - 10},${aY + 5}`} fill={steps[i].color + "88"} />
            </g>
          );
        })}
        <path d={`M ${startX + 3 * (bw + gap) + bw - 2},132 Q 680,155 350,168 Q 20,155 ${startX + 2},132`} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="5,4" />
        <polygon points={`${startX + 2},132 ${startX - 4},140 ${startX + 8},140`} fill="rgba(255,255,255,0.08)" />
        <text x={350} y={185} textAnchor="middle" fill="#2a2a2a" fontSize="8.5" fontFamily="Inter, sans-serif">Feedback-Loop: Ergebnisse fliessen zurück in die DB</text>
      </svg>
    </DiagramFrame>
  );
}

function ERDiagramm() {
  const ew = 196, eh = 108;
  const entities = [
    { label: "CONTACTS", color: "#3b82f6", fields: ["id, name, email, phone", "position, lifecycle_stage", "lead_score, source_id"], x: 14, y: 20 },
    { label: "COMPANIES", color: "#3b82f6", fields: ["id, name, industry", "size, revenue_class", "website, standort"], x: 238, y: 20 },
    { label: "DEALS", color: "#22c55e", fields: ["id, stage, value", "probability, owner", "win_loss_reason"], x: 14, y: 190 },
    { label: "INTERACTIONS", color: "#22c55e", fields: ["id, type, timestamp", "details, result", "contact_id, deal_id"], x: 238, y: 190 },
    { label: "KI_AGENT_LOGS", color: "#a855f7", fields: ["id, action_type", "generated_content", "response_result, contact_id"], x: 14, y: 360 },
    { label: "EMBEDDINGS", color: "#a855f7", fields: ["id, source_type", "source_id, chunk_text", "embedding_vector"], x: 238, y: 360 },
    { label: "CAMPAIGNS", color: "#f59e0b", fields: ["id, name, channel", "start_date, budget", "leads (n:m)"], x: 462, y: 190 },
  ];
  const rels = [
    [112, 128, 238, 74], [112, 128, 112, 190], [112, 128, 336, 190],
    [336, 128, 112, 190], [112, 298, 112, 360], [112, 298, 336, 360],
    [336, 298, 462, 244],
  ];
  return (
    <DiagramFrame num={3} title="Entity-Relationship-Diagramm: Datenmodell der zentralen Vertriebs-DB">
      <svg viewBox="0 0 672 490" style={{ width: "100%", height: "auto" }}>
        {rels.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1c1c1c" strokeWidth="1.5" />
        ))}
        {entities.map((e, i) => (
          <g key={i}>
            <rect x={e.x} y={e.y} width={ew} height={eh} rx="8" fill="#0e0e0e" stroke={e.color + "30"} strokeWidth="1.5" />
            <rect x={e.x} y={e.y} width={ew} height={26} rx="8" fill={e.color + "15"} />
            <rect x={e.x} y={e.y + 18} width={ew} height={8} fill={e.color + "15"} />
            <text x={e.x + ew / 2} y={e.y + 18} textAnchor="middle" fill={e.color} fontSize="10" fontWeight="700" fontFamily="Inter, sans-serif">{e.label}</text>
            {e.fields.map((f, j) => (
              <text key={j} x={e.x + 10} y={e.y + 44 + j * 20} fill="#555" fontSize="8.5" fontFamily="Inter, sans-serif">{f}</text>
            ))}
          </g>
        ))}
        <text x={14} y={480} fill="#2a2a2a" fontSize="8.5" fontFamily="Inter, sans-serif">Blau: Kern-Entitäten</text>
        <text x={200} y={480} fill="#2a2a2a" fontSize="8.5" fontFamily="Inter, sans-serif">Grün: Pipeline-Daten</text>
        <text x={380} y={480} fill="#2a2a2a" fontSize="8.5" fontFamily="Inter, sans-serif">Lila: KI-spezifisch</text>
      </svg>
    </DiagramFrame>
  );
}

function SSOTLeadWorkflow() {
  const cx = 200, bw = 240, bh = 50, startY = 30, gap = 14;
  const steps = [
    { label: "TRIGGER", sub: "Website-Formular ausgefüllt", color: "#888" },
    { label: "n8n Webhook", sub: "Event empfangen, Workflow gestartet", color: "#22c55e" },
    { label: "ZENTRALE DB", sub: "Duplikat-Check · Anreicherung · Kontakt anlegen · Score berechnen", color: "#3b82f6", big: true },
    { label: "KI-Agent", sub: "1 Abfrage an DB · vollständiger Kontext + RAG", color: "#a855f7" },
    { label: "DECISION", sub: "Score-basiertes Routing", color: "#f59e0b", decision: true },
    { label: "CRM informiert", sub: "Push aus DB, Vertriebler-Benachrichtigung", color: "#888" },
    { label: "FEEDBACK", sub: "Ergebnisse zurück in DB · Score-Update", color: "#3b82f6" },
  ];
  let curY = startY;
  const positions = steps.map(s => {
    const h = s.big ? bh + 16 : s.decision ? 60 : bh;
    const y = curY;
    curY += h + gap;
    return { ...s, y, h };
  });
  const totalH = curY + 20;
  return (
    <DiagramFrame num={4} title="SSOT-Lead-Workflow: Vom Lead zum Abschluss">
      <svg viewBox={`0 0 400 ${totalH}`} style={{ width: "min(100%, 480px)", height: "auto", display: "block", margin: "0 auto" }}>
        <rect x={300} y={startY} width={90} height={26} rx="6" fill="rgba(34,197,94,0.08)" stroke="rgba(34,197,94,0.2)" strokeWidth="1" />
        <text x={345} y={startY + 17} textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif">{"< 60 Sekunden"}</text>
        {positions.map((s, i) => {
          const isFirst = i === 0;
          if (s.decision) {
            const dCx = cx, dCy = s.y + 30, dW = 118, dH = 28;
            return (
              <g key={i}>
                {!isFirst && <line x1={cx} y1={s.y} x2={cx} y2={s.y} stroke="#1c1c1c" strokeWidth="1.5" />}
                <polygon points={`${dCx},${dCy - dH} ${dCx + dW},${dCy} ${dCx},${dCy + dH} ${dCx - dW},${dCy}`} fill="#0e0e0e" stroke={s.color + "55"} strokeWidth="1.5" />
                <text x={dCx} y={dCy - 7} textAnchor="middle" fill={s.color} fontSize="9.5" fontWeight="700" fontFamily="Inter, sans-serif">{s.label}</text>
                <text x={dCx} y={dCy + 9} textAnchor="middle" fill="#555" fontSize="8" fontFamily="Inter, sans-serif">{s.sub}</text>
                <text x={dCx + dW + 8} y={dCy + 4} fill="#555" fontSize="7.5" fontFamily="Inter, sans-serif">Hoch: Termin</text>
                <text x={dCx - dW - 8} y={dCy + 4} textAnchor="end" fill="#555" fontSize="7.5" fontFamily="Inter, sans-serif">Mittel: Nurture</text>
              </g>
            );
          }
          return (
            <g key={i}>
              {!isFirst && <line x1={cx} y1={s.y} x2={cx} y2={s.y} stroke="#1c1c1c" strokeWidth="1.5" />}
              <rect x={cx - bw / 2} y={s.y} width={bw} height={s.h} rx={s.big ? "12" : "8"} fill={s.big ? "rgba(59,130,246,0.06)" : "#0e0e0e"} stroke={s.color + (s.big ? "55" : "30")} strokeWidth={s.big ? 2 : 1.5} />
              <text x={cx} y={s.y + (s.big ? 20 : 18)} textAnchor="middle" fill={s.color} fontSize={s.big ? "11" : "10"} fontWeight="700" fontFamily="Inter, sans-serif">{s.label}</text>
              <text x={cx} y={s.y + (s.big ? 38 : 34)} textAnchor="middle" fill="#555" fontSize="8" fontFamily="Inter, sans-serif">{s.sub}</text>
            </g>
          );
        })}
        {positions.slice(0, -1).map((s, i) => (
          <line key={i} x1={cx} y1={s.y + s.h} x2={cx} y2={s.y + s.h + gap} stroke="#1c1c1c" strokeWidth="1.5" />
        ))}
      </svg>
    </DiagramFrame>
  );
}

function ArchitekturVergleich() {
  const hubSpokes = ["CRM", "E-Mail", "Website", "Kalender", "LinkedIn", "PM-Tool"];
  const ssotTools = ["CRM", "E-Mail", "Website", "Kalender", "LinkedIn"];
  const n8nCx = 174, n8nCy = 200, orbitR = 118;
  const dbCx = 526, dbCy = 210, n8nSSOTCx = 526, n8nSSOTCy = 90;
  return (
    <DiagramFrame num={5} title="Architektur-Vergleich: Hub-Spoke vs. SSOT">
      <svg viewBox="0 0 700 370" style={{ width: "100%", height: "auto" }}>
        <line x1={350} y1={10} x2={350} y2={340} stroke="#181818" strokeWidth="1" strokeDasharray="4,4" />
        <text x={174} y={28} textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="700" fontFamily="Inter, sans-serif">Hub-Spoke</text>
        <text x={174} y={44} textAnchor="middle" fill="#444" fontSize="8.5" fontFamily="Inter, sans-serif">Daten verteilt – n8n synchronisiert</text>
        {hubSpokes.map((t, i) => {
          const a = -Math.PI / 2 + (2 * Math.PI * i) / hubSpokes.length;
          const x = Math.round(n8nCx + orbitR * Math.cos(a));
          const y = Math.round(n8nCy + orbitR * Math.sin(a));
          return (
            <g key={i}>
              <line x1={n8nCx} y1={n8nCy} x2={x} y2={y} stroke="rgba(34,197,94,0.2)" strokeWidth="1" />
              <rect x={x - 35} y={y - 14} width={70} height={28} rx="6" fill="#0e0e0e" stroke="#1e1e1e" strokeWidth="1.5" />
              <text x={x} y={y + 5} textAnchor="middle" fill="#888" fontSize="9" fontFamily="Inter, sans-serif">{t}</text>
            </g>
          );
        })}
        <circle cx={n8nCx} cy={n8nCy} r={32} fill="#0c0c0c" stroke="#22c55e" strokeWidth="2" />
        <text x={n8nCx} y={n8nCy - 4} textAnchor="middle" fill="#22c55e" fontSize="13" fontWeight="800" fontFamily="Inter, sans-serif">n8n</text>
        <text x={n8nCx} y={n8nCy + 12} textAnchor="middle" fill="#333" fontSize="7" fontFamily="Inter, sans-serif">SYNC</text>
        <text x={526} y={28} textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="700" fontFamily="Inter, sans-serif">SSOT</text>
        <text x={526} y={44} textAnchor="middle" fill="#444" fontSize="8.5" fontFamily="Inter, sans-serif">Daten zentral – Tools greifen zu</text>
        <rect x={n8nSSOTCx - 42} y={n8nSSOTCy + 20} width={84} height={36} rx="8" fill="#0c0c0c" stroke="#22c55e" strokeWidth="1.5" />
        <text x={n8nSSOTCx} y={n8nSSOTCy + 42} textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="800" fontFamily="Inter, sans-serif">n8n</text>
        <line x1={dbCx} y1={n8nSSOTCy + 56} x2={dbCx} y2={dbCy - 34} stroke="#3b82f6" strokeWidth="1.5" />
        <polygon points={`${dbCx},${dbCy - 34} ${dbCx - 5},${dbCy - 44} ${dbCx + 5},${dbCy - 44}`} fill="#3b82f6" />
        <ellipse cx={dbCx} cy={dbCy - 34} rx={58} ry={12} fill="#0d1422" stroke="#3b82f6" strokeWidth="2" />
        <rect x={dbCx - 58} y={dbCy - 34} width={116} height={68} fill="#0c0c0c" />
        <ellipse cx={dbCx} cy={dbCy + 34} rx={58} ry={12} fill="#0c0c0c" stroke="#3b82f6" strokeWidth="2" />
        <line x1={dbCx - 58} y1={dbCy - 34} x2={dbCx - 58} y2={dbCy + 34} stroke="#3b82f6" strokeWidth="2" />
        <line x1={dbCx + 58} y1={dbCy - 34} x2={dbCx + 58} y2={dbCy + 34} stroke="#3b82f6" strokeWidth="2" />
        <text x={dbCx} y={dbCy + 4} textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="700" fontFamily="Inter, sans-serif">ZENTRALE DB</text>
        <text x={dbCx} y={dbCy + 20} textAnchor="middle" fill="#444" fontSize="8" fontFamily="Inter, sans-serif">SSOT</text>
        {ssotTools.map((t, i) => {
          const a = Math.PI / 2 + (2 * Math.PI * i) / ssotTools.length;
          const x = Math.round(dbCx + orbitR * 0.9 * Math.cos(a));
          const y = Math.round(dbCy + 60 + orbitR * 0.75 * Math.sin(a));
          return (
            <g key={i}>
              <line x1={dbCx} y1={dbCy + 34} x2={x} y2={y - 14} stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
              <rect x={x - 35} y={y - 14} width={70} height={28} rx="6" fill="#0e0e0e" stroke="#1e1e1e" strokeWidth="1.5" />
              <text x={x} y={y + 5} textAnchor="middle" fill="#888" fontSize="9" fontFamily="Inter, sans-serif">{t}</text>
            </g>
          );
        })}
        <path d="M 296,190 Q 320,170 330,170 Q 340,170 350,185 Q 360,200 370,200 Q 380,200 404,185" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeDasharray="5,4" />
        <text x={350} y={222} textAnchor="middle" fill="#2a2a2a" fontSize="8" fontFamily="Inter, sans-serif">Migrationspfad</text>
        <text x={174} y={350} textAnchor="middle" fill="#333" fontSize="8.5" fontFamily="Inter, sans-serif">3–15 MA | 2–4 Wochen | Schneller Start</text>
        <text x={526} y={350} textAnchor="middle" fill="#333" fontSize="8.5" fontFamily="Inter, sans-serif">15–50+ MA | 4–8 Wochen | Volle Datenkontrolle</text>
      </svg>
    </DiagramFrame>
  );
}

function DashboardMockup() {
  const kpis = [
    { label: "Pipeline-Wert", value: "347.500 Euro", change: "+12%" },
    { label: "Abschlussquote", value: "34%", change: "+5pp" },
    { label: "Ø Time-to-Close", value: "23 Tage", change: "-4 Tage" },
    { label: "Offene SQLs", value: "18", change: "+6" },
  ];
  return (
    <DiagramFrame num={6} title="Beispiel-Dashboard: Vertriebs-KPIs aus der zentralen Datenbank">
      <svg viewBox="0 0 700 390" style={{ width: "100%", height: "auto" }}>
        <rect x={10} y={8} width={680} height={34} rx="7" fill="#0c0c0c" stroke="#1a1a1a" strokeWidth="1" />
        <text x={24} y={29} fill="#e5e5e5" fontSize="11" fontWeight="700" fontFamily="Inter, sans-serif">Umsatzpilot Dashboard</text>
        <rect x={590} y={13} width={95} height={22} rx="5" fill="rgba(34,197,94,0.08)" stroke="rgba(34,197,94,0.2)" strokeWidth="1" />
        <text x={637} y={28} textAnchor="middle" fill="#22c55e" fontSize="8.5" fontFamily="Inter, sans-serif">Live – vor 2 Min.</text>
        {kpis.map((k, i) => {
          const x = 10 + i * 172;
          return (
            <g key={i}>
              <rect x={x} y={54} width={162} height={68} rx="8" fill="#0e0e0e" stroke="#1a1a1a" strokeWidth="1" />
              <text x={x + 10} y={74} fill="#555" fontSize="8.5" fontFamily="Inter, sans-serif">{k.label}</text>
              <text x={x + 10} y={99} fill="#e5e5e5" fontSize="15" fontWeight="700" fontFamily="Inter, sans-serif">{k.value}</text>
              <rect x={x + 10} y={106} width={48} height={12} rx="3" fill="rgba(34,197,94,0.1)" />
              <text x={x + 34} y={116} textAnchor="middle" fill="#22c55e" fontSize="7.5" fontFamily="Inter, sans-serif">{k.change}</text>
            </g>
          );
        })}
        <rect x={10} y={136} width={330} height={130} rx="8" fill="#0e0e0e" stroke="#1a1a1a" strokeWidth="1" />
        <text x={22} y={155} fill="#e5e5e5" fontSize="10" fontWeight="600" fontFamily="Inter, sans-serif">Pipeline nach Stage</text>
        {[
          { label: "Leads", val: 142, w: 280, y: 164, col: "#3b82f6" },
          { label: "MQL", val: 67, w: 180, y: 186, col: "#60a5fa" },
          { label: "SQL", val: 18, w: 100, y: 208, col: "#22c55e" },
          { label: "Proposal", val: 8, w: 68, y: 230, col: "#f59e0b" },
          { label: "Won", val: 4, w: 44, y: 252, col: "#22c55e" },
        ].map((f, i) => (
          <g key={i}>
            <rect x={22 + (280 - f.w) / 2} y={f.y} width={f.w} height={16} rx="3" fill={f.col + "22"} stroke={f.col + "44"} strokeWidth="1" />
            <text x={26} y={f.y + 12} fill="#555" fontSize="8" fontFamily="Inter, sans-serif">{f.label}</text>
            <text x={308} y={f.y + 12} textAnchor="end" fill="#555" fontSize="8" fontFamily="Inter, sans-serif">{f.val}</text>
          </g>
        ))}
        <rect x={350} y={136} width={340} height={130} rx="8" fill="#0e0e0e" stroke="#1a1a1a" strokeWidth="1" />
        <text x={362} y={155} fill="#e5e5e5" fontSize="10" fontWeight="600" fontFamily="Inter, sans-serif">KI-Agent vs. Manuell</text>
        <line x1={362} y1={254} x2={680} y2={254} stroke="#1a1a1a" strokeWidth="1" />
        <polyline points="362,232 398,226 434,219 470,211 506,203 542,195 578,187 614,180 650,172 680,165" fill="none" stroke="#22c55e" strokeWidth="2" />
        <polyline points="362,228 398,229 434,227 470,229 506,228 542,227 578,229 614,227 650,228 680,227" fill="none" stroke="#888" strokeWidth="1.5" strokeDasharray="4,3" />
        <text x={685} y={168} fill="#22c55e" fontSize="8" fontFamily="Inter, sans-serif">KI</text>
        <text x={685} y={230} fill="#888" fontSize="8" fontFamily="Inter, sans-serif">Manuell</text>
        <rect x={10} y={280} width={680} height={100} rx="8" fill="#0e0e0e" stroke="#1a1a1a" strokeWidth="1" />
        <text x={22} y={298} fill="#e5e5e5" fontSize="10" fontWeight="600" fontFamily="Inter, sans-serif">Top Deals</text>
        {["Firma", "Value", "Stage", "Nächste Aktion"].map((h, i) => (
          <text key={i} x={22 + [0, 190, 320, 460][i]} y={316} fill="#333" fontSize="8.5" fontFamily="Inter, sans-serif">{h}</text>
        ))}
        <line x1={10} y1={322} x2={690} y2={322} stroke="#1a1a1a" strokeWidth="1" />
        {[
          ["Agentur GmbH", "48.000 Euro", "Proposal", "Follow-up heute"],
          ["IT-Services AG", "32.500 Euro", "SQL", "Demo buchen"],
          ["Software KG", "21.000 Euro", "MQL", "E-Mail senden"],
        ].map((row, i) => (
          <g key={i}>
            {row.map((cell, j) => (
              <text key={j} x={22 + [0, 190, 320, 460][j]} y={340 + i * 18} fill={j === 0 ? "#e5e5e5" : "#555"} fontSize="8.5" fontFamily="Inter, sans-serif">{cell}</text>
            ))}
          </g>
        ))}
      </svg>
    </DiagramFrame>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────

const ERMOEGLICHT = [
  "KI-Agenten können personalisierte, kontextrelevante Nachrichten verfassen – weil sie den vollständigen Kontext eines Leads kennen",
  "Automatisierungen laufen zuverlässig – weil Trigger auf sauberen, konsistenten Daten basieren",
  "Reporting zeigt die Wahrheit – weil alle Datenquellen zusammenfließen, nicht jede Abteilung eigene Zahlen hat",
  "Entscheidungen basieren auf Fakten statt Bauchgefühl – weil KPIs in Echtzeit verfügbar sind",
  "Dein Team arbeitet schneller – weil niemand Daten manuell zwischen Tools kopieren muss",
];

const FEHLT = [
  "KI-Agenten schreiben generische Nachrichten – weil sie keine Kontextdaten haben",
  "Automationen scheitern leise – weil Pflichtfelder leer sind oder Formate nicht stimmen",
  "Jeder im Team hat andere Zahlen – weil Vertrieb aus dem CRM liest und Marketing aus dem E-Mail-Tool",
  "Führungskräfte treffen Entscheidungen aus dem Bauch – weil verlässliche Daten fehlen oder erst mühsam zusammengetragen werden müssen",
  "Wachstum bedeutet mehr Chaos – weil jeder neue Mitarbeiter die gleichen manuellen Prozesse wiederholt",
];

const DREI_SICHTEN = [
  {
    icon: "📊",
    title: "Logische Gesamtsicht",
    body: "Die Gesamtheit aller Daten deines Unternehmens auf logischer Ebene. Welche Daten existieren, wie hängen sie zusammen, was ist das \"Big Picture\"?",
    example: "Alle Kontakte, Deals, E-Mail-Verläufe, Website-Events und Dokumente als Gesamtbild.",
  },
  {
    icon: "⚙️",
    title: "Interne Sicht",
    body: "Wie die Daten technisch organisiert und gespeichert sind. Welche Datenbank, welches Schema, welche Indizes sorgen für Effizienz?",
    example: "Kontaktdaten in PostgreSQL, E-Mails in der E-Mail-Tool-API, Wissen in der Vektordatenbank.",
  },
  {
    icon: "👤",
    title: "Externe Sicht",
    body: "Was einzelne Benutzergruppen sehen und brauchen. Dein Vertrieb braucht andere Daten als dein Marketing, und du als GF brauchst wieder andere.",
    example: "Vertriebler sieht Pipeline + nächste Schritte. GF sieht Revenue-KPIs + Forecasts.",
  },
];

export function Datenbasis() {
  return (
    <>
      {/* ── Header ── */}
      <Reveal><Badge>Datenbasis</Badge></Reveal>
      <Reveal delay={0.08}>
        <h2 style={{ fontSize: "clamp(28px,4.5vw,44px)", fontWeight: 800, color: c.white, margin: "24px 0 16px", lineHeight: 1.1, letterSpacing: "-0.025em" }}>
          Die Datenbasis: Das Fundament deines Wachstums.
        </h2>
      </Reveal>
      <Reveal delay={0.14}>
        <p style={{ fontSize: "clamp(15px,2vw,17px)", color: c.textSecondary, lineHeight: 1.7, margin: "0 0 48px", maxWidth: "620px", fontStyle: "italic" }}>
          Warum die meisten B2B-Unternehmen nicht an fehlenden Leads scheitern, sondern an fehlenden Daten.
        </p>
      </Reveal>

      {/* ── Warum wichtig (gekuerzt) ── */}
      <Reveal delay={0.16}>
        <SectionH3>Warum ist eine Datenbasis überhaupt wichtig?</SectionH3>
      </Reveal>
      <Reveal delay={0.2}>
        <Body>
          Du kannst das beste CRM haben, die cleversten KI-Agenten einsetzen und deine Automatisierungen bis ins Detail ausarbeiten. Wenn die Daten dahinter lückenhaft, veraltet oder über fünf Tools verstreut sind, arbeitet das gesamte System mit falschen Informationen. <strong style={{ color: c.white }}>Garbage in, garbage out</strong> gilt für jede Automatisierung und jeden KI-Agenten.
        </Body>
      </Reveal>
      <Reveal delay={0.24}>
        <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: "12px", padding: "20px 20px 20px 24px", border: `1px solid ${c.cardBorder}`, borderLeft: `3px solid ${c.cardBorderHover}`, marginBottom: "32px", maxWidth: "680px" }}>
          <p style={{ fontSize: "clamp(14px,1.8vw,15.5px)", color: c.textSecondary, lineHeight: 1.75, margin: 0, fontStyle: "italic" }}>
            <strong style={{ color: c.textPrimary, fontStyle: "normal" }}>{'"Wir haben ein CRM"'}</strong>{" ist nicht dasselbe wie "}<strong style={{ color: c.textPrimary, fontStyle: "normal" }}>{'"Wir haben eine funktionierende Datenbasis."'}</strong>{" Der Unterschied entscheidet darüber, ob du skalieren kannst."}
          </p>
        </div>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: GRID2, gap: "20px", marginBottom: "48px" }}>
        <Reveal delay={0.1}>
          <div style={{ background: c.card, borderRadius: "16px", padding: "clamp(22px,3vw,28px) clamp(18px,3vw,24px)", border: "1px solid rgba(34,197,94,0.15)", height: "100%", boxSizing: "border-box" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: "13px", fontWeight: 800, color: c.green }}>✓</span>
              </div>
              <span style={{ fontSize: "14px", fontWeight: 600, color: c.textPrimary }}>Was eine integrierte Datenbasis ermöglicht</span>
            </div>
            {ERMOEGLICHT.map((item, i) => <CompareItem key={i} text={item} type="good" />)}
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div style={{ background: c.card, borderRadius: "16px", padding: "clamp(22px,3vw,28px) clamp(18px,3vw,24px)", border: "1px solid rgba(239,68,68,0.12)", height: "100%", boxSizing: "border-box" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: "13px", fontWeight: 800, color: c.red }}>✗</span>
              </div>
              <span style={{ fontSize: "14px", fontWeight: 600, color: c.textPrimary }}>Was passiert, wenn sie fehlt</span>
            </div>
            {FEHLT.map((item, i) => <CompareItem key={i} text={item} type="bad" />)}
          </div>
        </Reveal>
      </div>

      {/* ── Von Daten zu Entscheidungen (3 Boxen + Expander) ── */}
      <Reveal>
        <SectionH3>Von Daten zu Entscheidungen</SectionH3>
      </Reveal>
      <Reveal delay={0.06}>
        <Body mb="24px">
          Nicht alle Daten sind gleich wertvoll. Erst wenn Rohdaten in Kontext gesetzt und mit Bedeutung verknüpft werden, entstehen Entscheidungsgrundlagen. Drei Ebenen sind relevant:
        </Body>
      </Reveal>
      <Reveal delay={0.1}>
        <div style={{ display: "grid", gridTemplateColumns: GRID3, gap: "16px", marginBottom: "20px" }}>
          {[
            { color: "#888", label: "Ebene 1", title: "Daten", body: "Rohe Fakten ohne Bedeutung. Eine E-Mail-Adresse, ein Zeitstempel, 47 Seitenaufrufe. Für sich genommen wertlos." },
            { color: "#60a5fa", label: "Ebene 2", title: "Informationen", body: "Daten mit Kontext. Max ist GF einer 12-Mann-Agentur und hat dreimal die Pricing-Seite besucht. Jetzt hast du eine Information." },
            { color: c.green, label: "Ebene 3", title: "Wissen", body: "Die Fähigkeit zu handeln. Dieser Kontakt will ein Angebot, kein Whitepaper. Termin anbieten, nicht nurturieren." },
          ].map((item, i) => (
            <div key={i} style={{ background: c.card, borderRadius: "12px", padding: "20px", border: `1px solid ${c.cardBorder}` }}>
              <p style={{ fontSize: "10px", fontWeight: 700, color: item.color, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>{item.label}</p>
              <h4 style={{ fontSize: "16px", fontWeight: 700, color: c.white, margin: "0 0 10px" }}>{item.title}</h4>
              <p style={{ fontSize: "13.5px", color: c.textSecondary, lineHeight: 1.65, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.12}>
        <Expander label="Technischer Deep-Dive" title="Wissenspyramide: Von Rohdaten zu Vertriebsintelligenz">
          <div style={{ paddingTop: "20px" }}>
            <Wissenspyramide />
            <Body>
              <strong style={{ color: c.white }}>Ebene 1: Daten</strong> sind rohe, unverarbeitete Fakten. Dein CRM enthält den Eintrag {'"Max Mustermann, max@firma.de, 15.03.2025"'}. Ohne Kontext weißt du nicht: Ist das ein Lead? Bestandskunde? Was ist sein Bedarf?
            </Body>
            <Body>
              <strong style={{ color: c.white }}>Ebene 2: Informationen</strong> entstehen, wenn du Daten in einen Kontext stellst. Max ist Geschäftsführer einer 12-Mann-Agentur, hat am 15.03. dein Whitepaper heruntergeladen und danach dreimal die Pricing-Seite besucht. Jetzt weißt du wer, was und wann.
            </Body>
            <Body>
              <strong style={{ color: c.white }}>Ebene 3: Wissen</strong> entsteht, wenn du Informationen verknüpfst und daraus Handlungsfähigkeit ableitest. Dein bester Vertriebler weiß, dass ein GF, der dreimal die Pricing-Seite besucht, nach einem konkreten Angebot sucht. Dieses Wissen hat er über Jahre aufgebaut.
            </Body>
            <CalloutBox title="Warum das für dich relevant ist" borderColor={c.green} titleColor={c.green}>
              Wenn du KI und Automatisierung einsetzt, musst du alle drei Ebenen bedienen: <strong style={{ color: c.textPrimary }}>Daten</strong> sauber erfassen (Datenbasis), <strong style={{ color: c.textPrimary }}>Informationen</strong> durch Verknüpfung erzeugen (Integration), und <strong style={{ color: c.textPrimary }}>Wissen</strong> deiner besten Leute systematisch verfügbar machen (KI-Agenten + Vektordatenbank). Fehlt eine Ebene, funktioniert das System nicht.
            </CalloutBox>
          </div>
        </Expander>
      </Reveal>

      {/* ── Datenspeicher + Vektordatenbank (kompakt + Expander) ── */}
      <div style={{ paddingTop: "16px" }} />
      <Reveal>
        <SectionH3>Welche Datenspeicher brauchst du?</SectionH3>
      </Reveal>
      <Reveal delay={0.06}>
        <Body mb="24px">
          Für ein B2B-Vertriebssystem mit KI-Agenten sind drei Typen relevant, die unterschiedliche Aufgaben übernehmen:
        </Body>
      </Reveal>
      <Reveal delay={0.1}>
        <div style={{ display: "grid", gridTemplateColumns: GRID3, gap: "16px", marginBottom: "20px" }}>
          {[
            { color: "#60a5fa", title: "Relationale DB (SQL)", body: "Strukturierte Daten in Tabellen. CRM, Pipeline, KPIs, Kontaktlisten. Antwortet auf: Was genau?", tools: "PostgreSQL, Supabase, MySQL" },
            { color: c.green, title: "Vektordatenbank", body: "Bedeutungen als mathematische Repräsentationen. Semantische Suche. Das Gedächtnis deiner KI-Agenten. Antwortet auf: Was ist ähnlich?", tools: "pgvector, Pinecone, Qdrant" },
            { color: c.amber, title: "Dokumenten-DB (NoSQL)", body: "Flexible, verschachtelte Daten ohne fixes Schema. Activity Logs, Custom Fields. Antwortet auf: Was gehört zusammen?", tools: "MongoDB, Firebase, Airtable" },
          ].map((item, i) => (
            <div key={i} style={{ background: c.card, borderRadius: "12px", padding: "20px", border: `1px solid ${c.cardBorder}` }}>
              <h4 style={{ fontSize: "14px", fontWeight: 700, color: item.color, margin: "0 0 10px" }}>{item.title}</h4>
              <p style={{ fontSize: "13px", color: c.textSecondary, lineHeight: 1.65, margin: "0 0 12px" }}>{item.body}</p>
              <p style={{ fontSize: "11px", color: c.textMuted, margin: 0 }}>{item.tools}</p>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.12}>
        <Expander label="Technischer Deep-Dive" title="Vektordatenbanken & Datenspeicher im Detail">
          <div style={{ paddingTop: "20px" }}>
            <p style={{ fontSize: "14px", fontWeight: 600, color: c.textPrimary, margin: "0 0 14px" }}>Vollständiger Typen-Vergleich</p>
            <DatenbankTabelle />
            <Body>
              <strong style={{ color: c.white }}>Wie eine Vektordatenbank funktioniert:</strong> Dein bester Vertriebler hat in drei Jahren hunderte E-Mails geschrieben und dutzende Einwandbehandlungen gemeistert. Dieses Wissen steckt in E-Mails, Call-Notizen und Angeboten, ist aber nirgendwo zentral verfügbar. Wenn er das Unternehmen verlässt, ist es weg.
            </Body>
            <Body>
              Eine Vektordatenbank löst genau das. Sie speichert nicht die Texte selbst, sondern deren <strong style={{ color: c.textPrimary }}>Bedeutung</strong> als Embeddings. Frage: {'"Wie reagiere ich, wenn ein Kunde sagt, er hat kein Budget?"'} Die Datenbank findet eine Call-Notiz von vor 6 Monaten, in der dein Top-Vertriebler genau diesen Einwand behandelt hat, plus das relevante Stück aus dem Sales Playbook.
            </Body>
            <CalloutBox title="Der Unterschied in einem Satz" borderColor={c.green} titleColor={c.green}>
              Eine normale Datenbank findet Daten, die exakt deinen Suchkriterien entsprechen. Eine Vektordatenbank findet Inhalte, die <strong style={{ color: c.textPrimary }}>inhaltlich ähnlich</strong> sind. Das ist der Grund, warum KI-Agenten mit einer Vektordatenbank so viel besser arbeiten.
            </CalloutBox>
            <p style={{ fontSize: "14px", fontWeight: 600, color: c.textPrimary, margin: "0 0 10px" }}>Was in die Vektordatenbank gehört:</p>
            {[
              ["Sales Playbooks & Leitfäden", "Einwandbehandlung, Gesprächsleitfäden, Qualifizierungsfragen"],
              ["E-Mail-Vorlagen & erfolgreiche Sequenzen", "die Nachrichten, die tatsächlich Antworten generiert haben"],
              ["Call-Transkripte & Meeting-Notizen", "was in echten Gesprächen funktioniert hat"],
              ["SOPs & Prozessdokumentationen", "Onboarding, Angebotserstellung, Follow-up-Prozesse"],
              ["Produkt- & Service-Dokumentation", "Features, Preise, USPs, Wettbewerbsvergleiche"],
            ].map(([title, desc], i) => (
              <BulletItem key={i}><strong style={{ color: c.textPrimary }}>{title}</strong>{" — "}{desc}</BulletItem>
            ))}
          </div>
        </Expander>
      </Reveal>

      {/* ── Business Analytics + 3 Sichten (kompakt + Expander) ── */}
      <div style={{ paddingTop: "16px" }} />
      <Reveal>
        <SectionH3>Daten in Entscheidungen verwandeln</SectionH3>
      </Reveal>
      <Reveal delay={0.06}>
        <Body mb="24px">
          Eine Datenbasis ist nur dann wertvoll, wenn du aus ihr liest. Du brauchst drei Perspektiven: das Gesamtbild aller Daten, die interne Sicht auf Technik und Struktur, und die externe Sicht darauf, wer was sieht. Zusammen ergeben sie die Grundlage für datenbasierte Entscheidungen.
        </Body>
      </Reveal>
      <Reveal delay={0.1}>
        <div style={{ display: "grid", gridTemplateColumns: GRID3, gap: "16px", marginBottom: "20px" }}>
          {DREI_SICHTEN.map((sicht, i) => (
            <div key={i} style={{ background: c.card, borderRadius: "14px", padding: "clamp(18px,3vw,22px) clamp(14px,3vw,18px)", border: `1px solid ${c.cardBorder}` }}>
              <h4 style={{ fontSize: "14px", fontWeight: 700, color: c.white, margin: "0 0 8px", lineHeight: 1.3 }}>{sicht.title}</h4>
              <p style={{ fontSize: "13px", color: c.textSecondary, lineHeight: 1.6, margin: 0 }}>{sicht.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.12}>
        <Expander label="Für Technik-Interessierte" title="Business Analytics: Vollständige Einführung">
          <div style={{ paddingTop: "20px" }}>
            <Body>
              <strong style={{ color: c.white }}>Business Analytics</strong> ist der Ansatz, mit dem du Daten aus all deinen Quellen sammelst, analysierst und in konkrete Entscheidungen übersetzt. Das Ziel: nicht mehr aus dem Bauchgefühl heraus agieren, sondern auf Basis von Zahlen, die du in Echtzeit abrufen kannst.
            </Body>
            <div style={{ paddingLeft: "8px", marginBottom: "20px" }}>
              {[
                '"Welcher Kanal bringt uns die profitabelsten Kunden?"',
                '"Wie lange dauert es vom Erstkontakt bis zum Abschluss?"',
                '"Was kostet uns ein neuer Kunde wirklich über alle Kanäle?"',
                '"Performt unser KI-Agent besser als der manuelle Prozess?"',
              ].map((q, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "8px" }}>
                  <span style={{ color: c.textMuted, fontSize: "13px", flexShrink: 0, marginTop: "2px" }}>•</span>
                  <span style={{ fontSize: "14px", color: c.textSecondary, lineHeight: 1.6, fontStyle: "italic" }}>{q}</span>
                </div>
              ))}
            </div>
            <CalloutBox title="Die unbequeme Wahrheit" borderColor={c.amber}>
              Die Mehrheit der Unternehmer trifft Entscheidungen auf Basis von Gefühl und selektiver Wahrnehmung. Das funktioniert bis zu einem gewissen Punkt. Wenn du skalieren willst, brauchst du <strong style={{ color: c.textPrimary }}>reproduzierbare Erkenntnisse</strong> und KPIs, die dir sagen, wo dein größter Hebel sitzt.
            </CalloutBox>
            <p style={{ fontSize: "15px", fontWeight: 700, color: c.white, margin: "0 0 14px" }}>Die drei Sichten im Detail</p>
            <div style={{ display: "grid", gridTemplateColumns: GRID3, gap: "14px" }}>
              {DREI_SICHTEN.map((sicht, i) => (
                <div key={i} style={{ background: "#070707", borderRadius: "12px", padding: "18px", border: `1px solid ${c.cardBorder}` }}>
                  <div style={{ fontSize: "22px", marginBottom: "10px" }}>{sicht.icon}</div>
                  <h4 style={{ fontSize: "14px", fontWeight: 700, color: c.white, margin: "0 0 8px" }}>{sicht.title}</h4>
                  <p style={{ fontSize: "13px", color: c.textSecondary, lineHeight: 1.6, margin: "0 0 10px" }}>{sicht.body}</p>
                  <p style={{ fontSize: "11.5px", color: c.textMuted, fontStyle: "italic", margin: 0, borderTop: `1px solid ${c.cardBorder}`, paddingTop: "8px" }}>Beispiel: {sicht.example}</p>
                </div>
              ))}
            </div>
          </div>
        </Expander>
      </Reveal>

      {/* ── 5 häufigsten Fehler (unverändert) ── */}
      <div style={{ paddingTop: "16px" }} />
      <Reveal>
        <SectionH3>Die 5 häufigsten Fehler bei der Datenbasis</SectionH3>
      </Reveal>
      <Reveal delay={0.06}>
        <Body mb="28px">
          In unserer Arbeit mit B2B-Unternehmen sehen wir immer wieder dieselben Fehler. Keiner davon ist ein Technologieproblem, es sind <strong style={{ color: c.textPrimary }}>Denkfehler und Organisationslücken</strong>, die sich mit dem richtigen System vermeiden lassen:
        </Body>
      </Reveal>
      {FUENF_FEHLER.map((fehler, i) => (
        <Reveal key={i} delay={i * 0.06}>
          <div style={{ background: c.card, borderRadius: "14px", padding: "clamp(18px,3vw,24px)", border: `1px solid ${c.cardBorder}`, marginBottom: "12px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "3px", bottom: 0, background: `linear-gradient(180deg, ${c.red}44, transparent)` }} />
            <div style={{ paddingLeft: "12px" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "10px" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: "12px", fontWeight: 800, color: c.red }}>0{i + 1}</span>
                </div>
                <h4 style={{ fontSize: "15px", fontWeight: 700, color: c.white, margin: 0, lineHeight: 1.3, paddingTop: "4px" }}>Fehler {i + 1}: {fehler.title}</h4>
              </div>
              <p style={{ fontSize: "14px", color: c.textSecondary, lineHeight: 1.7, margin: "0 0 6px" }}>
                {fehler.body} <strong style={{ color: c.textPrimary }}>{fehler.bold}</strong>
              </p>
              {fehler.note && (
                <div style={{ marginTop: "14px" }}>
                  <CalloutBox title={fehler.note.title}>{fehler.note.text}</CalloutBox>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      ))}

      {/* ── Zwei Ansätze Intro ── */}
      <div style={{ paddingTop: "32px" }} />
      <Reveal>
        <SectionH3>Wie baust du deine Datenbasis auf? Zwei Ansätze</SectionH3>
      </Reveal>
      <Reveal delay={0.06}>
        <Body mb="28px">
          Die Antwort hängt von deiner Unternehmensgröße und Wachstumsphase ab. Hier sind die zwei bewährten Ansätze, die wir bei Umsatzpilot einsetzen:
        </Body>
      </Reveal>

      {/* ── Ansatz 1: Hub-Spoke (gekürzt + Expander) ── */}
      <Reveal delay={0.1}>
        <div style={{ background: c.card, borderRadius: "20px", border: `1px solid ${c.cardBorder}`, padding: "clamp(28px,4vw,40px)", marginBottom: "24px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${c.amber}55, transparent)` }} />
          <p style={{ fontSize: "11px", fontWeight: 700, color: c.amber, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 6px" }}>Ansatz 1 — 3 bis 15 Mitarbeiter</p>
          <h3 style={{ fontSize: "clamp(20px,3vw,26px)", fontWeight: 800, color: c.white, margin: "0 0 8px", lineHeight: 1.2 }}>Hub-Spoke-Integration</h3>
          <p style={{ fontSize: "15px", color: c.textSecondary, lineHeight: 1.7, margin: "0 0 24px" }}>
            <strong style={{ color: c.textPrimary }}>Deine bestehenden Tools zum System verbinden</strong>, ohne alles neu aufzubauen.
          </p>
          <Body mb="20px">
            Statt jedes Tool einzeln mit jedem anderen zu verbinden, setzt du eine zentrale Integrationsplattform in die Mitte (bei uns: n8n). Alle deine bestehenden Tools verbinden sich mit diesem Hub. Er übernimmt Datensynchronisation, event-basierte Trigger und Datentransformation. Dein Team arbeitet weiter in den gewohnten Tools, die Daten fließen automatisch.
          </Body>
          <div style={{ borderRadius: "12px", overflow: "hidden", border: `1px solid ${c.cardBorder}`, marginBottom: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
              {[["Kriterium", c.textMuted], ["Vorher (Toolchaos)", c.red], ["Nachher (Hub-Spoke)", c.green]].map(([h, col]) => (
                <div key={h} style={{ padding: "10px 14px", fontSize: "11px", fontWeight: 700, color: col, letterSpacing: "0.08em", textTransform: "uppercase", background: "rgba(255,255,255,0.03)" }}>{h}</div>
              ))}
            </div>
            {[
              ["Datenfluss", "Manuell, Copy-Paste", "Automatisch, Echtzeit"],
              ["Lead-Reaktionszeit", "4 bis 48 Stunden", "< 5 Minuten"],
              ["Datenkonsistenz", "Widersprüchlich", "Eine Wahrheit"],
              ["Reporting", "Excel-Flickwerk", "Live-Dashboards"],
            ].map(([krit, vorher, nachher]) => (
              <div key={krit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: `1px solid ${c.cardBorder}` }}>
                <div style={{ padding: "10px 14px", fontSize: "13px", color: c.textPrimary, fontWeight: 600 }}>{krit}</div>
                <div style={{ padding: "10px 14px", fontSize: "13px", color: c.textSecondary }}>{vorher}</div>
                <div style={{ padding: "10px 14px", fontSize: "13px", color: c.green }}>{nachher}</div>
              </div>
            ))}
          </div>
          <CalloutBox title="Zeitersparnis in der Praxis" borderColor={c.green} titleColor={c.green}>
            Ein Lead kommt rein. In <strong style={{ color: c.textPrimary }}>unter 90 Sekunden</strong> ist er vollständig angereichert, bewertet und mit Slack-Benachrichtigung im CRM. Manuell dauert derselbe Prozess <strong style={{ color: c.textPrimary }}>25 bis 45 Minuten</strong>. Bei 50 Leads pro Monat sind das über 30 Stunden zurückgewonnene Vertriebszeit.
          </CalloutBox>
          <Expander label="Technischer Deep-Dive" title="Hub-Spoke-Architektur im Detail">
            <div style={{ paddingTop: "20px" }}>
              <HubSpokeZeichnung />
              <p style={{ fontSize: "14px", fontWeight: 600, color: c.textPrimary, margin: "0 0 12px" }}>Der Hub übernimmt drei zentrale Aufgaben:</p>
              {[
                { num: "1", title: "Datensynchronisation", text: "Wenn sich ein Datenpunkt in einem Spoke ändert, wird diese Änderung automatisch an alle relevanten Spokes weitergegeben." },
                { num: "2", title: "Event-basierte Trigger", text: "Wenn Ereignis X in System A eintritt, führe Aktion Y in System B aus. Das ist die Grundlage für jede Automatisierung." },
                { num: "3", title: "Datentransformation", text: "Jedes Tool speichert Daten in einem eigenen Format. Der Hub übersetzt zwischen den Formaten, sodass alle Systeme die gleiche Sprache sprechen." },
              ].map(({ num, title, text }) => (
                <div key={num} style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div style={{ width: "26px", height: "26px", borderRadius: "8px", background: `${c.amber}15`, border: `1px solid ${c.amber}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: "12px", fontWeight: 800, color: c.amber }}>{num}</span>
                  </div>
                  <p style={{ fontSize: "14px", color: c.textSecondary, lineHeight: 1.65, margin: 0 }}>
                    <strong style={{ color: c.textPrimary }}>{title}:</strong> {text}
                  </p>
                </div>
              ))}
              <h4 style={{ fontSize: "16px", fontWeight: 700, color: c.white, margin: "24px 0 10px" }}>Konsistenz: Das Master-System-Prinzip</h4>
              <Body>
                Für jeden Datentyp wird genau ein System als Master definiert. Dieses System ist die einzige Quelle der Wahrheit für diesen Datentyp. Alle anderen Systeme empfangen die Daten vom Hub und überschreiben sie nicht.
              </Body>
              <div style={{ marginBottom: "20px", borderRadius: "12px", overflow: "hidden", border: `1px solid ${c.cardBorder}` }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.5fr" }}>
                  {["Datentyp", "Master-System", "Synchronisationsrichtung"].map(h => (
                    <div key={h} style={{ padding: "10px 14px", fontSize: "11px", fontWeight: 700, color: c.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", background: "rgba(255,255,255,0.03)" }}>{h}</div>
                  ))}
                </div>
                {[
                  ["Kontaktdaten", "CRM", "Unidirektional: CRM → alle Spokes"],
                  ["Deal- & Pipeline-Daten", "CRM", "CRM führt, Updates an Reporting"],
                  ["E-Mail-Engagement", "E-Mail-Tool", "Engagement-Daten fließen ins CRM"],
                  ["Termine & Meetings", "Kalender-Tool", "Kalender führt, CRM wird informiert"],
                  ["Website-Verhalten", "Tracking/Analytics", "Events fließen ins CRM"],
                ].map(([typ, master, sync]) => (
                  <div key={typ} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.5fr", borderTop: `1px solid ${c.cardBorder}` }}>
                    <div style={{ padding: "10px 14px", fontSize: "13px", color: c.textPrimary }}>{typ}</div>
                    <div style={{ padding: "10px 14px", fontSize: "13px", color: c.white, fontWeight: 600 }}>{master}</div>
                    <div style={{ padding: "10px 14px", fontSize: "13px", color: c.textSecondary }}>{sync}</div>
                  </div>
                ))}
              </div>
              <h4 style={{ fontSize: "16px", fontWeight: 700, color: c.white, margin: "24px 0 10px" }}>Praxisbeispiel: Der automatisierte Lead-Workflow</h4>
              <div style={{ marginBottom: "16px" }}>
                {[
                  ["Trigger", "Potenzieller Kunde füllt Formular auf deiner Website aus."],
                  ["n8n empfängt das Event", "via Webhook, Workflow startet automatisch."],
                  ["Datenanreicherung", "n8n ruft Firmendaten ab (Branche, Größe, Website) über Enrichment-APIs."],
                  ["CRM-Eintrag", "Vollständiger Kontakt wird angelegt mit allen Daten und richtiger Lifecycle-Stage."],
                  ["KI-Qualifizierung", "KI-Agent bewertet den Lead anhand definierter Kriterien und vergibt einen Score."],
                  ["Routing", "Hoher Score: Terminbuchung. Mittlerer: Nurture-Sequenz. Niedriger: Long-Term-Content."],
                  ["Slack-Benachrichtigung", "Vertriebler erhält alle Infos inklusive KI-generierter Gesprächsvorbereitung."],
                ].map(([title, text], i) => (
                  <div key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "10px" }}>
                    <div style={{ width: "24px", height: "24px", borderRadius: "8px", background: "rgba(255,255,255,0.04)", border: `1px solid ${c.cardBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: "11px", fontWeight: 800, color: c.textMuted }}>{i + 1}</span>
                    </div>
                    <p style={{ fontSize: "14px", color: c.textSecondary, lineHeight: 1.65, margin: 0 }}>
                      <strong style={{ color: c.textPrimary }}>{title}:</strong> {text}
                    </p>
                  </div>
                ))}
              </div>
              <h4 style={{ fontSize: "16px", fontWeight: 700, color: c.white, margin: "24px 0 10px" }}>Was KI-Agenten in diesem Setup bekommen</h4>
              <div style={{ marginBottom: "20px" }}>
                {[
                  ["Kontaktprofil", "Name, Rolle, Unternehmen, Branche aus dem CRM"],
                  ["Engagement-Historie", "Welche E-Mails geöffnet, welche Seiten besucht, welche Inhalte heruntergeladen"],
                  ["Pipeline-Status", "Deal-Stage und nächster Schritt aus dem CRM"],
                  ["Kommunikationshistorie", "Vergangene E-Mails, Anrufe, Meeting-Notizen"],
                  ["Zeitlicher Kontext", "Letzter Kontakt, anstehende Termine, auslaufende Angebote"],
                ].map(([title, text]) => (
                  <BulletItem key={title} icon="→" iconColor={c.textMuted}><strong style={{ color: c.textPrimary }}>{title}:</strong> {text}</BulletItem>
                ))}
              </div>
              <h4 style={{ fontSize: "16px", fontWeight: 700, color: c.white, margin: "24px 0 10px" }}>Implementierung: 4 Wochen</h4>
              <div style={{ borderRadius: "12px", overflow: "hidden", border: `1px solid ${c.cardBorder}` }}>
                <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 1fr" }}>
                  {["Phase", "Was passiert", "Ergebnis"].map(h => (
                    <div key={h} style={{ padding: "10px 14px", fontSize: "11px", fontWeight: 700, color: c.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", background: "rgba(255,255,255,0.03)" }}>{h}</div>
                  ))}
                </div>
                {[
                  ["Woche 1", "Audit: Alle Tools, Datenflüsse und manuelle Prozesse dokumentieren", "Vollständige Toolmap + Engpässe"],
                  ["Woche 2", "Architektur: Master-Systeme definieren, n8n aufsetzen", "Dokumentierte Hub-Spoke-Architektur"],
                  ["Woche 3", "Build: Kern-Workflows implementieren, Spokes anbinden, testen", "Funktionierende Automatisierungen"],
                  ["Woche 4", "Optimierung: Feintuning, Team-Schulung, Go-Live", "Produktives System"],
                ].map(([phase, was, ergebnis]) => (
                  <div key={phase} style={{ display: "grid", gridTemplateColumns: "100px 1fr 1fr", borderTop: `1px solid ${c.cardBorder}` }}>
                    <div style={{ padding: "12px 14px", fontSize: "13px", color: c.amber, fontWeight: 700 }}>{phase}</div>
                    <div style={{ padding: "12px 14px", fontSize: "13px", color: c.textSecondary, lineHeight: 1.5 }}>{was}</div>
                    <div style={{ padding: "12px 14px", fontSize: "13px", color: c.textPrimary, lineHeight: 1.5 }}>{ergebnis}</div>
                  </div>
                ))}
              </div>
            </div>
          </Expander>
        </div>
      </Reveal>

      {/* ── Ansatz 2: SSOT (gekürzt + Expander) ── */}
      <Reveal delay={0.12}>
        <div style={{ background: c.card, borderRadius: "20px", border: `1px solid ${c.cardBorder}`, padding: "clamp(28px,4vw,40px)", marginBottom: "24px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${c.green}55, transparent)` }} />
          <p style={{ fontSize: "11px", fontWeight: 700, color: c.green, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 6px" }}>Ansatz 2 — 15 bis 50+ Mitarbeiter</p>
          <h3 style={{ fontSize: "clamp(20px,3vw,26px)", fontWeight: 800, color: c.white, margin: "0 0 8px", lineHeight: 1.2 }}>Zentrale Datenbank als Single Source of Truth</h3>
          <p style={{ fontSize: "15px", color: c.textSecondary, lineHeight: 1.7, margin: "0 0 24px" }}>
            <strong style={{ color: c.textPrimary }}>Volle Datenhoheit durch eine eigene, zentrale Datenbasis</strong>, unabhängig von einzelnen Tools.
          </p>
          <Body mb="20px">
            Statt dass jedes Tool seine eigene Version deiner Daten verwaltet, baust du eine eigene zentrale Datenbank auf, die als einzige Wahrheitsquelle für alle Systeme dient. Alle Tools lesen aus dieser Datenbank und schreiben in diese Datenbank. Deine Daten gehören dir, nicht HubSpot oder Pipedrive. Tool-Wechsel werden trivial: Die Daten bleiben, nur der Connector ändert sich.
          </Body>
          <div style={{ borderRadius: "12px", overflow: "hidden", border: `1px solid ${c.cardBorder}`, marginBottom: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
              {[["Kriterium", c.textMuted], ["Hub-Spoke (Ansatz 1)", c.amber], ["Zentrale DB / SSOT", c.green]].map(([h, col]) => (
                <div key={h} style={{ padding: "10px 14px", fontSize: "11px", fontWeight: 700, color: col, letterSpacing: "0.08em", textTransform: "uppercase", background: "rgba(255,255,255,0.03)" }}>{h}</div>
              ))}
            </div>
            {[
              ["Datenhoheit", "Verteilt in den Tools", "Zentral, gehört dir"],
              ["KI-Abfrage", "3 bis 4 Tool-Calls", "1 Abfrage, alles"],
              ["Reporting", "Begrenzt (mehrere APIs)", "Unbegrenzt (direktes SQL)"],
              ["Tool-Wechsel", "Workflows anpassen", "Nur Connector ändern"],
            ].map(([krit, v1, v2]) => (
              <div key={krit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: `1px solid ${c.cardBorder}` }}>
                <div style={{ padding: "10px 14px", fontSize: "13px", color: c.textPrimary, fontWeight: 600 }}>{krit}</div>
                <div style={{ padding: "10px 14px", fontSize: "13px", color: c.textSecondary }}>{v1}</div>
                <div style={{ padding: "10px 14px", fontSize: "13px", color: c.green }}>{v2}</div>
              </div>
            ))}
          </div>
          <CalloutBox title="Reporting in der Praxis" borderColor={c.green} titleColor={c.green}>
            Statt 3 Tage Excel-Zusammensuchen: Dein Dashboard zeigt Pipeline-Wert, Abschlussquote, KI-Performance und Kanal-Attribution in <strong style={{ color: c.textPrimary }}>Echtzeit</strong>. Eine Abfrage an eine Quelle, kein Zusammenführen aus fünf APIs.
          </CalloutBox>
          <Expander label="Technischer Deep-Dive" title="Zentrale Datenbank (SSOT) im Detail">
            <div style={{ paddingTop: "20px" }}>
              <SSOTArchitektur />
              <h4 style={{ fontSize: "16px", fontWeight: 700, color: c.white, margin: "4px 0 10px" }}>Technologien für den Mittelstand</h4>
              <Body>Eine eigene Datenbank klingt nach Großkonzern-IT. In der Realität gibt es heute Technologien, die auch für 15 bis 50 Mitarbeiter praktikabel sind:</Body>
              <div style={{ borderRadius: "12px", overflow: "hidden", border: `1px solid ${c.cardBorder}`, marginBottom: "20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr 1fr" }}>
                  {["Technologie", "Was sie bietet", "Ideal für"].map(h => (
                    <div key={h} style={{ padding: "10px 14px", fontSize: "11px", fontWeight: 700, color: c.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", background: "rgba(255,255,255,0.03)" }}>{h}</div>
                  ))}
                </div>
                {[
                  ["PostgreSQL + Supabase", "Relationale DB mit Echtzeit-APIs, Auth und Dashboard, Open Source, self-hostbar", "Volle Kontrolle und SQL-Power"],
                  ["Supabase (Cloud)", "Managed PostgreSQL mit Auto-APIs, Echtzeit-Subscriptions und Auth", "Schneller Start ohne eigene Server"],
                  ["pgvector (Erweiterung)", "Vektorspeicher direkt in PostgreSQL, SQL und Embeddings in einer DB", "KI-Agenten mit RAG-Anbindung"],
                ].map(([tech, bietet, ideal], i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr 1fr", borderTop: `1px solid ${c.cardBorder}`, background: i % 2 === 1 ? "rgba(255,255,255,0.01)" : "transparent" }}>
                    <div style={{ padding: "10px 14px", fontSize: "13px", color: c.white, fontWeight: 600 }}>{tech}</div>
                    <div style={{ padding: "10px 14px", fontSize: "13px", color: c.textSecondary, lineHeight: 1.5 }}>{bietet}</div>
                    <div style={{ padding: "10px 14px", fontSize: "13px", color: c.textSecondary }}>{ideal}</div>
                  </div>
                ))}
              </div>
              <h4 style={{ fontSize: "16px", fontWeight: 700, color: c.white, margin: "24px 0 10px" }}>Wie die Daten zusammenfließen</h4>
              <DatenflussZyklus />
              {[
                ["Ingestion", "n8n-Workflows holen Daten aus allen Tools und schreiben sie strukturiert in die DB. Jeder Datensatz wird normalisiert, dedupliziert und validiert."],
                ["Transformation", "Rohdaten werden zu nutzbaren Informationen: Lead Scores berechnet, Engagement-Indizes aggregiert, Lifecycle-Stages aktualisiert."],
                ["Distribution", "Tools lesen Daten aus der zentralen DB. Das CRM zeigt den Engagement-Score an, die Berechnung passiert in der DB."],
                ["Feedback", "Jedes Ergebnis (E-Mail geöffnet, Termin gebucht, Deal gewonnen) fließt zurück. Der Score wird neu berechnet."],
              ].map(([title, text], i) => (
                <BulletItem key={i} icon="→" iconColor={c.textMuted}><strong style={{ color: c.textPrimary }}>{title}:</strong> {text}</BulletItem>
              ))}
              <h4 style={{ fontSize: "16px", fontWeight: 700, color: c.white, margin: "24px 0 10px" }}>Was die zentrale Datenbank konkret speichert</h4>
              <ERDiagramm />
              <div style={{ marginBottom: "16px" }}>
                {[
                  ["Unified Contact Records", "Stammdaten, Qualifizierung, Lifecycle-Stage, Attribution, DSGVO-Consent pro Kontakt"],
                  ["Vollständige Interaktionshistorie", "E-Mail-Engagement, Website-Verhalten, Calls, Angebote, Social, systemübergreifend"],
                  ["Pipeline & Deals mit Audit Trail", "Stage-Historie, Deal-Value, Gewinn-/Verlustgründe, jede Änderung nachvollziehbar"],
                  ["Berechnete Felder & KI-Daten", "Lead Score, Engagement-Index, KI-Agent-Logs, Embedding-Referenzen für RAG"],
                ].map(([title, desc], i) => (
                  <BulletItem key={i}><strong style={{ color: c.textPrimary }}>{title}:</strong> {desc}</BulletItem>
                ))}
              </div>
              <h4 style={{ fontSize: "16px", fontWeight: 700, color: c.white, margin: "24px 0 10px" }}>Praxisbeispiel: Lead-Workflow mit SSOT</h4>
              <SSOTLeadWorkflow />
              <CalloutBox title="Was hier anders läuft als bei Hub-Spoke" borderColor={c.green} titleColor={c.green}>
                Im Hub-Spoke-Modell muss der KI-Agent Daten aus 3 bis 4 verschiedenen Tools zusammenführen. Bei SSOT macht er eine einzige Abfrage und bekommt alles. Das ermöglicht Abfragen wie: <em style={{ color: c.textSecondary }}>{'"Alle SQLs aus Branche SaaS, die in den letzten 30 Tagen die Pricing-Seite besucht haben und deren Deal-Value über 15.000 Euro liegt."'}</em>
              </CalloutBox>
              <h4 style={{ fontSize: "16px", fontWeight: 700, color: c.white, margin: "24px 0 10px" }}>Reporting & Business Analytics</h4>
              <DashboardMockup />
              <h4 style={{ fontSize: "16px", fontWeight: 700, color: c.white, margin: "24px 0 10px" }}>Implementierungsfahrplan: 4 bis 8 Wochen</h4>
              <div style={{ borderRadius: "12px", overflow: "hidden", border: `1px solid ${c.cardBorder}`, marginBottom: "20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "90px 1fr 80px" }}>
                  {["Phase", "Was passiert", "Dauer"].map(h => (
                    <div key={h} style={{ padding: "10px 14px", fontSize: "11px", fontWeight: 700, color: c.textMuted, letterSpacing: "0.07em", textTransform: "uppercase", background: "rgba(255,255,255,0.03)" }}>{h}</div>
                  ))}
                </div>
                {[
                  ["1: Audit", "Bestandsaufnahme aller Tools, Datenquellen, Prozesse", "Woche 1"],
                  ["2: Datenmodell", "Tabellen, Relationen, berechnete Felder, Zugriffsebenen entwerfen", "Woche 2"],
                  ["3: Setup", "Supabase/PostgreSQL aufsetzen, n8n konfigurieren, APIs anbinden", "Woche 3"],
                  ["4: Migration", "Bestehende Daten bereinigen, deduplizieren, normalisieren", "Woche 3 bis 4"],
                  ["5: Workflows", "n8n-Workflows für Ingestion, Transformation, Distribution", "Woche 4 bis 5"],
                  ["6: Dashboards", "KPI-Dashboards, Team-Zugänge, Schulung", "Woche 5 bis 6"],
                  ["7: Go-Live", "Feintuning, Edge Cases, Monitoring", "Woche 6 bis 8"],
                ].map(([phase, was, dauer]) => (
                  <div key={phase} style={{ display: "grid", gridTemplateColumns: "90px 1fr 80px", borderTop: `1px solid ${c.cardBorder}` }}>
                    <div style={{ padding: "12px 14px", fontSize: "13px", color: c.green, fontWeight: 700 }}>{phase}</div>
                    <div style={{ padding: "12px 14px", fontSize: "13px", color: c.textSecondary, lineHeight: 1.5 }}>{was}</div>
                    <div style={{ padding: "12px 14px", fontSize: "12px", color: c.textMuted }}>{dauer}</div>
                  </div>
                ))}
              </div>
              <h4 style={{ fontSize: "16px", fontWeight: 700, color: c.white, margin: "0 0 10px" }}>Migrationspfad: Von Hub-Spoke zu SSOT</h4>
              <Body>
                Wenn du aktuell mit Hub-Spoke arbeitest, ist der Übergang kein Neuanfang, sondern eine Evolution. Die bestehenden n8n-Workflows bleiben erhalten. Es kommt eine DB-Schicht dazu, und die Workflows werden umgebaut, sodass sie in die DB schreiben statt zwischen Tools zu synchronisieren. Typische Migrationsdauer: <strong style={{ color: c.textPrimary }}>4 bis 6 Wochen ohne Betriebsunterbrechung.</strong>
              </Body>
              <h4 style={{ fontSize: "16px", fontWeight: 700, color: c.white, margin: "24px 0 10px" }}>Datenschutz & DSGVO</h4>
              <div style={{ marginBottom: "0" }}>
                {[
                  ["Auskunftsrecht (Art. 15)", "Eine Abfrage, ein vollständiges Ergebnis, statt 8 verschiedene Tools durchsuchen."],
                  ["Löschrecht (Art. 17)", "Löschung in der zentralen DB löscht die Wahrheitsquelle. n8n bereinigt automatisch Spiegeldaten."],
                  ["Verarbeitungsverzeichnis", "Alle Datenflüsse über zentrale DB und n8n ergeben eine vollständige, dokumentierbare Übersicht."],
                  ["Consent Management", "Opt-in-Status, Verarbeitungsgrundlage und Widerspruchsdatum zentral gespeichert."],
                ].map(([title, desc], i) => (
                  <BulletItem key={i} icon="✓" iconColor={c.green}><strong style={{ color: c.textPrimary }}>{title}:</strong> {desc}</BulletItem>
                ))}
              </div>
            </div>
          </Expander>
        </div>
      </Reveal>

      {/* ── Vergleichs-Card (neu) ── */}
      <Reveal>
        <div style={{ display: "grid", gridTemplateColumns: GRID2, gap: "1px", background: c.cardBorder, borderRadius: "16px", overflow: "hidden", marginBottom: "40px" }}>
          {[
            {
              label: "Hub-Spoke-Integration",
              sub: "Für 3 bis 15 Mitarbeiter",
              color: c.amber,
              pros: ["Bestehende Tools verbinden", "Schnell implementierbar (2 bis 4 Wochen)", "Geringes Budget nötig"],
              tools: "n8n, Make, Zapier",
              timeline: "2 bis 4 Wochen",
            },
            {
              label: "Zentrale Datenbank (SSOT)",
              sub: "Für 15 bis 50+ Mitarbeiter",
              color: c.green,
              pros: ["Eine Wahrheit für alle", "Echtzeit-Reporting", "KI-Agenten performen besser", "Tool-Wechsel ohne Datenverlust"],
              tools: "PostgreSQL, Supabase",
              timeline: "4 bis 8 Wochen",
            },
          ].map((item, i) => (
            <div key={i} style={{ background: c.card, padding: "clamp(24px,3vw,32px)" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, color: item.color, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 4px" }}>{item.label}</p>
              <p style={{ fontSize: "13px", color: c.textMuted, margin: "0 0 20px" }}>{item.sub}</p>
              {item.pros.map((pro, j) => (
                <div key={j} style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "8px" }}>
                  <span style={{ color: item.color, fontSize: "12px", fontWeight: 700, flexShrink: 0, marginTop: "2px" }}>✓</span>
                  <span style={{ fontSize: "13.5px", color: c.textSecondary, lineHeight: 1.5 }}>{pro}</span>
                </div>
              ))}
              <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: `1px solid ${c.cardBorder}` }}>
                <p style={{ fontSize: "12px", color: c.textMuted, margin: "0 0 4px" }}>Tools: <span style={{ color: c.textSecondary }}>{item.tools}</span></p>
                <p style={{ fontSize: "12px", color: c.textMuted, margin: 0 }}>Timeline: <span style={{ color: c.textSecondary }}>{item.timeline}</span></p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ── CTA ── */}
      <Reveal>
        <div style={{ background: "rgba(34,197,94,0.04)", borderRadius: "20px", border: "1px solid rgba(34,197,94,0.15)", padding: "clamp(28px,4vw,40px)", marginTop: "8px" }}>
          <h3 style={{ fontSize: "clamp(20px,3vw,26px)", fontWeight: 800, color: c.white, margin: "0 0 16px", lineHeight: 1.2 }}>
            Der nächste Schritt: Welcher Ansatz passt zu dir?
          </h3>
          <p style={{ fontSize: "15px", color: c.textSecondary, lineHeight: 1.75, margin: "0 0 24px", maxWidth: "620px" }}>
            Du weißt jetzt, warum die Datenbasis das Fundament ist. Aber welcher Ansatz passt zu deiner Situation? Im kostenlosen Analysegespräch schauen wir uns deine aktuelle Datenlandschaft an und zeigen dir den kürzesten Weg zum Ziel.
          </p>
          <div style={{ background: c.card, borderRadius: "14px", padding: "clamp(20px,3vw,28px)", border: `1px solid ${c.cardBorder}`, maxWidth: "560px" }}>
            <p style={{ fontSize: "13px", fontWeight: 700, color: c.green, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 8px" }}>Kostenloses Analysegespräch</p>
            <p style={{ fontSize: "14.5px", color: c.textSecondary, lineHeight: 1.7, margin: "0 0 16px" }}>
              In 45 Minuten analysieren wir deine aktuelle Infrastruktur: Tools, Datenflüsse, Prozesse, KPIs. Du erhältst eine klare Empfehlung, Hub-Spoke oder SSOT, inklusive Fahrplan mit Zeitrahmen und erwartbarem ROI. Unabhängig davon, ob du mit uns zusammenarbeitest.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: c.green, color: "#000", padding: "12px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>
              Kostenloses Analysegespräch buchen →
            </div>
          </div>
        </div>
      </Reveal>
    </>
  );
}
