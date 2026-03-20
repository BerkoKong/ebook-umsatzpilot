import { Badge } from "../shared/Badge";
import { Reveal } from "../shared/Reveal";
import { c, GRID2 } from "../shared/tokens";

export function ConversionCTA() {
  return (
    <>
      {/* Bridge */}
      <Reveal><Badge color={c.amber}>Von der Theorie zur Praxis</Badge></Reveal>
      <Reveal delay={0.08}>
        <h2 style={{ fontSize: "clamp(28px,4.5vw,44px)", fontWeight: 800, color: c.white, margin: "24px 0 16px", lineHeight: 1.1, letterSpacing: "-0.025em" }}>
          Du weißt jetzt WAS und WARUM.{" "}
          <span style={{ color: c.textMuted }}>Aber weißt du auch WIE?</span>
        </h2>
      </Reveal>
      <Reveal delay={0.14}>
        <p style={{ fontSize: "clamp(15px,2vw,17px)", color: c.textSecondary, lineHeight: 1.7, margin: "0 0 20px", maxWidth: "620px" }}>
          Alles, was du in diesem Report gelesen hast: die fünf Bausteine Strategie, Datenbasis, RevOps, Demand Generation Engine und Revenue Generation Engine. Genau das haben wir bei Umsatzpilot aufgebaut und helfen Agenturen und B2B-Unternehmen im DACH-Raum dabei, es zu implementieren.
        </p>
      </Reveal>
      <Reveal delay={0.18}>
        <div style={{ background: c.card, borderRadius: "12px", padding: "20px 24px", border: `1px solid ${c.cardBorder}`, marginBottom: "48px", maxWidth: "620px" }}>
          <p style={{ fontSize: "15px", color: c.textPrimary, lineHeight: 1.7, margin: 0 }}>
            Wenn du etwas Ineffizientes skalierst, ist es wie einen Tumor zu skalieren. <strong style={{ color: c.white }}>Zuerst musst du die Ineffizienzen beseitigen.</strong> Dann kannst du skalieren und auf Wachstums-Gas drücken.
          </p>
        </div>
      </Reveal>

      {/* Knowledge Gap Questions */}
      <Reveal>
        <div style={{ background: c.card, borderRadius: "16px", padding: "clamp(28px,4vw,36px) clamp(24px,3vw,32px)", border: `1px solid ${c.cardBorder}`, marginBottom: "48px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${c.amber}44, transparent)` }} />
          <h3 style={{ fontSize: "clamp(17px,2.5vw,20px)", fontWeight: 700, color: c.white, margin: "0 0 8px" }}>Konkret fragst du dich gerade vielleicht:</h3>
          <p style={{ fontSize: "14px", color: c.textMuted, margin: "0 0 24px" }}>Du kennst jetzt die Bausteine und die Fehler. Aber die ehrliche Frage ist: Kannst du das alleine umsetzen?</p>
          <div style={{ display: "grid", gridTemplateColumns: GRID2, gap: "16px 28px" }}>
            <div>
              {[
                "Wie automatisiere ich konkret die Leadgenerierung?",
                "Wie richte ich einen KI-Agenten ein und steuere ihn?",
                "Was sind die richtigen Systeme und Prozesse mit einem AI-First Ansatz?",
                "Welches CRM setze ich ein und welche KI-Assistenten gebe ich meinem Team?",
                "Was kostet mich das NICHT einzuführen? Wie viel Umsatz entgeht mir?",
                "Wie sieht es rechtlich und datenschutztechnisch aus?",
              ].map((q, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "12px" }}>
                  <span style={{ color: c.amber, fontSize: "14px", fontWeight: 700, flexShrink: 0, marginTop: "2px" }}>?</span>
                  <span style={{ fontSize: "14px", color: c.textSecondary, lineHeight: 1.6 }}>{q}</span>
                </div>
              ))}
            </div>
            <div>
              {[
                "Was hat JETZT Priorität und was nicht?",
                "Wie übergebe ich Systeme an mein Team und bilde sie fachlich aus?",
                "Wie setze ich diese Systeme skalierbar ein?",
                "Funktioniert Kaltakquise, Qualifizierung und Terminierung mit KI-Agenten?",
                "Funktioniert das überhaupt in meiner Branche?",
                "Was sind meine konkreten ersten Schritte?",
              ].map((q, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "12px" }}>
                  <span style={{ color: c.amber, fontSize: "14px", fontWeight: 700, flexShrink: 0, marginTop: "2px" }}>?</span>
                  <span style={{ fontSize: "14px", color: c.textSecondary, lineHeight: 1.6 }}>{q}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* DIY vs Umsatzpilot */}
      <Reveal>
        <h3 style={{ fontSize: "clamp(22px,3.5vw,30px)", fontWeight: 800, color: c.white, margin: "0 0 12px", textAlign: "center" }}>
          Deine nächsten Schritte
        </h3>
        <p style={{ fontSize: "15px", color: c.textSecondary, lineHeight: 1.7, margin: "0 0 36px", textAlign: "center" }}>
          Du hast zwei Optionen. Welchen Weg wählst du?
        </p>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: GRID2, gap: "20px", marginBottom: "32px", alignItems: "start" }}>
        {/* Option 1: DIY */}
        <Reveal delay={0.1}>
          <div style={{ background: c.card, borderRadius: "16px", border: `1px solid ${c.cardBorder}`, overflow: "hidden" }}>
            <div style={{ padding: "24px 24px 20px", borderBottom: `1px solid ${c.cardBorder}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: `1px solid ${c.cardBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "13px", fontWeight: 800, color: c.textMuted }}>01</span>
                </div>
                <h4 style={{ fontSize: "18px", fontWeight: 700, color: c.white, margin: 0 }}>DIY Implementation</h4>
              </div>
              <p style={{ fontSize: "13px", color: c.textMuted, margin: 0, fontStyle: "italic" }}>Nimm dieses Playbook und setze es selbst um.</p>
            </div>
            <div style={{ padding: "20px 24px 8px" }}>
              {["Setze es Schritt für Schritt um", "Rechne mit 6 bis 12 Monaten bis alles läuft", "Lerne aus deinen Fehlern (teuer, aber lehrreich)"].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "12px" }}>
                  <span style={{ color: c.textMuted, fontSize: "12px", fontWeight: 700, flexShrink: 0, marginTop: "3px" }}>{"\u2713"}</span>
                  <span style={{ fontSize: "14px", color: c.textSecondary, lineHeight: 1.5 }}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: "4px 24px 20px" }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: c.red, margin: "0 0 12px", letterSpacing: "0.06em", textTransform: "uppercase" }}>Was dich erwartet</p>
              {[
                "Massive Fixkosten durch Try-and-Error",
                "Arbeitsabläufe werden noch chaotischer",
                "Dein Team stagniert, weil Systeme fehlen",
                "Fulfillment leidet, weil du im Vertrieb feststeckst",
                "Budget für Fehler: mindestens 50.000 Euro",
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "8px" }}>
                  <span style={{ color: c.red, fontSize: "12px", fontWeight: 700, flexShrink: 0, marginTop: "3px" }}>{"\u2717"}</span>
                  <span style={{ fontSize: "13.5px", color: c.textSecondary, lineHeight: 1.5 }}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: "16px 24px 24px", borderTop: `1px solid ${c.cardBorder}` }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: c.textMuted, margin: "0 0 8px" }}>Denk mal nach:</p>
              {[
                "1 verlorener Kunde = X Euro Lifetime Value weg",
                "1 nicht geholte Empfehlung = X Euro nicht verdient",
                "1 verpasster Upsell = X Euro liegen gelassen",
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "6px" }}>
                  <span style={{ color: c.red, fontSize: "11px", marginTop: "5px", flexShrink: 0 }}>{"\u25A0"}</span>
                  <span style={{ fontSize: "13px", color: c.textSecondary, lineHeight: 1.5 }}>{t}</span>
                </div>
              ))}
              <p style={{ fontSize: "14px", fontWeight: 700, color: c.red, margin: "16px 0 0" }}>
                Pro Monat verlierst du wahrscheinlich 50.000 Euro+ durch fehlende Systeme.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Option 2: Umsatzpilot */}
        <Reveal delay={0.2}>
          <div style={{ background: c.card, borderRadius: "16px", border: "1px solid rgba(34,197,94,0.2)", overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${c.green}, transparent)` }} />
            <div style={{ padding: "24px 24px 20px", borderBottom: "1px solid rgba(34,197,94,0.1)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "13px", fontWeight: 800, color: c.green }}>02</span>
                </div>
                <h4 style={{ fontSize: "18px", fontWeight: 700, color: c.white, margin: 0 }}>Gemeinsam durchstarten</h4>
              </div>
              <p style={{ fontSize: "13px", color: c.textMuted, margin: 0, fontStyle: "italic" }}>Wir implementieren die Systeme MIT dir.</p>
            </div>
            <div style={{ padding: "20px 24px 8px" }}>
              {[
                "3 bis 6 Monate bis zum laufenden System",
                "Dein Team wird parallel geschult",
                "Unsere Fehler haben wir schon gemacht (und bezahlt)",
                "Erfolgswahrscheinlichkeit: 85%+ (basierend auf 550+ Kunden)",
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "12px" }}>
                  <span style={{ color: c.green, fontSize: "12px", fontWeight: 700, flexShrink: 0, marginTop: "3px" }}>{"\u2713"}</span>
                  <span style={{ fontSize: "14px", color: c.textPrimary, lineHeight: 1.5 }}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: "4px 24px 20px" }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: c.green, margin: "0 0 12px", letterSpacing: "0.06em", textTransform: "uppercase" }}>Das bekommst du</p>
              {[
                "Erprobte Systeme (bei 550+ Kunden bewiesen)",
                "Persönliche Begleitung statt DIY-Chaos oder Video-Kurse",
                "Team-Training inklusive (A-Player Entwicklung)",
                "Messbare Ergebnisse oder Geld zurück",
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "8px" }}>
                  <span style={{ color: c.green, fontSize: "12px", fontWeight: 700, flexShrink: 0, marginTop: "3px" }}>{"\u2713"}</span>
                  <span style={{ fontSize: "13.5px", color: c.textPrimary, lineHeight: 1.5 }}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: "16px 24px 24px", borderTop: "1px solid rgba(34,197,94,0.1)" }}>
              <p style={{ fontSize: "14px", color: c.textPrimary, lineHeight: 1.6, margin: 0 }}>
                <strong style={{ color: c.green }}>Für wen geeignet:</strong> Unternehmer, die Umsatzsysteme wollen, keine Lernprozesse.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Price Block */}
      <Reveal>
        <div style={{ background: c.card, borderRadius: "12px", padding: "24px 28px", border: `1px solid ${c.cardBorder}`, marginBottom: "48px", maxWidth: "620px", marginLeft: "auto", marginRight: "auto" }}>
          <p style={{ fontSize: "15px", color: c.textPrimary, lineHeight: 1.7, margin: "0 0 12px" }}>
            <strong style={{ color: c.white }}>Die Investition:</strong> Der Invest für ein funktionsfähiges System liegt bei uns im 4- bis 5-stelligen Bereich. Der konkrete Preis ist abhängig davon, welche Bausteine in deinem Unternehmen Sinn machen.
          </p>
          <p style={{ fontSize: "14px", color: c.textSecondary, lineHeight: 1.6, margin: 0 }}>
            Viele Interessenten sind überrascht, dass es möglich ist, mit Umsatzpilot deutlich unterhalb von 10.000 Euro zu starten. Das können wir anbieten, weil wir selbst auf die Systeme und KI-Mitarbeiter setzen, die wir für unsere Kunden bauen.
          </p>
        </div>
      </Reveal>

      {/* Objection Handling */}
      <Reveal>
        <div style={{ background: c.card, borderRadius: "16px", padding: "clamp(28px,4vw,36px) clamp(24px,3vw,32px)", border: `1px solid ${c.cardBorder}`, marginBottom: "20px" }}>
          <h3 style={{ fontSize: "clamp(17px,2.5vw,20px)", fontWeight: 700, color: c.white, margin: "0 0 24px" }}>Belüg dich nicht selbst.</h3>
          <div style={{ display: "grid", gridTemplateColumns: GRID2, gap: "20px" }}>
            {[
              { objection: "Ich habe keine Zeit.", reality: "Du hast keine Zeit, WEIL du keine Systeme hast. Systeme schaffen Zeit." },
              { objection: "Ich kann es selbst implementieren.", reality: "Könntest du. Aber es dauert 3x länger und kostet 5x mehr." },
              { objection: "Das funktioniert nicht in meiner Branche.", reality: "KI entwickelt sich so rasant, dass du täglich dranbleiben müsstest. Überlass uns das und konzentrier dich auf dein Kerngeschäft." },
              { objection: "Ich probiere es später.", reality: "Später kommt nie. Jeder Tag ohne System ist ein Tag, an dem die Konkurrenz davonzieht." },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: "8px" }}>
                <p style={{ fontSize: "14px", fontWeight: 600, color: c.red, margin: "0 0 4px" }}>{item.objection}</p>
                <p style={{ fontSize: "13.5px", color: c.textSecondary, lineHeight: 1.6, margin: 0 }}>{item.reality}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal>
        <p style={{ fontSize: "14px", color: c.textSecondary, lineHeight: 1.7, margin: "0 0 56px", maxWidth: "620px", textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
          Selbst wenn du glaubst, diese Ideen bereits umzusetzen: ohne Experten und Spezialisten kannst du womöglich deinen Absturz beschleunigen. Begleitete Implementation ist für Unternehmen, die Results wollen, keine Lernprozesse.
        </p>
      </Reveal>

      {/* Final CTA */}
      <Reveal>
        <div style={{
          background: "linear-gradient(135deg, rgba(34,197,94,0.08), rgba(34,197,94,0.02))",
          borderRadius: "20px", padding: "clamp(36px,5vw,56px) clamp(24px,4vw,40px)",
          border: "1px solid rgba(34,197,94,0.2)", textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${c.green}66, transparent)` }} />
          <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "50%", height: "1px", background: `linear-gradient(90deg, transparent, ${c.green}33, transparent)` }} />

          <p style={{ fontSize: "clamp(22px,3.5vw,32px)", fontWeight: 800, color: c.white, margin: "0 0 16px", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
            Das Fenster ist offen. Aber es schließt sich.
          </p>
          <p style={{ fontSize: "clamp(15px,2vw,17px)", color: c.textPrimary, lineHeight: 1.7, margin: "0 0 12px", maxWidth: "540px", marginLeft: "auto", marginRight: "auto" }}>
            Jeder Tag, an dem du nicht handelst, ist ein Tag, an dem die Kluft zwischen dir und deinen systemgetriebenen Wettbewerbern größer wird.
          </p>
          <p style={{ fontSize: "15px", color: c.textSecondary, lineHeight: 1.7, margin: "0 0 32px", maxWidth: "500px", marginLeft: "auto", marginRight: "auto" }}>
            Wenn du die Überholspur willst, dann lass uns reden. Buche dein kostenloses Analysegespräch und lass uns gemeinsam herausfinden, wo dein größter Hebel liegt.
          </p>

          <a href="https://kalender.umsatzpilot.com/umsatzpilot" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            padding: "16px 36px", borderRadius: "12px",
            background: c.white, color: c.bg,
            fontSize: "16px", fontWeight: 700, textDecoration: "none",
            boxShadow: "0 4px 20px rgba(255,255,255,0.1)",
          }}>
            Kostenloses Analysegespräch buchen
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>

          <p style={{ fontSize: "13px", color: c.textMuted, margin: "20px 0 0" }}>
            30 Minuten. Kostenlos. Unverbindlich. Wir analysieren deine Prozesse und zeigen dir, wo KI echten ROI bringt.
          </p>
        </div>
      </Reveal>
    </>
  );
}
