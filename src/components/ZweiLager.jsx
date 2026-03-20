import { Badge } from "../shared/Badge";
import { Reveal } from "../shared/Reveal";
import { c, GRID2 } from "../shared/tokens";

function CC({ type, label, items, delay = 0 }) {
  const g = type === "good";
  const bdr = g ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.12)";
  const ic = g ? "\u2713" : "\u2717";
  const col = g ? c.green : c.red;
  return (
    <Reveal delay={delay}>
      <div style={{ background: c.card, borderRadius: "16px", padding: "clamp(24px,3vw,32px) clamp(20px,3vw,28px) clamp(18px,3vw,24px)", border: `1px solid ${bdr}`, height: "100%", boxSizing: "border-box" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", background: g ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.08)", border: `1px solid ${bdr}` }}>
            <span style={{ fontSize: "14px", fontWeight: 800, color: col }}>{ic}</span>
          </div>
          <span style={{ fontSize: "15px", fontWeight: 600, color: c.textPrimary }}>{label}</span>
        </div>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "13px" }}>
            <span style={{ color: col, fontSize: "12px", fontWeight: 700, flexShrink: 0, marginTop: "4px" }}>{ic}</span>
            <span style={{ color: c.textSecondary, fontSize: "14px", lineHeight: 1.6 }}>{item}</span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

export function ZweiLager() {
  return (
    <>
      <Reveal><div style={{ textAlign: "center", marginBottom: "24px" }}><Badge>Eine Entscheidung</Badge></div></Reveal>
      <Reveal delay={0.05}><h2 style={{ fontSize: "clamp(28px,4.5vw,44px)", fontWeight: 800, color: c.white, margin: "0 0 12px", lineHeight: 1.1, letterSpacing: "-0.025em", textAlign: "center" }}>Zwei Lager.</h2></Reveal>
      <Reveal delay={0.1}><p style={{ fontSize: "16px", color: c.textSecondary, lineHeight: 1.7, margin: "0 0 44px", textAlign: "center" }}>Die B2B-Welt teilt sich gerade. In welchem Lager stehst du?</p></Reveal>
      <div style={{ display: "grid", gridTemplateColumns: GRID2, gap: "20px", marginBottom: "64px" }}>
        <CC type="bad" label={'"Wir beobachten erstmal"'} items={['Wartet auf den richtigen Zeitpunkt', "27 SaaS-Tools, nichts connected", 'KI = ChatGPT ab und zu nutzen', "Jeder arbeitet in Silos", "Skalierung = mehr Leute einstellen"]} delay={0.15} />
        <CC type="good" label={'"Wir bauen jetzt"'} items={["KI ist das Betriebssystem, kein Add-on", "Schlanker Stack: Claude, Airtable, GitHub, Make", "Jeder Mitarbeiter hat einen KI-Co-Piloten", "Prozesse automatisiert, nicht nur dokumentiert", "3-Personen-Teams liefern wie 15-Mann-Agenturen"]} delay={0.25} />
      </div>
      <Reveal><div style={{ background: c.card, borderRadius: "16px", padding: "clamp(28px,4vw,40px) clamp(24px,4vw,36px)", border: `1px solid ${c.cardBorder}`, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "60%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }} />
        <p style={{ fontSize: "clamp(17px,2.5vw,20px)", fontWeight: 700, color: c.white, margin: "0 0 12px", lineHeight: 1.35 }}>Die Frage ist nicht, ob KI deinen Markt verändert.</p>
        <p style={{ fontSize: "15px", color: c.textSecondary, lineHeight: 1.7, margin: 0, maxWidth: "560px", marginLeft: "auto", marginRight: "auto" }}>Die Frage ist, ob du derjenige bist, der davon profitiert. Oder derjenige, der zusieht.</p>
      </div></Reveal>
    </>
  );
}
