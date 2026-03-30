import { useState, useEffect, useRef } from 'react';
import { c } from './tokens';

const SECTIONS = [
  { id: 'cover',          label: 'Einleitung' },
  { id: 'zielgruppe',     label: 'Für wen ist das?' },
  { id: 'zwei-lager',     label: 'Zwei Lager' },
  { id: 'report-inhalt',  label: 'Was du bekommst' },
  { id: 'ist-situation',  label: 'Ist-Situation' },
  { id: 'sechs-fehler',   label: 'Die 6 Fehler' },
  { id: 'wunschbild',     label: 'Das Zielbild' },
  { id: 'methode',        label: 'Das System' },
  { id: 'revops',         label: 'Revenue Operations' },
  { id: 'engines',        label: 'Die Engines' },
  { id: 'demand-gen',     label: 'Demand Generation' },
  { id: 'revenue-engine', label: 'Revenue Generation' },
  { id: 'roadmap',        label: 'Die Roadmap' },
  { id: 'testimonials',   label: 'Fallstudien' },
  { id: 'ueber-uns',      label: 'Über Umsatzpilot' },
  { id: 'cta',            label: 'Loslegen' },
];

const CTA_URL = 'https://kalender.umsatzpilot.com/umsatzpilot/30min';

const getSize = () => {
  if (typeof window === 'undefined') return 'medium';
  if (window.innerWidth >= 1280) return 'large';
  if (window.innerWidth < 640) return 'small';
  return 'medium';
};

