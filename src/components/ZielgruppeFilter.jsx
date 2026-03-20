import { Badge } from "../shared/Badge";
import { Reveal } from "../shared/Reveal";
import { c } from "../shared/tokens";

function LI({ icon, iconColor, children, delay = 0 }) {
  const g = iconColor === c.green;
  return (
    <Reveal delay={delay}>
      <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "16px" }}>
        <div style={{ width: "24px", height: "24px", borderRadius: "50%", flexShrink: 0, marginTop: "1px", display: "flex", alignItems: "center", justifyContent: "center", background: g ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", border: `1px solid ${g ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}` }}>
          <span style={{ fontSize: "12px", fontWeight: 700, color: iconColor, lineHeight: 1 }}>{icon}</span>
        </div>
        <span style={{ fontSize: "15px", lineHeight: 1.65, color: c.textPrimary }}>{children}</span>
      </div>
    </Reveal>
  );
}

export function ZielgruppeFilter() {
  return (
    <>
      <Reveal><Badge>Bevor du weiterliest</Badge></Reveal>
      <Reveal delay={0.1}><h1 style={{ fontSize: "clamp(32px,5.5vw,56px)", fontWeight: 800, color: c.white, margin: "24px 0 20px", lineHeight: 1.08, letterSpacing: "-0.03em" }}>Du bist hier richtig.</h1></Reveal>
      <Reveal delay={0.15}><p style={{ fontSize: "clamp(15px,2vw,17px)", color: c.textSecondary, lineHeight: 1.7, margin: "0 0 48px", maxWidth: "580px" }}>Dieser Report wurde für eine ganz bestimmte Gruppe geschrieben. Lies weiter, wenn das auf dich zutrifft:</p></Reveal>
      <div style={{ marginBottom: "40px" }}>
        <LI icon={"\u2713"} iconColor={c.green} delay={0.2}><strong style={{ color: c.white }}>B2B-Dienstleister:</strong> Agentur, Beratung, IT-Services, Software, Coaching oder ein anderes B2B-Produkt/-Service</LI>
        <LI icon={"\u2713"} iconColor={c.green} delay={0.25}>Du hast ein <strong style={{ color: c.white }}>funktionierendes Produkt oder eine bewährte Dienstleistung</strong> und machst mindestens <strong style={{ color: c.white }}>5-stellige Monatsumsätze</strong></LI>
        <LI icon={"\u2713"} iconColor={c.green} delay={0.3}>Du willst <strong style={{ color: c.white }}>wachsen, ohne Burnout</strong> und ohne für jedes Problem neues Personal einzustellen</LI>
        <LI icon={"\u2713"} iconColor={c.green} delay={0.35}>Du bist bereit, in <strong style={{ color: c.white }}>Systematisierung und Automatisierung</strong> zu investieren</LI>
      </div>
      <Reveal delay={0.4}><p style={{ fontSize: "14.5px", color: c.red, fontWeight: 500, margin: "0 0 18px", opacity: 0.9 }}>Ehrlich gesagt: Dieser Report ist nichts für dich, wenn:</p></Reveal>
      <div style={{ marginBottom: "80px" }}>
        <LI icon={"\u2717"} iconColor={c.red} delay={0.45}>Du gerne 60h pro Woche für wenig Geld arbeitest</LI>
        <LI icon={"\u2717"} iconColor={c.red} delay={0.5}>{`"Mehr Kunden lösen alles" dein Mantra ist`}</LI>
        <LI icon={"\u2717"} iconColor={c.red} delay={0.55}>KI für dich ein Hype ist statt ein Werkzeug</LI>
        <LI icon={"\u2717"} iconColor={c.red} delay={0.6}>Du lieber abwartest, statt jetzt zu handeln</LI>
      </div>
    </>
  );
}
