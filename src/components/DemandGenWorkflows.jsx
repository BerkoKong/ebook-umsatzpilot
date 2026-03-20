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

/* ─── Workflow 01 Data ───────────────────────────────────── */
const WF01_NODES = [
  { id:  1, type: 'trigger', name: 'Google Sheets Trigger',  desc: 'Neue Zeile löst Workflow aus'    },
  { id:  2, type: 'http',    name: 'Apify: Quelle scrapen',  desc: 'Maps, LinkedIn, Verzeichnis'     },
  { id:  3, type: 'code',    name: 'Daten normalisieren',    desc: 'Firma, URL, Tel. extrahieren'    },
  { id:  4, type: 'logic',   name: 'Website vorhanden?',     desc: 'HTTP 200 Check'                  },
  { id:  5, type: 'http',    name: 'E-Mail suchen',          desc: 'AnyMail Finder / Hunter.io'      },
  { id:  6, type: 'logic',   name: 'E-Mail gefunden?',       desc: 'Nur mit E-Mail weiter'           },
  { id:  7, type: 'http',    name: 'Website scrapen',        desc: 'HTML-Inhalt abrufen'             },
  { id:  8, type: 'code',    name: 'HTML extrahieren',       desc: 'Text aus HTML parsen'            },
  { id:  9, type: 'ai',      name: 'Firma zusammenfassen',   desc: 'KI: Was macht die Firma?'        },
  { id: 10, type: 'ai',      name: 'IceBreaker generieren',  desc: 'Personalisierte Ansprache'       },
  { id: 11, type: 'output',  name: 'Sheets: Append',         desc: 'Daten in Liste schreiben'        },
  { id: 12, type: 'crm',     name: 'Status aktualisieren',   desc: 'Zeile als verarbeitet markieren' },
];

const WF01_IMPACT = [
  { area: 'Zeitaufwand pro Lead',   before: '8–15 Min. (recherchieren, kopieren, E-Mail suchen, CRM-Eintrag)', after: '< 30 Sek. pro Lead — vollautomatisch' },
  { area: 'Leads pro Tag',          before: '20–40 bei voller manueller Arbeit',                               after: '200–500+ je nach Quelle und Rate-Limits' },
  { area: 'E-Mail-Findungsrate',    before: 'Manuelles Googlen, oft ohne Ergebnis',                            after: '60–80 % automatisierte Trefferquote via E-Mail-Finder-APIs' },
  { area: 'Personalisierung',       before: 'Generische Vorlage oder gar keine',                               after: 'Jeder Lead bekommt einen individuellen IceBreaker basierend auf Website-Inhalten, Jobtitel und Branche' },
  { area: 'Datenqualität',          before: 'Inkonsistent, Tippfehler, fehlende Felder',                       after: 'Standardisierte, vollständige Datensätze' },
  { area: 'Vertriebszeit',          before: '60 % Recherche, 40 % Verkaufen',                                  after: '10 % Review, 90 % Verkaufen' },
];

const WF01_KERNEFFEKT = 'Der gesamte Recherche- und Aufbereitungsprozess wird vom Vertriebsteam entkoppelt. Leads kommen fertig qualifiziert, mit E-Mail-Adresse und personalisierter Erstansprache in der Prospecting-Liste an.';

const WF01_TOOLS = [
  { tool: 'n8n',                         zweck: 'Workflow-Orchestrierung, Logik, Schleifen, Filter',                   typ: 'Self-hosted oder Cloud'      },
  { tool: 'Apify',                        zweck: 'Web-Scraping (Google Maps, LinkedIn, Branchenverzeichnisse)',          typ: 'SaaS — API-Token erforderlich' },
  { tool: 'Google Sheets / Airtable',    zweck: 'Datenbank für Prospecting-Liste + Steuerung',                          typ: 'Kostenlos / SaaS'            },
  { tool: 'AnyMail Finder / Hunter.io / Apollo', zweck: 'E-Mail-Adressen finden',                                       typ: 'SaaS — API-Token erforderlich' },
  { tool: 'OpenAI API / Anthropic API',  zweck: 'IceBreaker-Texte generieren, Webseiten-Inhalte zusammenfassen',        typ: 'API-Key erforderlich'        },
  { tool: 'HTTP Request Node',           zweck: 'Webseiten scrapen und HTML-Inhalte extrahieren',                       typ: 'In n8n integriert'           },
];

const WF01_TOKENS = [
  'Apify API-Token (für Google Maps Actor, LinkedIn Actor etc.)',
  'AnyMail Finder oder Hunter.io API-Key',
  'OpenAI API-Key oder Anthropic API-Key',
  'Google Sheets API (OAuth oder Service Account)',
  'Optional: Apollo.io API-Key für Enrichment',
  'Optional: LinkedIn Sales Navigator Account (als Datenquelle für Apify)',
];

const WF01_VORAUSSETZUNGEN = [
  'Definiertes Ideal-Customer-Profile (ICP) mit klaren Filterkriterien (Branche, Größe, Region, Jobtitel)',
  'Suchbegriffe / Quellen-URLs vorbereitet (z. B. Google Maps Suchbegriffe, LinkedIn-Suchfilter, Verzeichnis-URLs)',
  'E-Mail-Vorlagen oder Tonalitäts-Vorgaben für den IceBreaker',
];

const WF01_SCHRITTE = [
  { title: 'Leads finden', text: 'Der Workflow durchsucht Google Maps, LinkedIn, Branchenverzeichnisse oder Jobportale nach Unternehmen, die zum Wunschkundenprofil passen. Jedes Ergebnis — Firmenname, Adresse, Webseite, Telefonnummer — wird sauber in eine Liste eingetragen.' },
  { title: 'Website prüfen', text: 'Bevor weitergearbeitet wird, prüft der Workflow bei jedem Treffer, ob die Webseite tatsächlich erreichbar ist. Tote Links oder Platzhalter-Seiten werden aussortiert.' },
  { title: 'E-Mail-Adresse finden', text: 'Für jeden Treffer mit gültiger Webseite wird automatisch die passende Ansprechpartner-E-Mail gesucht — über spezialisierte Dienste, die Millionen von E-Mail-Mustern kennen.' },
  { title: 'Webseite lesen und verstehen', text: 'Die Webseite des Unternehmens wird geöffnet, der Inhalt gelesen und strukturiert — was die Firma macht, welche Dienstleistungen sie anbietet und wie sie sich positioniert.' },
  { title: 'Personalisierte Erstansprache schreiben', text: 'Basierend auf allem, was über die Firma bekannt ist — Branche, Angebot, Webseiten-Inhalt — formuliert eine KI einen individuellen IceBreaker. Das kann eine E-Mail sein, eine LinkedIn-Nachricht oder ein personalisierter Betreff.' },
  { title: 'Alles in die Liste schreiben', text: 'Firma, Kontaktdaten, E-Mail, Webseiten-Zusammenfassung und der fertige IceBreaker-Text landen in einer sauberen Tabelle — fertig für den Vertrieb.' },
];

const WF01_NUTZEN = [
  { rolle: 'Vertrieb',         text: 'Keine Recherche mehr — die Liste ist da, die Erstansprache ist geschrieben. Der Vertriebler öffnet die Liste und fängt an zu kontaktieren.' },
  { rolle: 'Marketing',        text: 'Saubere, angereicherte Datensätze als Basis für gezielte Kampagnen, Retargeting-Listen oder ABM-Strategien.' },
  { rolle: 'Geschäftsführung', text: 'Planbare Lead-Pipeline statt zufällige Kontakte. Skalierbar ohne zusätzliche Headcount-Kosten.' },
  { rolle: 'Qualität',         text: 'Jede Ansprache ist individuell — kein "Sehr geehrte Damen und Herren", sondern ein Bezug auf das, was die Firma tatsächlich tut.' },
];

/* ─── Workflow 02 Data ───────────────────────────────────── */
const WF02_NODES = [
  { id:  1, type: 'trigger', name: 'CRM / Asana Webhook',     desc: 'Neues Briefing löst Workflow aus'   },
  { id:  2, type: 'http',    name: 'Briefing-Daten laden',    desc: 'Ziel, Zielgruppe, Angebot, Budget'  },
  { id:  3, type: 'ai',      name: 'Ad-Copy generieren',      desc: '3× Hook, Body, CTA Varianten'       },
  { id:  4, type: 'ai',      name: 'Bild-Prompts erstellen',  desc: 'Creative-Briefings für KI'          },
  { id:  5, type: 'http',    name: 'Bilder generieren',       desc: 'DALL-E / Flux in Meta-Formaten'     },
  { id:  6, type: 'http',    name: 'Google Drive: Upload',    desc: 'Creatives in Drive speichern'       },
  { id:  7, type: 'code',    name: 'Assets zusammenführen',   desc: 'Copy + Bilder + Targeting bündeln'  },
  { id:  8, type: 'http',    name: 'Meta: Kampagne',          desc: 'Campaign-Objekt via API anlegen'    },
  { id:  9, type: 'http',    name: 'Meta: Anzeigengruppe',    desc: 'Ad Set + Targeting + Budget'        },
  { id: 10, type: 'http',    name: 'Meta: Creatives',         desc: 'Bilder als Ad Creatives laden'      },
  { id: 11, type: 'http',    name: 'Meta: Anzeigen live',     desc: 'Ads veröffentlichen'                },
  { id: 12, type: 'logic',   name: 'Fehler aufgetreten?',     desc: 'API-Responses prüfen'               },
  { id: 13, type: 'output',  name: 'Slack: Status-Report',    desc: 'Erfolg / Fehler melden'             },
  { id: 14, type: 'crm',     name: 'CRM: Kampagne live',      desc: 'Status + Ad-IDs speichern'          },
];

const WF02_IMPACT = [
  { area: 'Kampagnen-Setup',   before: '60–90 Min. pro Kampagne (Copy, Bilder, Zielgruppe, Upload)',   after: '4–6 Min. — Briefing eingeben, Rest läuft automatisch' },
  { area: 'Ad-Copy-Qualität',  before: 'Abhängig vom Texter, inkonsistente Tonalität',                 after: 'Markengerechte Texte in Sekunden, mehrere Varianten, A/B-ready' },
  { area: 'Creative-Erstellung', before: 'Designer-Briefing, Wartezeit, Korrekturschleifen — 1–3 Tage', after: 'KI-generierte Bilder in Meta-Formaten, sofort einsatzbereit' },
  { area: 'Skalierbarkeit',    before: 'Jede neue Kampagne = gleicher manueller Aufwand',              after: 'Unbegrenzt skalierbar — 5 oder 50 Kampagnen pro Woche, gleicher Aufwand' },
  { area: 'Fehlerquote',       before: 'Falsche Formate, fehlende UTM-Parameter, falsche Zielgruppen', after: 'Standardisierter Prozess, Fehlerüberwachung mit Slack-Alerts' },
  { area: 'Time-to-Market',    before: '2–5 Tage von Idee bis Live-Kampagne',                          after: 'Unter 1 Stunde von Briefing bis Live-Schaltung' },
];

const WF02_KERNEFFEKT = 'Die gesamte Wertschöpfungskette — von der Kampagnenidee über Copy, Creatives und Zielgruppen-Setup bis zur Veröffentlichung im Werbekonto — wird in einen einzigen automatisierten Prozess komprimiert. Der Marketing-Manager gibt nur noch das Briefing ein, alles andere erledigt der KI-Agent.';

const WF02_TOOLS = [
  { tool: 'n8n',                        zweck: 'Workflow-Orchestrierung, API-Aufrufe, Logik, Fehlerbehandlung',               typ: 'Self-hosted oder Cloud'        },
  { tool: 'CRM / Projektmanagement',    zweck: 'Kampagnen-Briefing und Eingabe (Asana, HubSpot, Notion, Airtable)',           typ: 'SaaS'                          },
  { tool: 'OpenAI API / Anthropic API', zweck: 'Ad-Copy-Generierung (Hook, Body, CTA), Bild-Prompts, Zusammenfassungen',     typ: 'API-Key erforderlich'          },
  { tool: 'Bildgenerierung',            zweck: 'KI-generierte Creatives (DALL-E, Midjourney, Flux via Replicate)',            typ: 'API-Key erforderlich'          },
  { tool: 'Google Drive',               zweck: 'Zwischenspeicher für generierte Bilder, Kampagnen-Assets',                    typ: 'OAuth oder Service Account'    },
  { tool: 'Meta Ads API',               zweck: 'Kampagne, Anzeigengruppe, Anzeigen erstellen und veröffentlichen',            typ: 'Business Manager + API-Token'  },
  { tool: 'Slack',                      zweck: 'Fehler-Monitoring, Erfolgs-Benachrichtigungen, Freigabe-Alerts',              typ: 'Webhook oder App-Token'        },
];

const WF02_TOKENS = [
  'OpenAI API-Key (GPT-4 für Copy, DALL-E für Bilder) oder Anthropic API-Key + separater Bild-API-Zugang',
  'Meta Business Manager mit Marketing-API-Zugriff (App-ID, App-Secret, Access-Token, Ad-Account-ID)',
  'Google Drive API (OAuth 2.0 oder Service Account Credentials)',
  'CRM/PM-Tool API-Zugang (Asana Personal Access Token, HubSpot API-Key, Notion Integration etc.)',
  'Slack Incoming Webhook URL für Benachrichtigungen',
  'Optional: Google Ads API-Zugang für Google-Kampagnen',
];