export function NavMenu() {
  const [open, setOpen]       = useState(false);
  const [activeId, setActiveId] = useState('cover');
  const [size, setSize]       = useState(getSize);
  const panelRef              = useRef(null);

  const isLarge  = size === 'large';
  const isSmall  = size === 'small';

  // Screen size tracking
  useEffect(() => {
    const onResize = () => setSize(getSize());
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Close overlay when switching to large
  useEffect(() => { if (isLarge) setOpen(false); }, [isLarge]);

  // Active section tracking — throttled with rAF
  useEffect(() => {
    let rafId = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const threshold = window.scrollY + window.innerHeight * 0.3;
        let active = SECTIONS[0].id;
        for (const s of SECTIONS) {
          const el = document.getElementById(s.id);
          if (el && el.offsetTop <= threshold) active = s.id;
        }
        setActiveId(active);
        rafId = null;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Close on outside click (overlay mode only)
  useEffect(() => {
    if (isLarge || !open) return;
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, isLarge]);

  // Body scroll lock (overlay mode only)
  useEffect(() => {
    if (isLarge) return;
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open, isLarge]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (!isLarge) setOpen(false);
  };

  // ─── LARGE: always-visible sidebar ───────────────────────────────────────
  if (isLarge) {
    return (
      <div style={{
        position: 'fixed',
        right: '12px',
        top: '60px',
        bottom: '24px',
        width: '190px',
        background: '#0a0b0d',
        border: '1px solid #181818',
        borderRadius: '12px',
        zIndex: 900,
        willChange: 'transform',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Label */}
        <div style={{
          padding: '12px 14px 10px',
          borderBottom: '1px solid #111',
          flexShrink: 0,
        }}>
          <div style={{
            fontSize: '10px',
            fontWeight: '700',
            color: c.textMuted,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          }}>
            Inhalt
          </div>
        </div>

        {/* Section list */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '4px 0' }}>
          {SECTIONS.map((s, i) => {
            const isActive = s.id === activeId;
            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '7px 12px',
                  background: isActive ? 'rgba(34,197,94,0.07)' : 'transparent',
                  border: 'none',
                  borderLeft: `2px solid ${isActive ? '#22c55e' : 'transparent'}`,
                  color: isActive ? c.textPrimary : c.textSecondary,
                  fontSize: '12px',
                  lineHeight: 1.3,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s, color 0.15s',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.025)'; e.currentTarget.style.color = c.textPrimary; } }}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = c.textSecondary; } }}
              >
                <span style={{
                  fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                  fontSize: '9px',
                  color: isActive ? '#22c55e' : c.textMuted,
                  flexShrink: 0,
                  width: '16px',
                }}>
                  {String(i).padStart(2, '0')}
                </span>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {s.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* CTA */}
        <div style={{ padding: '10px 12px 14px', borderTop: '1px solid #111', flexShrink: 0 }}>
          <a
            href={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '9px 8px',
              background: '#22c55e',
              color: '#000',
              borderRadius: '100px',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'opacity 0.15s',
              fontFamily: 'inherit',
              letterSpacing: '-0.01em',
              textDecoration: 'none',
              textAlign: 'center',
              lineHeight: 1.3,
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
          >
            Kostenlose Analyse
          </a>
        </div>
      </div>
    );
  }

  // ─── SMALL & MEDIUM: toggle button + overlay panel ───────────────────────
  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Inhaltsverzeichnis öffnen"
        style={{
          position: 'fixed',
          right: isSmall ? '16px' : '20px',
          ...(isSmall ? { bottom: '24px' } : { top: '20px' }),
          zIndex: 940,
          display: 'flex',
          alignItems: 'center',
          gap: isSmall ? '10px' : '7px',
          padding: isSmall ? '13px 22px' : '10px 16px',
          minHeight: '44px',
          minWidth: isSmall ? '130px' : 'auto',
          background: '#0a0b0d',
          border: `1px solid ${isSmall ? '#252525' : '#1e1e1e'}`,
          willChange: 'transform',
          borderRadius: '100px',
          color: isSmall ? c.textPrimary : c.textSecondary,
          fontSize: isSmall ? '15px' : '13px',
          fontWeight: isSmall ? '600' : '500',
          cursor: 'pointer',
          transition: 'border-color 0.2s, color 0.2s',
          fontFamily: 'inherit',
          letterSpacing: '-0.01em',
          boxShadow: isSmall
            ? '0 6px 32px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)'
            : '0 4px 24px rgba(0,0,0,0.4)',
          justifyContent: 'center',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.color = c.white; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = isSmall ? '#252525' : '#1e1e1e'; e.currentTarget.style.color = isSmall ? c.textPrimary : c.textSecondary; }}
      >
        <span style={{ fontSize: isSmall ? '18px' : '16px', lineHeight: 1, display: 'block' }}>
          {open ? '✕' : '≡'}
        </span>
        <span>Inhalt</span>
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          zIndex: 941,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transition: 'opacity 0.25s',
        }}
      />

      {/* Side panel */}
      <div
        ref={panelRef}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          ...(isSmall ? { left: 0 } : { width: 'min(300px, 90vw)' }),
          height: '100%',
          background: '#06070a',
          borderLeft: isSmall ? 'none' : '1px solid #161616',
          zIndex: 942,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(.25,.46,.45,.94)',
          willChange: 'transform',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '22px 20px 18px',
          borderBottom: '1px solid #111',
          flexShrink: 0,
        }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: c.white, letterSpacing: '-0.01em' }}>
              Inhaltsverzeichnis
            </div>
            <div style={{ fontSize: '11px', color: c.textMuted, marginTop: '3px' }}>
              Umsatzpilot B2B Report 2026
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            style={{
              background: 'none',
              border: '1px solid #1e1e1e',
              borderRadius: '7px',
              color: c.textMuted,
              cursor: 'pointer',
              padding: '6px 10px',
              fontSize: '13px',
              lineHeight: 1,
              transition: 'border-color 0.15s, color 0.15s',
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.color = c.white; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e1e1e'; e.currentTarget.style.color = c.textMuted; }}
          >
            ✕
          </button>
        </div>

        {/* Section list */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '6px 0' }}>
          {SECTIONS.map((s, i) => {
            const isActive = s.id === activeId;
            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '10px 20px',
                  background: isActive ? 'rgba(34,197,94,0.07)' : 'transparent',
                  border: 'none',
                  borderLeft: `2px solid ${isActive ? '#22c55e' : 'transparent'}`,
                  color: isActive ? c.textPrimary : c.textSecondary,
                  fontSize: '13px',
                  lineHeight: 1.4,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s, color 0.15s',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.025)'; e.currentTarget.style.color = c.textPrimary; } }}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = c.textSecondary; } }}
              >
                <span style={{
                  fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                  fontSize: '10px',
                  color: isActive ? '#22c55e' : c.textMuted,
                  flexShrink: 0,
                  width: '22px',
                  transition: 'color 0.15s',
                }}>
                  {String(i).padStart(2, '0')}
                </span>
                <span>{s.label}</span>
              </button>
            );
          })}
        </nav>

        {/* CTA */}
        <div style={{ padding: '16px 20px 28px', borderTop: '1px solid #111', flexShrink: 0 }}>
          <a
            href={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: '13px 16px',
              background: '#22c55e',
              color: '#000',
              borderRadius: '100px',
              fontSize: '13px',
              fontWeight: '700',
              transition: 'opacity 0.15s',
              fontFamily: 'inherit',
              letterSpacing: '-0.01em',
              textDecoration: 'none',
              boxSizing: 'border-box',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
          >
            Kostenlose Prozessanalyse
          </a>
          <p style={{ fontSize: '11px', color: c.textMuted, textAlign: 'center', margin: '8px 0 0' }}>
            Kostenlos & unverbindlich
          </p>
        </div>
      </div>
    </>
  );
}
