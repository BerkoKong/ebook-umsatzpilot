import { useRef, useEffect } from "react";

export function Particles() {
  const r = useRef(null);
  useEffect(() => {
    const cv = r.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    let id;
    const dots = Array.from({ length: 45 }, () => ({
      x: Math.random() * 1200, y: Math.random() * 14000,
      r: Math.random() * 1.2 + 0.3, a: Math.random() * 0.25 + 0.04,
      vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.08,
    }));
    const resize = () => {
      cv.width = cv.offsetWidth * devicePixelRatio;
      cv.height = cv.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    addEventListener("resize", resize);
    const draw = () => {
      ctx.clearRect(0, 0, cv.offsetWidth, cv.offsetHeight);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = cv.offsetWidth;
        if (d.x > cv.offsetWidth) d.x = 0;
        if (d.y < 0) d.y = cv.offsetHeight;
        if (d.y > cv.offsetHeight) d.y = 0;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${d.a})`; ctx.fill();
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={r} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}