const WF02_VORAUSSETZUNGEN = [
  'Meta Business Manager verifiziert und Werbekonto aktiv',
  'Markenrichtlinien dokumentiert (Tonalität, Farben, Bildstil) — idealerweise als System-Prompt für die KI',
  'Kampagnen-Template im CRM/PM-Tool angelegt (Felder: Ziel, Zielgruppe, Angebot, Budget, Laufzeit)',
  'Bildvorlagen oder Stil-Referenzen für konsistente Creatives',
  'UTM-Parameter-Schema definiert',
];

const WF02_SCHRITTE = [
  { title: 'Briefing eingeben', text: 'Ein Marketing-Manager öffnet sein Projektmanagement-Tool und füllt ein kurzes Briefing aus — Kampagnenziel, Zielgruppe, Angebot, Budget. Das dauert 3 Minuten.' },
  { title: 'Texte werden geschrieben', text: 'Sobald das Briefing gespeichert ist, startet der Workflow automatisch. Eine KI erstellt mehrere Varianten von Werbetexten — jeweils mit einem starken Hook, einem überzeugenden Haupttext und einem klaren Call-to-Action. Alles in der Tonalität der Marke.' },
  { title: 'Bilder werden erstellt', text: 'Parallel generiert die KI Bild-Briefings und erstellt daraus Werbebilder in den richtigen Meta-Formaten (1080x1080, 1080x1920 etc.). Die fertigen Bilder werden automatisch in Google Drive gespeichert.' },
  { title: 'Kampagne wird zusammengebaut', text: 'Alle Bausteine — Texte, Bilder, Zielgruppenparameter, Budget, Laufzeit — werden automatisch in das richtige Format für Meta gebracht.' },
  { title: 'Kampagne geht live', text: 'Über die Meta Ads API wird die Kampagne direkt im Werbekonto erstellt — Kampagne, Anzeigengruppe und Anzeigen inklusive. Kein manuelles Hochladen, kein Copy-Paste.' },
  { title: 'Überwachung läuft mit', text: 'Wenn irgendetwas schiefgeht — ein API-Fehler, ein abgelehntes Creative, ein Budget-Problem — bekommt das Team sofort eine Slack-Nachricht mit der genauen Fehlerbeschreibung.' },
];

const WF02_NUTZEN = [
  { rolle: 'Marketing-Team',   text: 'Kampagnen in Minuten statt Tagen live. Mehr Zeit für Strategie, weniger für operatives Setup.' },
  { rolle: 'Vertrieb',         text: 'Schnellere Kampagnenreaktionen auf neue Angebote, saisonale Aktionen oder Marktveränderungen.' },
  { rolle: 'Geschäftsführung', text: 'Drastisch reduzierte Agenturkosten oder internes Headcount für Ads-Management. Skalierung ohne Personalaufbau.' },
  { rolle: 'Marke',            text: 'Konsistente Qualität über alle Kampagnen — jede Anzeige folgt den Markenrichtlinien, weil die KI sie als Regel kennt.' },
  { rolle: 'Effizienz',        text: '18x schnelleres Setup. Eine Person kann den Output eines ganzen Ads-Teams produzieren.' },
];

/* ─── Workflow 03 Data ───────────────────────────────────── */
const WF03_NODES = [
  { id:  1, type: 'trigger', name: 'Schedule Trigger',       desc: 'Täglich, wöchentlich, monatlich'    },
  { id:  2, type: 'logic',   name: 'Token-Check',            desc: 'Meta Token noch gültig?'            },
  { id:  3, type: 'http',    name: 'Token Refresh',          desc: 'Long-Lived Token erneuern'          },
  { id:  4, type: 'http',    name: 'Meta: Campaigns',        desc: 'Kampagnen-Insights abrufen'         },
  { id:  5, type: 'http',    name: 'Meta: Ad Sets',          desc: 'Ad-Set-Performance abrufen'         },
  { id:  6, type: 'http',    name: 'Meta: Ads',              desc: 'Einzelne Ads-Performance'           },
  { id:  7, type: 'code',    name: 'Daten formatieren',      desc: 'CTR, CPA, ROAS berechnen'           },
  { id:  8, type: 'output',  name: 'Sheets: Campaigns',      desc: 'Kampagnen-Tab befüllen'             },
  { id:  9, type: 'output',  name: 'Sheets: Ad Sets',        desc: 'Ad-Set-Tab befüllen'                },
  { id: 10, type: 'output',  name: 'Sheets: Ads',            desc: 'Anzeigen-Tab befüllen'              },
  { id: 11, type: 'code',    name: 'KPI-Regeln prüfen',      desc: 'Schwellenwerte anwenden'            },
  { id: 12, type: 'ai',      name: 'Performance-Analyse',    desc: 'KI: Trends + Empfehlungen'          },
  { id: 13, type: 'logic',   name: 'Underperformer?',        desc: 'Unter Schwellenwert filtern'        },
  { id: 14, type: 'http',    name: 'Top Ads: Creatives',     desc: 'Bilder + Videos laden'              },
  { id: 15, type: 'http',    name: 'Google Drive: Upload',   desc: 'Assets für Report speichern'        },
  { id: 16, type: 'http',    name: 'Slides: Report',         desc: 'Template automatisch befüllen'      },
  { id: 17, type: 'output',  name: 'Slack: KPI-Summary',     desc: 'Tägliche Zusammenfassung'           },
  { id: 18, type: 'output',  name: 'Slack: Alert',           desc: 'Kritische Warnungen senden'         },
];

const WF03_IMPACT = [
  { area: 'Datenerfassung',       before: '30–45 Min. täglich: einloggen, exportieren, übertragen',          after: 'Automatischer KPI-Pull auf allen Ebenen — 0 Min. Aufwand' },
  { area: 'Reporting',            before: 'Wöchentlich 2–4 Std. Excel/Slides bauen, Screenshots, formatieren', after: 'Fertige Reports in Google Slides in Minuten' },
  { area: 'Reaktionszeit',        before: 'Schlecht laufende Ads werden erst nach Tagen erkannt',             after: 'Echtzeit-Warnungen via Slack innerhalb von Stunden' },
  { area: 'Entscheidungsqualität', before: 'Bauchgefühl, unvollständige Daten, kein historischer Vergleich', after: 'Regelbasierte Auswertung auf Basis definierter KPI-Schwellenwerte' },
  { area: 'Budget-Verschwendung', before: 'Underperforming Ads laufen tagelang weiter und verbrennen Budget', after: 'Automatische Erkennung + Handlungsempfehlung oder direkte Abschaltung' },
  { area: 'Skalierbarkeit',       before: 'Jedes zusätzliche Werbekonto = mehr manueller Aufwand',            after: 'Beliebig viele Konten und Kampagnen — gleicher Aufwand' },
];

const WF03_KERNEFFEKT = 'Der gesamte Zyklus aus Datenerfassung, Auswertung, Handlungsempfehlung und Benachrichtigung läuft vollautomatisch. Das Marketing-Team bekommt nicht mehr rohe Daten, sondern fertige Entscheidungsvorlagen — und wird proaktiv gewarnt, bevor Budget verbrannt wird.';

const WF03_TOOLS = [
  { tool: 'n8n',                        zweck: 'Workflow-Orchestrierung, API-Calls, Scheduling, Logik',                    typ: 'Self-hosted oder Cloud'        },
  { tool: 'Meta Marketing API',         zweck: 'Kampagnen-, Ad-Set- und Ad-Level-Daten abrufen (Insights, Spend)',         typ: 'API-Token + Ad-Account-ID'     },
  { tool: 'Google Sheets',             zweck: 'Zentrale Datenbank für Performance-Daten auf allen Ebenen',                 typ: 'OAuth oder Service Account'    },
  { tool: 'Google Slides',             zweck: 'Automatisch befüllte Reporting-Präsentationen (Templates)',                 typ: 'Google Slides API'             },
  { tool: 'Google Drive',              zweck: 'Speicher für Creative-Assets, heruntergeladene Bilder/Videos, Reports',    typ: 'OAuth oder Service Account'    },
  { tool: 'OpenAI API / Anthropic API', zweck: 'KI-gestützte Analyse, Kategorisierung, Handlungsempfehlungen',            typ: 'API-Key erforderlich'          },
  { tool: 'Slack / Telegram',          zweck: 'Echtzeit-Benachrichtigungen, Warnungen, Status-Updates',                   typ: 'Webhook oder Bot-Token'        },
];

const WF03_TOKENS = [
  'Meta Marketing API: Long-Lived Access Token (mit automatischer Token-Refresh-Logik), App-ID, Ad-Account-ID',
  'Google Workspace: OAuth 2.0 Credentials für Sheets, Slides und Drive',
  'OpenAI oder Anthropic API-Key',
  'Slack Incoming Webhook URL oder Telegram Bot Token + Chat-ID',
  'Optional: Google Ads API für Cross-Platform-Reporting',
];

const WF03_VORAUSSETZUNGEN = [
  'Meta Access Token Management eingerichtet (Short-Lived → Long-Lived Token Refresh Flow)',
  'Google Sheets Template mit definierten Tabs: Campaign Data, Ad Set Data, Ad Data, KPI-Regeln',
  'Google Slides Template mit Platzhaltern für Campaign Objective, Platform Performance, Placements, Top Ads, Altersverteilung',
  'KPI-Schwellenwerte definiert (z. B. CTR < 2,5 %, Link-CTR < 1 %, CPA > Zielwert, ROAS < Breakeven)',
  'Kampagnen-Namenskonvention, damit der Workflow Kampagnentypen automatisch erkennen kann',
];

const WF03_SCHRITTE = [
  { title: 'Daten abholen', text: 'Jeden Tag (oder stündlich) verbindet sich der Workflow mit dem Meta Werbekonto und holt alle relevanten Zahlen auf drei Ebenen: Kampagnen-Gesamtleistung, Anzeigengruppen-Performance und einzelne Anzeigen-Ergebnisse — Impressions, Klicks, CTR, Kosten, Conversions, ROAS und mehr.' },
  { title: 'Daten strukturiert speichern', text: 'Alle Werte werden sauber in eine Google-Sheets-Datenbank geschrieben — mit Zeitstempel für tägliche, wöchentliche und monatliche Vergleiche. Jede Ebene (Kampagne, Ad Set, Ad) hat einen eigenen Tab.' },
  { title: 'Regeln anwenden', text: 'Der Workflow prüft die Daten gegen vordefinierte Regeln. Zum Beispiel: "Wenn die CTR einer Anzeigengruppe unter 2,5 % fällt UND die Link-CTR unter 1 % liegt, markiere als underperforming." Oder: "Wenn der CPA über dem Zielwert liegt, empfehle Budget-Umverteilung."' },
  { title: 'KI-Analyse', text: 'Eine KI liest die Daten und erstellt eine Zusammenfassung: Welche Kampagnen laufen gut, welche schlecht, was sind die wahrscheinlichen Ursachen (Creative-Müdigkeit, Zielgruppen-Sättigung, saisonale Effekte) und was sollte als nächstes passieren.' },
  { title: 'Report automatisch bauen', text: 'Aus den Daten wird automatisch eine Google-Slides-Präsentation befüllt — mit Kampagnen-Performance, Plattform-Aufteilung, Placement-Analyse, Altersverteilung und den Top-6-Anzeigen inklusive heruntergeladener Creatives.' },
  { title: 'Benachrichtigungen senden', text: 'Das Team bekommt eine Slack-Nachricht mit den wichtigsten KPIs, Warnungen bei Problemen (abgelehnte Anzeigen, ausstehende Zahlungen, Budget erschöpft) und einem Link zum fertigen Report.' },
];

const WF03_NUTZEN = [
  { rolle: 'Marketing-Team',   text: 'Null manuelle Reportings mehr. Jeden Morgen liegt ein fertiger Report mit Handlungsempfehlungen bereit. Mehr Zeit für Strategie und Creative-Entwicklung.' },
  { rolle: 'Geschäftsführung', text: 'Transparenz über Werbeausgaben in Echtzeit. Kein Blindflug mehr — jede Entscheidung ist datenbasiert.' },
  { rolle: 'Vertrieb',         text: 'Frühzeitige Info, welche Kampagnen qualifizierte Leads liefern und welche nicht — ermöglicht gezieltes Feedback an Marketing.' },
  { rolle: 'Effizienz',        text: 'Schlecht laufende Kampagnen werden innerhalb von Stunden identifiziert statt nach Tagen. Budgetverschwendung wird systematisch eliminiert.' },
  { rolle: 'Skalierung',       text: 'Ob 3 oder 30 Kampagnen gleichzeitig — der Reporting- und Überwachungsaufwand bleibt gleich null.' },
];

