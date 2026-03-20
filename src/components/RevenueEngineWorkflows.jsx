import { useRef, useEffect, useState } from 'react';
import { Reveal } from '../shared/Reveal';
import { c } from '../shared/tokens';

/* ─── Design Tokens ─────────────────────────────────────── */
const NODE_W = 164;
const NODE_H = 78;
const GAP    = 44;
const PAD_X  = 48;
const PAD_Y  = 52;

const TYPE_COLOR = {
  trigger: '#22c55e',
  http:    '#3b82f6',
  ai:      '#a78bfa',
  code:    '#f97316',
  logic:   '#14b8a6',
  wait:    '#6b7280',
  output:  '#eab308',
  crm:     '#ec4899',
};

const TYPE_LABEL = {
  trigger: 'Trigger',
  http:    'HTTP',
  ai:      'KI',
  code:    'Code',
  logic:   'Filter',
  wait:    'Warten',
  output:  'Output',
  crm:     'CRM',
};

/* ─── Revenue Engine WF-01 Data ──────────────────────────── */
const WF01_NODES = [
  { id:  1, type: 'trigger', name: 'CRM / Schedule',          desc: 'Neue Leads oder Bad Data'            },
  { id:  2, type: 'http',    name: 'CRM: Leads laden',        desc: 'Unvollständige Leads abrufen'        },
  { id:  3, type: 'logic',   name: 'Bad Data?',               desc: 'Fehlende Felder prüfen'              },
  { id:  4, type: 'http',    name: 'Gemini: Websuche',        desc: 'Impressum, Größe, Branche'           },
  { id:  5, type: 'http',    name: 'Apify: LinkedIn Company', desc: 'Firmenprofil scrapen'                },
  { id:  6, type: 'ai',      name: 'Firmenprofil erstellen',  desc: 'KI: Daten standardisieren'           },
  { id:  7, type: 'http',    name: 'Apify: Employees',        desc: 'Mitarbeiter + Jobtitel scrapen'      },
  { id:  8, type: 'ai',      name: 'Entscheider finden',      desc: 'C-Level / GF aus Titeln filtern'     },
  { id:  9, type: 'code',    name: 'Daten bereinigen',        desc: 'Duplikate + Formate säubern'         },
  { id: 10, type: 'http',    name: 'E-Mail: AnyMail Finder',  desc: 'Waterfall Stufe 1'                   },
  { id: 11, type: 'logic',   name: 'E-Mail gefunden?',        desc: 'Verifiziert vorhanden?'              },
  { id: 12, type: 'http',    name: 'E-Mail: Hunter.io',       desc: 'Waterfall Stufe 2'                   },
  { id: 13, type: 'http',    name: 'E-Mail: Apollo',          desc: 'Waterfall Stufe 3'                   },
  { id: 14, type: 'http',    name: 'Telefon: Waterfall',      desc: 'Apollo → Lusha → Kaspr'              },
  { id: 15, type: 'logic',   name: 'Kontaktdaten komplett?',  desc: 'E-Mail + Telefon da?'                },
  { id: 16, type: 'code',    name: 'Datensatz finalisieren',  desc: 'Alle Felder zusammenführen'          },
  { id: 17, type: 'http',    name: 'Airtable: Speichern',     desc: 'Lead in Datenbank schreiben'         },
  { id: 18, type: 'crm',     name: 'CRM: Update',             desc: 'Lead-Status aktualisieren'           },
  { id: 19, type: 'output',  name: 'Slack: Neue Leads',       desc: 'Zusammenfassung an Vertrieb'         },
];

const WF01_IMPACT = [
  { area: 'Recherchezeit pro Lead',    before: '15–30 Min. (Firma googlen, LinkedIn durchsuchen, Entscheider finden, E-Mail raten)',    after: '< 1 Min. — vollautomatisch über mehrere Datenquellen' },
  { area: 'Leads pro Tag',             before: '5–15 manuell recherchierte, oft unvollständige Datensätze',                             after: '50–100+ vollständig angereicherte, verifizierte Lead-Profile' },
  { area: 'Datenqualität',             before: 'Inkonsistent — fehlende E-Mails, falsche Jobtitel, veraltete Firmendaten',              after: 'Strukturiert, validiert, dedupliziert — jeder Datensatz durch KI-Bereinigung' },
  { area: 'E-Mail-Zustellbarkeit',     before: '30–50 % Bounce-Rate bei geratenen E-Mails',                                            after: '< 5 % Bounce-Rate durch Waterfall-Verifizierung über mehrere Anbieter' },
  { area: 'Bad Data aus Ads',          before: 'Leads mit unvollständigen Daten landen im CRM und werden nie kontaktiert',              after: 'Automatische Erkennung und Rettung — fehlende Daten werden nachrecherchiert' },
  { area: 'Entscheider-Erkennung',     before: 'Manuell LinkedIn durchscrollen und raten, wer entscheidet',                            after: 'KI filtert gezielt nach C-Level, GF, Abteilungsleitung auf Basis von Jobtiteln' },
  { area: 'Teamzusammenarbeit',        before: 'Jeder Vertriebler hat seine eigene Excel, keine zentrale Datenbasis',                  after: 'Eine saubere, zentrale Lead-Datenbank in Airtable/CRM — geteiltes Wissen' },
];

const WF01_KERNEFFEKT = 'Der Workflow verwandelt drei Problemfelder in eine einzige Pipeline: (1) Kalte Leads aus Ziellisten werden angereichert und kontaktfertig gemacht, (2) Bad Data aus Marketing-Kampagnen wird gerettet statt ignoriert, und (3) zu jedem Unternehmen wird automatisch der richtige Entscheider mit verifizierter E-Mail und Telefonnummer gefunden.';

const WF01_TOOLS = [
  { tool: 'n8n',                          zweck: 'Workflow-Orchestrierung, Waterfall-Logik, Schleifen, Datenbereinigung',                     typ: 'Self-hosted oder Cloud'         },
  { tool: 'CRM (Close / HubSpot / Pipedrive)', zweck: 'Lead-Import, Bad-Data-Erkennung, finaler Datenspeicher',                              typ: 'SaaS — API-Zugang'              },
  { tool: 'Apify',                        zweck: 'Web-Scraping von LinkedIn-Unternehmensseiten, Mitarbeiterprofilen, Branchenverzeichnissen', typ: 'SaaS — API-Token'               },
  { tool: 'Google Gemini / Grounded Search', zweck: 'Intelligente Websuche: Impressum, Firmierung, Ansprechpartner, Unternehmensdaten',     typ: 'API-Key erforderlich'           },
  { tool: 'OpenAI API / Anthropic API',   zweck: 'Datenbereinigung, Deduplizierung, Jobtitel-Klassifizierung, Validierung',                  typ: 'API-Key erforderlich'           },
  { tool: 'Waterfall E-Mail-Finder',      zweck: 'Sequenziell: AnyMail Finder → Hunter.io → Apollo → Dropcontact',                           typ: 'Jeweils API-Key erforderlich'   },
  { tool: 'Waterfall Telefon-Finder',     zweck: 'Sequenziell: Apollo → Lusha → Kaspr → RocketReach',                                        typ: 'Jeweils API-Key erforderlich'   },
  { tool: 'Airtable / Google Sheets',     zweck: 'Zentrale Lead-Datenbank mit strukturierten Feldern, Filter-Views, Team-Zugriff',           typ: 'SaaS — API-Integration'         },
  { tool: 'Slack',                        zweck: 'Benachrichtigungen bei neuen angereicherten Leads, Fehler-Alerts, tägliche Zusammenfassungen', typ: 'Webhook'                   },
];

const WF01_TOKENS = [
  'CRM API-Zugang (Close API-Key, HubSpot Private App Token oder Pipedrive API-Token)',
  'Apify API-Token (für LinkedIn Company Scraper, LinkedIn Employee Scraper)',
  'Google Gemini API-Key (für Grounded Search / intelligente Websuche)',
  'OpenAI oder Anthropic API-Key (für Datenbereinigung und Klassifizierung)',
  'E-Mail-Finder APIs (min. 2–3 für Waterfall): AnyMail Finder, Hunter.io, Apollo, Dropcontact',
  'Telefon-Finder APIs (min. 1–2): Apollo, Lusha, Kaspr, RocketReach',
  'Airtable API-Key oder Google Sheets OAuth',
  'Slack Incoming Webhook URL',
];

const WF01_VORAUSSETZUNGEN = [
  'ICP (Ideal Customer Profile) definiert: Branche, Unternehmensgröße, Region, Ziel-Jobtitel der Entscheider',
  'CRM-Felder standardisiert (Firmenname, Domain, Branche, Größe, Ansprechpartner, E-Mail, Telefon, Status)',
  'Airtable-Basis oder Sheets-Template mit Spalten und Views (Neu, Angereichert, Verifiziert, Ready for Outreach)',
  'Waterfall-Reihenfolge festgelegt (welcher E-Mail-Finder zuerst, welcher als Fallback)',
  'Optional: Cold-Calling-Team für telefonische Validierung und Warm-up der Kontakte',
];

const WF01_SCHRITTE = [
  { title: 'Leads einsammeln — aus drei Quellen', text: 'Der Workflow zieht Leads aus drei Richtungen: (a) Neue Zielunternehmen aus vordefinierten Suchfiltern und Listen, (b) bestehende Leads aus dem CRM, die als Bad Data markiert sind — unvollständige Kontakte aus Werbekampagnen, bei denen z. B. nur ein Firmenname oder eine generische E-Mail vorhanden ist, und (c) warme Leads aus Marketing-Kanälen, bei denen der richtige Entscheider noch fehlt.' },
  { title: 'Unternehmensdaten recherchieren', text: 'Für jedes Unternehmen startet eine KI-gestützte Websuche, die gezielt nach Impressum, Firmierung, Branche, Unternehmensgröße, Umsatzklasse und Website sucht. Die LinkedIn-Unternehmensseite wird gescrapt: Beschreibung, Branche, Standort, Mitarbeiterzahl.' },
  { title: 'Entscheider identifizieren', text: 'Auf der LinkedIn-Unternehmensseite durchsucht der Workflow die Mitarbeiterliste und filtert gezielt nach Entscheider-Jobtiteln: Geschäftsführer, CEO, Gründer, CMO, Head of Marketing, VP Sales — je nach ICP-Definition. Nicht irgendwer im Unternehmen, sondern die Person, die die Kaufentscheidung trifft.' },
  { title: 'Daten bereinigen', text: 'Alle gesammelten Daten werden durch eine KI-Bereinigung verarbeitet. Duplikate werden erkannt und entfernt, unvollständige Einträge gefiltert, Jobtitel standardisiert (damit Geschäftsführender Gesellschafter und Managing Director als gleichwertig erkannt werden), und die Daten in ein einheitliches Format gebracht.' },
  { title: 'E-Mail finden — per Waterfall', text: 'Statt sich auf einen einzigen Anbieter zu verlassen, durchläuft der Workflow eine Kaskade: AnyMail Finder → Hunter.io → Apollo → Dropcontact. Erst wenn alle Anbieter durchlaufen sind und keine verifizierte E-Mail gefunden wurde, wird der Lead als ohne E-Mail markiert. Trefferquote: 70–85 %.' },
  { title: 'Telefonnummer finden — per Waterfall', text: 'Parallel zum E-Mail-Waterfall läuft der gleiche Prozess für Telefonnummern: Apollo → Lusha → Kaspr → RocketReach. Die erste verifizierte Nummer gewinnt.' },
  { title: 'Alles in die Lead-Datenbank', text: 'Der fertig angereicherte Datensatz — Firma, Branche, Größe, Website, Entscheider-Name, Jobtitel, verifizierte E-Mail, Telefonnummer — wird automatisch in Airtable oder das CRM geschrieben. Mit Status Ready for Outreach.' },
  { title: 'Optional: Telefonische Validierung', text: 'Für High-Value-Leads kann ein Cold-Calling-Team die gefundenen Telefonnummern manuell validieren. Bestätigung, dass die Nummer korrekt ist und die Person noch im Unternehmen arbeitet. Gleichzeitig ein erster Warm-up des Kontakts.' },
];

const WF01_NUTZEN = [
  { rolle: 'Vertrieb',           text: 'Keine Recherchezeit mehr. Die Liste ist fertig, die Daten vollständig, die E-Mail verifiziert. 100 % der Vertriebszeit geht ins Verkaufen — nicht ins Googlen.' },
  { rolle: 'Marketing',          text: 'Leads aus Kampagnen werden nicht weggeworfen, weil Bad Data. Jeder Lead, der teuer über Ads gewonnen wurde, wird gerettet und angereichert — ROI der Werbeausgaben steigt.' },
  { rolle: 'Geschäftsführung',   text: 'Eine zentrale, saubere Lead-Datenbank statt verteilter Excel-Dateien. Transparenz über Pipeline-Qualität und -Volumen.' },
  { rolle: 'Conversion-Rate',    text: 'Verifizierte E-Mails bedeuten keine Bounces. Richtige Ansprechpartner bedeuten keine Umwege. Angereicherte Firmendaten ermöglichen personalisierte Ansprache.' },
  { rolle: 'Skalierung',         text: '50–100 fertig angereicherte Leads pro Tag statt 5–15. Ohne zusätzliches Personal.' },
];

const WF01_TREFFERQUOTEN = [
  { ansatz: 'Ein einzelner Anbieter',     email: '35–50 %',  telefon: '20–35 %' },
  { ansatz: 'Waterfall (3–4 Anbieter)',   email: '70–85 %',  telefon: '50–65 %' },
];

const WF01_LEAD_STRUKTUR = [
  { feld: 'Firmenname',          quelle: 'LinkedIn / Websuche',        beispiel: 'TechScale GmbH' },
  { feld: 'Domain',              quelle: 'LinkedIn / Websuche',        beispiel: 'techscale.de' },
  { feld: 'Branche',             quelle: 'LinkedIn / KI-Klassifizierung', beispiel: 'B2B SaaS' },
  { feld: 'Unternehmensgröße',   quelle: 'LinkedIn / Websuche',        beispiel: '50–200 Mitarbeiter' },
  { feld: 'Standort',            quelle: 'LinkedIn / Impressum',       beispiel: 'München, Deutschland' },
  { feld: 'Entscheider-Name',    quelle: 'LinkedIn Employee Scraper',  beispiel: 'Dr. Michael Weber' },
  { feld: 'Jobtitel',            quelle: 'LinkedIn / KI-Standardisierung', beispiel: 'Geschäftsführer' },
  { feld: 'E-Mail (verifiziert)', quelle: 'Waterfall Enrichment',      beispiel: 'm.weber@techscale.de' },
  { feld: 'Telefon',             quelle: 'Waterfall Enrichment',       beispiel: '+49 89 1234567' },
  { feld: 'Enrichment-Status',   quelle: 'Workflow',                   beispiel: 'Ready for Outreach' },
];

/* ─── Revenue Engine WF-02 Data ──────────────────────────── */
const WF02_NODES = [
  { id:  1, type: 'trigger', name: 'Webhook: Event',          desc: 'Visit, E-Mail-Open, Klick'       },
  { id:  2, type: 'code',    name: 'Lead identifizieren',     desc: 'Cookie/E-Mail → Lead-ID'         },
  { id:  3, type: 'http',    name: 'CRM: Lead-Daten',         desc: 'Aktueller Score + Profil laden'  },
  { id:  4, type: 'code',    name: 'Event klassifizieren',    desc: 'Visit, Open, Klick, Download'    },
  { id:  5, type: 'code',    name: 'Scoring-Regeln laden',    desc: 'Punktwerte pro Event-Typ'        },
  { id:  6, type: 'code',    name: 'Score berechnen',         desc: 'Alt + Neu + Decay = Gesamt'      },
  { id:  7, type: 'logic',   name: 'Score > 80?',             desc: 'Hot-Lead-Schwelle prüfen'        },
  { id:  8, type: 'logic',   name: 'Score 40–79?',            desc: 'Warm-Segment prüfen'             },
  { id:  9, type: 'ai',      name: 'Intent-Analyse',          desc: 'KI: Muster bei Grenzfällen'      },
  { id: 10, type: 'code',    name: 'Segment zuordnen',        desc: 'Hot / Warm / Cold setzen'        },
  { id: 11, type: 'crm',     name: 'CRM: Score speichern',    desc: 'Score + Segment updaten'         },
  { id: 12, type: 'http',    name: 'Score-Historie loggen',   desc: 'Zeitstempel + Event speichern'   },
  { id: 13, type: 'logic',   name: 'Segment gewechselt?',     desc: 'Aufstieg erkannt?'               },
  { id: 14, type: 'output',  name: 'Slack: Hot Lead Alert',   desc: 'Name, Score, letzte Aktionen'    },
  { id: 15, type: 'http',    name: 'Brevo: Segment-Update',   desc: 'E-Mail-Segment anpassen'         },
  { id: 16, type: 'trigger', name: 'Schedule: Täglich 7:00', desc: 'Decay + Tagesbriefing'           },
  { id: 17, type: 'code',    name: 'Decay anwenden',          desc: 'Inaktive Leads herunterstufen'   },
  { id: 18, type: 'output',  name: 'Slack: Tages-Briefing',   desc: 'Hot/Warm/Cold Übersicht'         },
];

const WF02_IMPACT = [
  { area: 'Lead-Bewertung',               before: 'Bauchgefühl — Vertriebler entscheidet selbst, wen er zuerst anruft',                       after: 'Datenbasierter Score aus Firmenprofil + Verhaltensdaten + Engagement-Signalen' },
  { area: 'Reaktionszeit auf heiße Leads', before: 'Stunden bis Tage — niemand sieht in Echtzeit, wer gerade aktiv ist',                     after: 'Minuten — Slack-Alert sobald ein Lead den Scoring-Schwellenwert überschreitet' },
  { area: 'Vertriebszeit-Verteilung',     before: '60 % der Zeit auf Leads, die nie kaufen werden',                                           after: '80 % der Zeit auf die Top-20 % der Leads mit dem höchsten Kaufsignal' },
  { area: 'Pipeline-Vorhersagbarkeit',    before: 'Keine Priorisierung, keine Systematik — Forecast basiert auf Hoffnung',                    after: 'Klare Segmentierung in Hot / Warm / Cold mit definierten Schwellenwerten' },
  { area: 'Lead-Verlust durch Timing',    before: 'Leads, die gerade aktiv recherchieren, werden nicht erkannt',                              after: 'Echtzeit-Erkennung: Pricing-Seite besucht, E-Mail 3x geöffnet, Case Study gelesen' },
  { area: 'Übergabe Marketing → Vertrieb', before: 'Willkürlich — Marketing schiebt alles rüber, Vertrieb beschwert sich über Qualität',     after: 'Definierter Schwellenwert: Erst ab Score 60 wird der Lead an den Vertrieb übergeben' },
];

