import { useState } from 'react';
import { Reveal } from '../shared/Reveal';
import { Badge } from '../shared/Badge';
import { c } from '../shared/tokens';

function VideoEmbed({ videoId, title }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div style={{ position: 'relative', paddingTop: '56.25%', background: '#000', flexShrink: 0 }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => setPlaying(true)}
      style={{ position: 'relative', paddingTop: '56.25%', background: '#000', cursor: 'pointer', flexShrink: 0, overflow: 'hidden' }}
    >
      <img
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        loading="lazy"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.35)' }}>
        <div style={{
          width: '56px', height: '56px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.92)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
          transition: 'transform 0.2s',
        }}>
          <div style={{ width: 0, height: 0, borderTop: '9px solid transparent', borderBottom: '9px solid transparent', borderLeft: '16px solid #000', marginLeft: '4px' }} />
        </div>
      </div>
    </div>
  );
}

const TESTIMONIALS = [
  {
    videoId: 'a8V9-ih0Ed0',
    name: 'Florian G.',
    company: 'Leadhafen',
    rows: [
      {
        label: 'Problem',
        text: 'Kein strukturierter Vertriebsprozess, stundenlange manuelle Werbekonten-Verwaltung. Wachstum bei 45.000 Euro Monatsumsatz gedeckelt.',
      },
      {
        label: 'Lösung',
        text: 'Massgeschneidertes CRM, automatisierte Partnerakquise, KI-Sprachassistent zur Lead-Qualifizierung und KI-gestützte Ads-Verwaltung.',
      },
      {
        label: 'Ergebnis',
        text: 'Über 150.000 Euro Monatsumsatz in 3 Monaten, 20 Stunden pro Woche eingespart, 2 Vollzeitstellen ersetzt.',
        highlight: true,
      },
    ],
    metrics: [
      { value: '+100k Euro/M', label: 'Umsatzsteigerung' },
      { value: '20h/Woche', label: 'Zeitersparnis' },
      { value: '2 Stellen', label: 'eingespart' },
    ],
  },
  {
    videoId: 'ArtA5Oaz7Uk',
    name: 'Manuel V.',
    company: 'Finanzberater',
    rows: [
      {
        label: 'Problem',
        text: 'Manuel gewann Kunden nur durch persönliche Akquise. Zeitaufwendig, nicht skalierbar und ohne planbaren Prozess.',
      },
      {
        label: 'Ziel',
        text: 'Ein System, das automatisch qualifizierte Termine liefert, ohne dass Manuel selbst akquirieren muss.',
      },
      {
        label: 'Lösung',
        text: 'KI-Agent übernimmt Lead-Qualifizierung und Terminvereinbarung vollständig automatisch.',
      },
      {
        label: 'Ergebnis',
        text: '3 zusätzliche Termine pro Tag, mehrere Stunden Zeitersparnis und ein planbarer Vertriebsprozess.',
        highlight: true,
      },
    ],
    metrics: [
      { value: '+11h/Woche', label: 'Zeitersparnis' },
      { value: '+3 Termine', label: 'pro Tag' },
    ],
  },
];

function TestimonialCard({ t, delay }) {
  return (
    <Reveal delay={delay}>
      <div style={{
        background: c.card,
        border: `1px solid ${c.cardBorder}`,
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}>
        <VideoEmbed videoId={t.videoId} title={`${t.name} Testimonial`} />

        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          {/* Name + company */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '16px', fontWeight: '700', color: c.white, letterSpacing: '-0.01em' }}>
              {t.name}
            </div>
            <div style={{
              display: 'inline-block',
              marginTop: '5px',
              padding: '2px 10px',
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${c.cardBorder}`,
              borderRadius: '100px',
              fontSize: '11px',
              color: c.textMuted,
              letterSpacing: '0.03em',
            }}>
              {t.company}
            </div>
          </div>

          {/* Metrics */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {t.metrics.map(m => (
              <div key={m.value} style={{
                padding: '5px 12px',
                background: 'rgba(34,197,94,0.08)',
                border: '1px solid rgba(34,197,94,0.2)',
                borderRadius: '100px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: c.green, letterSpacing: '-0.01em' }}>
                  {m.value}
                </span>
                <span style={{ fontSize: '11px', color: c.textMuted }}>
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          {/* P/Z/L/E rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            {t.rows.map(row => (
              <div key={row.label} style={{
                padding: '12px 14px',
                background: row.highlight ? 'rgba(34,197,94,0.05)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${row.highlight ? 'rgba(34,197,94,0.15)' : c.cardBorder}`,
                borderRadius: '8px',
              }}>
                <div style={{
                  fontSize: '10px',
                  fontWeight: '600',
                  color: row.highlight ? c.green : c.textMuted,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '5px',
                }}>
                  {row.label}
                </div>
                <p style={{
                  margin: 0,
                  fontSize: 'clamp(13px,1.7vw,14px)',
                  color: row.highlight ? c.textPrimary : c.textSecondary,
                  lineHeight: 1.65,
                }}>
                  {row.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Testimonials() {
  return (
    <section>
      <Reveal>
        <Badge>Fallstudien</Badge>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 style={{
          fontSize: 'clamp(28px,4.5vw,44px)',
          fontWeight: 800,
          color: c.white,
          margin: '20px 0 12px',
          lineHeight: 1.1,
          letterSpacing: '-0.025em',
        }}>
          Was passiert, wenn das System läuft.
        </h2>
      </Reveal>

      <Reveal delay={0.14}>
        <p style={{
          fontSize: 'clamp(15px,2vw,17px)',
          color: c.textSecondary,
          lineHeight: 1.7,
          margin: '0 0 48px',
          maxWidth: '600px',
        }}>
          Keine Versprechen. Dokumentierte Ergebnisse von Unternehmen, die den Schritt gemacht haben.
        </p>
      </Reveal>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
        gap: '24px',
        alignItems: 'start',
      }}>
        {TESTIMONIALS.map((t, i) => (
          <TestimonialCard key={t.videoId} t={t} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
}