/* ─── Workflow 04 Data ───────────────────────────────────── */
const WF04_NODES = [
  { id:  1, type: 'trigger', name: 'Schedule: Täglich 9:00',  desc: 'Täglicher Batch-Start'              },
  { id:  2, type: 'http',    name: 'Pipeline-Liste laden',    desc: 'Neue Leads aus Sheets abrufen'      },
  { id:  3, type: 'logic',   name: 'Ausstehende < 1.000?',   desc: 'Platz für neue Anfragen?'           },
  { id:  4, type: 'code',    name: 'Tages-Batch berechnen',  desc: '~40/Tag mit Time-Jitter'            },
  { id:  5, type: 'http',    name: 'Sales Navigator: Filter', desc: 'Neue Leads nachfüllen'              },
  { id:  6, type: 'http',    name: 'Vernetzung senden',       desc: 'Anfrage OHNE Text senden'           },
  { id:  7, type: 'output',  name: 'Sheets: In Progress',     desc: 'Lead-Status aktualisieren'          },
  { id:  8, type: 'trigger', name: 'Webhook: Status',         desc: 'Annahme / Profilbesuch erkannt'     },
  { id:  9, type: 'logic',   name: 'Angenommen?',             desc: 'Verbindungsstatus prüfen'           },
  { id: 10, type: 'code',    name: 'Timeout: 14 Tage',        desc: 'Zurückziehen wenn ausstehend'       },
  { id: 11, type: 'output',  name: 'Sheets: Blacklist',       desc: 'Abgelehnte markieren'               },
  { id: 12, type: 'ai',      name: 'Pitch personalisieren',   desc: 'KI: Nachricht auf Profil zugeschnitten' },
  { id: 13, type: 'http',    name: 'Pitch-DM senden',         desc: 'Personalisierte Nachricht'          },
  { id: 14, type: 'wait',    name: '3–4 Tage warten',         desc: 'Auf Antwort warten'                 },
  { id: 15, type: 'logic',   name: 'Antwort erhalten?',       desc: 'Reply-Erkennung prüfen'             },
  { id: 16, type: 'ai',      name: 'Antwort qualifizieren',   desc: 'Interesse / Einwand / Absage'       },
  { id: 17, type: 'ai',      name: 'Follow-up generieren',    desc: 'Nächste Nachricht via KI'           },
  { id: 18, type: 'http',    name: 'Follow-up senden',        desc: 'Mehrwert oder Terminlink'           },
  { id: 19, type: 'output',  name: 'Cal.com: Terminlink',     desc: 'Buchungslink senden'                },
  { id: 20, type: 'output',  name: 'Slack: Qualified Lead',   desc: 'Vertriebler informieren'            },
];

const WF04_IMPACT = [
  { area: 'Vernetzungsanfragen',  before: '20–30 pro Tag manuell, unregelmäßig',                           after: '200 pro Woche wie Uhrwerk — verteilt, innerhalb der Limits' },
  { area: 'Follow-up-Disziplin', before: '70 % der Kontakte werden nie nachgefasst',                       after: '100 % der angenommenen Anfragen bekommen Pitch + Follow-up-Sequenz' },
  { area: 'Listenmanagement',    before: 'Chaos — keine Übersicht über Status, ausstehende, qualifizierte', after: 'Drei saubere Listen: Pipeline, In Progress, Blacklist — automatisch gepflegt' },
  { area: 'Zeitaufwand',         before: '2–3 Std. täglich für Vernetzen, Nachrichten, Listen',            after: '15 Min. täglich für Review der qualifizierten Antworten' },
  { area: 'Annahme-Rate',        before: '15–25 % bei Anfragen mit generischem Text',                      after: '30–45 % bei Anfragen ohne Text (wirkt organischer)' },
  { area: 'Pipeline-Hygiene',    before: 'Hunderte ausstehende Anfragen, nie bereinigt',                   after: 'Automatisches Zurückziehen nach Zeitlimit — ausstehende Anfragen immer < 1.000' },
  { area: 'Qualifizierung',      before: 'Alle Antworten gleich behandelt, keine Priorisierung',           after: 'KI-gestützte Qualifizierung jeder Rückmeldung nach ICP-Kriterien' },
];

const WF04_KERNEFFEKT = 'Der komplette LinkedIn-Outreach-Zyklus — von der Lead-Auswahl über Vernetzung, Follow-up, Einwandbehandlung bis zur Terminvereinbarung — läuft als automatisierte Sequenz. Der Vertriebler konzentriert sich nur noch auf die warmen Gespräche.';

const WF04_TOOLS = [
  { tool: 'n8n',                        zweck: 'Workflow-Orchestrierung, Sequenz-Logik, Timing, Listen-Management',       typ: 'Self-hosted oder Cloud'        },
  { tool: 'LinkedIn Sales Navigator',   zweck: 'Lead-Recherche, erweiterte Filter, Profilbesuche (bis 1.000/Tag)',         typ: 'Premium-Account erforderlich'  },
  { tool: 'LinkedIn Automation Tool',   zweck: 'API-Zugang für Anfragen, Nachrichten (z. B. Phantombuster, HeyReach)',    typ: 'SaaS — API-Key oder Cookie'    },
  { tool: 'Google Sheets / Airtable',   zweck: 'Arbeitslisten: Pipeline, In Progress, Blacklist + Prospecting-DB',        typ: 'Kostenlos / SaaS'              },
  { tool: 'Apollo',                     zweck: 'Lead-Anreicherung, E-Mail-Adressen als Fallback, Firmendaten',            typ: 'API-Key erforderlich'          },
  { tool: 'OpenAI API / Anthropic API', zweck: 'Pitch personalisieren, Antworten qualifizieren, Einwände behandeln',      typ: 'API-Key erforderlich'          },
  { tool: 'Cal.com / Calendly',         zweck: 'Terminbuchung bei qualifiziertem Interesse',                              typ: 'Self-hosted oder SaaS'         },
  { tool: 'Slack / Telegram',           zweck: 'Benachrichtigungen bei qualifizierten Antworten, tägliche Statusberichte', typ: 'Webhook oder Bot-Token'        },
];

const WF04_TOKENS = [
  'LinkedIn Sales Navigator Account (Premium Business oder Sales Navigator Professional/Team)',
  'LinkedIn Automation Tool Credentials (Cookie-Auth oder API-Key je nach Tool)',
  'Google Sheets API (OAuth oder Service Account)',
  'Apollo API-Key (für Enrichment und Fallback-Daten)',
  'OpenAI oder Anthropic API-Key',
  'Cal.com API-Key oder Calendly Webhook',
  'Slack Incoming Webhook URL',
];

const WF04_VORAUSSETZUNGEN = [
  'LinkedIn SSI-Score idealerweise > 70 (hebt Vernetzungslimits auf ~200+/Woche)',
  'Optimiertes LinkedIn-Profil (Headline, Banner, About-Section, Featured Content) — das Profil IST die Landing Page',
  'Sales Navigator Suchfilter vordefiniert (z. B. Unternehmensgröße, Standort, Rolle)',
  'ICP-Kriterien dokumentiert (Branche, Unternehmensgröße, Rolle, Entscheidungsbefugnis)',
  'Nachrichtensequenz vorbereitet (Pitch-Templates, Follow-up-Templates, Einwandbehandlungen)',
  'Mehrwert-Content vorhanden (PDF, Leitfaden, Case Study) zum Versand an warme Leads',
  'Prospecting-Liste aus Workflow 01 als primäre Quelle angebunden',
];

const WF04_SCHRITTE = [
  { title: 'Leads auswählen', text: 'Der Workflow zieht neue Kontakte aus drei Quellen: einem Sales-Navigator-Filter, aus Apollo für zusätzliche Anreicherung und aus der Prospecting-Liste, die Workflow 01 automatisch befüllt.' },
  { title: 'Vernetzungsanfrage senden — ohne Text', text: 'Der Kontakt bekommt eine einfache Vernetzungsanfrage ohne Nachricht. Das ist bewusst so: Anfragen ohne Text wirken organisch und haben eine deutlich höhere Annahme-Rate. Pro Woche gehen ca. 200 Anfragen raus — verteilt über die Arbeitstage mit Time-Blocking.' },
  { title: 'Warten und beobachten', text: 'Der Workflow überwacht, ob die Anfrage angenommen wird oder ob der Kontakt das Profil besucht. Passiert nach 14 Tagen nichts, wird die Anfrage automatisch zurückgezogen und der Kontakt auf die Blacklist gesetzt.' },
  { title: 'Pitch senden', text: 'Sobald die Anfrage angenommen wird, bekommt der Kontakt eine persönliche Pitch-Nachricht — basierend auf seinem Profil, seiner Rolle und seinem Unternehmen. Die KI formuliert den Text so, dass er wie eine echte Nachricht klingt.' },
  { title: 'Antwort qualifizieren', text: 'Kommt eine Rückmeldung, analysiert die KI den Inhalt: Ist es Interesse? Eine Gegenfrage oder ein Einwand? Oder eine Absage? Jede Kategorie löst eine andere Folgeaktion aus.' },
  { title: 'Einwandbehandlung oder Follow-up', text: 'Bei Interesse bekommt der Kontakt Mehrwert-Content und einen Vorschlag zum Austausch. Bei Stille kommt ein Follow-up. Bei einem Einwand formuliert die KI eine passende Antwort.' },
  { title: 'Terminvereinbarung', text: 'Wenn der Kontakt Interesse signalisiert, bekommt er automatisch einen Calendly/Cal.com-Link. Der Vertriebler wird per Slack informiert und bekommt eine Zusammenfassung des bisherigen Gesprächsverlaufs.' },
];

const WF04_NUTZEN = [
  { rolle: 'Vertrieb',        text: '800 qualifizierte Vernetzungsanfragen pro Monat statt 100–150 manueller Versuche. Warme Gespräche statt Kaltakquise.' },
  { rolle: 'Pipeline',        text: 'Kontinuierlicher Zufluss neuer Kontakte, systematisch nachgefasst. Kein Lead fällt durchs Raster.' },
  { rolle: 'Effizienz',       text: '90 % Zeitersparnis im Outreach. Der Vertriebler sieht nur noch die qualifizierten Antworten.' },
  { rolle: 'Marke',           text: 'Professioneller Auftritt statt Spam. Jede Nachricht hat Kontext und Mehrwert.' },
  { rolle: 'Management',      text: 'Transparenz über Outreach-Aktivitäten: Anfragen, Annahmen, Gespräche, Termine — alles messbar.' },
  { rolle: 'Skalierung',      text: 'Mehrere LinkedIn-Profile parallel bespielbar. Gleiche Qualität, gleiche Systematik, mehr Reichweite.' },
];

const WF04_LIMITS = [
  { aktion: 'Vernetzungsanfragen', limit: '150–200 / Woche', anmerkung: 'SSI-Score > 70 hebt Limit auf 200+' },
  { aktion: 'DMs (1. Grad)',       limit: '50–80 / Tag',     anmerkung: 'Über den Tag verteilen (Time-Blocking)' },
  { aktion: 'Profilbesuche',       limit: '80 / Tag (Free)', anmerkung: 'Sales Navigator: bis zu 1.000 / Tag' },
  { aktion: 'InMails',             limit: '50 / Monat (Paid)', anmerkung: 'Nur für High-Ticket Leads nutzen' },
  { aktion: 'Ausstehende Anfragen', limit: 'Max. 1.000',     anmerkung: 'Automatisch zurückziehen nach Timeout' },
];

const WF04_LISTEN = [
  { liste: 'Pipeline',   status: 'Vernetzung ausstehend — noch nicht gesendet', aktion: 'Nächste Batch-Anfragen werden hieraus gezogen' },
  { liste: 'In Progress', status: 'Anfrage gesendet — warte auf Annahme',        aktion: 'Automatisches Timeout + Zurückziehen nach 14 Tagen' },
  { liste: 'Connected',  status: 'Anfrage angenommen — Pitch-Sequenz aktiv',     aktion: 'Follow-up-Nachrichten laufen automatisch' },
  { liste: 'Qualified',  status: 'Positives Signal — Interesse oder Termin',     aktion: 'Wird an Vertriebler übergeben' },
  { liste: 'Blacklist',  status: 'Nicht angenommen, Absage oder unqualifiziert', aktion: 'Kein erneuter Kontaktversuch' },
];

const WF04_SEQUENZ = [
  { tag: 'Tag 0',  label: 'Vernetzungsanfrage OHNE Text',  note: 'Max. 14 Tage Wartezeit',           branches: [{ cond: 'Nicht angenommen', action: 'Zurückziehen → Blacklist', negative: true }, { cond: 'Angenommen', action: 'Weiter zu Tag 1', negative: false }] },
  { tag: 'Tag 1',  label: 'Pitch-Nachricht senden',        note: 'Personalisiert via KI',             branches: [{ cond: 'Keine Antwort', action: 'Weiter zu Tag 5', negative: true }, { cond: 'Antwort', action: 'KI qualifiziert', negative: false }] },
  { tag: 'Tag 5',  label: 'Follow-up #1',                  note: 'Mehrwert-Content senden',           branches: [{ cond: 'Interesse', action: 'Terminlink senden', negative: false }, { cond: 'Einwand', action: 'KI-Einwandbehandlung', negative: false }, { cond: 'Absage', action: 'Höflich verabschieden', negative: true }] },
  { tag: 'Tag 9',  label: 'Follow-up #2',                  note: 'Cal.com Terminlink einfügen',       branches: [{ cond: 'Keine Reaktion', action: 'Sequenz beenden → Nurture', negative: true }] },
];

