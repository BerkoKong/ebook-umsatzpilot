import { useState } from "react";
import { Badge } from "../shared/Badge";
import { Reveal } from "../shared/Reveal";
import { c } from "../shared/tokens";

const KOMPONENTEN = [
  {
    num: "01",
    title: "Zielmarkt & ICP-Definition",
    lead: "Wer genau ist der ideale Kunde? Branche, Unternehmensgröße, Entscheider-Rolle, Pain Points, Buying Trigger. Ohne scharfes ICP verpufft alles andere.",
    fragen: [
      "Können Sie in zwei Sätzen beschreiben, wer Ihr idealer Kunde ist – und warum genau dieser?",
      "Auf Basis welcher Daten wurde Ihr ICP definiert – Bauchgefühl, Bestandskundenanalyse oder systematische Marktrecherche?",
      "Welche Unternehmen haben Sie bewusst als Nicht-Zielkunden ausgeschlossen – und warum?",
      "Wie oft überprüfen Sie, ob Ihr ICP noch mit der Realität Ihrer profitabelsten Kunden übereinstimmt?",
    ],
    ki: "Bestehende Kundendaten (CRM-Exporte, Dealhistorie, Gesprächsnotizen) durch ein LLM analysieren lassen, um Muster im idealen Kundenprofil zu erkennen – welche Gemeinsamkeiten haben die profitabelsten Kunden?",
    prompt: "Ich betreibe ein Unternehmen im Bereich [BRANCHE] und biete [DIENSTLEISTUNG/PRODUKT] an. Meine 5 besten Kunden der letzten 12 Monate waren: [KUNDE 1 – Branche, Größe, Ausgangsproblem], [KUNDE 2], [KUNDE 3], [KUNDE 4], [KUNDE 5]. Analysiere die Gemeinsamkeiten dieser Kunden und erstelle ein detailliertes Ideal Customer Profile mit: Branchenmerkmale, Unternehmensgröße, typische Entscheiderrolle, wiederkehrende Pain Points, und Kaufauslöser. Zeige auch, welche Kundensegmente ich bewusst ausschließen sollte und warum.",
  },
  {
    num: "02",
    title: "Positionierung & Messaging",
    lead: "Wie grenzt man sich ab? Was ist die zentrale Transformation, die man verspricht? Welche Sprache spricht die Zielgruppe? Das beeinflusst alles Nachgelagerte – von der Anzeige bis zum Sales Call.",
    fragen: [
      "Wenn ein potenzieller Kunde Ihre Website 30 Sekunden sieht – versteht er sofort, was Sie anders machen als Ihre Wettbewerber?",
      "Sprechen Sie in der Sprache Ihrer Zielgruppe oder in Ihrer eigenen Fachsprache?",
      "Welches konkrete Ergebnis versprechen Sie – und können Sie das mit Zahlen oder Referenzen belegen?",
      "Würden drei verschiedene Personen in Ihrem Team die Positionierung identisch beschreiben?",
    ],
    ki: "Wettbewerber-Websites und deren Messaging durch ein LLM vergleichen lassen, um Positionierungslücken zu finden – wo sagen alle dasselbe, wo gibt es Raum für Differenzierung?",
    prompt: "Ich positioniere mich im Bereich [BRANCHE] mit dem Angebot [DIENSTLEISTUNG]. Hier sind die Kernaussagen von 3 Wettbewerbern: [WETTBEWERBER 1 – URL oder Kernaussage], [WETTBEWERBER 2], [WETTBEWERBER 3]. Mein eigener Ansatz unterscheidet sich durch [DIFFERENZIERUNG]. Analysiere, wo sich die Wettbewerber inhaltlich überschneiden, welche Positionierungslücken existieren, und formuliere 3 alternative Positionierungsansätze für mich – jeweils mit Headline, Subline und einem Absatz Erklärung. Die Sprache soll direkt und auf B2B-Entscheider zugeschnitten sein, nicht auf Coaches oder Solopreneure.",
  },
  {
    num: "03",
    title: "Offer-Architektur",
    lead: "Wie sind die Angebote strukturiert? Einstiegsangebot vs. Kernangebot vs. Premium. Pricing-Logik (Einmalzahlung, Retainer, Performance). Gibt es einen Foot-in-the-Door-Mechanismus wie ein Audit oder eine kostenlose Analyse?",
    fragen: [
      "Gibt es einen klaren, niedrigschwelligen Einstiegspunkt für Neukunden – oder müssen Interessenten sofort eine große Entscheidung treffen?",
      "Ist Ihre Preisstruktur für den Kunden nachvollziehbar und an seinem Ergebnis orientiert?",
      "Wie unterscheiden sich Ihre Angebotspakete inhaltlich – oder unterscheiden sie sich nur im Umfang?",
      "Haben Sie ein System, um Kunden vom Einstiegsangebot systematisch in höherwertige Leistungen zu überführen?",
    ],
    ki: "Ein LLM als strategischen Sparringspartner nutzen, um die eigene Angebotsstruktur auf Lücken, Preislogik und Upsell-Pfade zu prüfen.",
    prompt: "Mein Unternehmen bietet aktuell folgende Leistungen an: [PAKET 1 – Inhalt, Preis, Zielgruppe], [PAKET 2], [PAKET 3]. Meine Zielgruppe sind [ICP-BESCHREIBUNG]. Analysiere diese Angebotsstruktur kritisch: Gibt es einen klaren Einstiegspunkt für Neukunden? Ist die Preislogik nachvollziehbar? Gibt es einen natürlichen Upsell-Pfad? Wo gibt es Kannibalisierung zwischen den Paketen? Schlage eine optimierte Angebotsarchitektur vor mit klarer Abgrenzung, Preisanker-Logik und einem Foot-in-the-Door-Angebot.",
  },
  {
    num: "04",
    title: "Buyer Journey",
    lead: "Welche Stufen durchläuft ein Lead? Awareness, Interest, Consideration, Decision. Wie lang ist der Sales Cycle? Wo entstehen die meisten Drop-offs? Ist der Funnel eher linear oder gibt es Nurturing-Loops?",
    fragen: [
      "Können Sie die einzelnen Schritte benennen, die ein Interessent vom Erstkontakt bis zum Abschluss durchläuft?",
      "An welcher Stelle im Funnel verlieren Sie aktuell die meisten Interessenten – und wissen Sie, warum?",
      "Wie lang ist Ihr typischer Sales Cycle – und haben Sie aktiv daran gearbeitet, ihn zu verkürzen?",
      "Was passiert mit Leads, die jetzt nicht kaufen – gibt es einen strukturierten Nurturing-Prozess?",
    ],
    ki: "Die eigene Buyer Journey dokumentieren und vom LLM auf Brüche, fehlende Touchpoints und unnötige Reibung analysieren lassen.",
    prompt: "Mein aktueller Vertriebsprozess sieht so aus: [SCHRITT 1: z.B. LinkedIn-Post], [SCHRITT 2: Profilbesuch], [SCHRITT 3: Lead-Magnet-Download], [SCHRITT 4: E-Mail-Sequenz], [SCHRITT 5: Erstgespräch], [SCHRITT 6: Angebot], [SCHRITT 7: Abschluss]. Mein typischer Sales Cycle dauert [X WOCHEN]. Die größten Drop-offs passieren bei [STUFE]. Analysiere diesen Funnel: Wo gibt es unnötige Reibung? Welche Stufen könnten zusammengelegt oder eliminiert werden? Wo fehlt ein Touchpoint? Schlage einen optimierten Funnel vor und erkläre für jede Stufe, welches Ziel sie hat und welche Conversion Rate realistisch wäre.",
  },
  {
    num: "05",
    title: "Kanal- & Plattformstrategie",
    lead: "Wo wird akquiriert? LinkedIn, Google Ads, YouTube, Cold Email? Die bewusste Entscheidung: Welche 1 bis 2 Kanäle werden als Primärkanäle aufgebaut, welche sind sekundär – und warum?",
    fragen: [
      "Über welche 1 bis 2 Kanäle kommen heute die meisten qualifizierten Anfragen – und investieren Sie dort überproportional?",
      "Haben Sie Kanäle im Einsatz, weil sie funktionieren – oder weil man das eben so macht?",
      "Wenn morgen Ihr wichtigster Kanal wegfällt – haben Sie eine Alternative, die kurzfristig Volumen liefern kann?",
      "Wie messen Sie den tatsächlichen ROI pro Kanal – und wie oft überprüfen Sie diese Verteilung?",
    ],
    ki: "Auf Basis von Zielgruppe, Budget und Team-Ressourcen vom LLM eine priorisierte Kanalstrategie entwickeln lassen – statt überall gleichzeitig zu starten.",
    prompt: "Meine Zielgruppe sind [ICP]. Mein monatliches Marketing-Budget liegt bei [BETRAG]. Mein Team besteht aus [ANZAHL PERSONEN mit ROLLEN]. Aktuell nutze ich folgende Kanäle: [KANAL 1 – geschätzter Aufwand und Ergebnis], [KANAL 2], [KANAL 3]. Welche 2 Kanäle sollte ich als Primärkanäle priorisieren und warum? Welche sollte ich reduzieren oder streichen? Erstelle einen konkreten 90-Tage-Plan mit Fokuskanal, Ressourcenverteilung und messbaren Meilensteinen.",
  },
  {
    num: "06",
    title: "Inbound vs. Outbound Mix",
    lead: "Wie ist das Verhältnis? Rein outbound-getrieben, rein inbound oder hybrid? Das bestimmt massiv die Teamstruktur und den Tech-Stack – und ist selten eine bewusste Entscheidung.",
    fragen: [
      "Wie hoch ist der Anteil der Neukunden, die aktiv auf Sie zukommen vs. die Sie proaktiv ansprechen?",
      "Ist dieses Verhältnis eine bewusste Entscheidung oder historisch gewachsen?",
      "Was würde passieren, wenn Sie morgen jegliches Outbound einstellen – wie schnell trocknet die Pipeline aus?",
      "Haben Sie für beide Ansätze klare Prozesse und Verantwortlichkeiten definiert?",
    ],
    ki: "Die eigene Neukundenherkunft kategorisieren lassen und vom LLM eine Empfehlung für den optimalen Mix ableiten – basierend auf Branche, Ticket-Größe und Teamkapazität.",
    prompt: "In den letzten 6 Monaten habe ich [X] Neukunden gewonnen. Davon kamen [X%] über Inbound (Content, Empfehlungen, organische Anfragen) und [X%] über Outbound (Cold Email, LinkedIn, Telefon). Mein durchschnittlicher Auftragswert liegt bei [BETRAG], mein Sales Cycle bei [DAUER]. Ich habe [X] Personen im Vertrieb. Empfiehl mir den optimalen Inbound/Outbound-Mix für meine Situation. Erkläre, welcher Ansatz bei meiner Ticket-Größe und Teamgröße effizienter ist, und was sich ändern müsste, damit der andere Ansatz sinnvoll wird.",
  },
  {
    num: "07",
    title: "Content-Strategie",
    lead: "Welche Inhalte, auf welchen Plattformen, in welcher Frequenz? Video, Text, Podcast? Und mit welchem Ziel – Reichweite, Trust-Building oder Lead-Generierung? Eng verknüpft mit der Kanalstrategie.",
    fragen: [
      "Welches Ziel verfolgen Ihre Inhalte konkret – Reichweite, Vertrauen, Lead-Generierung oder alles gleichzeitig?",
      "Konsumiert Ihre Zielgruppe die Formate, die Sie produzieren – oder produzieren Sie, was Ihnen liegt?",
      "Gibt es einen Content-Plan mit fester Frequenz – oder entsteht Content situativ und unregelmäßig?",
      "Können Sie eine direkte Linie von einem veröffentlichten Inhalt zu einem gewonnenen Kunden nachzeichnen?",
    ],
    ki: "Einen kompletten Content-Plan vom LLM erstellen lassen – inklusive Themencluster, Formate und Redaktionsplan, abgestimmt auf die Buyer Journey.",
    prompt: "Meine Zielgruppe sind [ICP] mit den Hauptproblemen [PROBLEM 1, 2, 3]. Ich möchte mich als Experte für [THEMENFELD] positionieren. Mein bevorzugtes Format ist [Video/Text/Podcast]. Ich kann realistisch [X] Inhalte pro Woche produzieren. Erstelle einen Content-Plan für 4 Wochen mit: Themencluster, die auf meine Buyer Journey abgestimmt sind (Awareness, Consideration, Decision), konkreten Titel-Vorschlägen, dem Ziel jedes Inhalts (Reichweite, Trust, Conversion) und einem CTA pro Inhalt.",
  },
  {
    num: "08",
    title: "Lead-Qualifizierung & Scoring",
    lead: "Wie wird entschieden, welche Leads Sales-ready sind? MQL vs. SQL Kriterien, Scoring-Modelle, Disqualifikationskriterien. Gerade bei begrenzten Sales-Ressourcen ein kritischer Hebel.",
    fragen: [
      "Haben Sie klar definierte Kriterien, ab wann ein Lead an den Vertrieb übergeben wird?",
      "Wie viel Zeit verbringt Ihr Vertrieb mit Leads, die nie kaufen werden – und wissen Sie, welche das sind?",
      "Gibt es ein System, das automatisch zwischen heißen, warmen und kalten Leads unterscheidet?",
      "Wann haben Sie zuletzt bewusst Leads disqualifiziert – und fällt Ihnen das leicht?",
    ],
    ki: "Qualifizierungskriterien und ein Scoring-Modell vom LLM entwickeln lassen, das auf die eigene Situation zugeschnitten ist – statt generische Frameworks zu kopieren.",
    prompt: "Ich verkaufe [DIENSTLEISTUNG] an [ZIELGRUPPE] mit einem durchschnittlichen Auftragswert von [BETRAG]. Mein Vertriebsteam hat Kapazität für [X] Erstgespräche pro Woche. Aktuell kommen [X] Leads pro Woche rein. Erstelle ein Lead-Scoring-Modell mit: 5 bis 7 Kriterien, die einen qualifizierten Lead ausmachen (demografisch und verhaltensbasiert), einer Punkteskala mit klaren Schwellenwerten für MQL und SQL, Disqualifikationskriterien die sofort aussortieren, und einem einfachen Entscheidungsbaum, den auch ein Mitarbeiter ohne Vertriebserfahrung anwenden kann.",
  },
  {
    num: "09",
    title: "Sales-Prozess & Closing-Architektur",
    lead: "Wie sieht der Verkaufsprozess konkret aus? Discovery Call, Demo, Proposal, Close. Wer führt welchen Schritt durch? Gibt es Einwandbehandlung, Follow-up-Sequenzen, Vertragsvorlagen?",
    fragen: [
      "Ist Ihr Verkaufsprozess dokumentiert – oder lebt er in den Köpfen einzelner Personen?",
      "Welche Schritte durchläuft ein Interessent vom Erstgespräch bis zur Unterschrift – und ist jeder Schritt notwendig?",
      "Wie gehen Sie strukturiert mit Einwänden und Nicht-Entscheidungen um?",
      "Haben Sie eine Follow-up-Sequenz für Interessenten, die nach dem Erstgespräch nicht sofort entscheiden?",
      "Wissen Sie, wie hoch Ihre Abschlussquote pro Stufe ist – und wo der größte Hebel liegt?",
    ],
    ki: "Den eigenen Verkaufsprozess strukturiert dokumentieren und vom LLM optimieren lassen – inklusive Gesprächsleitfäden, Einwandbehandlung und Follow-up-Sequenzen.",
    prompt: "Mein Verkaufsprozess besteht aktuell aus folgenden Schritten: [SCHRITT 1 mit DAUER und ZIEL], [SCHRITT 2], [SCHRITT 3]. Die häufigsten Einwände meiner Interessenten sind: [EINWAND 1], [EINWAND 2], [EINWAND 3]. Meine Abschlussquote vom Erstgespräch zum Abschluss liegt bei [X%]. Analysiere den Prozess und schlage Optimierungen vor. Erstelle zusätzlich: einen strukturierten Gesprächsleitfaden für das Erstgespräch (Discovery), Formulierungen für die 3 häufigsten Einwände, und eine Follow-up-Sequenz mit 5 Touchpoints für Interessenten, die nicht sofort entscheiden.",
  },
  {
    num: "10",
    title: "Teamstruktur & Rollen",
    lead: "Wer macht was? SDR/BDR für Outreach, AE für Closing, Marketing für Content & Ads? Oder ist alles bei einer Person? Die Rollenverteilung bestimmt, wie skalierbar das System ist.",
    fragen: [
      "Ist klar definiert, wer für Leadgenerierung, Qualifizierung und Abschluss verantwortlich ist – oder macht eine Person alles?",
      "Könnte Ihr Vertrieb morgen ohne den Gründer oder eine Schlüsselperson weiterlaufen?",
      "Sind die Rollen nach Kompetenz verteilt – oder nach Verfügbarkeit?",
      "Welche Rolle fehlt Ihnen aktuell am meisten, um den nächsten Wachstumsschritt zu machen?",
    ],
    ki: "Die aktuelle Teamaufstellung gegen das Umsatzziel abgleichen und vom LLM eine Soll-Struktur mit klaren Verantwortlichkeiten ableiten lassen.",
    prompt: "Mein Unternehmen macht aktuell [UMSATZ] pro Jahr mit [ANZAHL] Mitarbeitern in Vertrieb und Marketing. Die Rollen sind aktuell so verteilt: [PERSON 1 – Aufgaben], [PERSON 2 – Aufgaben]. Mein Umsatzziel für die nächsten 12 Monate ist [ZIEL]. Analysiere, ob meine aktuelle Teamstruktur dieses Ziel realistisch unterstützt. Welche Rolle fehlt am dringendsten? Was sollte der Gründer abgeben? Erstelle eine Soll-Teamstruktur mit klaren Verantwortlichkeiten, KPIs pro Rolle und einer Empfehlung, in welcher Reihenfolge ich aufbauen sollte.",
  },
  {
    num: "11",
    title: "Tech-Stack & Automatisierung",
    lead: "CRM, E-Mail-Automatisierung, Booking-Tool, Pipeline-Management, Enrichment-Tools, KI-Agenten. Welche Tools unterstützen welchen Prozessschritt – und wo wird automatisiert vs. manuell gearbeitet?",
    fragen: [
      "Welche manuellen, wiederkehrenden Aufgaben in Vertrieb und Marketing kosten Sie heute die meiste Zeit?",
      "Arbeiten Ihre Tools als integriertes System – oder sind es Insellösungen, zwischen denen Informationen verloren gehen?",
      "Könnten Sie heute auf Knopfdruck sagen, wo jeder aktive Lead in der Pipeline steht?",
      "Welche Prozesse könnten Sie automatisieren, ohne dass die Qualität der Kundeninteraktion leidet?",
    ],
    ki: "Den aktuellen Tool-Stack auflisten und vom LLM auf Redundanzen, fehlende Integrationen und Automatisierungspotenziale prüfen lassen.",
    prompt: "Mein aktueller Tech-Stack für Vertrieb und Marketing besteht aus: [TOOL 1 – Zweck], [TOOL 2 – Zweck], [TOOL 3 – Zweck]. Die größten manuellen Zeitfresser sind: [AUFGABE 1], [AUFGABE 2], [AUFGABE 3]. Analysiere meinen Stack: Wo gibt es Redundanzen? Wo fehlen Integrationen, sodass Daten manuell übertragen werden? Welche 3 Prozesse haben das höchste Automatisierungspotenzial? Schlage einen optimierten Stack vor und beschreibe für jede Automatisierung den konkreten Workflow (Trigger, Aktion, Ergebnis).",
  },
  {
    num: "12",
    title: "KPIs & Steuerungslogik",
    lead: "Welche Metriken werden auf welcher Ebene getrackt? Aktivitätsmetriken, Pipeline-Metriken, Revenue-Metriken. Ohne klare KPIs gibt es keine Steuerung – nur Beschäftigung.",
    fragen: [
      "Welche drei Kennzahlen schauen Sie sich wöchentlich an, um die Gesundheit Ihrer Pipeline zu beurteilen?",
      "Messen Sie Aktivitäten (Anzahl Calls, E-Mails) oder Ergebnisse (Conversion Rates, Umsatz pro Kanal) – oder beides?",
      "Wissen Sie, was es Sie kostet, einen neuen Kunden zu gewinnen – und wie sich das im letzten Jahr verändert hat?",
      "Treffen Sie Entscheidungen über Budgets und Kanäle datenbasiert – oder nach Gefühl?",
    ],
    ki: "Ein maßgeschneidertes KPI-Dashboard vom LLM konzipieren lassen – mit den richtigen Metriken für die eigene Wachstumsphase.",
    prompt: "Mein Unternehmen ist in der Phase [PHASE: z.B. Gründung, erstes Wachstum, Skalierung]. Mein Geschäftsmodell: [MODELL: z.B. Agenturdienstleistung, SaaS, Beratung]. Mein monatlicher Umsatz liegt bei [BETRAG] mit [ANZAHL] Neukunden pro Monat. Erstelle ein KPI-Framework mit: 3 bis 5 Metriken, die ich wöchentlich tracken sollte, 3 bis 5 Metriken für monatliches Reporting, Benchmarks oder Zielwerte für meine Branche und Phase, und einer Erklärung, welche Metrik in meiner aktuellen Phase den größten Hebel hat und warum.",
    kpiList: [
      "Fulfillment-Kosten", "Marketing-Kosten", "CAC", "LTV", "AOV",
      "30-Day Cash", "DB pro Kunde", "Fixkosten", "Profit",
      "Investments", "Preis", "LTV-Auswirkungen",
    ],
  },
  {
    num: "13",
    title: "Budget- & Ressourcenallokation",
    lead: "Wie verteilt sich das Budget auf Kanäle, Tools, Team? Was ist der erwartete ROI pro Kanal? Wo wird zuerst investiert, wo später?",
    fragen: [
      "Wie viel Prozent Ihres Umsatzes investieren Sie bewusst in Vertrieb und Marketing – und ist das eine strategische Entscheidung?",
      "Können Sie für jeden Euro, den Sie in einen Kanal investieren, den erwarteten Return beziffern?",
      "Investieren Sie dort am meisten, wo die beste Performance ist – oder dort, wo Sie sich am wohlsten fühlen?",
      "Was würden Sie mit dem doppelten Budget anders machen – und warum tun Sie es nicht schon im Kleinen?",
    ],
    ki: "Verschiedene Budgetszenarien vom LLM durchrechnen und vergleichen lassen – was passiert bei mehr Invest in Kanal A vs. Kanal B?",
    prompt: "Mein monatliches Marketing-Budget beträgt [BETRAG]. Aktuell verteile ich es so: [KANAL 1 – Betrag – geschätzter ROI], [KANAL 2 – Betrag – geschätzter ROI], [KANAL 3 – Betrag – geschätzter ROI]. Mein Ziel ist [ZIEL: z.B. X Leads pro Monat, X% Umsatzwachstum]. Erstelle 3 Budgetszenarien: (1) Optimierung des aktuellen Budgets, (2) bei 50% mehr Budget, (3) bei 50% weniger Budget. Zeige für jedes Szenario die empfohlene Verteilung, erwartete Ergebnisse und Risiken.",
  },
];

