import { useEffect, useRef } from "react";

type Shape = "rect" | "circle" | "ribbon" | "star";

type Particle = {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  sway: number;
  swaySpeed: number;
  angle: number;
  spin: number;
  alpha: number;
  color: string;
  shape: Shape;
};

type ConfettiProps = {
  density?: number;
  className?: string;
};

const COLORS = [
  "#ffb3d1",
  "#d9c2ff",
  "#a9e4ff",
  "#ffe6a3",
  "#ff9fc2",
  "#b8f1df",
  "#fff7fc",
];

function makeParticle(width: number, height: number, initial = false): Particle {
  const size = 5 + Math.random() * 8;
  return {
    x: Math.random() * width,
    y: initial ? Math.random() * height : -30 - Math.random() * 120,
    size,
    speed: 0.6 + Math.random() * 1.25,
    drift: (Math.random() - 0.5) * 0.4,
    sway: Math.random() * Math.PI * 2,
    swaySpeed: 0.008 + Math.random() * 0.014,
    angle: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.09,
    alpha: 0.55 + Math.random() * 0.45,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shape:
      Math.random() < 0.16
        ? "star"
        : Math.random() < 0.32
          ? "circle"
          : Math.random() < 0.58
            ? "ribbon"
            : "rect",
  };
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  radius: number,
  points = 5,
) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i += 1) {
    const r = i % 2 === 0 ? radius : radius * 0.44;
    const angle = (Math.PI / points) * i - Math.PI / 2;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

export function Confetti({ density = 1, className = "" }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let animationFrame = 0;
    let lastTime = performance.now();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const targetCount = () => {
      const base = width < 600 ? 46 : width < 1100 ? 82 : 118;
      return Math.max(18, Math.round(base * density));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = targetCount();
      if (particles.length === 0) {
        particles = Array.from({ length: count }, () =>
          makeParticle(width, height, true),
        );
      } else if (particles.length < count) {
        particles.push(
          ...Array.from({ length: count - particles.length }, () =>
            makeParticle(width, height),
          ),
        );
      } else if (particles.length > count) {
        particles = particles.slice(0, count);
      }
    };

    const render = (time: number) => {
      const delta = Math.min(34, time - lastTime) / 16.67;
      lastTime = time;
      ctx.clearRect(0, 0, width, height);

      for (const particle of particles) {
        particle.y += particle.speed * delta * (reduceMotion ? 0.35 : 1);
        particle.sway += particle.swaySpeed * delta;
        particle.x +=
          (particle.drift + Math.sin(particle.sway) * 0.24) * delta;
        particle.angle += particle.spin * delta;

        if (particle.y > height + 30) {
          Object.assign(particle, makeParticle(width, height));
        }
        if (particle.x < -30) particle.x = width + 30;
        if (particle.x > width + 30) particle.x = -30;

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.angle);
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = particle.color;

        if (particle.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, particle.size * 0.36, 0, Math.PI * 2);
          ctx.fill();
        } else if (particle.shape === "star") {
          drawStar(ctx, particle.size * 0.65, 5);
        } else if (particle.shape === "ribbon") {
          ctx.beginPath();
          ctx.moveTo(-particle.size * 0.18, -particle.size);
          ctx.quadraticCurveTo(
            particle.size * 0.7,
            -particle.size * 0.3,
            particle.size * 0.18,
            particle.size,
          );
          ctx.quadraticCurveTo(
            -particle.size * 0.65,
            particle.size * 0.25,
            -particle.size * 0.18,
            -particle.size,
          );
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.roundRect(
            -particle.size * 0.42,
            -particle.size,
            particle.size * 0.84,
            particle.size * 1.75,
            particle.size * 0.2,
          );
          ctx.fill();
        }
        ctx.restore();
      }

      animationFrame = requestAnimationFrame(render);
    };

    resize();
    animationFrame = requestAnimationFrame(render);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={`confetti-canvas ${className}`}
      aria-hidden="true"
    />
  );
}