/* ─── Workflow 05 Data ───────────────────────────────────── */
const WF05_NODES = [
  { id:  1, type: 'trigger', name: 'Schedule: Mo 8:00',       desc: 'Wöchentlicher Content-Cycle'        },
  { id:  2, type: 'http',    name: 'Trends scannen',           desc: 'Google Trends, Feedly, Reddit'      },
  { id:  3, type: 'http',    name: 'Notion: Themen laden',     desc: 'Bullet-Listen aus Backlog'          },
  { id:  4, type: 'ai',      name: 'Content-Plan erstellen',   desc: 'KI: 3–5 Themen pro Woche'          },
  { id:  5, type: 'ai',      name: 'LinkedIn-Post',            desc: 'Hook + Story + CTA'                 },
  { id:  6, type: 'ai',      name: 'Blog-Artikel',             desc: '800–1.200 Wörter, SEO'             },
  { id:  7, type: 'ai',      name: 'Newsletter-Block',         desc: 'Teaser + Kernaussage + CTA'         },
  { id:  8, type: 'ai',      name: 'Bild-Prompt',              desc: 'Creative-Briefing erstellen'        },
  { id:  9, type: 'http',    name: 'Nano Banana: Bild',        desc: 'KI-Bild generieren'                 },
  { id: 10, type: 'http',    name: 'Google Drive: Upload',     desc: 'Assets speichern'                   },
  { id: 11, type: 'http',    name: 'Notion: Entwurf',          desc: 'Inhalte in Redaktionsplan'          },
  { id: 12, type: 'output',  name: 'Slack: Freigabe',          desc: 'Preview + Approve-Button'           },
  { id: 13, type: 'wait',    name: 'Freigabe abwarten',        desc: 'Human-in-the-Loop'                  },
  { id: 14, type: 'http',    name: 'LinkedIn: Post',           desc: 'Text + Bild veröffentlichen'        },
  { id: 15, type: 'http',    name: 'CMS: Blog',                desc: 'Artikel publizieren'                },
  { id: 16, type: 'http',    name: 'Brevo: Newsletter',        desc: 'Versand an Segment'                 },
  { id: 17, type: 'http',    name: 'Instagram: Post',          desc: 'Bild + Caption veröffentlichen'     },
  { id: 18, type: 'wait',    name: '48h warten',               desc: 'Engagement sammeln'                 },
  { id: 19, type: 'http',    name: 'Engagement abrufen',       desc: 'Likes, Klicks, Opens'               },
  { id: 20, type: 'output',  name: 'Notion: Performance',      desc: 'Metriken zurückschreiben'           },
];

const WF05_IMPACT = [
  { area: 'Ideenfindung',          before: 'Ad-hoc, abhängig von Inspiration — oft wochenlang kein Content',       after: 'Systematische Trend-Erkennung + Notion-Themenliste als Backup' },
  { area: 'Content-Produktion',    before: '3–5 Std. pro Beitrag (Recherche, Schreiben, Bild, Formatieren)',       after: '15–30 Min. pro Beitrag — KI-Entwurf + Human-Review + Formatierung' },
  { area: 'Plattform-Anpassung',   before: 'Gleicher Text auf alle Kanäle kopiert oder nur ein Kanal bespielt',   after: 'Jeder Kanal bekommt plattformspezifischen Content: LinkedIn, Blog, Newsletter' },
  { area: 'Visual-Erstellung',     before: 'Canva, Stockfotos oder gar keine Bilder',                              after: 'KI-generierte Bilder via Nano Banana, markenkonform, passend zum Content' },
  { area: 'Publishing',            before: 'Manuell einloggen, copy-pasten, Zeitpunkt vergessen, Frequenz bricht', after: 'Automatisiertes Publishing in vereinbarter Reihenfolge und Frequenz' },
  { area: 'Konsistenz',            before: '2–3 Posts pro Monat, dann wieder 2 Wochen Stille',                     after: '3x LinkedIn, 1x Blog, 1x Newsletter pro Woche — durchgehend' },
  { area: 'Multi-Channel-Aufwand', before: 'Pro Kanal eigener Workflow, eigenes Format, eigener Login',            after: 'Ein Workflow bedient alle Kanäle aus einem Content-Stück' },
];

const WF05_KERNEFFEKT = 'Vom leeren Blatt bis zum veröffentlichten Beitrag auf allen Kanälen vergehen Minuten statt Tage. Der Mensch bleibt im Loop für Qualitätskontrolle — aber die gesamte Vorarbeit und Distribution übernimmt der KI-Agent.';

const WF05_TOOLS = [
  { tool: 'n8n',                        zweck: 'Workflow-Orchestrierung, Scheduling, Human-in-the-Loop-Logik',           typ: 'Self-hosted oder Cloud'       },
  { tool: 'Notion',                     zweck: 'Themen-Backlog, Content-Briefings, Redaktionsplan, Freigabe-Status',     typ: 'SaaS — API-Integration'       },
  { tool: 'OpenAI API / Anthropic API', zweck: 'Texterstellung (LinkedIn, Blog, Newsletter), Plattform-Anpassung',       typ: 'API-Key erforderlich'         },
  { tool: 'Nano Banana / DALL-E / Flux', zweck: 'KI-Bildgenerierung passend zum Content, markenkonform',                typ: 'API-Key erforderlich'         },
  { tool: 'Google Drive',              zweck: 'Generierte Bilder speichern, Content-Assets verwalten',                   typ: 'OAuth oder Service Account'   },
  { tool: 'LinkedIn API',              zweck: 'Posts veröffentlichen (Text + Bild), Scheduling',                         typ: 'OAuth 2.0 + Unternehmensseite' },
  { tool: 'Brevo / Mailchimp',         zweck: 'Newsletter versenden an definierte Segmente',                             typ: 'API-Key erforderlich'         },
  { tool: 'CMS API',                   zweck: 'Blog-Artikel veröffentlichen (WordPress / Webflow / Ghost)',              typ: 'API-Key oder Webhook'         },
  { tool: 'Instagram Graph API',       zweck: 'Bild-Posts veröffentlichen (über Facebook Business Manager)',             typ: 'API-Token erforderlich'       },
  { tool: 'Slack',                     zweck: 'Human-in-the-Loop: Freigabe-Anfragen, Content-Review mit Buttons',        typ: 'Webhook + App-Token'          },
];

const WF05_TOKENS = [
  'Notion Integration Token (für Themen-Backlog und Redaktionsplan)',
  'OpenAI oder Anthropic API-Key',
  'Nano Banana / Replicate API-Key (für Bildgenerierung)',
  'Google Drive OAuth 2.0 Credentials',
  'LinkedIn OAuth 2.0 (mit Publishing-Permission für Unternehmensseite)',
  'Brevo oder Mailchimp API-Key',
  'CMS API-Key (WordPress REST API, Webflow CMS API oder Ghost Admin API)',
  'Instagram Graph API Token (über Facebook Developer App)',
  'Slack Incoming Webhook URL + Interactive Messages (für Freigabe-Buttons)',
  'Optional: Google Trends API, Feedly API, Reddit API für Trend-Erkennung',
];

const WF05_VORAUSSETZUNGEN = [
  'Notion-Datenbank mit Content-Themen angelegt (Felder: Thema, Bullet-Points, Status, Zielplattform, Priorität)',
  'Markenrichtlinien als System-Prompt (Tonalität, Schreibstil, Formatierungsregeln pro Plattform)',
  'Bild-Stil definiert (Farben, Ästhetik, Beispiele) als Referenz für KI-Bildgenerierung',
  'Publishing-Kalender mit Frequenz und Reihenfolge festgelegt',
  'LinkedIn-Unternehmensseite mit Admin-Zugang',
  'Newsletter-Segmente in Brevo/Mailchimp angelegt',
  'CMS mit API-Zugang konfiguriert',
];

const WF05_SCHRITTE = [
  { title: 'Thema finden', text: 'Der Workflow startet auf zwei Wegen: Entweder erkennt er automatisch Trends aus Google Trends, Branchen-Feeds oder Reddit. Oder ein Teammitglied hat in Notion eine kurze Bullet-Liste hinterlegt — Thema + 3–5 Kernpunkte. Das reicht als Briefing.' },
  { title: 'Content schreiben — plattformspezifisch', text: 'Aus dem Thema generiert die KI mehrere Content-Stücke: Ein LinkedIn-Post mit starkem Hook und persönlicher Perspektive. Ein Blog-Artikel mit 800–1.200 Wörtern und SEO-Struktur. Ein Newsletter-Block mit Teaser und CTA. Jedes Stück auf die Eigenheiten der Plattform zugeschnitten.' },
  { title: 'Bild generieren', text: 'Parallel erstellt die KI ein passendes Bild über Nano Banana oder DALL-E — dem Markenstil folgend: Farbwelt, Ästhetik, Format. Für LinkedIn quadratisch oder vertikal, für den Blog ein Hero-Image im Querformat, für Instagram mit Text-Overlay.' },
  { title: 'Mensch gibt frei', text: 'Alle generierten Inhalte — Text und Bild — landen als Slack-Nachricht beim zuständigen Teammitglied. Mit einem Klick auf "Freigeben" geht der Content in die Publishing-Queue. Oder es wird manuell in Notion optimiert und dann freigegeben.' },
  { title: 'Veröffentlichen nach Plan', text: 'Nach der Freigabe veröffentlicht der Workflow die Inhalte automatisch in der vereinbarten Reihenfolge: Montag LinkedIn, Dienstag Blog, Donnerstag Newsletter, Freitag Instagram — alles zur optimalen Uhrzeit.' },
  { title: 'Performance zurückspielen', text: 'Nach 48 Stunden sammelt der Workflow Engagement-Daten (Likes, Kommentare, Klicks, Öffnungsraten) und schreibt sie zurück in den Redaktionsplan — damit das Team sieht, welche Themen funktionieren.' },
];

const WF05_NUTZEN = [
  { rolle: 'Marketing-Team',   text: 'Schluss mit Content-Blockade. Aus einer Bullet-Liste werden in Minuten fertige Beiträge für alle Kanäle. Die kreative Arbeit reduziert sich auf Review und Feinschliff.' },
  { rolle: 'Geschäftsführung', text: 'Planbare Content-Frequenz ohne zusätzliche Headcount-Kosten. Sichtbarkeit auf allen Kanälen, konsistent und ohne Unterbrechung.' },
  { rolle: 'Vertrieb',         text: 'Regelmäßiger Content auf LinkedIn und Blog schafft Vertrauen bei Leads, die über Outreach oder Ads in den Funnel kommen. Content wärmt Leads auf, bevor der erste Call stattfindet.' },
  { rolle: 'Marke',            text: 'Einheitliche Tonalität über alle Kanäle — weil die gleichen Markenrichtlinien als System-Prompt in jeder Texterstellung greifen.' },
  { rolle: 'Effizienz',        text: 'Ein Content-Stück wird zu 4–5 plattformspezifischen Formaten — maximale Reichweite bei minimalem Aufwand (Content-Repurposing on Autopilot).' },
];

const WF05_KALENDER = [
  { tag: 'Montag',    kanal: 'LinkedIn',               format: 'Post (Text + Bild)',              uhrzeit: '08:30 Uhr' },
  { tag: 'Dienstag',  kanal: 'Blog',                   format: 'Artikel (800–1.200 Wörter)',      uhrzeit: '10:00 Uhr' },
  { tag: 'Mittwoch',  kanal: 'LinkedIn',               format: 'Post (Carousel oder Text)',       uhrzeit: '08:30 Uhr' },
  { tag: 'Donnerstag', kanal: 'Newsletter',             format: 'Brevo Segment-Versand',          uhrzeit: '09:00 Uhr' },
  { tag: 'Freitag',   kanal: 'LinkedIn + Instagram',   format: 'Post + Bild-Post',                uhrzeit: '08:30 / 12:00 Uhr' },
];

/* ─── Workflow 06 Data ───────────────────────────────────── */
const WF06_NODES = [
  { id:  1, type: 'trigger', name: 'Webhook / Drive-Watch',   desc: 'Neues Video erkannt'                },
  { id:  2, type: 'http',    name: 'Video-Datei laden',       desc: 'Download von Drive / S3 / YT'       },
  { id:  3, type: 'http',    name: 'Whisper: Transkription',  desc: 'Audio zu Text + Timestamps'         },
  { id:  4, type: 'ai',      name: 'Clip-Stellen finden',     desc: 'Beste 30–90 Sek. Abschnitte'        },
  { id:  5, type: 'code',    name: 'Timestamps extrahieren',  desc: 'Start/End + Titel strukturieren'    },
  { id:  6, type: 'http',    name: 'KI-Schnitt: Clips',       desc: 'OpusClip: Schnitt + Captions'       },
  { id:  7, type: 'http',    name: 'Clips herunterladen',     desc: 'Fertige Videos abrufen'             },
  { id:  8, type: 'http',    name: 'Google Drive: Upload',    desc: 'Clips als Assets speichern'         },
  { id:  9, type: 'ai',      name: 'Instagram-Caption',       desc: 'Hashtags + Reel-Beschreibung'       },
  { id: 10, type: 'ai',      name: 'TikTok-Text',             desc: 'Trend-Hashtags + Hook'              },
  { id: 11, type: 'ai',      name: 'LinkedIn-Post',           desc: 'Kontext + CTA'                      },
  { id: 12, type: 'http',    name: 'Notion: Clip-Übersicht',  desc: 'Clips in Content-Kalender'          },
  { id: 13, type: 'output',  name: 'Slack: Clip-Preview',     desc: 'Video + Freigabe-Buttons'           },
  { id: 14, type: 'wait',    name: 'Freigabe abwarten',       desc: 'Human-in-the-Loop'                  },
  { id: 15, type: 'http',    name: 'Instagram: Reel',         desc: 'Reel + Caption veröffentlichen'     },
  { id: 16, type: 'http',    name: 'TikTok: Video',           desc: 'Upload via Posting API'             },
  { id: 17, type: 'http',    name: 'LinkedIn: Video-Post',    desc: 'Video auf Profil/Seite posten'      },
  { id: 18, type: 'wait',    name: '48h warten',              desc: 'Performance-Daten sammeln'          },
  { id: 19, type: 'http',    name: 'Metriken abrufen',        desc: 'Views, Likes, Watch-Time'           },
  { id: 20, type: 'output',  name: 'Notion: Performance',     desc: 'Metriken zurückschreiben'           },
];