const WF02_KERNEFFEKT = 'Der Lead Score ist keine statische Zahl, die einmal vergeben wird. Er ist ein lebendiger Wert, der sich in Echtzeit verändert — basierend auf dem, was der Lead tut: Welche Seiten besucht er? Wie oft öffnet er E-Mails? Klickt er auf den Pricing-Link? Der Vertrieb sieht nicht eine Liste von Namen, sondern eine priorisierte Queue, sortiert nach Kaufwahrscheinlichkeit.';

const WF02_TOOLS = [
  { tool: 'n8n',                          zweck: 'Workflow-Orchestrierung, Score-Berechnung, Schwellenwert-Logik, Alerts',                    typ: 'Self-hosted oder Cloud'         },
  { tool: 'Website-Tracking',             zweck: 'Seitenbesuche, Verweildauer, Scroll-Tiefe, Button-Klicks (Plausible, Matomo, Custom)',      typ: 'Self-hosted oder SaaS'          },
  { tool: 'Brevo / ActiveCampaign',       zweck: 'E-Mail-Engagement-Daten: Opens, Klicks, Häufigkeit, letzte Aktivität',                     typ: 'SaaS — API/Webhook'             },
  { tool: 'CRM (Close / HubSpot / Pipedrive)', zweck: 'Lead-Daten, Deal-Status, Kontakthistorie, Score-Speicherung',                         typ: 'SaaS — API-Zugang'              },
  { tool: 'Airtable / Google Sheets',     zweck: 'Scoring-Regelwerk speichern, Score-Historie, Segment-Zuordnung',                           typ: 'SaaS — API'                     },
  { tool: 'OpenAI API / Anthropic API',   zweck: 'Intent-Analyse auf Basis von Verhaltensmustern, Scoring-Empfehlungen',                     typ: 'API-Key erforderlich'           },
  { tool: 'Slack / Telegram',             zweck: 'Echtzeit-Alerts bei Hot Leads, tägliche Score-Zusammenfassung, Pipeline-Übersicht',        typ: 'Webhook oder Bot-Token'         },
  { tool: 'Cookie/Session-Tracking',      zweck: 'Wiederkehrende Besucher identifizieren, Sitzungsverläufe zuordnen (First-Party Cookies)',  typ: 'Eigenes Tracking-Script'        },
];

const WF02_TOKENS = [
  'Website-Tracking API oder Webhook (Plausible API, Matomo API oder Custom-Webhook bei Page Events)',
  'Brevo Webhook (für E-Mail-Opens und Klicks in Echtzeit) oder ActiveCampaign API',
  'CRM API-Zugang (für Lead-Daten und Score-Rückschreibung)',
  'Airtable API-Key oder Google Sheets OAuth (für Scoring-Regelwerk)',
  'OpenAI oder Anthropic API-Key',
  'Slack Incoming Webhook URL',
  'Optional: Segment, RudderStack oder CDP-Zugang für kanalübergreifendes Tracking',
];

const WF02_VORAUSSETZUNGEN = [
  'Tracking-Script auf der Website installiert (erfasst Seitenbesuche mit Lead-Identifikation via Cookie/E-Mail-Parameter)',
  'E-Mail-System sendet Webhooks bei Open/Click Events (Brevo, ActiveCampaign etc.)',
  'Scoring-Modell definiert: Welche Aktionen geben wie viele Punkte? Welcher Schwellenwert = Hot Lead?',
  'UTM-Parameter-Schema implementiert (damit Marketing-Quelle getrackt wird)',
  'Lead-Identifikation: Verknüpfung zwischen anonymem Website-Besucher und bekanntem Lead (über E-Mail-Klick-Parameter, Formular-Submit oder Cookie-Matching)',
];

const WF02_SCHRITTE = [
  { title: 'Jede Aktion wird erfasst', text: 'Es gibt drei Hauptquellen für Scoring-Signale: Website-Verhalten (Seitenbesuche, Verweildauer, Pricing-Seite), E-Mail-Engagement (Opens, Klicks, Häufigkeit) und Cookie/Session-Daten (wiederkehrende Besucher, auch wenn nicht eingeloggt). Besonders wertvoll: Besuche auf Pricing-Seite, Kontakt-Seite oder Case Studies.' },
  { title: 'Scoring-Regeln anwenden', text: 'Jede Aktion hat einen definierten Punktwert in drei Kategorien: Profil-Score (statisch, wie gut passt der Lead zum ICP), Engagement-Score (dynamisch, was tut der Lead gerade) und Decay-Faktor (zeitbasiert, Score verfällt ohne Aktivität). Das Regelwerk ist transparent und anpassbar.' },
  { title: 'KI-Analyse bei Grenzfällen', text: 'Bei Leads nahe am Schwellenwert analysiert eine KI das Gesamtmuster: Ein mittlerer Score kombiniert mit drei Pricing-Seiten-Besuchen in zwei Tagen plus Lead-Magnet-Download ähnelt stark dem Muster erfolgreicher Abschlüsse. Die KI erkennt Muster, die ein starres Regelwerk übersieht.' },
  { title: 'Segmentierung und Priorisierung', text: 'Hot (80+): Sofortige Slack-Benachrichtigung, Top-Priorität in der Anruf-Queue. Warm (40–79): Nurture-Sequenz + Vertriebler informiert. Cold (< 40): Marketing-Nurture, kein aktiver Vertriebskontakt. Ab Score 60 offizielle MQL-zu-SQL-Übergabe.' },
  { title: 'Echtzeit-Alerts und tägliches Briefing', text: 'Sobald ein Lead den Hot-Schwellenwert überschreitet, bekommt der Vertriebler sofort eine Slack-Nachricht: Lead-Name, Firma, aktueller Score, letzte 5 Aktionen, direkter CRM-Link. Täglich um 7:00 Uhr: automatisches Tages-Briefing mit der vollständigen Hot/Warm/Cold-Verteilung und Decay-Anpassungen.' },
  { title: 'Score-Verlauf und Reporting', text: 'Der Score wird nicht nur als aktuelle Zahl gespeichert, sondern als Verlauf. Der Vertrieb sieht, ob ein Lead gerade aufsteigt (zunehmend aktiv), stagniert oder abfällt. Das informiert die Follow-up-Strategie: Aufsteiger sofort kontaktieren, Absteiger in Nurture-Sequenz zurückschieben.' },
];

const WF02_NUTZEN = [
  { rolle: 'Vertrieb',           text: 'Keine Priorisierung nach Bauchgefühl mehr. Die Queue ist nach Kaufwahrscheinlichkeit sortiert — der wichtigste Lead steht immer oben. Zuerst telefonieren mit denen, die gerade kaufbereit sind.' },
  { rolle: 'Marketing',          text: 'Klare MQL-Definition. Marketing weiss genau, ab welchem Score ein Lead an den Vertrieb übergeben wird — keine Diskussionen mehr über Lead-Qualität.' },
  { rolle: 'Geschäftsführung',   text: 'Pipeline-Forecast wird zuverlässiger. Ein Lead mit Score 85 hat historisch eine 3-fach höhere Abschlusswahrscheinlichkeit als einer mit Score 45.' },
  { rolle: 'Conversion-Rate',    text: 'Leads werden zum optimalen Zeitpunkt kontaktiert — wenn sie gerade aktiv sind, nicht wenn der Vertriebler zufällig dran denkt. Timing ist der stärkste Hebel im Vertrieb.' },
  { rolle: 'Effizienz',          text: 'Vertriebszeit wird auf die Leads konzentriert, die am wahrscheinlichsten kaufen. Kein Spray and Pray mehr.' },
];

const WF02_PROFIL_SCORE = [
  { signal: 'Branche passt zum ICP',               punkte: '+15', begruendung: 'Grundvoraussetzung für Relevanz' },
  { signal: 'Unternehmensgröße im Zielbereich',    punkte: '+10', begruendung: 'Zahlungsfähigkeit + Entscheidungsstruktur' },
  { signal: 'Entscheider-Jobtitel (C-Level, GF)',  punkte: '+15', begruendung: 'Kaufentscheidungsbefugnis' },
  { signal: 'Region im Zielmarkt (DACH)',           punkte: '+5',  begruendung: 'Erreichbarkeit + Marktfokus' },
  { signal: 'Bereits Kunde oder ehem. Kontakt',    punkte: '+10', begruendung: 'Vertrauensbasis vorhanden' },
];

const WF02_ENGAGEMENT_SCORE = [
  { signal: 'E-Mail geöffnet',                            punkte: '+3',  begruendung: 'Grundinteresse vorhanden' },
  { signal: 'E-Mail-Link geklickt',                       punkte: '+8',  begruendung: 'Aktives Engagement' },
  { signal: 'Dieselbe E-Mail mehrfach geöffnet (2x+)',    punkte: '+12', begruendung: 'Wiederkehrendes Interesse — starkes Signal' },
  { signal: 'Website besucht (allgemein)',                 punkte: '+5',  begruendung: 'Bewusste Beschäftigung mit dem Angebot' },
  { signal: 'Pricing-Seite besucht',                      punkte: '+20', begruendung: 'Stärkstes Kaufsignal — Lead prüft Konditionen' },
  { signal: 'Case Study / Referenzen besucht',            punkte: '+15', begruendung: 'Social Proof wird evaluiert — fortgeschrittene Kaufphase' },
  { signal: 'Kontakt-Seite besucht',                      punkte: '+18', begruendung: 'Will Kontakt aufnehmen' },
  { signal: 'Lead Magnet heruntergeladen',                 punkte: '+10', begruendung: 'Bereitschaft, Daten zu hinterlassen' },
  { signal: 'Lead Magnet > 10 Min. gelesen',              punkte: '+20', begruendung: 'Tiefes inhaltliches Engagement' },
  { signal: 'Formular ausgefüllt (Demo, Beratung)',        punkte: '+30', begruendung: 'Explizites Interesse an Gespräch' },
  { signal: 'Wiederkehrender Besucher (3+ Sessions)',     punkte: '+15', begruendung: 'Kommt immer wieder zurück — vergleicht/evaluiert' },
  { signal: 'LinkedIn-Nachricht beantwortet (positiv)',   punkte: '+25', begruendung: 'Direktes Engagement mit Vertrieb' },
];

const WF02_DECAY = [
  { zeitraum: '7 Tage ohne Interaktion',    abzug: '–5 Punkte',          effekt: 'Leichter Rückgang' },
  { zeitraum: '14 Tage ohne Interaktion',   abzug: '–15 Punkte',         effekt: 'Deutlicher Rückgang' },
  { zeitraum: '30 Tage ohne Interaktion',   abzug: '–30 Punkte',         effekt: 'Lead wird kalt — fällt ggf. in Nurture zurück' },
  { zeitraum: '60+ Tage ohne Interaktion',  abzug: 'Auf Profil-Score',   effekt: 'Gesamtes Engagement verfallen' },
];

const WF02_SCHWELLENWERTE = [
  { segment: 'Hot',        score: '80+',    farbe: '#22c55e', aktion: 'Sofort-Alert an Vertriebler, Top-Priorität in Anruf-Queue' },
  { segment: 'Warm',       score: '40–79',  farbe: '#f59e0b', aktion: 'Nurture-Sequenz + Vertriebler informiert für Beobachtung' },
  { segment: 'Cold',       score: '< 40',   farbe: '#3e3e3e', aktion: 'Marketing-Nurture, kein aktiver Vertriebskontakt' },
  { segment: 'MQL → SQL',  score: '60+',    farbe: '#3b82f6', aktion: 'Lead wird offiziell vom Marketing an den Vertrieb übergeben' },
];

/* ─── Revenue Engine WF-03 Data ──────────────────────────── */
const WF03_NODES = [
  { id:  1, type: 'trigger', name: 'Zoom/Meet Webhook',       desc: 'Call beendet, Recording da'          },
  { id:  2, type: 'http',    name: 'Recording laden',         desc: 'Audio von Zoom/Meet API'             },
  { id:  3, type: 'http',    name: 'Drive: Archivieren',      desc: 'Audio dauerhaft speichern'           },
  { id:  4, type: 'http',    name: 'Whisper: Transkript',     desc: 'Audio → Text + Sprecher'             },
  { id:  5, type: 'ai',      name: 'Zusammenfassung',         desc: 'Key Points in 5–8 Sätzen'           },
  { id:  6, type: 'ai',      name: 'Next Steps',              desc: 'Action Items + Verantwortlicher'     },
  { id:  7, type: 'ai',      name: 'Einwände klassifizieren', desc: 'Bedenken + Kategorie + Zitat'        },
  { id:  8, type: 'ai',      name: 'Pipeline-Empfehlung',     desc: 'KI: Stage auf Basis des Inhalts'     },
  { id:  9, type: 'ai',      name: 'Sentiment-Analyse',       desc: 'Gesamtton + Stimmungsverlauf'        },
  { id: 10, type: 'code',    name: 'CRM-Felder mappen',       desc: 'Notizen, Budget, Tags, Stage'        },
  { id: 11, type: 'crm',     name: 'CRM: Deal-Update',        desc: 'Alles ins CRM schreiben'             },
  { id: 12, type: 'code',    name: 'Transkript chunken',       desc: '500–800 Token Abschnitte'            },
  { id: 13, type: 'http',    name: 'Embeddings generieren',   desc: 'text-embedding-3-small'              },
  { id: 14, type: 'http',    name: 'Vektordatenbank',         desc: 'Chunks + Metadaten speichern'        },
  { id: 15, type: 'output',  name: 'Slack: Call-Summary',     desc: 'Zusammenfassung an Team'             },
  { id: 16, type: 'trigger', name: 'Cal.com: Termin morgen',  desc: 'Folgegespräch erkannt'               },
  { id: 17, type: 'http',    name: 'Vektor-DB: Abfrage',      desc: 'Bisherige Gespräche laden'           },
  { id: 18, type: 'ai',      name: 'Vorbereitungsdokument',   desc: 'Briefing: Themen + Einwände'         },
  { id: 19, type: 'output',  name: 'Slack: Prep-Doc',         desc: 'Briefing an Vertriebler'             },
  { id: 20, type: 'trigger', name: 'Schedule: Freitag',       desc: 'Wöchentliche Trend-Analyse'          },
  { id: 21, type: 'http',    name: 'Vektor-DB: Woche',        desc: 'Alle Gespräche der Woche'            },
  { id: 22, type: 'ai',      name: 'Trend-Report',            desc: 'Häufige Einwände + Muster'           },
  { id: 23, type: 'output',  name: 'Slack: Trends',           desc: 'Wöchentlicher Report'                },
];

const WF03_IMPACT = [
  { area: 'Dokumentation nach Calls',       before: '5–15 Min. pro Gespräch — Vertriebler tippt Notizen aus dem Gedächtnis, vergisst die Hälfte',       after: '0 Min. — KI erstellt Zusammenfassung, extrahiert Next Steps und schreibt alles ins CRM' },
  { area: 'Informationsverlust',            before: '70–80 % des Gesprächsinhalts geht verloren. Nuancen, Einwände, Zwischentöne — nie dokumentiert',    after: '0 % Verlust — jedes Wort transkribiert, analysiert und durchsuchbar gespeichert' },
  { area: 'Vorbereitung auf Folgecalls',    before: 'CRM-Notiz lesen (wenn überhaupt vorhanden), sich grob erinnern, improvisieren',                     after: 'Automatisches Vorbereitungsdokument: Letzte Themen, Einwände, offene Fragen, Kommunikationsstil' },
  { area: 'Wissenstransfer im Team',        before: 'Wissen steckt in Köpfen einzelner Vertriebler — bei Kündigung weg',                                 after: 'Komplette Gesprächshistorie in Vektordatenbank — jeder im Team kann jederzeit suchen' },
  { area: 'Trend-Erkennung',               before: 'Niemand analysiert systematisch, welche Einwände oder Themen sich häufen',                           after: 'KI erkennt automatisch Muster über alle Gespräche — proaktive Reaktion möglich' },
  { area: 'Coaching & Training',            before: 'Manager hört selten live mit, Feedback basiert auf Hörensagen',                                      after: 'Jedes Gespräch nachvollziehbar, analysierbar und für Training nutzbar' },
  { area: 'Marketing-Consultants',          before: 'Gehen unvorbereitet in Kundenmeetings, kennen Vorgeschichte nicht im Detail',                       after: 'Automatisches Briefing mit komplettem Kontext aus allen bisherigen Gesprächen' },
];

const WF03_KERNEFFEKT = 'Jedes Gespräch — ob Vertriebscall, Kundenberatung oder internes Meeting — wird zur durchsuchbaren, analysierbaren Wissensressource. Nicht als tote Datei in einem Ordner, sondern als lebendiger Kontext, der bei jedem nächsten Gespräch automatisch wieder auftaucht und die Pipeline-Stufe im CRM intelligent aktualisiert.';

const WF03_TOOLS = [
  { tool: 'n8n',                           zweck: 'Workflow-Orchestrierung, API-Calls, Pipeline-Logik, Scheduling',                               typ: 'Self-hosted oder Cloud'       },
  { tool: 'Zoom / Google Meet / Teams',    zweck: 'Call-Recording — automatische Aufnahme aller Gespräche',                                       typ: 'SaaS — Webhook bei Call-Ende' },
  { tool: 'Whisper API / Deepgram',        zweck: 'Audio-zu-Text-Transkription mit Sprecher-Erkennung (Diarization)',                             typ: 'API-Key erforderlich'         },
  { tool: 'OpenAI API / Anthropic API',    zweck: 'Zusammenfassung, Einwand-Extraktion, Sentiment, Next Steps, Trend-Erkennung, Vorbereitung',   typ: 'API-Key erforderlich'         },
  { tool: 'Vektordatenbank (Pinecone / Qdrant)', zweck: 'Gesprächsinhalte als Embeddings speichern — semantisch durchsuchbar',                   typ: 'Self-hosted oder SaaS'        },
  { tool: 'CRM (Close / HubSpot / Pipedrive)', zweck: 'Deal-Stage-Update, Notizen, Tags, Kontakthistorie',                                      typ: 'SaaS — API-Zugang'            },
  { tool: 'Google Drive / S3',             zweck: 'Audio-Dateien und Transkripte archivieren',                                                    typ: 'OAuth oder Access Keys'       },
  { tool: 'Slack',                          zweck: 'Call-Zusammenfassungen, Prep-Docs, Alerts bei kritischen Einwänden, Trend-Reports',           typ: 'Webhook'                      },
];

