import { useState } from 'react';
import { Reveal } from '../shared/Reveal';
import { Badge } from '../shared/Badge';
import { c } from '../shared/tokens';

const PHASES = [
  {
    num: '01',
    title: 'Klarheit schaffen',
    subtitle: 'Strategie & Positionierung',
    sub2: 'Das operative Fundament, auf dem alles aufbaut',
    color: '#3b82f6',
    modules: [
      'Zielmarkt & ICP',
      'Positionierung & Messaging',
      'Offer-Architektur',
      'Buyer Journey',
      'Kanal- & Plattformstrategie',
      'Inbound vs. Outbound Mix',
      'Content-Strategie',
      'Lead-Qualifizierung & Scoring',
      'Sales-Prozess & Closing',
      'Teamstruktur & Rollen',
      'Tech-Stack & Automatisierung',
      'KPIs & Steuerungslogik',
      'Budget- & Ressourcenallokation',
    ],
    dependency: null,
    result: 'Zielmarkt klar, Botschaft scharf, Angebot automatisierungsfähig strukturiert',
  },
  {
    num: '02',
    title: 'Das Fundament legen',
    subtitle: 'Datenbasis & Systemarchitektur',
    sub2: 'Saubere Daten als Voraussetzung für alles Weitere',
    color: '#14b8a6',
    modules: [
      'CRM-Struktur & Datenmodell',
      'Master-System-Regeln',
      'Hub-Spoke-Integration',
      'Zentrale Datenbank (SSOT)',
      'Vektordatenbank für KI-Wissen',
      'Business Analytics',
      'Datenqualität & Hygiene',
    ],
    dependency: 'Baut auf Phase 1 auf: Ohne klare Strategie sammelst du die falschen Daten',
    result: 'Tools sprechen miteinander, eine einzige Wahrheit statt fünf Tabellen',
  },
  {
    num: '03',
    title: 'Das Betriebssystem installieren',
    subtitle: 'Revenue Operations',
    sub2: 'Dokumentierte, wiederholbare Prozesse als Regelwerk',
    color: '#a78bfa',
    modules: [
      'Pipeline-Stufen definieren',
      'Prozessdokumentation',
      'Verantwortlichkeiten & Übergaben',
      'KPI-Dashboard (5 Kern-KPIs)',
      'Prozess-Automatisierungsregeln',
      'Reporting-Rhythmus',
    ],
    dependency: 'Baut auf Phase 2 auf: Ohne saubere Daten kannst du keine Prozesse steuern',
    result: 'Jeder weiß, was wann passiert — steuerbar statt Bauchgefühl',
  },
  {
    num: '04',
    title: 'Die Maschine bauen',
    subtitle: 'Demand & Revenue Engine',
    sub2: 'KI-Agenten und Automatisierungen auf dem Fundament',
    color: '#f59e0b',
    moduleGroups: [
      {
        label: 'Demand Generation',
        color: '#f59e0b',
        items: [
          'Prospecting & Listenerstellung',
          'Ads erstellen & verwalten',
          'Ads Tracking & Auswertung',
          'LinkedIn-Outreach',
          'Content-Erstellung & Distribution',
          'Shortform-Generator',
          'Leadmagnet-Creator',
        ],
      },
      {
        label: 'Revenue Generation',
        color: '#fb923c',
        items: [
          'Lead-Recherche & Enrichment',
          'Lead Scoring & Priorisierung',
          'Call-Recording & Gesprächsintelligenz',
          'Follow-up-Automatisierung',
          'KI-Sales-Copilot & Teleprompter',
          'Präsentation-Generator',
        ],
      },
    ],
    dependency: 'Baut auf Phase 3 auf: Ohne dokumentierte Prozesse automatisierst du Chaos',
    result: 'Leads werden automatisch generiert, qualifiziert und in Umsatz konvertiert',
  },
  {
    num: '05',
    title: 'Optimieren & Skalieren',
    subtitle: '',
    sub2: 'Das System wird jeden Monat besser',
    color: '#22c55e',
    modules: [
      'KPI-Analyse & Engpass-Identifikation',
      'Kampagnen-Optimierung',
      'KI-Agent-Tuning & Datenqualität',
      'A/B-Testing & Iteration',
      'Skalierung der Top-Performer',
    ],
    dependency: 'Baut auf Phase 4 auf: Erst wenn die Maschine läuft, kannst du gezielt optimieren',
    result: 'Umsatz wächst durch das System, nicht durch mehr Stunden oder mehr Köpfe',
  },
];

