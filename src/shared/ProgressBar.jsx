import { useEffect, useRef } from 'react';

export function ProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    let rafId = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? Math.min((window.scrollY / docHeight) * 100, 100) : 0;
        if (barRef.current) barRef.current.style.width = `${pct}%`;
        rafId = null;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '3px',
      background: 'rgba(255,255,255,0.05)',
      zIndex: 950,
      pointerEvents: 'none',
      willChange: 'transform',
    }}>
      <div
        ref={barRef}
        style={{
          height: '100%',
          width: '0%',
          background: 'linear-gradient(90deg, #22c55e, #16a34a)',
          borderRadius: '0 2px 2px 0',
          willChange: 'width',
        }}
      />
    </div>
  );
}