const WF06_IMPACT = [
  { area: 'Clip-Auswahl',       before: 'Editor schaut komplettes Video manuell — 2–4 Std. pro Video',       after: 'KI analysiert Transkript und extrahiert beste Stellen in Minuten' },
  { area: 'Schnitt & Editing',  before: 'Pro Clip 30–60 Min. (Schnitt, Reframing, Zoom, Übergänge)',         after: 'Automatisierter Schnitt mit KI-Software — fertige Clips in Sekunden' },
  { area: 'Untertitel',         before: 'Manuell tippen oder Transkription + Formatierung — 20–40 Min.',      after: 'Automatische Captions mit Wort-für-Wort-Highlighting, stilistisch anpassbar' },
  { area: 'Output pro Video',   before: '2–3 Clips pro Woche bei Vollzeit-Editor',                           after: '10–20 Clips pro Video, sofort verfügbar' },
  { area: 'Distribution',       before: 'Jede Plattform einzeln: einloggen, hochladen, Caption, Hashtags',   after: 'Ein Klick Freigabe → automatisches Publishing auf allen Plattformen' },
  { area: 'Kosten',             before: 'Freelance-Editor: 500–1.500 Euro/Monat oder interne Vollzeitstelle', after: 'Software-Kosten: 50–200 Euro/Monat + API-Kosten' },
  { area: 'Content-Velocity',   before: '1 Longform = 2–3 Shortform-Clips in 1 Woche',                      after: '1 Longform = 10–20 Shortform-Clips in 1 Tag' },
];

const WF06_KERNEFFEKT = 'Jedes Longform-Video wird systematisch in eine Bibliothek von Shortform-Clips verwandelt — geschnitten, untertitelt, freigegeben und auf allen Plattformen verteilt. Der Mensch entscheidet nur noch: "Ja, posten" oder "Nein, überspringen."';

const WF06_TOOLS = [
  { tool: 'n8n',                        zweck: 'Workflow-Orchestrierung, Scheduling, API-Calls, Human-in-the-Loop',    typ: 'Self-hosted oder Cloud'       },
  { tool: 'KI-Schnitt-Software',        zweck: 'Automatischer Schnitt, Reframing, Captions (OpusClip, Vizard, Gling)', typ: 'SaaS — API oder Webhook'      },
  { tool: 'Whisper API / Deepgram',     zweck: 'Transkription des Longform-Videos (Grundlage für Clip-Erkennung)',     typ: 'API-Key erforderlich'         },
  { tool: 'OpenAI API / Anthropic API', zweck: 'Transkript analysieren, beste Stellen identifizieren, Captions',       typ: 'API-Key erforderlich'         },
  { tool: 'Google Drive / S3',          zweck: 'Longform-Quellvideo speichern, generierte Clips zwischenlagern',       typ: 'OAuth oder Access Keys'       },
  { tool: 'Notion / Airtable',          zweck: 'Content-Kalender, Clip-Übersicht, Freigabe-Status, Publishing-Queue', typ: 'API-Integration'              },
  { tool: 'Instagram Graph API',        zweck: 'Reels automatisch veröffentlichen (über Facebook Business Manager)',   typ: 'API-Token erforderlich'       },
  { tool: 'TikTok Content Posting API', zweck: 'Videos automatisch hochladen und veröffentlichen',                     typ: 'Developer App + API-Key'      },
  { tool: 'LinkedIn API',               zweck: 'Video-Posts auf Unternehmensseite oder persönlichem Profil',           typ: 'OAuth 2.0'                    },
  { tool: 'Slack',                      zweck: 'Human-in-the-Loop: Clip-Preview, Freigabe-Buttons, Status-Updates',    typ: 'Webhook + Interactive Messages' },
];

const WF06_TOKENS = [
  'KI-Schnitt-Tool API-Key oder Webhook-URL (OpusClip API, Vizard API etc.)',
  'OpenAI Whisper API-Key oder Deepgram API-Key (für Transkription)',
  'OpenAI oder Anthropic API-Key (für Clip-Auswahl und Caption-Generierung)',
  'Google Drive OAuth 2.0 oder AWS S3 Access Keys',
  'Notion Integration Token oder Airtable API-Key',
  'Instagram Graph API Token (über Facebook Developer App, mit Publishing-Permission)',
  'TikTok Content Posting API Key (Developer-Account erforderlich)',
  'LinkedIn OAuth 2.0 (mit Video-Publishing-Permission)',
  'Slack App Token mit Interactive Messages Scope',
];

const WF06_VORAUSSETZUNGEN = [
  'Longform-Content vorhanden oder regelmäßig geplant (YouTube-Videos, Podcasts, Webinare, Interviews)',
  'KI-Schnitt-Tool Account eingerichtet und API-Zugang aktiviert',
  'Stil-Vorgaben definiert: Caption-Font, Farben, Highlight-Stil, Intro/Outro, Wasserzeichen',
  'Publishing-Kalender mit Frequenz und Plattform-Zuordnung (z. B. 2 Reels/Tag, 1 TikTok/Tag)',
  'Plattform-Accounts verifiziert (Instagram Business, TikTok Creator/Business, LinkedIn Unternehmensseite)',
  'Hashtag-Sets pro Plattform und Themenbereich vorbereitet',
];

const WF06_SCHRITTE = [
  { title: 'Video als Input', text: 'Ein neues YouTube-Video, eine Podcast-Episode oder ein Webinar-Recording wird in Google Drive hochgeladen — oder der Workflow erkennt automatisch ein neues Video auf dem Kanal und startet von selbst.' },
  { title: 'Transkription', text: 'Die Audiospur wird per Whisper API in Text umgewandelt — sekundengenau, mit Zeitstempeln für jedes Wort. Das ist die Grundlage für alles Weitere.' },
  { title: 'Beste Stellen finden', text: 'Die KI analysiert das komplette Transkript und identifiziert Abschnitte für Shortform: starke Aussagen, kontroverse Meinungen, Aha-Momente, emotionale Höhepunkte, abgeschlossene Gedanken in 30–90 Sekunden. Aus einem 45-Minuten-Video findet sie typischerweise 10–20 potenzielle Clips.' },
  { title: 'Schnitt & Editing', text: 'Die ausgewählten Abschnitte werden an die KI-Schnitt-Software übergeben. Diese schneidet die Clips, reframet auf 9:16 (Hochformat), setzt dynamische Zooms und fügt animierte Captions mit Wort-für-Wort-Highlighting hinzu.' },
  { title: 'Plattform-Texte generieren', text: 'Für jeden Clip erstellt die KI plattformspezifische Beschreibungen: Instagram-Caption mit Hashtags, TikTok-Text mit Trend-Hashtags, LinkedIn-Post mit Kontext und CTA.' },
  { title: 'Mensch gibt frei', text: 'Alle fertigen Clips mit Vorschau-Video, Caption und geplanter Plattform landen als Slack-Nachricht. Per Klick auf "Freigeben" geht der Clip in die Queue. "Überspringen" entfernt ihn. "Bearbeiten" öffnet Notion für manuelle Anpassungen.' },
  { title: 'Automatisches Publishing & Tracking', text: 'Freigegebene Clips werden nach Publishing-Kalender veröffentlicht. Nach 48 Stunden werden Metriken (Views, Likes, Watch-Time) abgerufen und in den Content-Kalender zurückgeschrieben.' },
];

const WF06_NUTZEN = [
  { rolle: 'Marketing-Team',   text: 'Content-Repurposing auf Autopilot. Jedes Longform-Stück wird systematisch ausgeschlachtet — kein Potenzial bleibt auf dem Tisch.' },
  { rolle: 'Geschäftsführung', text: 'Massive Reichweitensteigerung ohne zusätzliche Produktionskosten. Ein 200 Euro/Monat KI-Tool ersetzt einen 1.500 Euro/Monat Freelance-Editor bei 5x höherem Output.' },
  { rolle: 'Marke',            text: 'Konsistente Shortform-Präsenz auf allen relevanten Plattformen. Kein Tag ohne Content. Algorithmen belohnen Regelmäßigkeit — dieser Workflow liefert sie.' },
  { rolle: 'Vertrieb',         text: 'Shortform-Content auf LinkedIn und Instagram wärmt Leads auf, baut Expertenstatus auf und macht den Erstkontakt leichter.' },
  { rolle: 'Effizienz',        text: '1 Longform-Input → 10–20 Shortform-Outputs × 3 Plattformen = 30–60 Content-Pieces aus einem einzigen Produktionstag.' },
];

const WF06_MULTIPLIKATION = [
  { input: '1 YouTube-Video (45 Min.)',  output: '12–15 Clips',  plattformen: 'Instagram, TikTok, LinkedIn',  gesamt: '36–45 Pieces' },
  { input: '1 Podcast-Episode (60 Min.)', output: '15–20 Clips', plattformen: 'Instagram, TikTok, LinkedIn',  gesamt: '45–60 Pieces' },
  { input: '4 Videos / Monat',           output: '50–70 Clips',  plattformen: '3 Plattformen',                gesamt: '150–210 Pieces/Monat' },
];

/* ─── Workflow 07 Data ───────────────────────────────────── */
const WF07_NODES = [
  { id:  1, type: 'trigger', name: 'Notion Webhook',          desc: 'Neues Briefing erkannt'              },
  { id:  2, type: 'http',    name: 'Notion: Input laden',     desc: 'Bullet-Liste, Rohdaten, Docs'        },
  { id:  3, type: 'logic',   name: 'Voice Memo?',             desc: 'Audio-Datei vorhanden?'              },
  { id:  4, type: 'http',    name: 'Whisper: Transkription',  desc: 'Voice Memo zu Text'                  },
  { id:  5, type: 'code',    name: 'Inputs zusammenführen',   desc: 'Transkript + Daten mergen'           },
  { id:  6, type: 'ai',      name: 'Struktur erstellen',      desc: 'Kapitel + Story-Architektur'         },
  { id:  7, type: 'ai',      name: 'Kapitel schreiben',       desc: 'Fließtext, Callouts, CTAs'           },
  { id:  8, type: 'ai',      name: 'Bild-Prompts',            desc: 'Cover + Illustrationen briefen'      },
  { id:  9, type: 'http',    name: 'Nano Banana: Visuals',    desc: 'Cover + Grafiken generieren'         },
  { id: 10, type: 'http',    name: 'Drive: Assets speichern', desc: 'Bilder + Texte ablegen'              },
  { id: 11, type: 'code',    name: 'HTML-Layout bauen',       desc: 'Branding-Template befüllen'          },
  { id: 12, type: 'code',    name: 'PDF rendern',             desc: 'HTML zu PDF konvertieren'            },
  { id: 13, type: 'output',  name: 'Slack: Preview',          desc: 'Lead Magnet + Freigabe'              },
  { id: 14, type: 'wait',    name: 'Freigabe abwarten',       desc: 'Human-in-the-Loop'                   },
  { id: 15, type: 'http',    name: 'Drive: PDF Upload',       desc: 'Finale Version + Share-Link'         },
  { id: 16, type: 'http',    name: 'Landing Page updaten',    desc: 'Download-URL aktualisieren'          },
  { id: 17, type: 'http',    name: 'Brevo: Automation',       desc: 'Download-Mail konfigurieren'         },
  { id: 18, type: 'http',    name: 'Tracking einrichten',     desc: 'Lesezeit + Scroll-Tracking'          },
  { id: 19, type: 'trigger', name: 'Engagement-Webhook',      desc: 'Lesezeit > 10 Min. erkannt'          },
  { id: 20, type: 'crm',     name: 'Lead Score updaten',      desc: 'Engagement ins CRM schreiben'        },
  { id: 21, type: 'output',  name: 'Slack: Hot Lead',         desc: 'Vertriebler informieren'             },
];

const WF07_IMPACT = [
  { area: 'Produktionszeit',      before: '2–4 Wochen (Copywriter, Designer, Feedback-Loops, Korrekturen)', after: '2–4 Stunden — von der Idee zum fertigen, designten Lead Magnet' },
  { area: 'Kosten pro Stück',     before: '2.000–5.000 Euro (Texter + Designer + Projektmanagement)',       after: 'Unter 50 Euro an API-Kosten + eigene Zeit für Review' },
  { area: 'Beteiligte Personen',  before: '3–4 (Fachexperte, Copywriter, Designer, Projektmanager)',        after: '1 Person — Expertise liefern, KI macht den Rest' },
  { area: 'Output-Volumen',       before: '1–2 Lead Magnets pro Quartal, weil jeder ein Projekt ist',      after: '1 Lead Magnet pro Woche — für jede Zielgruppe ein eigenes Stück' },
  { area: 'Personalisierung',     before: 'Ein generisches PDF für alle Zielgruppen',                       after: 'Hyper-spezifischer Content pro Segment, Produktionskosten marginal' },
  { area: 'Nachverfolgung',       before: 'PDF versendet, danach Blindflug — keine Ahnung ob jemand liest', after: 'Tracking der Lesezeit, Scroll-Tiefe → automatisches Lead Scoring' },
];