function StrategieKarte({ num, title, lead, fragen, ki, prompt, kpiList, delay = 0 }) {
  const [open, setOpen] = useState(false);
  const [h, setH] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{ background: c.card, borderRadius: "16px", border: `1px solid ${h || open ? "rgba(245,158,11,0.2)" : c.cardBorder}`, transition: "border-color 0.4s ease", marginBottom: "12px", position: "relative", overflow: "hidden" }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${c.amber}44, transparent)`, opacity: h || open ? 1 : 0.3, transition: "opacity 0.4s ease" }} />

        {/* Clickable header */}
        <div
          onClick={() => setOpen(!open)}
          style={{ padding: "clamp(18px,3vw,24px) clamp(16px,3vw,24px)", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: "16px" }}
        >
          <div style={{ width: "36px", height: "36px", borderRadius: "10px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.15)" }}>
            <span style={{ fontSize: "13px", fontWeight: 800, color: c.amber }}>{num}</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontSize: "clamp(15px,2vw,17px)", fontWeight: 700, color: c.white, margin: "0 0 6px", lineHeight: 1.3 }}>{title}</h3>
            <p style={{ fontSize: "13.5px", color: c.textSecondary, lineHeight: 1.6, margin: 0 }}>{lead}</p>
          </div>
          <div style={{ fontSize: "18px", color: c.textMuted, transition: "transform 0.3s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0, marginTop: "4px" }}>{"\u25BE"}</div>
        </div>

        {/* Expandable section */}
        <div style={{ maxHeight: open ? "2400px" : "0px", overflow: "hidden", transition: "max-height 0.6s cubic-bezier(.25,.46,.45,.94)", opacity: open ? 1 : 0 }}>
          <div style={{ padding: "20px clamp(16px,3vw,24px) clamp(20px,3vw,26px)", borderTop: `1px solid ${c.cardBorder}` }}>

            {/* Diagnose-Fragen */}
            <div style={{ marginBottom: "16px" }}>
              <p style={{ fontSize: "11px", fontWeight: 600, color: c.amber, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 14px" }}>Diagnose-Fragen</p>
              {fragen.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "10px" }}>
                  <span style={{ color: c.amber, fontSize: "14px", fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>?</span>
                  <span style={{ fontSize: "14px", color: c.textSecondary, lineHeight: 1.65 }}>{f}</span>
                </div>
              ))}
            </div>

            {/* KPI list (optional, only for KPIs card) */}
            {kpiList && (
              <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: "10px", padding: "14px 16px", border: `1px solid ${c.cardBorder}`, marginBottom: "16px" }}>
                <p style={{ fontSize: "11px", fontWeight: 600, color: c.textMuted, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 12px" }}>Zu trackende Kennzahlen</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {kpiList.map((kpi, i) => (
                    <span key={i} style={{ padding: "4px 12px", borderRadius: "100px", border: `1px solid ${c.cardBorder}`, fontSize: "12px", fontWeight: 500, color: c.textSecondary }}>{kpi}</span>
                  ))}
                </div>
              </div>
            )}

            {/* KI-Einsatz */}
            <div style={{ background: "rgba(34,197,94,0.04)", borderRadius: "10px", padding: "16px 18px", border: "1px solid rgba(34,197,94,0.1)", marginBottom: "12px" }}>
              <p style={{ fontSize: "11px", fontWeight: 600, color: c.green, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 8px" }}>KI-Einsatz</p>
              <p style={{ fontSize: "13.5px", color: c.textSecondary, lineHeight: 1.65, margin: 0 }}>{ki}</p>
            </div>

            {/* Prompt */}
            <div style={{ background: "#070707", borderRadius: "10px", padding: "16px 18px", border: `1px solid ${c.cardBorder}` }}>
              <p style={{ fontSize: "11px", fontWeight: 600, color: c.textMuted, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 10px" }}>Prompt</p>
              <p style={{ fontSize: "13px", color: "#777", lineHeight: 1.75, margin: 0, fontFamily: "'Menlo', 'Monaco', 'Courier New', monospace", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{prompt}</p>
            </div>

          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Strategie() {
  return (
    <>
      <Reveal><Badge>Baustein 1</Badge></Reveal>
      <Reveal delay={0.08}>
        <h2 style={{ fontSize: "clamp(28px,4.5vw,44px)", fontWeight: 800, color: c.white, margin: "24px 0 16px", lineHeight: 1.1, letterSpacing: "-0.025em" }}>
          Strategie.
        </h2>
      </Reveal>
      <Reveal delay={0.14}>
        <p style={{ fontSize: "clamp(15px,2vw,17px)", color: c.textSecondary, lineHeight: 1.7, margin: "0 0 12px", maxWidth: "620px" }}>
          Alles beginnt mit einer klaren Strategie. Bevor du die erste Anzeige schaltest, den ersten Lead anschreibst oder das erste Tool einrichtest: Wer ist dein Zielkunde, wie positionierst du dich, wie sieht dein Angebot aus?
        </p>
      </Reveal>
      <Reveal delay={0.18}>
        <p style={{ fontSize: "14.5px", color: c.textSecondary, lineHeight: 1.7, margin: "0 0 48px", maxWidth: "620px" }}>
          Die 13 Makro-Komponenten einer Vertrieb- und Marketing-Strategie. Klicke auf eine Komponente, um Diagnose-Fragen und den passenden KI-Prompt zu sehen.
        </p>
      </Reveal>

      {KOMPONENTEN.map((k, i) => (
        <StrategieKarte key={k.num} {...k} delay={i < 4 ? i * 0.06 : 0} />
      ))}
    </>
  );
}