function PhaseCard({ phase, index, isOpen, onToggle }) {
  const hasGroups = !!phase.moduleGroups;

  return (
    <div style={{ position: 'relative' }}>
      {/* Connector line to next phase */}
      {index < PHASES.length - 1 && (
        <div style={{
          position: 'absolute',
          left: '23px',
          top: '56px',
          width: '2px',
          bottom: '-2px',
          background: `repeating-linear-gradient(to bottom, ${phase.color}55 0px, ${phase.color}55 6px, transparent 6px, transparent 12px)`,
          zIndex: 0,
        }} />
      )}

      <div
        onClick={onToggle}
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '18px 20px',
          background: isOpen ? `${phase.color}0d` : '#0c0c0c',
          border: `1px solid ${isOpen ? phase.color + '44' : '#1a1a1a'}`,
          borderRadius: '10px',
          cursor: 'pointer',
          transition: 'background 0.25s, border-color 0.25s',
          userSelect: 'none',
        }}
        onMouseEnter={e => {
          if (!isOpen) {
            e.currentTarget.style.background = '#141414';
            e.currentTarget.style.borderColor = '#2a2a2a';
          }
        }}
        onMouseLeave={e => {
          if (!isOpen) {
            e.currentTarget.style.background = '#0c0c0c';
            e.currentTarget.style.borderColor = '#1a1a1a';
          }
        }}
      >
        {/* Number circle */}
        <div style={{
          flexShrink: 0,
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          background: isOpen ? phase.color : `${phase.color}22`,
          border: `2px solid ${phase.color}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          fontSize: '13px',
          fontWeight: '700',
          color: isOpen ? '#000' : phase.color,
          transition: 'background 0.25s, color 0.25s',
        }}>
          {phase.num}
        </div>

        {/* Title block */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: '15px',
            fontWeight: '600',
            color: c.white,
            lineHeight: 1.3,
          }}>
            {phase.title}
            {phase.subtitle && (
              <span style={{ color: c.textSecondary, fontWeight: '400' }}>
                {' '}— {phase.subtitle}
              </span>
            )}
          </div>
          <div style={{
            fontSize: '12px',
            color: c.textMuted,
            marginTop: '3px',
          }}>
            {phase.sub2}
          </div>
        </div>

        {/* Arrow */}
        <div style={{
          flexShrink: 0,
          fontSize: '12px',
          color: phase.color,
          transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: 'transform 0.25s',
        }}>
          ▶
        </div>
      </div>

      {/* Expandable content */}
      <div style={{
        overflow: 'hidden',
        maxHeight: isOpen ? '800px' : '0px',
        opacity: isOpen ? 1 : 0,
        transition: 'max-height 0.35s cubic-bezier(.25,.46,.45,.94), opacity 0.25s',
        marginLeft: '30px',
        marginBottom: isOpen ? '0' : '0',
      }}>
        <div style={{
          padding: '20px 20px 20px 32px',
          borderLeft: `2px solid ${phase.color}33`,
          marginLeft: '16px',
          marginTop: '4px',
          marginBottom: '4px',
        }}>
          {/* Dependency hint */}
          {phase.dependency && (
            <div style={{
              fontSize: '12px',
              color: c.textMuted,
              fontStyle: 'italic',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '6px',
            }}>
              <span style={{ color: phase.color, fontStyle: 'normal', marginTop: '1px' }}>↑</span>
              {phase.dependency}
            </div>
          )}

          {/* Modules */}
          {!hasGroups ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
              {phase.modules.map(m => (
                <span key={m} style={{
                  padding: '4px 12px',
                  borderRadius: '100px',
                  background: `${phase.color}15`,
                  border: `1px solid ${phase.color}33`,
                  color: phase.color,
                  fontSize: '12px',
                  fontWeight: '500',
                }}>
                  {m}
                </span>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
              {phase.moduleGroups.map(group => (
                <div key={group.label}>
                  <div style={{
                    fontSize: '11px',
                    fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                    color: group.color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '8px',
                  }}>
                    {group.label}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {group.items.map(m => (
                      <span key={m} style={{
                        padding: '4px 12px',
                        borderRadius: '100px',
                        background: `${group.color}15`,
                        border: `1px solid ${group.color}33`,
                        color: group.color,
                        fontSize: '12px',
                        fontWeight: '500',
                      }}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Result */}
          <div style={{
            fontSize: '13px',
            color: c.textSecondary,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            paddingTop: '16px',
            borderTop: '1px solid #1a1a1a',
          }}>
            <span style={{ color: phase.color, flexShrink: 0 }}>→</span>
            {phase.result}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Roadmap() {
  const [open, setOpen] = useState(null);

  const toggle = (i) => setOpen(prev => (prev === i ? null : i));

  return (
    <section>
      {/* Section label */}
      <Reveal>
        <Badge>Deine Roadmap</Badge>
      </Reveal>

      {/* Heading */}
      <Reveal delay={0.08}>
        <h2 style={{
          fontSize: 'clamp(28px,4.5vw,44px)',
          fontWeight: '700',
          color: c.white,
          lineHeight: 1.15,
          margin: '20px 0 0',
          letterSpacing: '-0.02em',
        }}>
          Vom Status quo zum skalierbaren Umsatzsystem.
        </h2>
      </Reveal>

      {/* Intro text */}
      <Reveal delay={0.14}>
        <div style={{
          marginTop: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          color: c.textSecondary,
          fontSize: 'clamp(15px,2vw,17px)',
          lineHeight: 1.75,
          maxWidth: '720px',
        }}>
          <p style={{ margin: 0 }}>
            Du hast jetzt alle Bausteine kennengelernt. Die Strategie. Die Datenbasis. Revenue Operations. Die Demand Generation Engine. Die Revenue Generation Engine. Du weißt, welche Fehler die meisten machen und warum Tools allein nichts lösen.
          </p>
          <p style={{ margin: 0 }}>
            Aber Wissen ohne Reihenfolge ist wie ein Bauplan ohne Zeitachse. Du weißt, was gebaut werden muss — aber nicht, was zuerst kommt, was aufeinander aufbaut und wo du heute starten solltest.
          </p>
          <p style={{ margin: 0 }}>
            Genau dafür ist diese Roadmap. Sie zeigt dir die fünf Phasen, die jedes B2B-Unternehmen durchläuft — vom manuellen Chaos zum automatisierten Umsatzsystem. Nicht als theoretisches Framework, sondern als die Reihenfolge, in der wir bei Umsatzpilot arbeiten. Weil wir wissen, was passiert, wenn du Schritt 4 vor Schritt 1 machst: Du automatisierst Chaos.
          </p>
        </div>
      </Reveal>

      {/* Phase descriptions */}
      {[
        {
          title: 'Phase 1: Klarheit schaffen — Strategie & Positionierung',
          body: 'Bevor irgendein System aufgebaut wird, brauchst du Klarheit. Über deinen Zielmarkt, dein Ideal Customer Profile, deine Positionierung und deine Offer-Architektur. Ohne diese Grundlage baut alles, was danach kommt, auf Sand. In dieser Phase werden die 13 strategischen Bausteine definiert — vom ICP über die Buyer Journey bis zur Kanal- und Plattformstrategie. Das Ergebnis ist kein 80-seitiges Strategiedokument. Es ist ein operatives Fundament, auf dem Prozesse, Automatisierungen und KI-Agenten aufbauen können.',
          color: '#3b82f6',
        },
        {
          title: 'Phase 2: Das Fundament legen — Datenbasis & Systemarchitektur',
          body: 'Parallel zur Strategie und direkt im Anschluss wird deine Datenbasis aufgebaut. CRM-Struktur, Master-System-Regeln, Datenflüsse zwischen deinen Tools und die Grundlage für alles, was später automatisiert oder von KI gesteuert werden soll. Ob Hub-Spoke-Integration oder zentrale Datenbank — das hängt von deiner Ausgangslage ab. Entscheidend ist, dass deine Daten sauber, verknüpft und nutzbar sind. Denn jede Automatisierung ist nur so gut wie die Daten, die sie füttert.',
          color: '#14b8a6',
        },
        {
          title: 'Phase 3: Das Betriebssystem installieren — Revenue Operations',
          body: 'Jetzt werden die Spielregeln definiert. Welche Prozesse gibt es in Vertrieb und Marketing? Welche Schritte durchläuft ein Lead von der ersten Berührung bis zum Abschluss? Welche KPIs steuerst du — und welche ignorierst du bewusst? Revenue Operations ist das Betriebssystem. Ohne RevOps hast du keine dokumentierten Prozesse, keine klaren Übergaben und keine Grundlage für Automatisierung. In dieser Phase werden Pipeline-Stufen definiert, Verantwortlichkeiten festgelegt und die Kern-KPIs implementiert.',
          color: '#a78bfa',
        },
        {
          title: 'Phase 4: Die Maschine bauen — Demand & Revenue Engine',
          body: 'Jetzt wird automatisiert. Aber nicht alles auf einmal, sondern in der richtigen Reihenfolge. Zuerst die Demand Generation Engine — die Workflows, die automatisiert Sichtbarkeit schaffen und qualifizierte Anfragen generieren. Dann die Revenue Generation Engine — die Workflows, die aus Anfragen Umsatz machen. In dieser Phase kommen die KI-Agenten und Automatisierungen ins Spiel, die du in den Workflow-Kapiteln gesehen hast. Aber sie werden auf deine dokumentierten Prozesse, deine saubere Datenbasis und deine strategische Grundlage aufgesetzt.',
          color: '#f59e0b',
        },
        {
          title: 'Phase 5: Optimieren & Skalieren',
          body: 'Ein System, das läuft, ist gut. Ein System, das besser wird, ist das Ziel. In dieser Phase analysierst du deine KPIs, identifizierst Engpässe und optimierst iterativ. Welche Kampagne performt? Wo brechen Leads ab? Welcher KI-Agent braucht bessere Daten? Hier zeigt sich der eigentliche Vorteil eines systemischen Ansatzes: Du drehst nicht an einzelnen Stellschrauben. Du siehst das Gesamtbild — und kannst gezielt skalieren, was funktioniert.',
          color: '#22c55e',
        },
      ].map((ph, i) => (
        <Reveal key={i} delay={i * 0.06 + 0.18}>
          <div style={{ marginTop: '32px' }}>
            <div style={{
              fontSize: '13px',
              fontWeight: '600',
              color: ph.color,
              marginBottom: '8px',
              fontFamily: "'JetBrains Mono', 'Courier New', monospace",
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}>
              {ph.title}
            </div>
            <p style={{
              margin: 0,
              color: c.textSecondary,
              fontSize: 'clamp(14px,1.8vw,16px)',
              lineHeight: 1.75,
            }}>
              {ph.body}
            </p>
          </div>
        </Reveal>
      ))}

      {/* Interactive roadmap */}
      <Reveal delay={0.1}>
        <div style={{ marginTop: '64px' }}>
          <div style={{
            fontSize: '11px',
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            color: c.textMuted,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: '24px',
          }}>
            Interaktive Roadmap — Phase aufklappen
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {PHASES.map((phase, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <PhaseCard
                  phase={phase}
                  index={i}
                  isOpen={open === i}
                  onToggle={() => toggle(i)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Closing argument */}
      <Reveal delay={0.08}>
        <div style={{
          marginTop: '64px',
          padding: '32px',
          background: '#0a0a0a',
          border: '1px solid #1a1a1a',
          borderRadius: '12px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #ef4444aa, transparent)',
          }} />

          <div style={{
            fontSize: 'clamp(15px,2vw,17px)',
            fontWeight: '600',
            color: c.white,
            marginBottom: '24px',
          }}>
            Warum die Reihenfolge nicht verhandelbar ist.
          </div>

          <div style={{
            color: c.textSecondary,
            fontSize: 'clamp(14px,1.8vw,16px)',
            lineHeight: 1.75,
            marginBottom: '24px',
          }}>
            Die größte Versuchung ist, direkt bei Phase 4 einzusteigen. Ein Automatisierungstool kaufen, ein paar Workflows bauen, einen KI-Agenten einsetzen. Und genau das ist der Fehler, den wir in "Die 6 häufigsten Fehler" beschrieben haben.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {[
              { text: 'Ohne Strategie automatisierst du das Falsche.', color: '#3b82f6' },
              { text: 'Ohne Datenbasis arbeiten deine Agenten mit Müll.', color: '#14b8a6' },
              { text: 'Ohne RevOps hast du keine Prozesse zum Automatisieren.', color: '#a78bfa' },
              { text: 'Ohne Engines hast du Tools — aber kein System.', color: '#f59e0b' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                fontSize: 'clamp(13px,1.7vw,15px)',
                color: c.textSecondary,
              }}>
                <span style={{
                  flexShrink: 0,
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: item.color,
                  marginTop: '7px',
                }} />
                {item.text}
              </div>
            ))}
          </div>

          <div style={{
            fontSize: 'clamp(14px,1.8vw,16px)',
            color: c.textSecondary,
            lineHeight: 1.75,
          }}>
            Jede Phase baut auf der vorherigen auf. Nicht als Nice-to-have, sondern als harte Abhängigkeit. Wer Phase 3 überspringt, wird in Phase 4 scheitern. Nicht vielleicht — sicher.
          </div>
        </div>
      </Reveal>
    </section>
  );
}
