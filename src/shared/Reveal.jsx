import { useState, useEffect, useRef } from "react";

export function useInView(t = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setV(true); o.disconnect(); }
    }, { threshold: t });
    o.observe(el);
    return () => o.disconnect();
  }, [t]);
  return [ref, v];
}

export function Reveal({ children, delay = 0, style: s = {} }) {
  const [ref, v] = useInView(0.08);
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.8s cubic-bezier(.25,.46,.45,.94) ${delay}s, transform 0.8s cubic-bezier(.25,.46,.45,.94) ${delay}s`,
      ...s,
    }}>{children}</div>
  );
}
