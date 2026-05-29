import { useEffect, useRef } from "react";

const FREQUENCY = 1.5;

type Petal = {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  rot: number;
  rotSpeed: number;
  swing: number;
  swingSpeed: number;
  phase: number;
  opacity: number;
};

const PETAL_COLORS = {
  default: {
    inner: "rgba(255, 220, 230, 0.95)",
    mid: "rgba(255, 192, 210, 0.85)",
    outer: "rgba(244, 160, 190, 0)",
  },
  background: {
    inner: "rgba(230, 140, 175, 0.92)",
    mid: "rgba(210, 115, 155, 0.88)",
    outer: "rgba(175, 85, 125, 0)",
  },
} as const;

export function Petals({
  density = 35,
  className = "",
  onBackground = false,
}: {
  density?: number;
  className?: string;
  /** Darker pink petals for light page backgrounds (#f5ebf5) */
  onBackground?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Respect reduced motion
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // Scale density down on small screens for performance
    const isMobile = window.innerWidth < 768;
    const isTiny = window.innerWidth < 420;
    const effectiveDensity = Math.max(
      6,
      Math.round(density * FREQUENCY * (isTiny ? 0.3 : isMobile ? 0.5 : 1)),
    );

    let raf = 0;
    let running = true;
    let petals: Petal[] = [];
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const make = (initial = false): Petal => ({
      x: Math.random() * w,
      y: initial ? Math.random() * h : -20 - Math.random() * 100,
      size: 6 + Math.random() * 10,
      speed: (0.4 + Math.random() * 0.9) * FREQUENCY,
      drift: -0.3 + Math.random() * 0.6,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (-0.5 + Math.random()) * 0.02,
      swing: 10 + Math.random() * 30,
      swingSpeed: (0.005 + Math.random() * 0.015) * FREQUENCY,
      phase: Math.random() * Math.PI * 2,
      opacity: 0.5 + Math.random() * 0.5,
    });

    const init = () => {
      resize();
      petals = Array.from({ length: effectiveDensity }, () => make(true));
    };

    const colors = onBackground ? PETAL_COLORS.background : PETAL_COLORS.default;

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.opacity;
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
      grad.addColorStop(0, colors.inner);
      grad.addColorStop(0.7, colors.mid);
      grad.addColorStop(1, colors.outer);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.6, -p.size * 0.5, p.size * 0.6, p.size * 0.5, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.6, p.size * 0.5, -p.size * 0.6, -p.size * 0.5, 0, -p.size);
      ctx.fill();
      ctx.restore();
    };

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of petals) {
        p.phase += p.swingSpeed;
        p.x += p.drift + Math.sin(p.phase) * 0.4;
        p.y += p.speed;
        p.rot += p.rotSpeed;
        if (p.y > h + 20 || p.x < -40 || p.x > w + 40) {
          Object.assign(p, make(false));
        }
        drawPetal(p);
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    init();
    tick();
    const onResize = () => init();
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density, onBackground]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
