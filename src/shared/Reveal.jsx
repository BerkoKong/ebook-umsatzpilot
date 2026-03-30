import { useState, useEffect, useRef } from "react";

// Respect system "reduce motion" preference
const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const skipAnimation = prefersReducedMotion;

// Single shared IntersectionObserver (only used on mobile)
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
      { threshold: 0.15 }
    );
  }
  return _observer;
}

export function useInView() {
  const ref = useRef(null);
  // On desktop: always visible, skip observer entirely
  const [v, setV] = useState(skipAnimation);
  useEffect(() => {
    if (skipAnimation) return;
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
  if (skipAnimation) {
    return <div style={s}>{children}</div>;
  }
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.55s cubic-bezier(.25,.46,.45,.94) ${delay}s, transform 0.55s cubic-bezier(.25,.46,.45,.94) ${delay}s`,
      ...s,
    }}>{children}</div>
  );
}
