import { useRef, useEffect } from "react";

export function Particles() {
  const r = useRef(null);
  useEffect(() => {
    const cv = r.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    let id;
    let lastTime = 0;
    const FPS = 20;
    const interval = 1000 / FPS;
    // Cache dimensions — never read offsetWidth/offsetHeight inside the RAF loop
    let cW = 0;
    let cH = 0;

    const dots = Array.from({ length: 22 }, () => ({
      x: Math.random() * 1200, y: Math.random() * 14000,
      r: Math.random() * 1.2 + 0.3, a: Math.random() * 0.25 + 0.04,
      vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.08,
    }));

    const resize = () => {
      cW = cv.offsetWidth;
      cH = cv.offsetHeight;
      cv.width = cW * devicePixelRatio;
      cv.height = cH * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    addEventListener("resize", resize, { passive: true });

    const draw = (timestamp) => {
      id = requestAnimationFrame(draw);
      const delta = timestamp - lastTime;
      if (delta < interval) return;
      lastTime = timestamp - (delta % interval);

      ctx.clearRect(0, 0, cW, cH);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = cW;
        if (d.x > cW) d.x = 0;
        if (d.y < 0) d.y = cH;
        if (d.y > cH) d.y = 0;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${d.a})`; ctx.fill();
      });
    };
    draw(0);
    return () => { cancelAnimationFrame(id); removeEventListener("resize", resize); };
  }, []);
  return (
    <canvas
      ref={r}
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
    />
  );
}