const WF03_TOKENS = [
  'Zoom API (OAuth + Webhook für Recording-Ready-Event) oder Google Meet API / Teams Graph API',
  'OpenAI Whisper API-Key oder Deepgram API-Key (für Transkription mit Diarization)',
  'OpenAI oder Anthropic API-Key (für Analyse, Zusammenfassung, Embeddings)',
  'Vektordatenbank-Credentials (Pinecone API-Key, Qdrant URL oder Supabase Connection String)',
  'CRM API-Zugang',
  'Google Drive OAuth oder AWS S3 Credentials',
  'Notion Integration Token oder Airtable API-Key',
  'Slack Incoming Webhook URL',
];

const WF03_VORAUSSETZUNGEN = [
  'Automatische Aufnahme in Zoom/Meet/Teams aktiviert (mit Einwilligung der Teilnehmer — DSGVO beachten)',
  'CRM-Pipeline-Stufen definiert (z. B.: Erstgespräch → Qualifizierung → Angebot → Verhandlung → Abschluss)',
  'Regeln für Pipeline-Updates nach Gesprächsinhalten definiert (z. B.: Budget genannt → Stage Qualifiziert)',
  'Vektordatenbank eingerichtet mit Namespace/Collection pro Unternehmen oder Deal',
  'Einwand-Katalog vorbereitet (bekannte Einwände und Kategorien) für die KI-Klassifizierung',
  'DSGVO-konformer Hinweis auf Aufzeichnung implementiert',
];

const WF03_SCHRITTE = [
  { title: 'Gespräch wird aufgezeichnet', text: 'Sobald ein Zoom-Call, Google-Meet-Meeting oder Teams-Gespräch endet, schickt die Plattform automatisch einen Webhook an den Workflow. Die Audio-Datei wird heruntergeladen und in Google Drive oder S3 archiviert.' },
  { title: 'Transkription mit Sprecher-Erkennung', text: 'Die Audio-Datei wird an die Whisper API geschickt — mit Diarization. Das System erkennt, wer wann gesprochen hat: Vertriebler oder Kunde. Das ist entscheidend für die Analyse — die KI muss wissen, ob eine Aussage vom Kunden kam oder vom eigenen Team.' },
  { title: 'Intelligente Gesprächsanalyse', text: 'Die KI liest das komplette Transkript und extrahiert in einem Durchgang: Zusammenfassung (5–8 Sätze), konkrete Next Steps mit Verantwortlichem, alle Einwände mit Kategorie und Originalzitat, Budget-Signale, Entscheidungsprozess, Sentiment-Verlauf und Pipeline-Stage-Empfehlung.' },
  { title: 'CRM automatisch aktualisieren', text: 'Die extrahierten Informationen werden direkt ins CRM geschrieben — nicht als unstrukturierter Textblock, sondern in die richtigen Felder: Zusammenfassung in die Notizen, Next Steps als Aufgaben, Budget ins Budget-Feld, Pipeline-Stage wird angepasst, relevante Tags werden gesetzt. Null Dokumentationsaufwand.' },
  { title: 'In Vektordatenbank speichern', text: 'Das Transkript wird in Chunks aufgeteilt, als Embeddings generiert und mit Metadaten gespeichert. Dadurch wird semantische Suche möglich: Zeig mir alle Gespräche, in denen Kunden über Datenschutzbedenken gesprochen haben — auch wenn das Wort Datenschutz nie fiel.' },
  { title: 'Vorbereitungsdokument für nächstes Gespräch', text: 'Vor einem Folgegespräch durchsucht der Workflow die Vektordatenbank nach allen bisherigen Gesprächen mit dem Kontakt und erstellt ein Briefing: Bisherige Themen, offene Punkte, Einwände, vereinbarte Schritte, Kommunikationsstil des Kunden, potenzielle Hindernisse.' },
  { title: 'Wöchentlicher Trend-Report', text: 'Jeden Freitag analysiert die KI alle Gespräche der Woche und erkennt Muster: Welche Einwände kommen häufiger? Welche Themen tauchen bei mehreren Kunden auf? Gibt es ein neues Wettbewerber-Thema? Report geht an Marketing, Vertrieb und Geschäftsführung.' },
];

const WF03_NUTZEN = [
  { rolle: 'Vertrieb',               text: 'Null Dokumentationsaufwand nach Calls. CRM ist immer aktuell. Pipeline-Stage wird automatisch angepasst. Vorbereitungsdokumente für jeden Folgecall.' },
  { rolle: 'Marketing-Consultants',  text: 'Kompletter Kundenkontext vor jedem Meeting. Nicht mehr Was hatten wir besprochen?, sondern ein detailliertes Briefing mit offenen Punkten, Einwänden und Kommunikationsstil.' },
  { rolle: 'Management',             text: 'Trend-Erkennung über alle Gespräche. Welche Einwände häufen sich? Wo verliert der Vertrieb Deals? Welche Themen bewegen den Markt gerade? Datenbasiert statt Anekdoten.' },
  { rolle: 'Training & Coaching',    text: 'Jedes Gespräch ist nachvollziehbar. Sales-Manager können gezielt Gespräche analysieren, Best Practices identifizieren und schwache Stellen coachen.' },
  { rolle: 'Wissenssicherung',       text: 'Wenn ein Vertriebler das Unternehmen verlässt, bleibt das gesamte Kundenwissen erhalten — in der Vektordatenbank, nicht im Kopf einer einzelnen Person.' },
  { rolle: 'Kundenbeziehung',        text: 'Kunden spüren, wenn man sich an Details erinnert. Sie hatten letztes Mal Bedenken zur Datenmigration erwähnt — wir haben dafür eine Lösung vorbereitet. Das schafft Vertrauen.' },
];

const WF03_PIPELINE_LOGIK = [
  { inhalt: 'Erstgespräch, Kennenlernen, kein konkreter Bedarf',  update: 'Discovery',            aktion: 'Tag: Erstgespräch absolviert' },
  { inhalt: 'Konkreter Bedarf geäußert, Problem beschrieben',      update: 'Qualifizierung',       aktion: 'Budget-Feld: noch offen' },
  { inhalt: 'Budget genannt oder Budgetrahmen bestätigt',          update: 'Qualifiziert',         aktion: 'Budget-Feld befüllen' },
  { inhalt: 'Angebot angefordert oder schick uns ein Angebot',     update: 'Angebot',              aktion: 'Task: Angebot erstellen' },
  { inhalt: 'Verhandlung über Konditionen, Rabatt, Umfang',        update: 'Verhandlung',          aktion: 'Tag: Preisverhandlung' },
  { inhalt: 'Mündliche Zusage oder Unterschrift angekündigt',      update: 'Abschluss (pending)',  aktion: 'Task: Vertrag senden' },
  { inhalt: 'Absage oder kein Interesse mehr',                     update: 'Verloren',             aktion: 'Lost Reason dokumentieren' },
  { inhalt: 'Müssen intern abstimmen / Melden uns in 4 Wochen',   update: 'Stalled',              aktion: 'Follow-up-Datum setzen' },
];

const WF03_VEKTOR_ABFRAGEN = [
  { abfrage: 'Alle Einwände von TechScale GmbH',              nutzer: 'Vertriebler',    zweck: 'Vorbereitung auf Folgegespräch' },
  { abfrage: 'Gespräche über Preisverhandlungen letzte 30 Tage', nutzer: 'Sales Manager', zweck: 'Discount-Trends erkennen' },
  { abfrage: 'Kundenprobleme im Bereich Lead-Generierung',    nutzer: 'Marketing',      zweck: 'Content-Ideen ableiten' },
  { abfrage: 'Wie hat Firma X auf unser Angebot reagiert?',   nutzer: 'Geschäftsführung', zweck: 'Deal-Review' },
  { abfrage: 'Häufigste Einwände im Q1',                      nutzer: 'Sales Enablement', zweck: 'Schulungsmaterial erstellen' },
];

/* ─── Revenue Engine WF-04 Data ──────────────────────────── */
const WF04_NODES = [
  { id:  1, type: 'trigger', name: 'CRM-Event / Webhook',     desc: 'Stage, Stille, Score-Sprung'         },
  { id:  2, type: 'code',    name: 'Trigger-Typ erkennen',    desc: 'Erstgespräch / Angebot / Stille'     },
  { id:  3, type: 'http',    name: 'CRM: Deal + Historie',    desc: 'Kontakt, Stage, Touchpoints'         },
  { id:  4, type: 'http',    name: 'Vektor-DB: Gespräche',    desc: 'Einwände + Kontext laden'            },
  { id:  5, type: 'http',    name: 'Scoring: Engagement',     desc: 'Events + Kanalaffinität'             },
  { id:  6, type: 'code',    name: 'Sequenz auswählen',       desc: 'A/B/C/D/E nach Trigger'              },
  { id:  7, type: 'http',    name: 'Content-Bibliothek',      desc: 'Passende Assets laden'               },
  { id:  8, type: 'ai',      name: 'Nachricht 1',             desc: 'Personalisiert + Mehrwert'           },
  { id:  9, type: 'output',  name: 'E-Mail: Touchpoint 1',    desc: 'Erste Nachricht senden'              },
  { id: 10, type: 'wait',    name: 'Timer: Stufe 1',          desc: '2–5 Tage warten'                    },
  { id: 11, type: 'http',    name: 'Status-Check',            desc: 'Open, Reply, Visit prüfen'          },
  { id: 12, type: 'logic',   name: 'Reaktion erhalten?',      desc: 'Verhaltensdaten auswerten'          },
  { id: 13, type: 'ai',      name: 'Antwort qualifizieren',   desc: 'Interesse / Einwand / Absage'       },
  { id: 14, type: 'logic',   name: 'Kanal wechseln?',         desc: 'Open ohne Reply → LinkedIn'         },
  { id: 15, type: 'ai',      name: 'Nachricht 2',             desc: 'Anderer Winkel, anderer Kanal'      },
  { id: 16, type: 'http',    name: 'LinkedIn / E-Mail',       desc: 'Multi-Channel senden'               },
  { id: 17, type: 'wait',    name: 'Timer: Stufe 2',          desc: 'Nächste Warteperiode'               },
  { id: 18, type: 'logic',   name: 'Score-Check',             desc: 'Lead-Score über Minimum?'           },
  { id: 19, type: 'ai',      name: 'Nachricht 3',             desc: 'Case Study oder Guide'              },
  { id: 20, type: 'output',  name: 'Touchpoint 3 senden',     desc: 'Asset-basiertes Follow-up'          },
  { id: 21, type: 'output',  name: 'Slack: Anruf-Reminder',   desc: 'Vertriebler einschalten'            },
  { id: 22, type: 'ai',      name: 'Letzte Nachricht',        desc: 'Breakup oder Termin-CTA'            },
  { id: 23, type: 'logic',   name: 'Sequenz fertig?',         desc: 'Alle Stufen ohne Reaktion?'         },
  { id: 24, type: 'crm',     name: 'CRM: Status-Update',      desc: 'Nurture / Lost markieren'           },
  { id: 25, type: 'output',  name: 'Slack: Sequenz-Report',   desc: 'Ergebnis an Vertriebler'            },
];

const WF04_IMPACT = [
  { area: 'Follow-up-Quote',       before: '30–40 % der Leads werden nachgefasst — der Rest fällt durchs Raster',         after: '100 % — jeder Lead bekommt die passende Sequenz, kein einziger wird vergessen' },
  { area: 'Timing',                before: 'Zufällig — Vertriebler denkt irgendwann dran oder auch nicht',                 after: 'Präzise — jede Nachricht kommt zum optimalen Zeitpunkt, gesteuert durch Regeln und Verhaltensdaten' },
  { area: 'Personalisierung',      before: 'Generische Vorlagen: Ich wollte mal nachfragen, ob Sie noch Interesse haben', after: 'Hochpersonalisiert — jede Nachricht referenziert konkrete Gesprächsinhalte und Verhaltensdaten' },
  { area: 'Anzahl Touchpoints',    before: '1–2 manuelle Follow-ups, dann aufgegeben',                                     after: '5–8 Touchpoints pro Sequenz über mehrere Wochen — systematisch und ohne Druck' },
  { area: 'Kanalwahl',             before: 'Nur E-Mail oder nur Telefon — je nach Vorliebe des Vertrieblers',             after: 'Multi-Channel: E-Mail + LinkedIn + Telefon-Reminder — je nach Reaktion und Kanal-Affinität' },
  { area: 'Reaktion auf Verhalten', before: 'Keine — Vertriebler weiß nicht ob Lead die Mail geöffnet hat',             after: 'Echtzeit-Trigger: Sequenz passt sich an Verhalten an (geöffnet → anderer Pfad als keine Reaktion)' },
  { area: 'Pipeline-Hygiene',      before: 'Zombie-Deals hängen monatelang in der gleichen Stage',                       after: 'Automatische Eskalation → Re-Engagement → Nurture → Lost — Pipeline bleibt sauber' },
];

const WF04_KERNEFFEKT = 'Dieser Workflow ist der zentrale Nervenstrang der Revenue Engine. Er verbindet alle anderen Workflows — Call-Recording, Lead Scoring, Angebotserstellung — zu einer durchgängigen Follow-up-Logik. Jeder Lead bekommt nach jedem relevanten Event die richtige Sequenz. Und jede Nachricht ist personalisiert auf Basis von allem, was das System über diesen Lead weiß.';

const WF04_TOOLS = [
  { tool: 'n8n',                          zweck: 'Workflow-Orchestrierung, Sequenz-Logik, Verzweigungen, Timer, Event-Listener',     typ: 'Self-hosted oder Cloud'     },
  { tool: 'CRM (Close / HubSpot / Pipedrive)', zweck: 'Deal-Daten, Pipeline-Stage, Kontakthistorie, Aktivitäts-Log',               typ: 'SaaS — API-Zugang'          },
  { tool: 'Vektordatenbank (aus WF-03)',   zweck: 'Gesprächsinhalte abrufen für personalisierte Nachfass-Nachrichten',              typ: 'Self-hosted oder SaaS'      },
  { tool: 'Lead Scoring (aus WF-02)',      zweck: 'Aktueller Score + Engagement-Daten + Tracking-Events',                           typ: 'Via CRM oder Sheets API'    },
  { tool: 'OpenAI API / Anthropic API',   zweck: 'Follow-up-Nachrichten personalisieren, Einwandbehandlungen, Content-Empfehlungen', typ: 'API-Key erforderlich'       },
  { tool: 'Brevo / ActiveCampaign',       zweck: 'E-Mail-Versand mit Open/Click-Tracking, Sequenz-Steuerung',                      typ: 'API-Key + Webhooks'         },
  { tool: 'LinkedIn Automation',          zweck: 'LinkedIn-DMs als zusätzlicher Touchpoint (Phantombuster, HeyReach, Expandi)',     typ: 'API oder Tool-Integration'  },
  { tool: 'Google Drive',                 zweck: 'Content-Assets: Case Studies, Leitfäden, Whitepapers für wertbasierte Follow-ups', typ: 'OAuth'                      },
  { tool: 'Cal.com / Calendly',           zweck: 'Terminbuchungs-Links in Follow-up-Nachrichten integrieren',                      typ: 'API'                        },
  { tool: 'Slack',                        zweck: 'Telefon-Reminder an Vertriebler, Eskalations-Alerts, Sequenz-Status-Updates',    typ: 'Webhook'                    },
];

const WF04_TOKENS = [
  'CRM API-Zugang (für Deal-Daten, Pipeline-Events, Aktivitäts-Log)',
  'Vektordatenbank-Credentials (für Gesprächskontext aus WF-03)',
  'OpenAI oder Anthropic API-Key',
  'Brevo API-Key + Webhook-URL (für Open/Click-Events)',
  'LinkedIn Automation Tool API (Phantombuster, HeyReach etc.)',
  'Google Drive OAuth (für Content-Asset-Zugriff)',
  'Cal.com API-Key',
  'Slack Incoming Webhook URL',
  'Lead Scoring Zugang (CRM Custom Field oder Sheets API)',
];

const WF04_VORAUSSETZUNGEN = [
  'Sequenz-Definitionen dokumentiert: Welche Sequenz für welchen Auslöser? Wie viele Stufen? Welche Zeitabstände?',
  'Content-Bibliothek vorhanden: Case Studies, Leitfäden, Whitepapers, Video-Testimonials als Follow-up-Assets',
  'Tracking aktiv: Website-Tracking (WF-02), E-Mail-Tracking (Brevo), Angebots-Tracking',
  'Gesprächsdaten in Vektordatenbank (WF-03) — Grundlage für Personalisierung',
  'Einwand-Katalog gepflegt: Häufige Einwände mit passenden Antworten und Content-Zuordnungen',
  'Kanalaffinität pro Lead erfasst: Reagiert der Lead eher auf E-Mail, LinkedIn oder Telefon?',
];