const WF07_KERNEFFEKT = 'Lead Magnets sind nicht mehr Projekte, sondern Prozesse. Die Expertise kommt vom Menschen — als Voice Memo, Stichpunkte oder Rohdaten. Alles andere — Struktur, Text, Design, Distribution und die Nachverfolgung — übernimmt der Workflow.';

const WF07_TOOLS = [
  { tool: 'n8n',                        zweck: 'Workflow-Orchestrierung, API-Calls, Human-in-the-Loop, Scheduling',   typ: 'Self-hosted oder Cloud'         },
  { tool: 'Notion',                     zweck: 'Input-Sammlung (Bullet-Listen, Rohdaten, Docs) + Freigabe-Status',    typ: 'SaaS — API-Integration'         },
  { tool: 'Whisper API / Deepgram',     zweck: 'Voice Memos transkribieren — gesprochene Expertise in Text',         typ: 'API-Key erforderlich'           },
  { tool: 'OpenAI API / Anthropic API', zweck: 'Struktur erstellen, Kapitel schreiben, Headlines, CTAs',              typ: 'API-Key erforderlich'           },
  { tool: 'Nano Banana / DALL-E / Flux', zweck: 'Cover-Design, Grafiken und Illustrationen für den Lead Magnet',     typ: 'API-Key erforderlich'           },
  { tool: 'Puppeteer / WeasyPrint',     zweck: 'HTML zu PDF rendern — professionelles Layout mit Branding',           typ: 'Self-hosted oder n8n Code-Node' },
  { tool: 'Google Drive',              zweck: 'Fertige PDFs speichern, Sharing-Links generieren, Asset-Management',   typ: 'OAuth oder Service Account'     },
  { tool: 'Brevo / Mailchimp',         zweck: 'Lead Magnet per E-Mail ausliefern (nach Formular-Eintrag)',            typ: 'API-Key erforderlich'           },
  { tool: 'Slack',                     zweck: 'Human-in-the-Loop: Preview, Freigabe, Iterationsanfragen',             typ: 'Webhook + Interactive Messages' },
];

const WF07_TOKENS = [
  'Notion Integration Token (für Input-Datenbank und Freigabe-Status)',
  'OpenAI Whisper API-Key oder Deepgram API-Key (für Transkription)',
  'OpenAI oder Anthropic API-Key (Claude ideal für 10–30+ Seiten Kontextfenster)',
  'Nano Banana / Replicate API-Key (für Bildgenerierung)',
  'Google Drive OAuth 2.0 Credentials',
  'Brevo oder Mailchimp API-Key',
  'Slack App Token mit Interactive Messages Scope',
  'Optional: Analytics-Zugang (Plausible, Fathom oder Custom-Tracking) für Lesezeit-Messung',
];

const WF07_VORAUSSETZUNGEN = [
  'Brand Voice dokumentiert (Tonalität, Sprachstil, Do\'s & Don\'ts) — als System-Prompt für die KI',
  'Design-Vorgaben definiert (Farben, Fonts, Logo, Layout-Stil) — als HTML/CSS Template oder Referenz',
  'Zielgruppen-Profile klar: Für wen ist der Lead Magnet? Welches Problem? Welcher CTA?',
  'Mindestens ein Input-Format bereit: Voice Memo, Notion-Stichpunkte, bestehendes Dokument oder Rohdaten',
  'Landing Page oder Formular für Lead-Erfassung + Download-Auslieferung eingerichtet',
];

const WF07_SCHRITTE = [
  { title: 'Expertise einspeisen', text: 'Du nimmst ein Voice Memo auf und erzählst frei, was du weißt. Oder du schreibst in Notion eine Bullet-Liste mit Kernideen. Oder du lädst bestehende Dokumente, Links, Kundenfragen oder Rohdaten hoch. Der Workflow nimmt alles — er braucht nur Rohmaterial.' },
  { title: 'Kontext und Rahmen setzen', text: 'In einem kurzen Briefing-Formular gibst du an: Wer ist die Zielgruppe? Was ist die Kernbotschaft? Welchen CTA soll der Lead Magnet haben? Welches Format — Playbook, Whitepaper, Checkliste, Guide? Das dauert 2 Minuten.' },
  { title: 'Transkription (bei Voice Memo)', text: 'Wenn der Input ein Voice Memo ist, transkribiert Whisper die Aufnahme in Text — wortgenau. Die gesprochene Expertise wird zur Textgrundlage.' },
  { title: 'KI baut die Struktur', text: 'Aus dem Rohmaterial erstellt die KI eine vollständige Dokumentenstruktur: Kapitel-Aufbau, Headlines, Fließtext, Callout-Boxen, Visualisierungsvorgaben und integrierte CTAs. Das Ergebnis ist ein durchdachter Lead Magnet mit 10–30+ Seiten und klarer Story-Architektur.' },
  { title: 'Visuals und Design', text: 'Die KI erstellt passende Grafiken (Cover-Design, Kapitel-Illustrationen, Infografik-Elemente) im Markenstil. Der komplette Inhalt wird in ein professionelles HTML-Template gegossen — mit Branding, Farben und Typografie — und zu PDF gerendert.' },
  { title: 'Mensch reviewt und gibt frei', text: 'Der fertige Lead Magnet landet als Preview in Slack. Du schaust drüber, gibst Feedback oder änderst Stellen direkt in Notion. Wenn alles passt: Freigabe per Klick.' },
  { title: 'Distribution und Tracking', text: 'Der freigegebene Lead Magnet wird in Google Drive gespeichert, der Download-Link auf der Landing Page aktualisiert und das E-Mail-System konfiguriert. Wer ihn öffnet, wird getrackt — Lesezeit, Scroll-Tiefe, CTA-Klicks fließen direkt ins Lead Scoring.' },
];

const WF07_NUTZEN = [
  { rolle: 'Marketing',        text: 'Lead Magnets auf Knopfdruck. Für jede Kampagne, jede Zielgruppe, jedes Thema ein eigenes Stück — statt einem generischen PDF für alle.' },
  { rolle: 'Vertrieb',         text: 'Leads, die den Lead Magnet tatsächlich gelesen haben, sind vorqualifiziert. Das Tracking zeigt Engagement-Level — kein Raten ob ein Lead wirklich interessiert ist.' },
  { rolle: 'Geschäftsführung', text: 'Agentur-Budget für Lead-Magnet-Produktion fällt weg. Eine Person produziert in einem Nachmittag, wofür vorher ein Team Wochen gebraucht hat.' },
  { rolle: 'Positionierung',   text: 'Regelmäßige, hochwertige Lead Magnets bauen Thought Leadership auf. Wer jede Woche ein neues Playbook veröffentlicht, wird als Experte wahrgenommen.' },
  { rolle: 'Conversion',       text: 'Hyper-spezifische Lead Magnets konvertieren 2–5x besser als generische. Segment-spezifischer Content schlägt einen allgemeinen Guide jedes Mal.' },
];

const WF07_USECASES = [
  { format: 'Playbook / Guide',       einsatz: 'Schritt-für-Schritt-Anleitung zu einem spezifischen Thema',    seiten: '15–30 Seiten'           },
  { format: 'Whitepaper / Report',    einsatz: 'Datenbasierte Analyse, Branchentrends, Benchmark-Daten',        seiten: '10–20 Seiten'           },
  { format: 'Checkliste / Template',  einsatz: 'Sofort anwendbare Tools, Frameworks, Vorlagen',                 seiten: '5–10 Seiten'            },
  { format: 'Case Study',             einsatz: 'Kundenerfolgsgeschichte mit Zahlen und Methodik',               seiten: '8–15 Seiten'            },
  { format: 'E-Mail-Kurs-Inhalte',    einsatz: '5–7 Lektionen als Content-Serie',                              seiten: '3–5 Seiten pro Lektion' },
  { format: 'Webinar-Workbook',       einsatz: 'Begleitdokument zu einem Webinar oder Workshop',               seiten: '10–20 Seiten'           },
  { format: 'Sales Battle Cards',     einsatz: 'Einwandbehandlungen, Positionierung vs. Wettbewerb',            seiten: '5–10 Seiten'            },
  { format: 'Onboarding-Dokumente',   einsatz: 'Einführungsmaterial für neue Kunden oder Mitarbeiter',         seiten: '10–25 Seiten'           },
];

const WF07_SCORING = [
  { signal: 'Download ohne Öffnung',           score: '+5',  aktion: 'Keine — Lead bleibt in Nurture',                              color: '#555' },
  { signal: 'Geöffnet, < 2 Min. gelesen',      score: '+10', aktion: 'Reminder-Mail nach 3 Tagen: "Hast du schon reingeschaut?"',   color: '#6b7280' },
  { signal: '2–10 Min. Lesezeit',              score: '+25', aktion: 'Follow-up-Mail mit vertiefendem Content',                    color: '#f59e0b' },
  { signal: '> 10 Min. Lesezeit',              score: '+50', aktion: 'Follow-up-Mail + Slack-Alert an Vertriebler',                color: '#22c55e' },
  { signal: 'CTA im Lead Magnet geklickt',     score: '+75', aktion: 'Termin-Vorschlag automatisch senden',                        color: '#a78bfa' },
  { signal: 'Bis zum letzten Kapitel gescrollt', score: '+40', aktion: 'Lead als "High Intent" markieren',                         color: '#22c55e' },
];

/* ─── Shared Sub-Components ─────────────────────────────── */

function WorkflowCanvas({ nodes }) {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX    = useRef(0);
  const scrollLeft = useRef(0);
  const [hovered, setHovered] = useState(null);

  const CANVAS_W = PAD_X * 2 + nodes.length * NODE_W + (nodes.length - 1) * GAP;
  const CANVAS_H = PAD_Y * 2 + NODE_H;
  const nx = (i) => PAD_X + i * (NODE_W + GAP);
  const ny = () => PAD_Y;
  const py = () => PAD_Y + NODE_H / 2;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onDown = (e) => {
      isDragging.current = true;
      startX.current = e.pageX - el.offsetLeft;
      scrollLeft.current = el.scrollLeft;
      el.style.cursor = 'grabbing';
    };
    const onMove = (e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      el.scrollLeft = scrollLeft.current - (e.pageX - el.offsetLeft - startX.current) * 1.2;
    };
    const onUp = () => { isDragging.current = false; el.style.cursor = 'grab'; };
    el.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      el.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      className="wf-canvas-scroll"
      style={{ overflowX: 'auto', cursor: 'grab', userSelect: 'none', WebkitUserSelect: 'none', borderRadius: 12, border: '1px solid #161616' }}
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
          <span style={{ fontSize: 12, color: '#a78bfa', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>{row.tool}</span>
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
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, color: '#22c55e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', paddingTop: 2, minWidth: 100, flexShrink: 0 }}>{item.rolle}</span>
          <span style={{ fontSize: 13, color: c.textSecondary, lineHeight: 1.55 }}>{item.text}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Section Label ──────────────────────────────────────── */
function SubHeading({ children }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 600, color: '#333', textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>
      {children}
    </div>
  );
}

