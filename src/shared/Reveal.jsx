import { useState, useEffect, useRef } from "react";

// Single shared IntersectionObserver for all Reveal elements (performance)
const _callbacks = new Map();
let _observer = null;

function getObserver() {
  if (!_observer && typeof window !== "undefined") {
    _observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cb = _callbacks.get(entry.target);
            if (cb) {
              cb();
              _callbacks.delete(entry.target);
              _observer.unobserve(entry.target);
            }
          }
        });
      },
      // 0.15 instead of 0.08 — fewer callbacks per scroll pixel in Chrome
      { threshold: 0.15 }
    );
  }
  return _observer;
}

export function useInView(t = 0.15) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = getObserver();
    _callbacks.set(el, () => setV(true));
    obs.observe(el);
    return () => {
      _callbacks.delete(el);
      obs.unobserve(el);
    };
  }, []);
  return [ref, v];
}

export function Reveal({ children, delay = 0, style: s = {} }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} style={{
      // No will-change — Chrome creates too many GPU layers when 40+ elements have it.
      // opacity + transform are both compositor-only properties; no will-change needed.
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.55s cubic-bezier(.25,.46,.45,.94) ${delay}s, transform 0.55s cubic-bezier(.25,.46,.45,.94) ${delay}s`,
      ...s,
    }}>{children}</div>
  );
}