const WF04_SCHRITTE = [
  { title: 'Auslöser erkennen', text: 'Der Workflow hört auf fünf Trigger-Typen: Nach Erstgespräch (WF-03 hat analysiert), nach Angebotsversand (CRM-Stage wechselt), nach Stille-Phase (14+ Tage keine Aktivität), nach Tracking-Event (Score-Sprung aus WF-02) und nach erkanntem Einwand im Gespräch. Jeder Trigger startet eine andere Sequenz.' },
  { title: 'Kontext laden', text: 'Bevor eine einzige Nachricht geschrieben wird, sammelt der Workflow alles: Letzte Gesprächszusammenfassung und Einwände aus der Vektordatenbank, aktueller Lead Score und die letzten 5 Engagement-Events, bisherige Follow-up-Nachrichten und Kanalaffinität (reagiert dieser Lead eher auf E-Mail, LinkedIn oder Telefon?).' },
  { title: 'Sequenz personalisieren', text: 'Jede einzelne Nachricht wird von der KI dynamisch geschrieben — auf Basis aller verfügbaren Kontextdaten. Die KI weiß: was im letzten Gespräch besprochen wurde, welchen Einwand der Lead hatte, welchen Content er bereits konsumiert hat (kein doppeltes Senden) und welcher Kommunikationsstil zum Lead passt.' },
  { title: 'Auf Verhalten reagieren', text: 'Die Sequenz ist nicht starr. Nach jedem Schritt prüft der Workflow: Hat der Lead geantwortet (Sequenz stoppen, Termin anbieten)? Hat er die Website besucht (nächsten Schritt vorziehen)? Hat er eine E-Mail geöffnet aber nicht geantwortet (Kanal wechseln auf LinkedIn)? Hat er sich abgemeldet (sofort stoppen)? Ist der Score unter 20 gefallen (in Long-Term-Nurture verschieben)?' },
  { title: 'Multi-Channel-Orchestrierung', text: 'Nicht jeder Touchpoint ist eine E-Mail. Die Sequenz wechselt bewusst zwischen Kanälen: E-Mail für wertbasierten Content, LinkedIn-DM für persönliche kurze Nachrichten, Telefon-Reminder für Momente mit hohem Intent wenn digitale Kanäle keine Reaktion bringen.' },
  { title: 'Eskalation und Pipeline-Bereinigung', text: 'Wenn eine Sequenz ohne Reaktion durchläuft: Warm Leads (Score 40+) kommen in monatliche Nurture-Schleife. Cold Leads (Score < 40) auf quartalsweisen Nurture. Dead Leads (Score < 10, 90+ Tage) werden auf Lost gesetzt mit dokumentiertem Grund. Keine Zombie-Deals mehr.' },
];

const WF04_NUTZEN = [
  { rolle: 'Vertrieb',           text: 'Kein Lead fällt mehr durchs Raster. Jeder Kontakt wird systematisch nachgefasst — der Vertriebler wird nur bei hohem Intent eingeschaltet, der Rest läuft automatisch.' },
  { rolle: 'Abschlussquote',     text: '80 % der Abschlüsse brauchen 5+ Touchpoints. Manuell schafft kaum ein Vertriebler mehr als 2. Dieser Workflow liefert 5–8 Touchpoints pro Lead — konsistent.' },
  { rolle: 'Pipeline-Hygiene',   text: 'Deals, die nie zum Abschluss kommen, werden systematisch identifiziert, re-engagiert oder bereinigt. Keine Zombie-Deals mehr, die seit Monaten in der Pipeline hängen.' },
  { rolle: 'Kundenbeziehung',    text: 'Follow-ups, die echten Mehrwert liefern statt generische Nachfragen. Das baut Vertrauen auf statt Genervtheit.' },
  { rolle: 'Effizienz',          text: '100 Leads gleichzeitig in verschiedenen Sequenzen, jeder mit personalisiertem Content über multiple Kanäle — für ein 3-köpfiges Vertriebsteam manuell nicht machbar.' },
];

const WF04_SEQUENZEN = [
  { seq: 'A', label: 'Erstgespräch',         ausloeser: 'Call beendet + analysiert (WF-03)', stufen: 5, dauer: '14 Tage', kanaele: 'E-Mail, LinkedIn, Telefon', ziel: 'Folgetermin vereinbaren', farbe: '#22c55e' },
  { seq: 'B', label: 'Angebot',              ausloeser: 'Angebot versendet (CRM-Stage)',     stufen: 5, dauer: '15 Tage', kanaele: 'E-Mail, Telefon',           ziel: 'Angebot abschließen',     farbe: '#3b82f6' },
  { seq: 'C', label: 'Re-Engagement',        ausloeser: '14+ Tage Stille',                   stufen: 4, dauer: '16 Tage', kanaele: 'E-Mail, LinkedIn',          ziel: 'Kontakt reaktivieren',    farbe: '#f59e0b' },
  { seq: 'D', label: 'Warm-Back',            ausloeser: 'Score-Sprung / Tracking-Event',     stufen: 4, dauer: '48 Std.', kanaele: 'Slack, E-Mail, LinkedIn',   ziel: 'Sofort-Termin',           farbe: '#a78bfa' },
  { seq: 'E', label: 'Einwand',              ausloeser: 'Spezifischer Einwand erkannt',       stufen: 4, dauer: '10 Tage', kanaele: 'E-Mail, LinkedIn',          ziel: 'Einwand entkräften',      farbe: '#ec4899' },
  { seq: '∞', label: 'Nurture (monatlich)',  ausloeser: 'Sequenz ohne Abschluss durchlaufen', stufen: 0, dauer: 'Endlos', kanaele: 'E-Mail',                    ziel: 'Top-of-Mind bleiben',     farbe: '#6b7280' },
];

const WF04_VERHALTEN = [
  { trigger: 'Lead hat GEANTWORTET',          pfad: 'Sequenz STOPPEN → KI qualifiziert → Positiv: Terminlink / Einwand: Sequenz E / Absage: Nurture', farbe: '#22c55e' },
  { trigger: 'Lead hat WEBSITE BESUCHT',      pfad: 'Nächsten Schritt VORZIEHEN (sofort statt 3 Tage) → Bei Pricing-Seite: Slack-Alert', farbe: '#3b82f6' },
  { trigger: 'E-MAIL GEÖFFNET, kein Reply',   pfad: 'Kanal WECHSELN: Nächster Touchpoint per LinkedIn statt E-Mail', farbe: '#f59e0b' },
  { trigger: 'Lead hat sich ABGEMELDET',      pfad: 'Sequenz SOFORT STOPPEN → Do-Not-Contact markieren', farbe: '#ef4444' },
  { trigger: 'Score UNTER 20 gefallen',       pfad: 'Sequenz STOPPEN → In Long-Term-Nurture verschieben', farbe: '#6b7280' },
  { trigger: 'KEINE REAKTION',                pfad: 'Weiter mit nächstem Sequenz-Schritt → Nach letztem Schritt: Nurture oder Lost', farbe: '#3e3e3e' },
];

/* ─── Revenue Engine WF-05 Data ──────────────────────────── */
const WF05_NODES = [
  { id:  1, type: 'trigger', name: 'Call gestartet',          desc: 'Zoom/Meet Call-Start erkannt'        },
  { id:  2, type: 'http',    name: 'CRM: Deal-Daten',         desc: 'Kontakt, Firma, Stage, Historie'     },
  { id:  3, type: 'http',    name: 'Vektor-DB: Historie',     desc: 'Bisherige Gespräche laden'           },
  { id:  4, type: 'http',    name: 'Playbook laden',          desc: 'Leitfaden + Einwand-Bibliothek'      },
  { id:  5, type: 'http',    name: 'Pricing-Regeln laden',    desc: 'Pakete, Rabatte, Budget'             },
  { id:  6, type: 'code',    name: 'Copilot-Kontext',         desc: 'Alle Daten für Echtzeit bündeln'     },
  { id:  7, type: 'trigger', name: 'Audio-Stream aktiv',      desc: 'Live-Transkription gestartet'        },
  { id:  8, type: 'http',    name: 'Deepgram: Live',          desc: 'Audio → Text in < 500ms'             },
  { id:  9, type: 'ai',      name: 'Gesprächsphase',          desc: 'Discovery / Demo / Closing'          },
  { id: 10, type: 'ai',      name: 'Einwand-Erkennung',       desc: 'Klassifizierung + Antwort'           },
  { id: 11, type: 'ai',      name: 'Kaufsignal-Check',        desc: 'Interesse-Level erkennen'            },
  { id: 12, type: 'code',    name: 'BANT-Tracker',            desc: 'Live-Checkliste updaten'             },
  { id: 13, type: 'logic',   name: 'Wettbewerber?',           desc: 'Battle Card einblenden'              },
  { id: 14, type: 'logic',   name: 'Pricing-Thema?',          desc: 'Pricing-Panel aktivieren'            },
  { id: 15, type: 'output',  name: 'Copilot: Karte',          desc: 'WebSocket → Echtzeit-Update'         },
  { id: 16, type: 'trigger', name: 'Call beendet',            desc: 'Export-Phase startet'                },
  { id: 17, type: 'ai',      name: 'Call-Zusammenfassung',    desc: 'Summary + Next Steps'                },
  { id: 18, type: 'crm',     name: 'CRM: Deal-Update',        desc: 'Notizen + BANT + Stage'              },
  { id: 19, type: 'http',    name: 'Vektor-DB: Speichern',    desc: 'Transkript archivieren'              },
  { id: 20, type: 'code',    name: 'Playbook-Feedback',       desc: 'Neue Einwände loggen'                },
  { id: 21, type: 'output',  name: 'Slack: Call-Report',      desc: 'Summary + nächste Schritte'          },
];

const WF05_IMPACT = [
  { area: 'Einwandbehandlung',          before: 'Vertriebler muss spontan reagieren, wird unsicher — Gespräch kippt',                      after: 'KI erkennt Einwand in Echtzeit und blendet beste Antwort ein — Vertriebler bleibt souverän' },
  { area: 'Pricing-Fragen im Call',     before: 'Da muss ich nochmal nachschauen und mich melden — Deal verliert Momentum',               after: 'Pricing-Guidance live: Pakete, Rabattregeln, Kombinations-Optionen — sofort antworten' },
  { area: 'Gesprächsführung',           before: 'Abhängig von Erfahrung — Junioren improvisieren, vergessen Fragen, verpassen Signale',    after: 'Live-Teleprompter zeigt nächste Frage, BANT-Check, Gesprächsphase — wie ein Coach' },
  { area: 'Onboarding neuer Vertriebler', before: '3–6 Monate bis alle Einwände, Preise und Wettbewerber-Argumente bekannt sind',         after: 'Vom ersten Tag Senior-Level — Copilot liefert Wissen, Vertriebler liefert Persönlichkeit' },
  { area: 'Wettbewerber-Situationen',   before: 'Wir haben auch ein Angebot von X — Vertriebler kennt die Unterschiede nicht',            after: 'Battle Card erscheint sofort: Stärken vs. Wettbewerber, Differenzierung, was man nicht sagen sollte' },
  { area: 'Gesprächsqualität',          before: 'Stark schwankend — abhängig von Tagesform, Erfahrung und Vorbereitung',                  after: 'Konstant hoch — jeder Call folgt optimaler Struktur, kein Punkt vergessen' },
  { area: 'Abschlussquote',             before: '15–25 % (bei unerfahrenen Vertrieblern deutlich niedriger)',                              after: '25–40 % — weil die richtigen Worte zur richtigen Zeit kommen' },
];

const WF05_KERNEFFEKT = 'Der Sales Copilot ist kein Tool, das der Vertriebler nach dem Call nutzt. Er ist live dabei — wie ein unsichtbarer Senior-Vertriebler, der neben dir sitzt und dir in Echtzeit zuflüstert: Jetzt die Budget-Frage stellen, Das ist der Preis-Einwand — hier ist die beste Antwort, Er vergleicht mit Wettbewerber X — hier ist dein Differenzierungspunkt. Der Vertriebler bleibt natürlich und menschlich — der Copilot liefert das Wissen.';

const WF05_TOOLS = [
  { tool: 'Echtzeit-Transkription',      zweck: 'Live-Audio in Text umwandeln während das Gespräch läuft (Deepgram, AssemblyAI, Whisper)', typ: 'SaaS — Streaming API'       },
  { tool: 'OpenAI API / Anthropic API',  zweck: 'Echtzeit-Analyse: Einwände erkennen, Antworten generieren, Gesprächsphase, Pricing',     typ: 'API-Key — Streaming'         },
  { tool: 'Vektordatenbank (WF-03)',     zweck: 'Bisherige Gesprächsinhalte mit dem Kontakt laden — Kontext für den Copilot',             typ: 'Self-hosted oder SaaS'       },
  { tool: 'CRM (Close / HubSpot / Pipedrive)', zweck: 'Deal-Daten, Kontaktprofil, Pipeline-Stage, bisherige Touchpoints',               typ: 'SaaS — API-Zugang'           },
  { tool: 'Notion / Airtable',           zweck: 'Sales Playbook, Battle Cards, Einwand-Bibliothek, Pricing-Regelwerk',                   typ: 'SaaS — API'                  },
  { tool: 'Copilot-Interface',           zweck: 'Browser-basierte Overlay-App — zweiter Bildschirm oder Sidebar während des Calls',      typ: 'Custom Web-App (React)'      },
  { tool: 'Zoom / Google Meet / Teams',  zweck: 'Call-Plattform mit Audio-Stream-Zugang oder System-Audio-Capture',                      typ: 'Integration oder Screen Cap' },
  { tool: 'n8n',                         zweck: 'Backend-Orchestrierung: Kontext laden, Playbook abrufen, Gesprächsphasen-Logik',        typ: 'Self-hosted oder Cloud'      },
];

const WF05_TOKENS = [
  'Deepgram Streaming API-Key oder AssemblyAI Realtime API-Key (für Live-Transkription mit < 500ms Latenz)',
  'OpenAI API-Key (GPT-4o mit Streaming für Echtzeit-Responses) oder Anthropic API-Key',
  'Vektordatenbank-Credentials (für Kundenhistorie aus WF-03)',
  'CRM API-Zugang (Deal-Daten live abrufen)',
  'Notion/Airtable API-Key (für Playbook und Battle Cards)',
  'Zoom/Meet Integration oder System-Audio-Routing (BlackHole auf Mac, VB-Audio auf Windows)',
];

const WF05_VORAUSSETZUNGEN = [
  'Sales Playbook digitalisiert in Notion/Airtable: Gesprächsleitfaden pro Stage, Einwand-Bibliothek, BANT-Checkliste, Pricing-Regelwerk, Wettbewerber-Battle-Cards',
  'Copilot-Interface entwickelt: React-basierte Web-App mit WebSocket-Verbindung für Echtzeit-Updates auf dem zweiten Bildschirm',
  'Audio-Routing konfiguriert: System-Audio des Calls wird an den Transkriptions-Service weitergeleitet',
  'Latenz-Optimierung sichergestellt: Gesamte Pipeline (Audio → Transkript → Analyse → Anzeige) unter 3 Sekunden',
];

const WF05_SCHRITTE = [
  { title: 'Call startet — Copilot aktiviert sich', text: 'Sobald der Call startet, öffnet der Vertriebler auf dem zweiten Bildschirm den Sales Copilot. Der Copilot lädt automatisch: CRM-Daten (Kontakt, Firma, Stage), Gesprächshistorie aus der Vektordatenbank, den passenden Gesprächsleitfaden und das Pricing-Regelwerk.' },
  { title: 'Live-Teleprompter — Gesprächsführung', text: 'Von der ersten Sekunde an zeigt der Copilot einen strukturierten Leitfaden — angepasst an die Pipeline-Stage. Discovery: Fragen nach Situation, Herausforderungen, bisherigen Lösungsversuchen. Qualification: BANT-Check. Demo/Angebot: Fokus auf die Painpoints aus dem letzten Gespräch. Der Leitfaden ist kein Skript — er ist eine Checkliste, damit kein wichtiger Punkt vergessen wird.' },
  { title: 'Echtzeit-Transkription — Copilot hört mit', text: 'Während das Gespräch läuft, wird der Audio-Stream in Echtzeit transkribiert (Deepgram Streaming, < 500ms). Der Copilot erkennt: die aktuelle Gesprächsphase, Kaufsignale (Wie schnell können wir starten?), BANT-Informationen und aktualisiert die Live-Checkliste automatisch.' },
  { title: 'Einwand erkannt — Antwort erscheint', text: 'Wenn der Kunde einen Einwand äußert, zeigt der Copilot innerhalb von 2–3 Sekunden: Einwand-Kategorie, empfohlene Antwort (spezifisch für diesen Kunden, nicht generisch), eine Alternative und was man nicht sagen sollte. Bei Wettbewerber-Erwähnung erscheint sofort die Battle Card.' },
  { title: 'Pricing-Guidance in Echtzeit', text: 'Wenn das Gespräch zum Preis kommt: passende Pakete basierend auf dem identifizierten Bedarf, Standardpreis und maximaler Rabatt, Kombinations-Rabatte, ein Preisanker-Argument und der Budget-Rahmen, den der Kunde früher angedeutet hat — aus der Vektordatenbank.' },
  { title: 'Kontextuelle Vorschläge', text: 'Der Copilot schlägt proaktiv Dinge vor: Relevante Case Studies aus ähnlichen Kundenprojekten, Details aus früheren Gesprächen die jetzt relevant sind, offene BANT-Punkte mit konkreten Formulierungsvorschlägen.' },
  { title: 'Nach dem Call — automatischer Export', text: 'Wenn das Gespräch endet: Zusammenfassung und Next Steps ins CRM, erkannte Einwände mit Kategorie ins CRM, BANT-Status ins CRM, Pipeline-Stage-Empfehlung, Transkript in Vektordatenbank. Gleichzeitig fließen erfolgreiche Einwandbehandlungen zurück ins Playbook — das System lernt mit jedem Gespräch.' },
];

const WF05_NUTZEN = [
  { rolle: 'Vertrieb',            text: 'Jeder Vertriebler hat einen unsichtbaren Senior-Coach. Einwände souverän behandelt, Pricing sofort beantwortet, kein BANT-Punkt vergessen. Gesprächsqualität vom Individuum entkoppelt.' },
  { rolle: 'Onboarding',          text: 'Neue Vertriebler brauchen nicht mehr 6 Monate für alle Einwände, Preise und Wettbewerber-Argumente. Time-to-Productivity sinkt von Monaten auf Wochen.' },
  { rolle: 'Abschlussquote',      text: 'Der entscheidende Moment ist ein einzelner Einwand — der entweder souverän behandelt wird oder das Gespräch kippt. Der Copilot stellt sicher, dass dieser Moment nie zum Risiko wird.' },
  { rolle: 'Geschäftsführung',    text: 'Qualität hängt nicht mehr an einzelnen Top-Performern. Das gesamte Team wird angehoben. Pricing-Disziplin steigt, weil der Copilot die Rabattregeln kennt.' },
  { rolle: 'Wissenskultur',       text: 'Jeder erfolgreich behandelte Einwand fließt zurück ins Playbook. Die Einwand-Bibliothek und Battle Cards werden kontinuierlich besser — das System lernt mit jedem Gespräch.' },
  { rolle: 'Kundenbeziehung',     text: 'Der Kunde merkt nichts vom Copilot. Er merkt nur, dass der Vertriebler vorbereitet ist, seine Situation versteht und den Prozess souverän führt. Das schafft Vertrauen.' },
];