/* ─── Main Export ────────────────────────────────────────── */
export function DemandGenWorkflows() {
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
        .wf-canvas-scroll::-webkit-scrollbar { height: 4px; }
        .wf-canvas-scroll::-webkit-scrollbar-track { background: transparent; }
        .wf-canvas-scroll::-webkit-scrollbar-thumb { background: rgba(34,197,94,0.18); border-radius: 2px; }
      `}</style>

      {/* ── Engine Header ── */}
      <Reveal>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 14px', borderRadius: 100, border: '1px solid rgba(34,197,94,0.22)', background: 'rgba(34,197,94,0.06)', marginBottom: 32 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 6px #22c55e' }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.09em' }}>Demand Generation Engine</span>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: c.white, fontWeight: 700, margin: '0 0 12px', lineHeight: 1.25 }}>
          Die Automatisierungs-Workflows
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p style={{ fontSize: 15, color: c.textSecondary, margin: '0 0 56px', lineHeight: 1.65, maxWidth: 580 }}>
          Jeder Workflow bildet einen konkreten Prozess der Demand Gen Engine ab, der vollautomatisch oder mit minimalem menschlichem Eingriff ablauft. Hier sehen Sie jeden Schritt, jedes Tool und die messbaren Auswirkungen.
        </p>
      </Reveal>

      {/* ══════════════════════════════════════════════════════
          WORKFLOW 01
      ══════════════════════════════════════════════════════ */}

      <Reveal delay={0.12}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#363636', padding: '3px 8px', borderRadius: 4, border: '1px solid #1c1c1c', letterSpacing: '0.06em' }}>
            WF-01
          </span>
          <h3 style={{ fontSize: 'clamp(16px, 2.2vw, 20px)', color: c.textPrimary, fontWeight: 700, margin: 0 }}>
            Scraping & Erstellung einer Prospecting-Liste
          </h3>
        </div>
      </Reveal>

      <Reveal delay={0.14}>
        <p style={{ fontSize: 13.5, color: '#4a4a4a', margin: '0 0 20px', lineHeight: 1.6 }}>
          Multi-Source Scraping, E-Mail-Findung via API, KI-Webanalyse und personalisierte IceBreaker-Generierung. Der gesamte Rechercheprozess wird vom Vertrieb entkoppelt.
        </p>
      </Reveal>

      {/* Canvas */}
      <Reveal delay={0.16}>
        <WorkflowCanvas nodes={WF01_NODES} />
        <NodeLegend />
      </Reveal>

      {/* Auswirkungen */}
      <Reveal delay={0.18}>
        <div style={{ marginTop: 40 }}>
          <SubHeading>Auswirkungen des Workflows</SubHeading>
          <ImpactTable rows={WF01_IMPACT} />
          <KerneffektBox text={WF01_KERNEFFEKT} />
        </div>
      </Reveal>

      {/* Anforderungen */}
      <Reveal delay={0.2}>
        <div style={{ marginTop: 40 }}>
          <SubHeading>Anforderungen — Systeme & Tools</SubHeading>
          <ToolsTable tools={WF01_TOOLS} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 24, marginTop: 24 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>API-Tokens & Zugänge</div>
              <BulletList items={WF01_TOKENS} color='#3b82f6' />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Voraussetzungen</div>
              <BulletList items={WF01_VORAUSSETZUNGEN} color='#f59e0b' />
            </div>
          </div>
        </div>
      </Reveal>

      {/* Wie es funktioniert */}
      <Reveal delay={0.22}>
        <div style={{ marginTop: 40 }}>
          <SubHeading>Wie es funktioniert</SubHeading>
          <p style={{ fontSize: 13, color: '#3a3a3a', margin: '0 0 20px', lineHeight: 1.6 }}>
            Stell dir vor, du hättest einen Mitarbeiter, der den ganzen Tag nichts anderes macht als Leads finden, prüfen, anreichern und aufbereiten — ohne Pause, ohne Tippfehler, hunderte Leads pro Tag.
          </p>
          <SimpleExplanation steps={WF01_SCHRITTE} />
        </div>
      </Reveal>

      {/* Nutzen */}
      <Reveal delay={0.24}>
        <div style={{ marginTop: 32 }}>
          <SubHeading>Nutzen nach Zielgruppe</SubHeading>
          <NutzenList items={WF01_NUTZEN} />
        </div>
      </Reveal>

      {/* ══════════════════════════════════════════════════════
          WORKFLOW 02
      ══════════════════════════════════════════════════════ */}

      <Reveal>
        <div style={{ margin: '64px 0 0', borderTop: '1px solid #111', paddingTop: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#363636', padding: '3px 8px', borderRadius: 4, border: '1px solid #1c1c1c', letterSpacing: '0.06em' }}>
              WF-02
            </span>
            <h3 style={{ fontSize: 'clamp(16px, 2.2vw, 20px)', color: c.textPrimary, fontWeight: 700, margin: 0 }}>
              Ads erstellen, schalten & verwalten
            </h3>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <p style={{ fontSize: 13.5, color: '#4a4a4a', margin: '0 0 20px', lineHeight: 1.6 }}>
          Vom Kampagnen-Briefing über KI-generierte Texte und Creatives bis zur automatischen Veröffentlichung im Meta Werbekonto — inklusive Fehler-Monitoring via Slack.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <WorkflowCanvas nodes={WF02_NODES} />
        <NodeLegend />
      </Reveal>

      <Reveal delay={0.14}>
        <div style={{ marginTop: 40 }}>
          <SubHeading>Auswirkungen des Workflows</SubHeading>
          <ImpactTable rows={WF02_IMPACT} />
          <KerneffektBox text={WF02_KERNEFFEKT} />
        </div>
      </Reveal>

      <Reveal delay={0.16}>
        <div style={{ marginTop: 40 }}>
          <SubHeading>Anforderungen — Systeme & Tools</SubHeading>
          <ToolsTable tools={WF02_TOOLS} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 24, marginTop: 24 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>API-Tokens & Zugänge</div>
              <BulletList items={WF02_TOKENS} color='#3b82f6' />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Voraussetzungen</div>
              <BulletList items={WF02_VORAUSSETZUNGEN} color='#f59e0b' />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.18}>
        <div style={{ marginTop: 40 }}>
          <SubHeading>Wie es funktioniert</SubHeading>
          <p style={{ fontSize: 13, color: '#3a3a3a', margin: '0 0 20px', lineHeight: 1.6 }}>
            Stell dir vor, du hättest eine komplette Werbeagentur als Mitarbeiter, die auf Knopfdruck arbeitet.
          </p>
          <SimpleExplanation steps={WF02_SCHRITTE} />
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div style={{ marginTop: 32 }}>
          <SubHeading>Nutzen nach Zielgruppe</SubHeading>
          <NutzenList items={WF02_NUTZEN} />
        </div>
      </Reveal>

      {/* ══════════════════════════════════════════════════════
          WORKFLOW 03
      ══════════════════════════════════════════════════════ */}

      <Reveal>
        <div style={{ margin: '64px 0 0', borderTop: '1px solid #111', paddingTop: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#363636', padding: '3px 8px', borderRadius: 4, border: '1px solid #1c1c1c', letterSpacing: '0.06em' }}>
              WF-03
            </span>
            <h3 style={{ fontSize: 'clamp(16px, 2.2vw, 20px)', color: c.textPrimary, fontWeight: 700, margin: 0 }}>
              Ads Tracking, Auswertung & Management
            </h3>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <p style={{ fontSize: 13.5, color: '#4a4a4a', margin: '0 0 20px', lineHeight: 1.6 }}>
          Automatischer Daten-Pull aus Meta Ads auf Campaign-, Ad-Set- und Ad-Level, regelbasierte KPI-Auswertung, KI-Analyse mit Handlungsempfehlungen, automatische Slide-Reports und Echtzeit-Warnungen via Slack.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <WorkflowCanvas nodes={WF03_NODES} />
        <NodeLegend />
      </Reveal>

      <Reveal delay={0.14}>
        <div style={{ marginTop: 40 }}>
          <SubHeading>Auswirkungen des Workflows</SubHeading>
          <ImpactTable rows={WF03_IMPACT} />
          <KerneffektBox text={WF03_KERNEFFEKT} />
        </div>
      </Reveal>

      <Reveal delay={0.16}>
        <div style={{ marginTop: 40 }}>
          <SubHeading>Anforderungen — Systeme & Tools</SubHeading>
          <ToolsTable tools={WF03_TOOLS} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 24, marginTop: 24 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>API-Tokens & Zugänge</div>
              <BulletList items={WF03_TOKENS} color='#3b82f6' />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Voraussetzungen</div>
              <BulletList items={WF03_VORAUSSETZUNGEN} color='#f59e0b' />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.18}>
        <div style={{ marginTop: 40 }}>
          <SubHeading>Wie es funktioniert</SubHeading>
          <p style={{ fontSize: 13, color: '#3a3a3a', margin: '0 0 20px', lineHeight: 1.6 }}>
            Stell dir vor, du hättest einen Analysten, der 24 Stunden am Tag deine Werbekampagnen überwacht und dir jeden Morgen einen fertigen Report auf den Tisch legt — plus sofortige Warnungen, wenn etwas aus dem Ruder läuft.
          </p>
          <SimpleExplanation steps={WF03_SCHRITTE} />
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div style={{ marginTop: 32 }}>
          <SubHeading>Nutzen nach Zielgruppe</SubHeading>
          <NutzenList items={WF03_NUTZEN} />
        </div>
      </Reveal>

      {/* ══════════════════════════════════════════════════════
          WORKFLOW 04
      ══════════════════════════════════════════════════════ */}

      <Reveal>
        <div style={{ margin: '64px 0 0', borderTop: '1px solid #111', paddingTop: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#363636', padding: '3px 8px', borderRadius: 4, border: '1px solid #1c1c1c', letterSpacing: '0.06em' }}>
              WF-04
            </span>
            <h3 style={{ fontSize: 'clamp(16px, 2.2vw, 20px)', color: c.textPrimary, fontWeight: 700, margin: 0 }}>
              LinkedIn-Outreach
            </h3>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <p style={{ fontSize: 13.5, color: '#4a4a4a', margin: '0 0 20px', lineHeight: 1.6 }}>
          Automatisierte Vernetzungsanfragen (200/Woche), personalisierte Pitch-Sequenzen, KI-gestützte Qualifizierung und Follow-up-Logik mit Blacklist-Management und Terminvereinbarung — innerhalb aller LinkedIn-Limits.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <WorkflowCanvas nodes={WF04_NODES} />
        <NodeLegend />
      </Reveal>

      <Reveal delay={0.14}>
        <div style={{ marginTop: 40 }}>
          <SubHeading>Auswirkungen des Workflows</SubHeading>
          <ImpactTable rows={WF04_IMPACT} />
          <KerneffektBox text={WF04_KERNEFFEKT} />
        </div>
      </Reveal>

      {/* LinkedIn Limits + Arbeitslisten */}
      <Reveal delay={0.16}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 24, marginTop: 40 }}>

          {/* LinkedIn Limits */}
          <div>
            <SubHeading>LinkedIn-Limits (Sicherer Bereich)</SubHeading>
            <div style={{ borderRadius: 8, border: '1px solid #1a1a1a', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.9fr 1.4fr', background: '#0a0a0a', borderBottom: '1px solid #1a1a1a', padding: '8px 14px' }}>
                {['Aktion', 'Limit', 'Anmerkung'].map((h, i) => (
                  <span key={i} style={{ fontSize: 10, color: '#3a3a3a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{h}</span>
                ))}
              </div>
              {WF04_LIMITS.map((row, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.9fr 1.4fr', padding: '9px 14px', borderBottom: i < WF04_LIMITS.length - 1 ? '1px solid #0f0f0f' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.008)', alignItems: 'start' }}>
                  <span style={{ fontSize: 12, color: c.textPrimary, fontWeight: 500 }}>{row.aktion}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#22c55e', fontWeight: 600 }}>{row.limit}</span>
                  <span style={{ fontSize: 11, color: '#3e3e3e' }}>{row.anmerkung}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Arbeitslisten */}
          <div>
            <SubHeading>Arbeitslisten</SubHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {WF04_LISTEN.map((item, i) => {
                const colors = { Pipeline: '#3b82f6', 'In Progress': '#f59e0b', Connected: '#22c55e', Qualified: '#a78bfa', Blacklist: '#ef4444' };
                const col = colors[item.liste] || '#888';
                return (
                  <div key={i} style={{ display: 'flex', gap: 0, borderRadius: 6, border: '1px solid #1a1a1a', overflow: 'hidden' }}>
                    <div style={{ width: 3, background: col, flexShrink: 0 }} />
                    <div style={{ padding: '9px 12px', flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: col, fontWeight: 700 }}>{item.liste}</span>
                      </div>
                      <div style={{ fontSize: 11, color: '#3a3a3a', lineHeight: 1.4 }}>{item.status}</div>
                      <div style={{ fontSize: 11, color: '#2a2a2a', marginTop: 2 }}>{item.aktion}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Outreach-Sequenz */}
      <Reveal delay={0.18}>
        <div style={{ marginTop: 40 }}>
          <SubHeading>Outreach-Sequenz</SubHeading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {WF04_SEQUENZ.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 0, alignItems: 'stretch' }}>
                {/* Timeline line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 48, flexShrink: 0 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: '#22c55e', fontWeight: 700, textAlign: 'center', lineHeight: 1.1 }}>{step.tag.replace('Tag ', '')}</span>
                  </div>
                  {i < WF04_SEQUENZ.length - 1 && (
                    <div style={{ width: 1, flex: 1, background: '#1a1a1a', margin: '4px 0' }} />
                  )}
                </div>

                {/* Content */}
                <div style={{ flex: 1, paddingBottom: 24, paddingLeft: 12 }}>
                  <div style={{ fontSize: 11, color: '#888', fontFamily: "'JetBrains Mono', monospace", marginBottom: 2 }}>{step.tag}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary, marginBottom: 4 }}>{step.label}</div>
                  <div style={{ fontSize: 11.5, color: '#3a3a3a', marginBottom: 10 }}>{step.note}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {step.branches.map((b, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 4, background: b.negative ? 'rgba(239,68,68,0.06)' : 'rgba(34,197,94,0.06)', border: `1px solid ${b.negative ? 'rgba(239,68,68,0.2)' : 'rgba(34,197,94,0.2)'}` }}>
                        <span style={{ fontSize: 10, color: b.negative ? '#555' : '#444', fontFamily: "'JetBrains Mono', monospace" }}>{b.cond}:</span>
                        <span style={{ fontSize: 10.5, color: b.negative ? '#ef4444' : '#22c55e', fontWeight: 600 }}>{b.action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div style={{ marginTop: 40 }}>
          <SubHeading>Anforderungen — Systeme & Tools</SubHeading>
          <ToolsTable tools={WF04_TOOLS} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 24, marginTop: 24 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>API-Tokens & Zugänge</div>
              <BulletList items={WF04_TOKENS} color='#3b82f6' />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Voraussetzungen</div>
              <BulletList items={WF04_VORAUSSETZUNGEN} color='#f59e0b' />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.22}>
        <div style={{ marginTop: 40 }}>
          <SubHeading>Wie es funktioniert</SubHeading>
          <p style={{ fontSize: 13, color: '#3a3a3a', margin: '0 0 20px', lineHeight: 1.6 }}>
            Stell dir vor, du hättest einen SDR, der jeden Tag pünktlich und systematisch dein LinkedIn-Netzwerk aufbaut — ohne einen einzigen Lead zu vergessen.
          </p>
          <SimpleExplanation steps={WF04_SCHRITTE} />
        </div>
      </Reveal>

      <Reveal delay={0.24}>
        <div style={{ marginTop: 32 }}>
          <SubHeading>Nutzen nach Zielgruppe</SubHeading>
          <NutzenList items={WF04_NUTZEN} />
        </div>
      </Reveal>

      {/* ══════════════════════════════════════════════════════
          WORKFLOW 05
      ══════════════════════════════════════════════════════ */}

      <Reveal>
        <div style={{ margin: '64px 0 0', borderTop: '1px solid #111', paddingTop: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#363636', padding: '3px 8px', borderRadius: 4, border: '1px solid #1c1c1c', letterSpacing: '0.06em' }}>
              WF-05
            </span>
            <h3 style={{ fontSize: 'clamp(16px, 2.2vw, 20px)', color: c.textPrimary, fontWeight: 700, margin: 0 }}>
              Content-Erstellung & Distribution
            </h3>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <p style={{ fontSize: 13.5, color: '#4a4a4a', margin: '0 0 20px', lineHeight: 1.6 }}>
          Trend-Erkennung und Notion-Briefings werden zu plattformspezifischem Content mit KI-generierten Bildern — nach Human-in-the-Loop-Freigabe automatisch auf LinkedIn, Blog, Newsletter und Instagram veröffentlicht.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <WorkflowCanvas nodes={WF05_NODES} />
        <NodeLegend />
      </Reveal>

      <Reveal delay={0.14}>
        <div style={{ marginTop: 40 }}>
          <SubHeading>Auswirkungen des Workflows</SubHeading>
          <ImpactTable rows={WF05_IMPACT} />
          <KerneffektBox text={WF05_KERNEFFEKT} />
        </div>
      </Reveal>

      {/* Publishing-Kalender */}
      <Reveal delay={0.16}>
        <div style={{ marginTop: 40 }}>
          <SubHeading>Publishing-Kalender (Beispiel)</SubHeading>
          <div style={{ borderRadius: 8, border: '1px solid #1a1a1a', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1.6fr 0.9fr', background: '#0a0a0a', borderBottom: '1px solid #1a1a1a', padding: '8px 16px' }}>
              {['Tag', 'Kanal', 'Format', 'Uhrzeit'].map((h, i) => (
                <span key={i} style={{ fontSize: 10, color: '#3a3a3a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{h}</span>
              ))}
            </div>
            {WF05_KALENDER.map((row, i) => {
              const kanalColors = { LinkedIn: '#0a66c2', Blog: '#f97316', Newsletter: '#22c55e', Instagram: '#e1306c', 'LinkedIn + Instagram': '#a78bfa' };
              const col = kanalColors[row.kanal] || '#888';
              return (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1.6fr 0.9fr', padding: '10px 16px', borderBottom: i < WF05_KALENDER.length - 1 ? '1px solid #0f0f0f' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.008)', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: c.textPrimary, fontWeight: 600 }}>{row.tag}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: col, fontWeight: 700 }}>{row.kanal}</span>
                  <span style={{ fontSize: 12, color: '#3e3e3e' }}>{row.format}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: '#555' }}>{row.uhrzeit}</span>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.18}>
        <div style={{ marginTop: 40 }}>
          <SubHeading>Anforderungen — Systeme & Tools</SubHeading>
          <ToolsTable tools={WF05_TOOLS} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 24, marginTop: 24 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>API-Tokens & Zugänge</div>
              <BulletList items={WF05_TOKENS} color='#3b82f6' />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Voraussetzungen</div>
              <BulletList items={WF05_VORAUSSETZUNGEN} color='#f59e0b' />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div style={{ marginTop: 40 }}>
          <SubHeading>Wie es funktioniert</SubHeading>
          <p style={{ fontSize: 13, color: '#3a3a3a', margin: '0 0 20px', lineHeight: 1.6 }}>
            Stell dir vor, du hättest einen Content-Manager, einen Texter, einen Grafiker und einen Social-Media-Manager — alle in einer Person, die rund um die Uhr arbeitet.
          </p>
          <SimpleExplanation steps={WF05_SCHRITTE} />
        </div>
      </Reveal>

      <Reveal delay={0.22}>
        <div style={{ marginTop: 32 }}>
          <SubHeading>Nutzen nach Zielgruppe</SubHeading>
          <NutzenList items={WF05_NUTZEN} />
        </div>
      </Reveal>

      {/* ══════════════════════════════════════════════════════
          WORKFLOW 06
      ══════════════════════════════════════════════════════ */}

      <Reveal>
        <div style={{ margin: '64px 0 0', borderTop: '1px solid #111', paddingTop: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#363636', padding: '3px 8px', borderRadius: 4, border: '1px solid #1c1c1c', letterSpacing: '0.06em' }}>
              WF-06
            </span>
            <h3 style={{ fontSize: 'clamp(16px, 2.2vw, 20px)', color: c.textPrimary, fontWeight: 700, margin: 0 }}>
              Shortform-Generator
            </h3>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <p style={{ fontSize: 13.5, color: '#4a4a4a', margin: '0 0 20px', lineHeight: 1.6 }}>
          Aus Longform-Videos (YouTube, Podcasts, Webinare) werden automatisch die besten Clips extrahiert, geschnitten, mit Captions versehen und nach Human-Freigabe auf Instagram, TikTok und LinkedIn veröffentlicht.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <WorkflowCanvas nodes={WF06_NODES} />
        <NodeLegend />
      </Reveal>

      <Reveal delay={0.14}>
        <div style={{ marginTop: 40 }}>
          <SubHeading>Auswirkungen des Workflows</SubHeading>
          <ImpactTable rows={WF06_IMPACT} />
          <KerneffektBox text={WF06_KERNEFFEKT} />
        </div>
      </Reveal>

      {/* Content-Multiplikation */}
      <Reveal delay={0.16}>
        <div style={{ marginTop: 40 }}>
          <SubHeading>Content-Multiplikation (Beispielrechnung)</SubHeading>
          <div style={{ borderRadius: 8, border: '1px solid #1a1a1a', overflow: 'hidden', marginBottom: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 0.9fr 1.2fr 1fr', background: '#0a0a0a', borderBottom: '1px solid #1a1a1a', padding: '8px 16px' }}>
              {['Input', 'Output', 'Plattformen', 'Gesamt'].map((h, i) => (
                <span key={i} style={{ fontSize: 10, color: '#3a3a3a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{h}</span>
              ))}
            </div>
            {WF06_MULTIPLIKATION.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.6fr 0.9fr 1.2fr 1fr', padding: '10px 16px', borderBottom: i < WF06_MULTIPLIKATION.length - 1 ? '1px solid #0f0f0f' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.008)', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: c.textPrimary, fontWeight: 500 }}>{row.input}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#a78bfa', fontWeight: 700 }}>{row.output}</span>
                <span style={{ fontSize: 12, color: '#3e3e3e' }}>{row.plattformen}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#22c55e', fontWeight: 700 }}>{row.gesamt}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: '#2e2e2e', margin: 0, lineHeight: 1.5, fontStyle: 'italic' }}>
            Bei einer Publishing-Frequenz von 2 Clips/Tag/Plattform reicht ein einziges 45-Minuten-Video für fast eine Woche Content auf allen drei Kanälen.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.18}>
        <div style={{ marginTop: 40 }}>
          <SubHeading>Anforderungen — Systeme & Tools</SubHeading>
          <ToolsTable tools={WF06_TOOLS} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 24, marginTop: 24 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>API-Tokens & Zugänge</div>
              <BulletList items={WF06_TOKENS} color='#3b82f6' />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Voraussetzungen</div>
              <BulletList items={WF06_VORAUSSETZUNGEN} color='#f59e0b' />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div style={{ marginTop: 40 }}>
          <SubHeading>Wie es funktioniert</SubHeading>
          <p style={{ fontSize: 13, color: '#3a3a3a', margin: '0 0 20px', lineHeight: 1.6 }}>
            Stell dir vor, du hättest ein ganzes Video-Produktionsteam — Editor, Untertitler, Social-Media-Manager — das aus jedem langen Video automatisch die besten Momente herausholt.
          </p>
          <SimpleExplanation steps={WF06_SCHRITTE} />
        </div>
      </Reveal>

      <Reveal delay={0.22}>
        <div style={{ marginTop: 32 }}>
          <SubHeading>Nutzen nach Zielgruppe</SubHeading>
          <NutzenList items={WF06_NUTZEN} />
        </div>
      </Reveal>

      {/* ══════════════════════════════════════════════════════
          WORKFLOW 07
      ══════════════════════════════════════════════════════ */}

      <Reveal>
        <div style={{ margin: '64px 0 0', borderTop: '1px solid #111', paddingTop: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#363636', padding: '3px 8px', borderRadius: 4, border: '1px solid #1c1c1c', letterSpacing: '0.06em' }}>
              WF-07
            </span>
            <h3 style={{ fontSize: 'clamp(16px, 2.2vw, 20px)', color: c.textPrimary, fontWeight: 700, margin: 0 }}>
              Leadmagnet-Creator
            </h3>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <p style={{ fontSize: 13.5, color: '#4a4a4a', margin: '0 0 20px', lineHeight: 1.6 }}>
          Von Voice Memo oder Notion-Stichpunkten zum fertigen Lead Magnet — mit KI-Texterstellung, automatischem Design, Human-Freigabe und integriertem Engagement-Tracking für Lead Scoring.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <WorkflowCanvas nodes={WF07_NODES} />
        <NodeLegend />
      </Reveal>

      <Reveal delay={0.14}>
        <div style={{ marginTop: 40 }}>
          <SubHeading>Auswirkungen des Workflows</SubHeading>
          <ImpactTable rows={WF07_IMPACT} />
          <KerneffektBox text={WF07_KERNEFFEKT} />
        </div>
      </Reveal>

      {/* Use Cases + Lead Scoring */}
      <Reveal delay={0.16}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 24, marginTop: 40 }}>

          {/* Use Cases */}
          <div>
            <SubHeading>Use Cases</SubHeading>
            <div style={{ borderRadius: 8, border: '1px solid #1a1a1a', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1.8fr 0.8fr', background: '#0a0a0a', borderBottom: '1px solid #1a1a1a', padding: '8px 14px' }}>
                {['Format', 'Einsatz', 'Umfang'].map((h) => (
                  <span key={h} style={{ fontSize: 10, color: '#3a3a3a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{h}</span>
                ))}
              </div>
              {WF07_USECASES.map((row, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.3fr 1.8fr 0.8fr', padding: '9px 14px', borderBottom: i < WF07_USECASES.length - 1 ? '1px solid #0f0f0f' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.008)', alignItems: 'start' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#a78bfa', fontWeight: 600 }}>{row.format}</span>
                  <span style={{ fontSize: 11.5, color: '#3e3e3e', lineHeight: 1.4 }}>{row.einsatz}</span>
                  <span style={{ fontSize: 11, color: '#555' }}>{row.seiten}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lead Scoring */}
          <div>
            <SubHeading>Tracking → Lead Scoring</SubHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {WF07_SCORING.map((row, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 6 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 800, color: row.color, minWidth: 36, textAlign: 'right', flexShrink: 0 }}>{row.score}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11.5, color: c.textPrimary, fontWeight: 500, marginBottom: 2 }}>{row.signal}</div>
                    <div style={{ fontSize: 10.5, color: '#2e2e2e', lineHeight: 1.3 }}>{row.aktion}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.18}>
        <div style={{ marginTop: 40 }}>
          <SubHeading>Anforderungen — Systeme & Tools</SubHeading>
          <ToolsTable tools={WF07_TOOLS} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 24, marginTop: 24 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>API-Tokens & Zugänge</div>
              <BulletList items={WF07_TOKENS} color='#3b82f6' />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Voraussetzungen</div>
              <BulletList items={WF07_VORAUSSETZUNGEN} color='#f59e0b' />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div style={{ marginTop: 40 }}>
          <SubHeading>Wie es funktioniert</SubHeading>
          <p style={{ fontSize: 13, color: '#3a3a3a', margin: '0 0 20px', lineHeight: 1.6 }}>
            Stell dir vor, du könntest deine Expertise einfach aussprechen oder als Stichpunkte aufschreiben — und am Ende des Tages hättest du ein professionelles Playbook in der Hand. Fertig designed, mit deinem Branding, bereit zum Verteilen.
          </p>
          <SimpleExplanation steps={WF07_SCHRITTE} />
        </div>
      </Reveal>

      <Reveal delay={0.22}>
        <div style={{ marginTop: 32 }}>
          <SubHeading>Nutzen nach Zielgruppe</SubHeading>
          <NutzenList items={WF07_NUTZEN} />
        </div>
      </Reveal>

      {/* ── Ende Demand Gen Engine Workflows ── */}
    </>
  );
}
