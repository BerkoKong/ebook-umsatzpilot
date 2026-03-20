import { Badge } from "../shared/Badge";
import { Reveal, useInView } from "../shared/Reveal";
import { c, GRID2 } from "../shared/tokens";

function VS({ time, text, delay = 0 }) {
  const [ref, v] = useInView(0.1);
  return (
    <Reveal delay={delay}>
      <div style={{ display: "flex", gap: "20px", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: "20px" }}>
          <div ref={ref} style={{ width: "10px", height: "10px", borderRadius: "50%", background: v ? c.green : c.cardBorder, border: `2px solid ${v ? "rgba(34,197,94,0.3)" : c.cardBorder}`, transition: "all 0.6s ease", boxShadow: v ? "0 0 12px rgba(34,197,94,0.2)" : "none", flexShrink: 0, marginTop: "6px" }} />
          <div style={{ width: "1px", flex: 1, background: `linear-gradient(180deg, rgba(34,197,94,0.15), ${c.cardBorder})`, minHeight: "40px" }} />
        </div>
        <div style={{ paddingBottom: "32px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, color: c.green, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px", opacity: 0.8 }}>{time}</p>
          <p style={{ fontSize: "15px", color: c.textPrimary, lineHeight: 1.7, margin: 0 }}>{text}</p>
        </div>
      </div>
    </Reveal>
  );
}

function VM({ value, label, delay = 0 }) {
  const [ref, v] = useInView(0.1);
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: c.green, lineHeight: 1, marginBottom: "6px", opacity: v ? 1 : 0, transform: v ? "scale(1)" : "scale(0.8)", transition: `all 0.6s cubic-bezier(.25,.46,.45,.94) ${delay}s` }}>{value}</div>
      <div style={{ fontSize: "12px", color: c.textMuted, fontWeight: 500 }}>{label}</div>
    </div>
  );
}

export function Wunschbild() {
  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", top: "-100px", left: "50%", transform: "translateX(-50%)", width: "600px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(34,197,94,0.025) 0%, transparent 70%)", pointerEvents: "none" }} />
      <Reveal><Badge color={c.green}>Dein Zielbild</Badge></Reveal>
      <Reveal delay={0.08}><h2 style={{ fontSize: "clamp(28px,4.5vw,44px)", fontWeight: 800, color: c.white, margin: "24px 0 16px", lineHeight: 1.1, letterSpacing: "-0.025em" }}>Stell dir vor, dein Unternehmen würde so laufen.</h2></Reveal>
      <Reveal delay={0.14}><p style={{ fontSize: "clamp(15px,2vw,17px)", color: c.textSecondary, lineHeight: 1.7, margin: "0 0 56px", maxWidth: "600px" }}>Kein Wunschdenken. Das passiert, wenn Wachstum an Systemen hängt statt an Personen.</p></Reveal>
      <div style={{ marginBottom: "56px", paddingLeft: "4px" }}>
        <VS time="07:00 Uhr" text="Pipeline hat sich über Nacht gefüllt. Ein System arbeitet für dich, rund um die Uhr." delay={0.1} />
        <VS time="Dashboard" text="Klare Zahlen statt Bauchgefühl. LinkedIn, E-Mail, Ads: alles automatisiert und messbar." delay={0.16} />
        <VS time="Neuer Lead" text="Innerhalb von Minuten kontaktiert. KI qualifiziert, fasst nach, bucht den Termin." delay={0.22} />
        <VS time="Dein Team" text="Arbeitet in Prozessen. Kein Lead fällt durch. Sales Calls automatisch analysiert." delay={0.28} />
        <VS time="Du als Inhaber" text="Strategie, Partnerschaften, Produktentwicklung. Der Unternehmer, der du sein wolltest." delay={0.34} />
        <VS time="Im Urlaub" text="Handy bleibt in der Tasche. Doppelt so viele Anfragen? Dein System trägt das." delay={0.4} />
      </div>
      <Reveal><div style={{ background: c.card, borderRadius: "16px", padding: "clamp(28px,4vw,36px) clamp(20px,3vw,28px)", border: "1px solid rgba(34,197,94,0.15)", marginBottom: "48px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${c.green}44, transparent)` }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: "clamp(12px,3vw,24px)" }}>
          <VM value="-70%" label="Manuelle Arbeit" delay={0.1} />
          <VM value="3x" label="Mehr Termine" delay={0.2} />
          <VM value="+50%" label="Umsatzrendite" delay={0.3} />
          <VM value="24/7" label="Leadgenerierung" delay={0.4} />
        </div>
      </div></Reveal>
      <div style={{ display: "grid", gridTemplateColumns: GRID2, gap: "20px", marginBottom: "48px" }}>
        <Reveal delay={0.1}><div style={{ background: c.card, borderRadius: "16px", padding: "28px 24px", border: `1px solid ${c.cardBorder}`, height: "100%", boxSizing: "border-box" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, color: c.green, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 10px" }}>Das Cockpit</p>
          <p style={{ fontSize: "15px", color: c.textPrimary, lineHeight: 1.7, margin: "0 0 12px" }}>Routinetätigkeiten laufen automatisch, Personalkosten sinken, KI-Agenten besetzen ganze Stellen. Du arbeitest rein strategisch.</p>
          <p style={{ fontSize: "14px", color: c.textSecondary, lineHeight: 1.6, margin: 0 }}>Kundengewinnung und Delivery hängen nicht mehr an dir.</p>
        </div></Reveal>
        <Reveal delay={0.18}><div style={{ background: c.card, borderRadius: "16px", padding: "28px 24px", border: `1px solid ${c.cardBorder}`, height: "100%", boxSizing: "border-box" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, color: c.green, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 10px" }}>Der Burggraben</p>
          <p style={{ fontSize: "15px", color: c.textPrimary, lineHeight: 1.7, margin: "0 0 12px" }}>Während andere noch diskutieren, baust du einen uneinholbaren Vorsprung auf.</p>
          <p style={{ fontSize: "14px", color: c.textSecondary, lineHeight: 1.6, margin: 0 }}>In den nächsten Jahren: Ein-Mann-Vertriebe mit 7-stelligen Abschlussvolumen. Bist du einer davon?</p>
        </div></Reveal>
      </div>
      <Reveal><div style={{ background: "linear-gradient(135deg, rgba(34,197,94,0.06), rgba(34,197,94,0.01))", borderRadius: "16px", padding: "clamp(28px,4vw,40px) clamp(24px,4vw,36px)", textAlign: "center", border: "1px solid rgba(34,197,94,0.15)", position: "relative", overflow: "hidden" }}>
        <p style={{ fontSize: "clamp(17px,2.5vw,20px)", fontWeight: 700, color: c.white, margin: "0 0 16px" }}>Das ist kein Traum.</p>
        <p style={{ fontSize: "16px", color: c.textPrimary, lineHeight: 1.7, margin: 0, maxWidth: "560px", marginLeft: "auto", marginRight: "auto" }}>Das passiert, wenn 70% der manuellen Arbeit von KI übernommen wird und dein Wachstum an Systemen hängt, <strong style={{ color: c.green }}>nicht an Personen.</strong></p>
      </div></Reveal>
    </div>
  );
}