const WF05_INTERFACE = [
  { bereich: 'Kontakt-Header',        inhalt: 'Name, Firma, Jobtitel, Deal-Stage, Lead Score, letzter Kontakt',                      frequenz: 'Einmal bei Call-Start' },
  { bereich: 'Live-Teleprompter',     inhalt: 'Gesprächsphase, nächste empfohlene Frage, Checkliste (BANT)',                         frequenz: 'Aktualisiert bei Phasenwechsel' },
  { bereich: 'Einwand-Karte',         inhalt: 'Kategorie, empfohlene Antwort, Alternative, Don\'t — erscheint automatisch',          frequenz: '2–3 Sek. nach Einwand' },
  { bereich: 'Pricing-Panel',         inhalt: 'Passende Pakete, Preise, Rabattrahmen, Budget-Signal des Kunden',                     frequenz: 'Bei Preis-Thema eingeblendet' },
  { bereich: 'Battle Card',           inhalt: 'Stärken, Schwächen, Differenzierung, empfohlene Frage bei Wettbewerber-Erwähnung',    frequenz: '2–3 Sek. bei Erkennung' },
  { bereich: 'Kontext-Karten',        inhalt: 'Case Study, früheres Gesprächsdetail, ungestellte Fragen — proaktiv',                 frequenz: 'Kontextuell' },
  { bereich: 'BANT-Tracker',          inhalt: 'Live-Checkliste: Budget / Authority / Need / Timeline — hakt ab wenn erkannt',        frequenz: 'Live-Update' },
  { bereich: 'Kaufsignal-Indikator',  inhalt: 'Ampel: Rot → Gelb → Grün basierend auf Gesprächsverlauf',                           frequenz: 'Kontinuierlich' },
];

const WF05_EINWAENDE = [
  { kategorie: 'Preis',       einwaende: 'Zu teuer / Budget reicht nicht / Wettbewerber ist günstiger',              strategie: 'Kosten der Nicht-Handlung aufzeigen, ROI vorrechnen, Paket anpassen' },
  { kategorie: 'Timing',      einwaende: 'Nicht jetzt / Nächstes Quartal / Erst müssen wir intern...',              strategie: 'Urgency durch Opportunitätskosten, kleinen Einstieg vorschlagen' },
  { kategorie: 'Autorität',   einwaende: 'Muss ich mit dem GF besprechen / Entscheide ich nicht allein',            strategie: 'Champion-Building: Material für internen Pitch + Termin mit Entscheider' },
  { kategorie: 'Bedarf',      einwaende: 'Brauchen wir nicht / Läuft doch gut so / Haben wir schon versucht',       strategie: 'Problem mit konkreten Zahlen spiegeln, bisherige Versuche hinterfragen' },
  { kategorie: 'Vertrauen',   einwaende: 'Kenne ich nicht / Schlechte Erfahrung mit Beratern / Referenzen?',        strategie: 'Case Study zeigen, Pilotprojekt vorschlagen, Risiko-Umkehr' },
  { kategorie: 'Wettbewerber', einwaende: 'Haben Angebot von X / Warum nicht Y? / Was macht ihr anders?',          strategie: 'Battle Card: nicht schlecht reden, durch Systemansatz differenzieren' },
];

/* ─── Revenue Engine WF-06 Data ──────────────────────────── */
const WF06_NODES = [
  { id:  1, type: 'trigger', name: 'Multi-Input Trigger',     desc: 'Briefing, Transkript oder CRM'       },
  { id:  2, type: 'code',    name: 'Input-Typ erkennen',      desc: 'Briefing / Transkript / Deal'        },
  { id:  3, type: 'http',    name: 'CRM: Kundendaten',        desc: 'Firma, Branche, Deal-Stage'          },
  { id:  4, type: 'http',    name: 'Vektor-DB: Gespräche',    desc: 'Bisherige Call-Inhalte'              },
  { id:  5, type: 'http',    name: 'Template-Bibliothek',     desc: 'Deck-Typ + Slide-Master'             },
  { id:  6, type: 'ai',      name: 'Story-Architektur',       desc: 'Narrativer Bogen + Outline'          },
  { id:  7, type: 'ai',      name: 'Slide-Inhalte',           desc: 'Headlines, Body, Speaker Notes'      },
  { id:  8, type: 'ai',      name: 'Visual-Briefings',        desc: 'Bild-Prompts pro Slide'              },
  { id:  9, type: 'http',    name: 'Nano Banana: Bilder',     desc: 'KI-Grafiken generieren'              },
  { id: 10, type: 'http',    name: 'Drive: Assets laden',     desc: 'Bilder + Logo + Template'            },
  { id: 11, type: 'code',    name: 'PPTX generieren',         desc: 'python-pptx: Slides bauen'           },
  { id: 12, type: 'http',    name: 'Drive: Upload',           desc: 'Deck speichern + Link'               },
  { id: 13, type: 'output',  name: 'Slack: Preview',          desc: 'Thumbnail + Freigabe'                },
  { id: 14, type: 'wait',    name: 'Feedback abwarten',       desc: 'Human-in-the-Loop'                   },
  { id: 15, type: 'logic',   name: 'Änderung?',               desc: 'Feedback oder Freigabe?'             },
  { id: 16, type: 'ai',      name: 'Slides anpassen',         desc: 'Feedback → Iteration'                },
  { id: 17, type: 'code',    name: 'PPTX neu bauen',          desc: 'Aktualisierte Version'               },
  { id: 18, type: 'http',    name: 'E-Mail: Deck senden',     desc: 'Präsentation ausliefern'             },
  { id: 19, type: 'crm',     name: 'CRM: Aktivität',          desc: 'Deck-Versand dokumentieren'          },
];

const WF06_IMPACT = [
  { area: 'Erstellungszeit',               before: '4–8 Stunden (Struktur, Texte, Design, Slides formatieren)',                   after: '10–15 Minuten — Input liefern, KI baut, Mensch passt an' },
  { area: 'Qualität der Struktur',         before: 'Abhängig von Erfahrung — oft keine klare Story-Architektur, zu viel Text',    after: 'Problem → Lösung → Beweis → CTA. Jede Slide hat eine klare Funktion' },
  { area: 'Design-Konsistenz',             before: 'Jeder baut anders — unterschiedliche Fonts, Farben, Layouts',                 after: 'Brand-Template programmatisch angewandt — pixel-perfekt, jedes Mal' },
  { area: 'Personalisierung',              before: 'Generisches Pitch-Deck oder stundenlanges Individualisieren',                  after: 'Automatisch personalisiert: Kundenname, Branche, Probleme, Case Studies' },
  { area: 'Gespräch → Präsentation',       before: 'Notizen durchgehen, Punkte extrahieren, manuell in Slides übersetzen',        after: 'Transkript wird automatisch analysiert und in fertiges Deck verwandelt' },
  { area: 'Iterations-Geschwindigkeit',    before: 'Mach Slide 7 kürzer = 15–30 Min. manuelles Umbauen',                         after: 'Sekundenbruchteile — KI passt an, neues PPTX/PDF wird generiert' },
  { area: 'Output-Volumen',                before: '2–3 individuelle Decks pro Woche maximal',                                    after: '2–3 pro Tag realistisch — für jeden Kunden, jedes Thema, jedes Meeting' },
];

const WF06_KERNEFFEKT = 'Präsentationen sind nicht mehr Projekte, die Stunden dauern. Sie werden zu Nebenprodukten von Gesprächen und Briefings. Ein Strategie-Call wird geführt → 15 Minuten später liegt ein fertiges Deck mit den Kernpunkten, Empfehlungen und nächsten Schritten beim Kunden.';

const WF06_TOOLS = [
  { tool: 'n8n',                           zweck: 'Workflow-Orchestrierung, Template-Logik, API-Calls, Trigger',                   typ: 'Self-hosted oder Cloud'      },
  { tool: 'OpenAI API / Anthropic API',    zweck: 'Slide-Struktur erstellen, Texte generieren, Transkripte analysieren, Speaker Notes', typ: 'API-Key erforderlich'    },
  { tool: 'python-pptx (Code-Node)',       zweck: 'Echte .pptx-Dateien generieren — Slides, Shapes, Textboxen, Farben, Layouts',   typ: 'In n8n Code-Node'            },
  { tool: 'Google Slides API',             zweck: 'Alternative: Slides direkt in Google Workspace erstellen und befüllen',          typ: 'OAuth Credentials'           },
  { tool: 'Google Drive',                  zweck: 'Fertige Decks speichern, Sharing-Links generieren, Transkript-Ordner überwachen', typ: 'OAuth oder Service Account'  },
  { tool: 'Vektordatenbank (WF-03)',       zweck: 'Gesprächsinhalte als Basis für Präsentationen abrufen',                         typ: 'Self-hosted oder SaaS'       },
  { tool: 'CRM (Close / HubSpot)',         zweck: 'Deal-Daten, Kundenprofil, Pipeline-Stage — für kontextuell passende Decks',    typ: 'SaaS — API-Zugang'           },
  { tool: 'Notion / Airtable',             zweck: 'Template-Bibliothek, Slide-Master-Definitionen, Brand-Vorgaben',                typ: 'SaaS — API'                  },
  { tool: 'Nano Banana / DALL-E',          zweck: 'Individuelle Grafiken, Diagramme, Illustrationen für Slides generieren',        typ: 'API-Key erforderlich'        },
  { tool: 'Slack',                         zweck: 'Präsentations-Anfragen, Freigabe-Flow, fertige Decks ausliefern',               typ: 'Webhook + Interactive Messages' },
];

const WF06_TOKENS = [
  'OpenAI oder Anthropic API-Key (für Texterstellung und Transkript-Analyse)',
  'Google Workspace OAuth 2.0 (für Drive, Slides, Docs)',
  'CRM API-Zugang (Deal-Daten für Personalisierung)',
  'Vektordatenbank-Credentials (für Gesprächskontext aus WF-03)',
  'Notion/Airtable API-Key (für Template-Bibliothek)',
  'Nano Banana / Replicate API-Key (für Bild-Generierung)',
  'Slack App Token',
  'Python-Umgebung in n8n (python-pptx Bibliothek installiert)',
];

const WF06_VORAUSSETZUNGEN = [
  'Slide-Master-Template erstellt: Brand-Farben, Logo, Font-Definitionen, Layout-Varianten (Titel, Content, Bild+Text, Vergleich, Zitat, CTA) als .pptx Master-Datei',
  'Template-Bibliothek gepflegt: Deck-Typen mit Slide-Reihenfolge (Pitch, Strategie, Onboarding, Reporting, Workshop-Zusammenfassung, Sales Enablement)',
  'Brand-Vorgaben dokumentiert: Primär-/Sekundärfarben (Hex), Fonts, Logo in verschiedenen Größen, Bild-Stil-Referenzen',
  'Gesprächsdaten vorhanden (WF-03 aktiv) — für die automatische Erstellung aus Call-Transkripten',
];

const WF06_SCHRITTE = [
  { title: 'Input liefern — drei Wege', text: 'Weg A: Manuelles Briefing (Slack-Shortcut oder Notion-Formular, 2–3 Minuten). Weg B: Aus Gesprächstranskript — neues Transkript von WF-03 wird erkannt und in Workshop-Zusammenfassung oder Strategie-Deck verwandelt. Weg C: CRM-Deal erreicht Stage Pitch-Termin vereinbart → Deck wird automatisch generiert.' },
  { title: 'Kontext anreichern', text: 'Der Workflow lädt zusätzlichen Kontext: Alle bisherigen Gespräche mit dem Kunden aus der Vektordatenbank, Deal-Stage und Firmenprofil aus dem CRM, den passenden Deck-Typ und die Slide-Reihenfolge aus der Template-Bibliothek.' },
  { title: 'Story-Architektur', text: 'Die KI baut zuerst den narrativen Bogen — nicht einzelne Slides, sondern die Geschichte: Ausgangslage (Problem des Kunden), Kernaussage (Lösung/Empfehlung), Beweis (Zahlen, Case Studies), Call-to-Action (nächster Schritt). Daraus entsteht ein Slide-Outline: jede Slide mit Titel, Funktion und Layout-Vorgabe.' },
  { title: 'Slide-Inhalte schreiben', text: 'Für jede Slide: Headline (max. 8 Wörter, ein Statement — keine Beschreibung), Body-Text (kurz, scanbar, keine Fließtext-Wüsten), Speaker Notes (ausführliche Gesprächshinweise für den Präsentierenden) und Visual-Empfehlung.' },
  { title: 'Visuals generieren', text: 'Wo die Slide ein Bild oder Diagramm braucht: KI-Bilder über Nano Banana im Brand-Stil, einfache Diagramme über python-pptx Shapes und Icons aus der Asset-Bibliothek.' },
  { title: 'PPTX bauen und ausliefern', text: 'python-pptx im n8n Code-Node: Slide-Master-Template laden, jede Slide programmatisch erstellen (Textboxen an richtigen Positionen, Bilder, Shapes), Speaker Notes hinzufügen. Ergebnis: eine echte .pptx-Datei, die in PowerPoint oder Google Slides weiterbearbeitet werden kann.' },
  { title: 'Review, Freigabe und Iteration', text: 'Fertiges Deck landet in Google Drive und wird als Slack-Preview geteilt. Freigabe → sofort versenden. Feedback geben → KI verarbeitet Änderungswünsche (Slide kürzer, andere Case Study, Pricing-Slide hinzufügen) und generiert in Sekunden eine neue Version.' },
];

const WF06_NUTZEN = [
  { rolle: 'Vertrieb',              text: 'Personalisierte Pitch-Decks für jeden Kunden in Minuten statt Stunden. Vor jedem Pitch liegt ein maßgeschneidertes Deck bereit — kein PowerPoint-Öffnen nötig.' },
  { rolle: 'Consultants & Berater', text: 'Nach jedem Workshop oder Strategie-Call liegt eine professionelle Zusammenfassung als Deck beim Kunden — noch am selben Tag. Massiver Wow-Faktor.' },
  { rolle: 'Geschäftsführung',      text: 'Strategie-Präsentationen, Board-Decks, Quartalsberichte — mit konsistentem Design und klarer Struktur, ohne Stunden im PowerPoint-Fegefeuer.' },
  { rolle: 'Marke',                 text: 'Jedes Deck sieht gleich professionell aus — egal wer es erstellt hat. Brand-Konsistenz über alle Präsentationen hinweg, automatisch durchgesetzt.' },
  { rolle: 'Skalierung',            text: 'Ob 3 Pitch-Decks pro Woche oder 15 — der Aufwand pro Deck bleibt bei 10–15 Minuten. Präsentationen werden vom Engpass zum automatisierten Output.' },
  { rolle: 'Kundenbeziehung',       text: 'Schnelle, personalisierte Nachbereitung signalisiert Professionalität. Der Kunde fühlt sich gehört und ernst genommen — und bekommt 15 Minuten nach dem Call schon die Zusammenfassung.' },
];

const WF06_DECK_TYPEN = [
  { typ: 'Kunden-Pitch-Deck',          ausloeser: 'Neuer Pitch-Termin im CRM',                   slides: '10–15', zielgruppe: 'Potenzielle Kunden' },
  { typ: 'Strategie-Präsentation',      ausloeser: 'Nach Strategie-Workshop oder Discovery-Call', slides: '15–25', zielgruppe: 'Bestandskunden, Stakeholder' },
  { typ: 'Workshop-Zusammenfassung',    ausloeser: 'Transkript eines Workshops in Drive',          slides: '10–15', zielgruppe: 'Workshop-Teilnehmer' },
  { typ: 'Ergebnis-Reporting',          ausloeser: 'Monatliches oder quartalsweises Reporting',   slides: '8–12',  zielgruppe: 'Kunden, Geschäftsführung' },
  { typ: 'Onboarding-Deck',             ausloeser: 'Neuer Kunde unterschreibt',                   slides: '10–20', zielgruppe: 'Neuer Kunde + internes Team' },
  { typ: 'Sales Enablement Deck',       ausloeser: 'Neues Produkt oder neuer Wettbewerber',       slides: '12–20', zielgruppe: 'Internes Vertriebsteam' },
  { typ: 'Case Study Deck',             ausloeser: 'Kunde gibt Referenz-Freigabe',                slides: '8–12',  zielgruppe: 'Neue Leads, Website, Events' },
  { typ: 'Investoren-Deck',             ausloeser: 'Fundraising oder Strategie-Review',           slides: '15–20', zielgruppe: 'Investoren, Board' },
];

const WF06_STORY = [
  { slide: 1,  typ: 'Titel',      funktion: 'Aufmerksamkeit + Kontext', headline: 'Planbarer Umsatz für [Firma]' },
  { slide: 2,  typ: 'Problem',    funktion: 'Situation spiegeln',        headline: '80 % Ihres Umsatzes hängt an Empfehlungen' },
  { slide: 3,  typ: 'Implikation', funktion: 'Kosten aufzeigen',         headline: 'Das kostet 240.000 Euro/Jahr an verpasstem Wachstum' },
  { slide: 4,  typ: 'Vision',     funktion: 'Idealbild zeichnen',        headline: 'Stellen Sie sich vor: Ihr Vertrieb ist ein System' },
  { slide: 5,  typ: 'Lösung',     funktion: 'Ansatz vorstellen',         headline: 'Das Umsatzpilot 4-Säulen-System' },
  { slide: 6,  typ: 'Wie',        funktion: 'System erklären',           headline: 'Von Datenarchitektur bis Revenue Engine' },
  { slide: 7,  typ: 'Beweis 1',   funktion: 'Case Study mit Zahlen',     headline: 'Leadhafen: 3x mehr qualifizierte Leads in 90 Tagen' },
  { slide: 8,  typ: 'Beweis 2',   funktion: 'Weitere Referenz',          headline: '18x schnelleres Kampagnen-Setup im Schnitt' },
  { slide: 9,  typ: 'Leistung',   funktion: 'Was geliefert wird',        headline: 'Ihr Paket: Revenue Architecture + Demand Engine' },
  { slide: 10, typ: 'Investment', funktion: 'Pricing transparent',       headline: 'Ihre Investition und der erwartete ROI' },
  { slide: 11, typ: 'CTA',        funktion: 'Klarer nächster Schritt',   headline: 'In 3 Schritten zum planbaren Umsatz' },
  { slide: 12, typ: 'Kontakt',    funktion: 'Abschluss-Slide',           headline: 'Logo, Ansprechpartner, Terminlink' },
];

const WF06_DESIGN_REGELN = [
  { regel: 'Max. 6 Wörter pro Headline',    umsetzung: 'KI kürzt automatisch, Subtitle für Kontext' },
  { regel: 'Max. 3 Bullet Points',           umsetzung: 'Mehr Punkte → auf zwei Slides aufteilen' },
  { regel: 'Kein Fließtext auf Slides',      umsetzung: 'Fließtext → Speaker Notes, Slide bleibt scanbar' },
  { regel: 'Ein Gedanke pro Slide',          umsetzung: 'KI prüft: Hat die Slide eine einzige Kernaussage?' },
  { regel: '40 % Whitespace minimum',        umsetzung: 'Layout-Engine respektiert Freiraum' },
  { regel: 'Visuals > Text',                 umsetzung: 'Wo möglich: Diagramm oder Bild statt Text' },
  { regel: 'Konsistente Ausrichtung',        umsetzung: 'Textboxen auf Grid, keine Pixel-Versätze' },
  { regel: 'Speaker Notes für jede Slide',  umsetzung: '3–5 Sätze: was der Präsentierende sagen soll' },
];

/* ─── Shared Sub-Components ─────────────────────────────── */
function WorkflowCanvas({ nodes }) {
  const scrollRef  = useRef(null);
  const isDragging = useRef(false);
  const startX     = useRef(0);
  const scrollLeft = useRef(0);
  const [hovered, setHovered] = useState(null);

  const CANVAS_H = PAD_Y * 2 + NODE_H;
  const CANVAS_W = PAD_X * 2 + nodes.length * NODE_W + (nodes.length - 1) * GAP;

  const nx = (i) => PAD_X + i * (NODE_W + GAP);
  const ny = ()    => PAD_Y;
  const py = ()    => PAD_Y + NODE_H / 2;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onDown = (e) => { isDragging.current = true; startX.current = e.pageX - el.offsetLeft; scrollLeft.current = el.scrollLeft; el.style.cursor = 'grabbing'; };
    const onUp   = ()  => { isDragging.current = false; el.style.cursor = 'grab'; };
    const onMove = (e) => { if (!isDragging.current) return; e.preventDefault(); const x = e.pageX - el.offsetLeft; el.scrollLeft = scrollLeft.current - (x - startX.current); };
    el.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mousemove', onMove);
    return () => { el.removeEventListener('mousedown', onDown); window.removeEventListener('mouseup', onUp); window.removeEventListener('mousemove', onMove); };
  }, []);

  return (
    <div
      ref={scrollRef}
      className="wf-canvas-scroll"
      style={{ overflowX: 'auto', overflowY: 'hidden', borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)', cursor: 'grab', userSelect: 'none' }}
    >
      <div style={{
        position: 'relative', width: CANVAS_W, height: CANVAS_H,
        background: '#07080a',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.022) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}>
        {/* SVG connections */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: CANVAS_W, height: CANVAS_H, pointerEvents: 'none' }}>
          {nodes.slice(0, -1).map((node, i) => {
            const x1  = nx(i) + NODE_W;
            const x2  = nx(i + 1);
            const y   = py();
            const mx  = (x1 + x2) / 2;
            const col = TYPE_COLOR[node.type] || '#888';
            return (
              <g key={i}>
                <path d={`M ${x1} ${y} C ${mx} ${y}, ${mx} ${y}, ${x2} ${y}`} fill="none" stroke={col + '38'} strokeWidth={1.5} />
                <polygon points={`${x2},${y} ${x2 - 7},${y - 3.5} ${x2 - 7},${y + 3.5}`} fill={col + '70'} />
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node, i) => {
          const col     = TYPE_COLOR[node.type] || '#888';
          const isLogic = node.type === 'logic';
          const isHov   = hovered === i;
          return (
            <div
              key={node.id}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'absolute', left: nx(i), top: ny(), width: NODE_W, height: NODE_H,
                background: '#0d0f12',
                border: `1px solid ${isHov ? col + '55' : 'rgba(255,255,255,0.055)'}`,
                borderRadius: 8, display: 'flex', alignItems: 'stretch', overflow: 'hidden',
                transform: isHov ? 'translateY(-3px)' : 'translateY(0)',
                boxShadow: isHov ? `0 10px 24px ${col}22` : 'none',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
              }}
            >
              <div style={{ width: 3, background: col, flexShrink: 0 }} />
              <div style={{ flex: 1, padding: '9px 10px 9px 9px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0, position: 'relative' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: col, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500 }}>
                  {TYPE_LABEL[node.type] || node.type}
                </span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11.5, fontWeight: 600, color: '#e4e4e7', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {node.name}
                </span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 9.5, color: '#5a5f6b', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {node.desc}
                </span>
                {isLogic && (
                  <div style={{ position: 'absolute', top: 7, right: 7, background: 'rgba(20,184,166,0.12)', border: '1px solid rgba(20,184,166,0.35)', color: '#14b8a6', fontSize: 8, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, padding: '1.5px 5px', borderRadius: 3, letterSpacing: '0.05em' }}>
                    JA
                  </div>
                )}
              </div>
              {i > 0 && (
                <div style={{ position: 'absolute', left: -5, top: '50%', transform: 'translateY(-50%)', width: 9, height: 9, borderRadius: '50%', background: '#0d0f12', border: `1.5px solid ${col}80` }} />
              )}
              {i < nodes.length - 1 && (
                <div style={{ position: 'absolute', right: -5, top: '50%', transform: 'translateY(-50%)', width: 9, height: 9, borderRadius: '50%', background: '#0d0f12', border: `1.5px solid ${col}80` }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NodeLegend() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 18px', marginTop: 12 }}>
      {Object.entries(TYPE_COLOR).map(([type, color]) => (
        <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: color }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#484848', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
            {TYPE_LABEL[type]}
          </span>
        </div>
      ))}
    </div>
  );
}

function ImpactTable({ rows }) {
  return (
    <div style={{ borderRadius: 8, border: '1px solid #1a1a1a', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 1.4fr', background: '#0a0a0a', borderBottom: '1px solid #1a1a1a', padding: '8px 16px' }}>
        {['Bereich', 'Vorher (manuell)', 'Nachher (automatisiert)'].map((h, i) => (
          <span key={i} style={{ fontSize: 10.5, color: i === 2 ? '#22c55e' : '#3a3a3a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{h}</span>
        ))}
      </div>
      {rows.map((row, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 1.4fr', padding: '11px 16px', borderBottom: i < rows.length - 1 ? '1px solid #0f0f0f' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.008)' }}>
          <span style={{ fontSize: 12, color: c.textPrimary, fontWeight: 500 }}>{row.area}</span>
          <span style={{ fontSize: 12, color: '#3e3e3e' }}>{row.before}</span>
          <span style={{ fontSize: 12, color: '#22c55e' }}>{row.after}</span>
        </div>
      ))}
    </div>
  );
}

function KerneffektBox({ text }) {
  return (
    <div style={{ marginTop: 16, padding: '14px 16px', background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.14)', borderLeft: '3px solid #22c55e', borderRadius: '0 8px 8px 0' }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'JetBrains Mono', monospace" }}>Kerneffekt</span>
      <p style={{ fontSize: 13, color: c.textSecondary, margin: '6px 0 0', lineHeight: 1.6 }}>{text}</p>
    </div>
  );
}

function ToolsTable({ tools }) {
  return (
    <div style={{ borderRadius: 8, border: '1px solid #1a1a1a', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr 1fr', background: '#0a0a0a', borderBottom: '1px solid #1a1a1a', padding: '8px 16px' }}>
        {['Tool', 'Zweck', 'Typ'].map((h) => (
          <span key={h} style={{ fontSize: 10.5, color: '#3a3a3a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{h}</span>
        ))}
      </div>
      {tools.map((row, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr 1fr', padding: '10px 16px', borderBottom: i < tools.length - 1 ? '1px solid #0f0f0f' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.008)', alignItems: 'start' }}>
          <span style={{ fontSize: 11, color: '#a78bfa', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>{row.tool}</span>
          <span style={{ fontSize: 12, color: c.textSecondary }}>{row.zweck}</span>
          <span style={{ fontSize: 11, color: '#3e3e3e' }}>{row.typ}</span>
        </div>
      ))}
    </div>
  );
}

function BulletList({ items, color = '#22c55e' }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <span style={{ color, marginTop: 3, flexShrink: 0, fontSize: 12 }}>&#9679;</span>
          <span style={{ fontSize: 13, color: c.textSecondary, lineHeight: 1.55 }}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SimpleExplanation({ steps }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#22c55e', fontWeight: 700 }}>{i + 1}</span>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary, marginBottom: 3 }}>{step.title}</div>
            <div style={{ fontSize: 13, color: c.textSecondary, lineHeight: 1.6 }}>{step.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function NutzenList({ items }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 14px', background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 8 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, color: '#22c55e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', paddingTop: 2, minWidth: 110, flexShrink: 0 }}>{item.rolle}</span>
          <span style={{ fontSize: 13, color: c.textSecondary, lineHeight: 1.55 }}>{item.text}</span>
        </div>
      ))}
    </div>
  );
}

function SubHeading({ children }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 600, color: '#333', textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>
      {children}
    </div>
  );
}

/* ─── Expander ─────────────────────────────────────────────── */
function Expander({ label, title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderRadius: 8, border: '1px solid #1a1a1a', marginTop: 20, overflow: 'hidden', background: '#0a0a0a' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', padding: '14px 20px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        {label && <span style={{ fontSize: 10, fontWeight: 600, color: '#666', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</span>}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: open ? '#fff' : '#999', transition: 'color 0.2s' }}>{title}</span>
          <span style={{ color: '#555', fontSize: 11, flexShrink: 0, marginLeft: 12, transition: 'transform 0.3s', display: 'inline-block', transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}>&#9654;</span>
        </div>
      </button>
      <div style={{ maxHeight: open ? '10000px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
        <div style={{ padding: '20px 20px 24px', borderTop: '1px solid #1a1a1a' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ─── Workflow Map ──────────────────────────────────────────── */
const RG_MAP_CARDS = [
  { id: 'rg-wf-01', num: 'WF-01', short: 'Lead Enrichment', metric: '30 Min \u2192 1 Min' },
  { id: 'rg-wf-02', num: 'WF-02', short: 'Lead Scoring', metric: 'Bauchgef\u00fchl \u2192 Score' },
  { id: 'rg-wf-03', num: 'WF-03', short: 'Call Intel', metric: '15 Min \u2192 0 Min' },
  { id: 'rg-wf-04', num: 'WF-04', short: 'Follow-up', metric: '40% \u2192 100%' },
  { id: 'rg-wf-05', num: 'WF-05', short: 'Sales Copilot', metric: 'Spontan \u2192 KI' },
  { id: 'rg-wf-06', num: 'WF-06', short: 'Pr\u00e4sentation', metric: '8 Std \u2192 15 Min' },
];

function WorkflowMap({ cards, summary }) {
  return (
    <div style={{ background: '#0a0a0a', borderRadius: 12, border: '1px solid #1a1a1a', padding: 'clamp(18px,3vw,28px)', marginBottom: 48 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 148px), 1fr))', gap: 10, marginBottom: 16 }}>
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => document.getElementById(card.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            style={{ background: '#0d0f12', border: '1px solid #1a1a1a', borderRadius: 8, padding: 12, cursor: 'pointer', transition: 'border-color 0.2s, transform 0.15s' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#22c55e'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#22c55e', fontWeight: 700, letterSpacing: '0.06em', marginBottom: 6 }}>{card.num}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#e5e5e5', marginBottom: 8, lineHeight: 1.3 }}>{card.short}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#22c55e', lineHeight: 1.3 }}>{card.metric}</div>
          </div>
        ))}
      </div>
      {summary && (
        <div style={{ borderTop: '1px solid #141414', paddingTop: 12, fontSize: 11, color: '#333', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.03em' }}>
          {summary}
        </div>
      )}
    </div>
  );
}

/* ─── WF-01 Specific: Waterfall Visualisierung ───────────── */
function WaterfallDiagram({ title, steps, finalLabel, color }) {
  return (
    <div style={{ flex: 1, minWidth: 220 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#333', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {steps.map((step, i) => (
          <div key={i}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', background: '#0a0a0a', border: '1px solid #161616', borderRadius: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: c.textSecondary, flex: 1 }}>{step}</span>
              <span style={{ fontSize: 10, color: '#22c55e', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', padding: '1px 6px', borderRadius: 3 }}>JA ✓</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 12px' }}>
                <div style={{ width: 6, flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: 1, height: 16, background: '#222' }} />
                </div>
                <span style={{ fontSize: 10, color: '#2a2a2a', fontFamily: "'JetBrains Mono', monospace" }}>NEIN</span>
              </div>
            )}
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 12px' }}>
          <div style={{ width: 6, flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 1, height: 16, background: '#222' }} />
          </div>
        </div>
        <div style={{ padding: '8px 12px', background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 6 }}>
          <span style={{ fontSize: 11, color: '#3e3e3e', fontFamily: "'JetBrains Mono', monospace" }}>{finalLabel}</span>
        </div>
      </div>
    </div>
  );
}

function TrefferquotenTable({ rows }) {
  return (
    <div style={{ borderRadius: 8, border: '1px solid #1a1a1a', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', background: '#0a0a0a', borderBottom: '1px solid #1a1a1a', padding: '8px 16px' }}>
        {['Ansatz', 'E-Mail-Trefferquote', 'Telefon-Trefferquote'].map((h, i) => (
          <span key={i} style={{ fontSize: 10.5, color: i > 0 ? '#22c55e' : '#3a3a3a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{h}</span>
        ))}
      </div>
      {rows.map((row, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '11px 16px', borderBottom: i < rows.length - 1 ? '1px solid #0f0f0f' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.008)' }}>
          <span style={{ fontSize: 12, color: c.textPrimary, fontWeight: 500 }}>{row.ansatz}</span>
          <span style={{ fontSize: 12, color: i === 1 ? '#22c55e' : '#3e3e3e', fontWeight: i === 1 ? 600 : 400 }}>{row.email}</span>
          <span style={{ fontSize: 12, color: i === 1 ? '#22c55e' : '#3e3e3e', fontWeight: i === 1 ? 600 : 400 }}>{row.telefon}</span>
        </div>
      ))}
    </div>
  );
}

function LeadStrukturTable({ rows }) {
  return (
    <div style={{ borderRadius: 8, border: '1px solid #1a1a1a', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.4fr 1.4fr', background: '#0a0a0a', borderBottom: '1px solid #1a1a1a', padding: '8px 16px' }}>
        {['Feld', 'Quelle', 'Beispiel'].map((h) => (
          <span key={h} style={{ fontSize: 10.5, color: '#3a3a3a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{h}</span>
        ))}
      </div>
      {rows.map((row, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.4fr 1.4fr', padding: '9px 16px', borderBottom: i < rows.length - 1 ? '1px solid #0f0f0f' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.008)' }}>
          <span style={{ fontSize: 11.5, color: '#a78bfa', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>{row.feld}</span>
          <span style={{ fontSize: 12, color: '#3e3e3e' }}>{row.quelle}</span>
          <span style={{ fontSize: 12, color: c.textSecondary }}>{row.beispiel}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── WF-02 Specific: Scoring Tables ────────────────────── */
function SignalTable({ rows, columns, getColor }) {
  return (
    <div style={{ borderRadius: 8, border: '1px solid #1a1a1a', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: columns.map(c => c.width).join(' '), background: '#0a0a0a', borderBottom: '1px solid #1a1a1a', padding: '8px 16px' }}>
        {columns.map((col, i) => (
          <span key={i} style={{ fontSize: 10.5, color: col.highlight ? '#22c55e' : '#3a3a3a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{col.label}</span>
        ))}
      </div>
      {rows.map((row, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: columns.map(c => c.width).join(' '), padding: '10px 16px', borderBottom: i < rows.length - 1 ? '1px solid #0f0f0f' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.008)', alignItems: 'start' }}>
          {columns.map((col, j) => {
            const val = row[col.key];
            const color = getColor ? getColor(col.key, val, row) : (j === 0 ? c.textSecondary : j === 1 ? '#22c55e' : '#3e3e3e');
            const mono = col.mono;
            return (
              <span key={j} style={{ fontSize: mono ? 11 : 12, color, fontWeight: j === 1 ? 700 : 400, fontFamily: mono ? "'JetBrains Mono', monospace" : 'inherit', lineHeight: 1.5 }}>{val}</span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function SchwellenwerteTable({ rows }) {
  return (
    <div style={{ borderRadius: 8, border: '1px solid #1a1a1a', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '100px 80px 1fr', background: '#0a0a0a', borderBottom: '1px solid #1a1a1a', padding: '8px 16px' }}>
        {['Segment', 'Score', 'Aktion'].map((h, i) => (
          <span key={i} style={{ fontSize: 10.5, color: '#3a3a3a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{h}</span>
        ))}
      </div>
      {rows.map((row, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 80px 1fr', padding: '11px 16px', borderBottom: i < rows.length - 1 ? '1px solid #0f0f0f' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.008)', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: row.farbe, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{row.segment}</span>
          <span style={{ fontSize: 13, color: row.farbe, fontWeight: 700 }}>{row.score}</span>
          <span style={{ fontSize: 12, color: c.textSecondary }}>{row.aktion}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Main Export ────────────────────────────────────────── */
export function RevenueEngineWorkflows() {
  useEffect(() => {
    const id = 'jb-mono-font';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id   = id;
    link.rel  = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap';
    document.head.appendChild(link);
  }, []);

  return (
    <>
      <style>{`
        .rev-canvas-scroll::-webkit-scrollbar { height: 4px; }
        .rev-canvas-scroll::-webkit-scrollbar-track { background: transparent; }
        .rev-canvas-scroll::-webkit-scrollbar-thumb { background: rgba(34,197,94,0.18); border-radius: 2px; }
      `}</style>

      {/* ── Engine Header ── */}
      <Reveal>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 14px', borderRadius: 100, border: '1px solid rgba(236,72,153,0.22)', background: 'rgba(236,72,153,0.06)', marginBottom: 32 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ec4899', display: 'inline-block', boxShadow: '0 0 6px #ec4899' }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#ec4899', textTransform: 'uppercase', letterSpacing: '0.09em' }}>Revenue Generation Engine</span>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: c.white, fontWeight: 700, margin: '0 0 12px', lineHeight: 1.25 }}>
          Die Automatisierungs-Workflows
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p style={{ fontSize: 15, color: c.textSecondary, margin: '0 0 32px', lineHeight: 1.65, maxWidth: 580 }}>
          Die Revenue Engine f&#252;hrt qualifizierte Leads durch die Pipeline bis zum Abschluss, pflegt Bestandskunden und generiert Upsell-Potenzial. Jeder Workflow deckt einen kritischen Schritt ab &#8212; von der Lead-Anreicherung bis zur Retention.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <WorkflowMap
          cards={RG_MAP_CARDS}
          summary="6 Workflows · Vom Lead zum Abschluss · vollautomatisiert"
        />
      </Reveal>

      {/* ══════════════════════════════════════════════════════
          WORKFLOW 01
      ══════════════════════════════════════════════════════ */}

      <div id="rg-wf-01" style={{ scrollMarginTop: 80 }}>
        <Reveal delay={0.12}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#363636', padding: '3px 8px', borderRadius: 4, border: '1px solid #1c1c1c', letterSpacing: '0.06em' }}>
              WF-01
            </span>
            <h3 style={{ fontSize: 'clamp(16px, 2.2vw, 20px)', color: c.textPrimary, fontWeight: 700, margin: 0 }}>
              Lead-Recherche &amp; Enrichment
            </h3>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <p style={{ fontSize: 13.5, color: '#4a4a4a', margin: '0 0 20px', lineHeight: 1.6 }}>
            Automatische Firmenrecherche, Entscheider-Identifikation via LinkedIn, Waterfall-E-Mail- und Telefon-Enrichment &#252;ber mehrere Anbieter und Bad-Data-Rettung aus dem CRM &#8212; fertig angereicherte Leads in der zentralen Datenbank.
          </p>
        </Reveal>

        {/* Auswirkungen */}
        <Reveal delay={0.16}>
          <div style={{ marginTop: 20 }}>
            <SubHeading>Auswirkungen des Workflows</SubHeading>
            <ImpactTable rows={WF01_IMPACT} />
            <KerneffektBox text={WF01_KERNEFFEKT} />
          </div>
        </Reveal>

        {/* Nutzen */}
        <Reveal delay={0.18}>
          <div style={{ marginTop: 32 }}>
            <SubHeading>Nutzen nach Zielgruppe</SubHeading>
            <NutzenList items={WF01_NUTZEN} />
          </div>
        </Reveal>

        {/* Technische Details Expander */}
        <Reveal delay={0.2}>
          <Expander label="Technische Details" title="Workflow-Schritte &amp; Automatisierungs-Flow">
            <SubHeading>Workflow-Diagramm</SubHeading>
            <WorkflowCanvas nodes={WF01_NODES} />
            <NodeLegend />

            <div style={{ marginTop: 32 }}>
              <SubHeading>Anforderungen &#8212; Systeme &amp; Tools</SubHeading>
              <ToolsTable tools={WF01_TOOLS} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 24, marginTop: 24 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>API-Tokens &amp; Zug&#228;nge</div>
                  <BulletList items={WF01_TOKENS} color='#3b82f6' />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Voraussetzungen</div>
                  <BulletList items={WF01_VORAUSSETZUNGEN} color='#f59e0b' />
                </div>
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <SubHeading>Wie es funktioniert</SubHeading>
              <p style={{ fontSize: 13, color: '#3a3a3a', margin: '0 0 20px', lineHeight: 1.6 }}>
                Stell dir vor, du h&#228;ttest einen Recherche-Spezialisten, der jedes Unternehmen auf deiner Liste auseinandernimmt &#8212; und f&#252;r jedes den richtigen Ansprechpartner mit verifizierter E-Mail und Telefonnummer findet. Und der nebenbei auch noch die Leads rettet, die dein Marketing teuer eingekauft hat, aber bei denen die Daten unvollst&#228;ndig sind.
              </p>
              <SimpleExplanation steps={WF01_SCHRITTE} />
            </div>

            <div style={{ marginTop: 32 }}>
              <SubHeading>Waterfall Enrichment &#8212; Prinzip</SubHeading>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
                <WaterfallDiagram
                  title="E-Mail-Waterfall"
                  steps={['AnyMail Finder', 'Hunter.io', 'Apollo', 'Dropcontact']}
                  finalLabel='Keine verifizierte E-Mail'
                  color="#3b82f6"
                />
                <WaterfallDiagram
                  title="Telefon-Waterfall"
                  steps={['Apollo', 'Lusha', 'Kaspr', 'RocketReach']}
                  finalLabel='Keine Telefonnummer'
                  color="#ec4899"
                />
              </div>
              <TrefferquotenTable rows={WF01_TREFFERQUOTEN} />
            </div>

            <div style={{ marginTop: 32 }}>
              <SubHeading>Lead-Datenstruktur (Airtable / CRM)</SubHeading>
              <LeadStrukturTable rows={WF01_LEAD_STRUKTUR} />
            </div>
          </Expander>
        </Reveal>
      </div>

      {/* ══════════════════════════════════════════════════════
          WORKFLOW 02
      ══════════════════════════════════════════════════════ */}

      <div id="rg-wf-02" style={{ scrollMarginTop: 80 }}>
        <Reveal>
          <div style={{ margin: '64px 0 0', borderTop: '1px solid #111', paddingTop: 64 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#363636', padding: '3px 8px', borderRadius: 4, border: '1px solid #1c1c1c', letterSpacing: '0.06em' }}>
                WF-02
              </span>
              <h3 style={{ fontSize: 'clamp(16px, 2.2vw, 20px)', color: c.textPrimary, fontWeight: 700, margin: 0 }}>
                Lead Scoring &amp; Priorisierung
              </h3>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <p style={{ fontSize: 13.5, color: '#4a4a4a', margin: '0 0 20px', lineHeight: 1.6 }}>
            Echtzeit-Scoring aus Website-Tracking, Cookie-Daten und E-Mail-Engagement &#8212; mit Decay-Faktor, KI-Intent-Analyse, automatischer Hot/Warm/Cold-Segmentierung und Sofort-Alerts an den Vertrieb.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ marginTop: 20 }}>
            <SubHeading>Auswirkungen des Workflows</SubHeading>
            <ImpactTable rows={WF02_IMPACT} />
            <KerneffektBox text={WF02_KERNEFFEKT} />
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div style={{ marginTop: 32 }}>
            <SubHeading>Nutzen nach Zielgruppe</SubHeading>
            <NutzenList items={WF02_NUTZEN} />
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <Expander label="Technische Details" title="Workflow-Schritte &amp; Automatisierungs-Flow">
            <SubHeading>Workflow-Diagramm</SubHeading>
            <WorkflowCanvas nodes={WF02_NODES} />
            <NodeLegend />

            <div style={{ marginTop: 32 }}>
              <SubHeading>Anforderungen &#8212; Systeme &amp; Tools</SubHeading>
              <ToolsTable tools={WF02_TOOLS} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 24, marginTop: 24 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>API-Tokens &amp; Zug&#228;nge</div>
                  <BulletList items={WF02_TOKENS} color='#3b82f6' />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Voraussetzungen</div>
                  <BulletList items={WF02_VORAUSSETZUNGEN} color='#f59e0b' />
                </div>
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <SubHeading>Wie es funktioniert</SubHeading>
              <p style={{ fontSize: 13, color: '#3a3a3a', margin: '0 0 20px', lineHeight: 1.6 }}>
                Stell dir vor, du k&#246;nntest bei jedem Lead in Echtzeit sehen, wie interessiert er wirklich ist &#8212; nicht basierend auf dem, was er sagt, sondern auf dem, was er tut.
              </p>
              <SimpleExplanation steps={WF02_SCHRITTE} />
            </div>

            <div style={{ marginTop: 32 }}>
              <SubHeading>Scoring-Modell</SubHeading>
              <div style={{ marginBottom: 6, fontSize: 11, color: '#2a2a2a', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                Profil-Score (statisch)
              </div>
              <SignalTable
                rows={WF02_PROFIL_SCORE}
                columns={[
                  { label: 'Signal', key: 'signal', width: '2fr' },
                  { label: 'Punkte', key: 'punkte', width: '80px', mono: true },
                  { label: 'Begr&#252;ndung', key: 'begruendung', width: '2fr' },
                ]}
                getColor={(key, val) => key === 'signal' ? c.textSecondary : key === 'punkte' ? '#22c55e' : '#3e3e3e'}
              />
              <div style={{ marginTop: 24, marginBottom: 6, fontSize: 11, color: '#2a2a2a', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                Engagement-Score (dynamisch &#8212; ver&#228;ndert sich in Echtzeit)
              </div>
              <SignalTable
                rows={WF02_ENGAGEMENT_SCORE}
                columns={[
                  { label: 'Signal', key: 'signal', width: '2fr' },
                  { label: 'Punkte', key: 'punkte', width: '80px', mono: true },
                  { label: 'Begr&#252;ndung', key: 'begruendung', width: '2fr' },
                ]}
                getColor={(key, val) => {
                  if (key === 'punkte') {
                    const n = parseInt(val);
                    if (n >= 20) return '#22c55e';
                    if (n >= 10) return '#f59e0b';
                    return '#3b82f6';
                  }
                  return key === 'signal' ? c.textSecondary : '#3e3e3e';
                }}
              />
              <div style={{ marginTop: 24, marginBottom: 6, fontSize: 11, color: '#2a2a2a', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                Decay-Faktor (zeitbasiert)
              </div>
              <SignalTable
                rows={WF02_DECAY}
                columns={[
                  { label: 'Zeitraum', key: 'zeitraum', width: '1.5fr' },
                  { label: 'Abzug', key: 'abzug', width: '120px', mono: true },
                  { label: 'Effekt', key: 'effekt', width: '2fr' },
                ]}
                getColor={(key) => key === 'abzug' ? '#ef4444' : key === 'zeitraum' ? c.textSecondary : '#3e3e3e'}
              />
              <div style={{ marginTop: 24, marginBottom: 6, fontSize: 11, color: '#2a2a2a', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                Schwellenwerte &amp; Segmente
              </div>
              <SchwellenwerteTable rows={WF02_SCHWELLENWERTE} />
            </div>
          </Expander>
        </Reveal>
      </div>

      {/* ══════════════════════════════════════════════════════
          WORKFLOW 03
      ══════════════════════════════════════════════════════ */}

      <div id="rg-wf-03" style={{ scrollMarginTop: 80 }}>
        <Reveal>
          <div style={{ margin: '64px 0 0', borderTop: '1px solid #111', paddingTop: 64 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#363636', padding: '3px 8px', borderRadius: 4, border: '1px solid #1c1c1c', letterSpacing: '0.06em' }}>
                WF-03
              </span>
              <h3 style={{ fontSize: 'clamp(16px, 2.2vw, 20px)', color: c.textPrimary, fontWeight: 700, margin: 0 }}>
                Call-Recording, Transkription &amp; Gespr&#228;chsintelligenz
              </h3>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <p style={{ fontSize: 13.5, color: '#4a4a4a', margin: '0 0 20px', lineHeight: 1.6 }}>
            Automatische Transkription mit Sprecher-Erkennung, KI-Analyse (Zusammenfassung, Einw&#228;nde, Sentiment, Pipeline-Empfehlung), CRM-Update, Vektordatenbank-Speicherung f&#252;r semantische Suche, automatische Vorbereitungsdokumente und w&#246;chentliche Trend-Reports.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ marginTop: 20 }}>
            <SubHeading>Auswirkungen des Workflows</SubHeading>
            <ImpactTable rows={WF03_IMPACT} />
            <KerneffektBox text={WF03_KERNEFFEKT} />
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div style={{ marginTop: 32 }}>
            <SubHeading>Nutzen nach Zielgruppe</SubHeading>
            <NutzenList items={WF03_NUTZEN} />
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <Expander label="Technische Details" title="Workflow-Schritte &amp; Automatisierungs-Flow">
            <SubHeading>Workflow-Diagramm</SubHeading>
            <WorkflowCanvas nodes={WF03_NODES} />
            <NodeLegend />

            <div style={{ marginTop: 32 }}>
              <SubHeading>Anforderungen &#8212; Systeme &amp; Tools</SubHeading>
              <ToolsTable tools={WF03_TOOLS} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 24, marginTop: 24 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>API-Tokens &amp; Zug&#228;nge</div>
                  <BulletList items={WF03_TOKENS} color='#3b82f6' />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Voraussetzungen</div>
                  <BulletList items={WF03_VORAUSSETZUNGEN} color='#f59e0b' />
                </div>
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <SubHeading>Wie es funktioniert</SubHeading>
              <p style={{ fontSize: 13, color: '#3a3a3a', margin: '0 0 20px', lineHeight: 1.6 }}>
                Stell dir vor, nach jedem Kundenger&#228;ch w&#252;rde ein unsichtbarer Assistent alles aufbereiten &#8212; und gleichzeitig aus hunderten Gespr&#228;chen Muster erkennen, die kein Mensch sehen w&#252;rde.
              </p>
              <SimpleExplanation steps={WF03_SCHRITTE} />
            </div>

            <div style={{ marginTop: 32 }}>
              <SubHeading>Pipeline-Stage-Logik (automatisch nach Gespr&#228;chsinhalt)</SubHeading>
              <div style={{ borderRadius: 8, border: '1px solid #1a1a1a', overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr', background: '#0a0a0a', borderBottom: '1px solid #1a1a1a', padding: '8px 16px' }}>
                  {[
                    { label: 'Erkannter Inhalt', color: '#3a3a3a' },
                    { label: 'Pipeline-Update', color: '#a78bfa' },
                    { label: 'CRM-Aktion', color: '#3a3a3a' },
                  ].map((h) => (
                    <span key={h.label} style={{ fontSize: 10.5, color: h.color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{h.label}</span>
                  ))}
                </div>
                {WF03_PIPELINE_LOGIK.map((row, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr', padding: '10px 16px', borderBottom: i < WF03_PIPELINE_LOGIK.length - 1 ? '1px solid #0f0f0f' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.008)', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 12, color: c.textSecondary, lineHeight: 1.4 }}>{row.inhalt}</span>
                    <span style={{ fontSize: 11, color: '#a78bfa', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{row.update}</span>
                    <span style={{ fontSize: 12, color: '#3e3e3e' }}>{row.aktion}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <SubHeading>Vektordatenbank &#8212; Anwendungsf&#228;lle</SubHeading>
              <div style={{ marginBottom: 16, padding: '14px 16px', background: 'rgba(167,139,250,0.05)', border: '1px solid rgba(167,139,250,0.12)', borderLeft: '3px solid #a78bfa', borderRadius: '0 8px 8px 0' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'JetBrains Mono', monospace" }}>Wie die Suche funktioniert</span>
                <p style={{ fontSize: 13, color: c.textSecondary, margin: '6px 0 0', lineHeight: 1.6 }}>
                  Transkript &#8594; Chunks (500&#8211;800 Token) &#8594; Embeddings (text-embedding-3-small) &#8594; Vektordatenbank mit Metadaten (Deal-ID, Firma, Datum, Stage, Sprecher). Semantische Suche findet relevante Passagen auch ohne exakten Wortlaut.
                </p>
              </div>
              <div style={{ borderRadius: 8, border: '1px solid #1a1a1a', overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr', background: '#0a0a0a', borderBottom: '1px solid #1a1a1a', padding: '8px 16px' }}>
                  {['Abfrage', 'Nutzer', 'Zweck'].map((h) => (
                    <span key={h} style={{ fontSize: 10.5, color: '#3a3a3a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{h}</span>
                  ))}
                </div>
                {WF03_VEKTOR_ABFRAGEN.map((row, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr', padding: '10px 16px', borderBottom: i < WF03_VEKTOR_ABFRAGEN.length - 1 ? '1px solid #0f0f0f' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.008)', alignItems: 'start' }}>
                    <span style={{ fontSize: 12, color: c.textSecondary, fontStyle: 'italic', lineHeight: 1.4 }}>{row.abfrage}</span>
                    <span style={{ fontSize: 11, color: '#22c55e', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>{row.nutzer}</span>
                    <span style={{ fontSize: 12, color: '#3e3e3e' }}>{row.zweck}</span>
                  </div>
                ))}
              </div>
            </div>
          </Expander>
        </Reveal>
      </div>

      {/* ══════════════════════════════════════════════════════
          WORKFLOW 04
      ══════════════════════════════════════════════════════ */}

      <div id="rg-wf-04" style={{ scrollMarginTop: 80 }}>
        <Reveal>
          <div style={{ margin: '64px 0 0', borderTop: '1px solid #111', paddingTop: 64 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#363636', padding: '3px 8px', borderRadius: 4, border: '1px solid #1c1c1c', letterSpacing: '0.06em' }}>
                WF-04
              </span>
              <h3 style={{ fontSize: 'clamp(16px, 2.2vw, 20px)', color: c.textPrimary, fontWeight: 700, margin: 0 }}>
                Follow-up-Automatisierung
              </h3>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <p style={{ fontSize: 13.5, color: '#4a4a4a', margin: '0 0 20px', lineHeight: 1.6 }}>
            Mehrstufige, hochpersonalisierte Nachfass-Sequenzen nach Erstgespr&#228;ch, Angebot, Stille-Phase oder Tracking-Event &#8212; Multi-Channel &#252;ber E-Mail, LinkedIn und Telefon mit Echtzeit-Verhaltenssteuerung.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ marginTop: 20 }}>
            <SubHeading>Auswirkungen des Workflows</SubHeading>
            <ImpactTable rows={WF04_IMPACT} />
            <KerneffektBox text={WF04_KERNEFFEKT} />
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div style={{ marginTop: 32 }}>
            <SubHeading>Nutzen nach Zielgruppe</SubHeading>
            <NutzenList items={WF04_NUTZEN} />
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <Expander label="Technische Details" title="Workflow-Schritte &amp; Automatisierungs-Flow">
            <SubHeading>Workflow-Diagramm</SubHeading>
            <WorkflowCanvas nodes={WF04_NODES} />
            <NodeLegend />

            <div style={{ marginTop: 32 }}>
              <SubHeading>Anforderungen &#8212; Systeme &amp; Tools</SubHeading>
              <ToolsTable tools={WF04_TOOLS} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 24, marginTop: 24 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>API-Tokens &amp; Zug&#228;nge</div>
                  <BulletList items={WF04_TOKENS} color='#3b82f6' />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Voraussetzungen</div>
                  <BulletList items={WF04_VORAUSSETZUNGEN} color='#f59e0b' />
                </div>
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <SubHeading>Wie es funktioniert</SubHeading>
              <p style={{ fontSize: 13, color: '#3a3a3a', margin: '0 0 20px', lineHeight: 1.6 }}>
                Stell dir vor, du h&#228;ttest f&#252;r jeden einzelnen Lead einen pers&#246;nlichen Assistenten, der genau wei&#223;, wann und wie er nachfassen muss &#8212; und der jede Nachricht so schreibt, als h&#228;tte er beim letzten Gespr&#228;ch selbst mit am Tisch gesessen.
              </p>
              <SimpleExplanation steps={WF04_SCHRITTE} />
            </div>

            <div style={{ marginTop: 32 }}>
              <SubHeading>Sequenz-&#220;bersicht (5 Trigger-Typen)</SubHeading>
              <div style={{ borderRadius: 8, border: '1px solid #1a1a1a', overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '32px 1fr 1.6fr 48px 80px 1fr 1fr', background: '#0a0a0a', borderBottom: '1px solid #1a1a1a', padding: '8px 14px', gap: 8 }}>
                  {['', 'Sequenz', 'Ausl&#246;ser', 'Stufen', 'Dauer', 'Kan&#228;le', 'Ziel'].map((h, i) => (
                    <span key={i} style={{ fontSize: 10.5, color: '#3a3a3a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{h}</span>
                  ))}
                </div>
                {WF04_SEQUENZEN.map((row, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '32px 1fr 1.6fr 48px 80px 1fr 1fr', padding: '11px 14px', gap: 8, borderBottom: i < WF04_SEQUENZEN.length - 1 ? '1px solid #0f0f0f' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.008)', alignItems: 'center' }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: row.farbe, fontWeight: 700, background: `${row.farbe}12`, border: `1px solid ${row.farbe}30`, borderRadius: 4, padding: '2px 5px', textAlign: 'center' }}>{row.seq}</span>
                    <span style={{ fontSize: 12, color: row.farbe, fontWeight: 600 }}>{row.label}</span>
                    <span style={{ fontSize: 12, color: c.textSecondary }}>{row.ausloeser}</span>
                    <span style={{ fontSize: 12, color: '#22c55e', fontWeight: 700, textAlign: 'center' }}>{row.stufen || '&#8212;'}</span>
                    <span style={{ fontSize: 11, color: '#3e3e3e', fontFamily: "'JetBrains Mono', monospace" }}>{row.dauer}</span>
                    <span style={{ fontSize: 12, color: '#3e3e3e' }}>{row.kanaele}</span>
                    <span style={{ fontSize: 12, color: c.textSecondary }}>{row.ziel}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <SubHeading>Verhaltens-Verzweigungen &#8212; Reaktion auf Lead-Verhalten</SubHeading>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {WF04_VERHALTEN.map((row, i) => (
                  <div key={i} style={{ display: 'flex', gap: 0, borderRadius: 6, overflow: 'hidden', border: '1px solid #161616' }}>
                    <div style={{ width: 3, background: row.farbe, flexShrink: 0 }} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12, padding: '10px 14px', background: '#0a0a0a', flex: 1, alignItems: 'center' }}>
                      <span style={{ fontSize: 11.5, color: row.farbe, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.35 }}>{row.trigger}</span>
                      <span style={{ fontSize: 12, color: '#3e3e3e', lineHeight: 1.5 }}>{row.pfad}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Expander>
        </Reveal>
      </div>

      {/* ══════════════════════════════════════════════════════
          WORKFLOW 05
      ══════════════════════════════════════════════════════ */}

      <div id="rg-wf-05" style={{ scrollMarginTop: 80 }}>
        <Reveal>
          <div style={{ margin: '64px 0 0', borderTop: '1px solid #111', paddingTop: 64 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#363636', padding: '3px 8px', borderRadius: 4, border: '1px solid #1c1c1c', letterSpacing: '0.06em' }}>
                WF-05
              </span>
              <h3 style={{ fontSize: 'clamp(16px, 2.2vw, 20px)', color: c.textPrimary, fontWeight: 700, margin: 0 }}>
                KI-Sales-Copilot &amp; Live-Teleprompter
              </h3>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <p style={{ fontSize: 13.5, color: '#4a4a4a', margin: '0 0 20px', lineHeight: 1.6 }}>
            Echtzeit-Unterst&#252;tzung w&#228;hrend Verkaufsgespr&#228;chen: Live-Teleprompter mit Gespr&#228;chsleitfaden, automatische Einwandbehandlung, Pricing-Guidance, Battle Cards bei Wettbewerber-Erw&#228;hnung und BANT-Tracking &#8212; alles in 2&#8211;3 Sekunden auf dem Bildschirm.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ marginTop: 20 }}>
            <SubHeading>Auswirkungen des Workflows</SubHeading>
            <ImpactTable rows={WF05_IMPACT} />
            <KerneffektBox text={WF05_KERNEFFEKT} />
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div style={{ marginTop: 32 }}>
            <SubHeading>Nutzen nach Zielgruppe</SubHeading>
            <NutzenList items={WF05_NUTZEN} />
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <Expander label="Technische Details" title="Workflow-Schritte &amp; Automatisierungs-Flow">
            <SubHeading>Workflow-Diagramm</SubHeading>
            <WorkflowCanvas nodes={WF05_NODES} />
            <NodeLegend />

            <div style={{ marginTop: 32 }}>
              <SubHeading>Anforderungen &#8212; Systeme &amp; Tools</SubHeading>
              <ToolsTable tools={WF05_TOOLS} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 24, marginTop: 24 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>API-Tokens &amp; Zug&#228;nge</div>
                  <BulletList items={WF05_TOKENS} color='#3b82f6' />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Voraussetzungen</div>
                  <BulletList items={WF05_VORAUSSETZUNGEN} color='#f59e0b' />
                </div>
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <SubHeading>Wie es funktioniert</SubHeading>
              <p style={{ fontSize: 13, color: '#3a3a3a', margin: '0 0 20px', lineHeight: 1.6 }}>
                Stell dir vor, du h&#228;ttest w&#228;hrend jedes Verkaufsgespr&#228;chs einen erfahrenen Sales-Coach neben dir, der dir in Echtzeit die besten Antworten hochh&#228;lt &#8212; ohne dass der Kunde etwas davon merkt.
              </p>
              <SimpleExplanation steps={WF05_SCHRITTE} />
            </div>

            <div style={{ marginTop: 32 }}>
              <SubHeading>Copilot-Interface &#8212; Bereiche (Sidebar / zweiter Bildschirm)</SubHeading>
              <div style={{ borderRadius: 8, border: '1px solid #1a1a1a', overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2.2fr 1fr', background: '#0a0a0a', borderBottom: '1px solid #1a1a1a', padding: '8px 16px' }}>
                  {['Bereich', 'Inhalt', 'Update-Frequenz'].map((h, i) => (
                    <span key={i} style={{ fontSize: 10.5, color: i === 0 ? '#a78bfa' : '#3a3a3a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{h}</span>
                  ))}
                </div>
                {WF05_INTERFACE.map((row, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.2fr 2.2fr 1fr', padding: '10px 16px', borderBottom: i < WF05_INTERFACE.length - 1 ? '1px solid #0f0f0f' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.008)', alignItems: 'start' }}>
                    <span style={{ fontSize: 11.5, color: '#a78bfa', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{row.bereich}</span>
                    <span style={{ fontSize: 12, color: c.textSecondary, lineHeight: 1.5 }}>{row.inhalt}</span>
                    <span style={{ fontSize: 11, color: '#3e3e3e', fontFamily: "'JetBrains Mono', monospace" }}>{row.frequenz}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <SubHeading>Einwand-Bibliothek &#8212; Kategorien &amp; Strategien</SubHeading>
              <div style={{ borderRadius: 8, border: '1px solid #1a1a1a', overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '90px 1.8fr 2fr', background: '#0a0a0a', borderBottom: '1px solid #1a1a1a', padding: '8px 16px' }}>
                  {['Kategorie', 'Typische Einw&#228;nde', 'Copilot-Strategie'].map((h) => (
                    <span key={h} style={{ fontSize: 10.5, color: '#3a3a3a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{h}</span>
                  ))}
                </div>
                {WF05_EINWAENDE.map((row, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '90px 1.8fr 2fr', padding: '10px 16px', borderBottom: i < WF05_EINWAENDE.length - 1 ? '1px solid #0f0f0f' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.008)', alignItems: 'start' }}>
                    <span style={{ fontSize: 11, color: '#f97316', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{row.kategorie}</span>
                    <span style={{ fontSize: 12, color: '#3e3e3e', lineHeight: 1.5, fontStyle: 'italic' }}>{row.einwaende}</span>
                    <span style={{ fontSize: 12, color: c.textSecondary, lineHeight: 1.5 }}>{row.strategie}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <SubHeading>Latenz-Architektur</SubHeading>
              <div style={{ padding: '16px 20px', background: '#07080a', border: '1px solid #1a1a1a', borderRadius: 8 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
                  {[
                    { label: 'Audio-Stream', color: '#22c55e' },
                    { label: '&#8594;', color: '#333' },
                    { label: 'Deepgram Streaming', color: '#3b82f6', sub: '< 500ms' },
                    { label: '&#8594;', color: '#333' },
                    { label: 'Analyse-Pipeline', color: '#a78bfa', sub: 'parallel' },
                    { label: '&#8594;', color: '#333' },
                    { label: 'WebSocket Push', color: '#eab308', sub: 'Echtzeit' },
                    { label: '&#8594;', color: '#333' },
                    { label: 'Copilot-Karte', color: '#22c55e' },
                  ].map((item, i) => (
                    item.label === '&#8594;' ? (
                      <span key={i} style={{ fontSize: 16, color: '#222' }}>&#8594;</span>
                    ) : (
                      <div key={i} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 11, color: item.color, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", background: `${item.color}10`, border: `1px solid ${item.color}25`, borderRadius: 5, padding: '5px 10px' }}>{item.label}</div>
                        {item.sub && <div style={{ fontSize: 9.5, color: item.color, marginTop: 3, fontFamily: "'JetBrains Mono', monospace" }}>{item.sub}</div>}
                      </div>
                    )
                  ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: 14, fontSize: 12, color: '#22c55e', fontWeight: 700 }}>
                  Gesamtlatenz: Audio &#8594; Karte auf Bildschirm = <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>2&#8211;3 Sekunden</span>
                </div>
                <div style={{ textAlign: 'center', marginTop: 6, fontSize: 12, color: '#3e3e3e', lineHeight: 1.55 }}>
                  Ein Einwand dauert 5&#8211;15 Sekunden auszusprechen. Der Copilot braucht 2&#8211;3 Sekunden nach dem Ende &#8212; in dieser Zeit nickt der Vertriebler und sagt Verstehe ich, bevor er antwortet.
                </div>
              </div>
            </div>
          </Expander>
        </Reveal>
      </div>

      {/* ══════════════════════════════════════════════════════
          WORKFLOW 06
      ══════════════════════════════════════════════════════ */}

      <div id="rg-wf-06" style={{ scrollMarginTop: 80 }}>
        <Reveal>
          <div style={{ margin: '64px 0 0', borderTop: '1px solid #111', paddingTop: 64 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#363636', padding: '3px 8px', borderRadius: 4, border: '1px solid #1c1c1c', letterSpacing: '0.06em' }}>
                WF-06
              </span>
              <h3 style={{ fontSize: 'clamp(16px, 2.2vw, 20px)', color: c.textPrimary, fontWeight: 700, margin: 0 }}>
                Pr&#228;sentation-Generator
              </h3>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <p style={{ fontSize: 13.5, color: '#4a4a4a', margin: '0 0 20px', lineHeight: 1.6 }}>
            Aus Briefings, Gespr&#228;chstranskripten oder CRM-Deal-Daten generiert die KI fertige, professionell designte Slide-Decks als .pptx &#8212; mit Story-Architektur, Speaker Notes, KI-Grafiken und Iterations-M&#246;glichkeit.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ marginTop: 20 }}>
            <SubHeading>Auswirkungen des Workflows</SubHeading>
            <ImpactTable rows={WF06_IMPACT} />
            <KerneffektBox text={WF06_KERNEFFEKT} />
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div style={{ marginTop: 32 }}>
            <SubHeading>Nutzen nach Zielgruppe</SubHeading>
            <NutzenList items={WF06_NUTZEN} />
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <Expander label="Technische Details" title="Workflow-Schritte &amp; Automatisierungs-Flow">
            <SubHeading>Workflow-Diagramm</SubHeading>
            <WorkflowCanvas nodes={WF06_NODES} />
            <NodeLegend />

            <div style={{ marginTop: 32 }}>
              <SubHeading>Anforderungen &#8212; Systeme &amp; Tools</SubHeading>
              <ToolsTable tools={WF06_TOOLS} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 24, marginTop: 24 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>API-Tokens &amp; Zug&#228;nge</div>
                  <BulletList items={WF06_TOKENS} color='#3b82f6' />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Voraussetzungen</div>
                  <BulletList items={WF06_VORAUSSETZUNGEN} color='#f59e0b' />
                </div>
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <SubHeading>Wie es funktioniert</SubHeading>
              <p style={{ fontSize: 13, color: '#3a3a3a', margin: '0 0 20px', lineHeight: 1.6 }}>
                Stell dir vor, du k&#246;nntest nach jedem Kundenger&#228;ch in 15 Minuten ein fertiges, professionell designtes Slide-Deck in der Hand halten &#8212; ohne einen einzigen Slide manuell gebaut zu haben.
              </p>
              <SimpleExplanation steps={WF06_SCHRITTE} />
            </div>

            <div style={{ marginTop: 32 }}>
              <SubHeading>Deck-Typen &amp; Anwendungsf&#228;lle</SubHeading>
              <div style={{ borderRadius: 8, border: '1px solid #1a1a1a', overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 2fr 64px 1.4fr', background: '#0a0a0a', borderBottom: '1px solid #1a1a1a', padding: '8px 16px' }}>
                  {['Deck-Typ', 'Ausl&#246;ser', 'Slides', 'Zielgruppe'].map((h, i) => (
                    <span key={i} style={{ fontSize: 10.5, color: i === 0 ? '#a78bfa' : '#3a3a3a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{h}</span>
                  ))}
                </div>
                {WF06_DECK_TYPEN.map((row, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.6fr 2fr 64px 1.4fr', padding: '10px 16px', borderBottom: i < WF06_DECK_TYPEN.length - 1 ? '1px solid #0f0f0f' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.008)', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: '#a78bfa', fontWeight: 600 }}>{row.typ}</span>
                    <span style={{ fontSize: 12, color: c.textSecondary }}>{row.ausloeser}</span>
                    <span style={{ fontSize: 11, color: '#22c55e', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{row.slides}</span>
                    <span style={{ fontSize: 12, color: '#3e3e3e' }}>{row.zielgruppe}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <SubHeading>Story-Architektur &#8212; Pitch-Deck-Struktur (Beispiel: 12 Slides)</SubHeading>
              <div style={{ borderRadius: 8, border: '1px solid #1a1a1a', overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '32px 80px 1fr 1.4fr', background: '#0a0a0a', borderBottom: '1px solid #1a1a1a', padding: '8px 16px', gap: 8 }}>
                  {['Nr.', 'Typ', 'Funktion', 'Headline-Beispiel'].map((h, i) => (
                    <span key={i} style={{ fontSize: 10.5, color: '#3a3a3a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{h}</span>
                  ))}
                </div>
                {WF06_STORY.map((row, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '32px 80px 1fr 1.4fr', padding: '9px 16px', gap: 8, borderBottom: i < WF06_STORY.length - 1 ? '1px solid #0f0f0f' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.008)', alignItems: 'center' }}>
                    <span style={{ fontSize: 10, color: '#333', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>{row.slide}</span>
                    <span style={{ fontSize: 11, color: '#f97316', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{row.typ}</span>
                    <span style={{ fontSize: 12, color: '#3e3e3e' }}>{row.funktion}</span>
                    <span style={{ fontSize: 12, color: c.textSecondary, fontStyle: 'italic' }}>{row.headline}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <SubHeading>Slide-Design-Regeln (programmatisch angewandt)</SubHeading>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 8 }}>
                {WF06_DESIGN_REGELN.map((row, i) => (
                  <div key={i} style={{ display: 'flex', gap: 0, borderRadius: 6, overflow: 'hidden', border: '1px solid #161616' }}>
                    <div style={{ width: 3, background: '#a78bfa', flexShrink: 0 }} />
                    <div style={{ padding: '10px 14px', background: '#0a0a0a', flex: 1 }}>
                      <div style={{ fontSize: 11.5, color: '#a78bfa', fontWeight: 700, marginBottom: 3 }}>{row.regel}</div>
                      <div style={{ fontSize: 12, color: '#3e3e3e' }}>{row.umsetzung}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Expander>
        </Reveal>
      </div>

      {/* ── Ende Revenue Engine Workflows ── */}
    </>
  );
}
