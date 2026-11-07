import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  twinkle: number;
};

const STAR_COLORS = [
  "255, 255, 255",
  "255, 235, 196",
  "255, 193, 225",
  "207, 188, 255",
  "178, 235, 255",
];

function createStar(width: number, height: number, spread = false): Star {
  const maxDepth = 1600;
  const angle = Math.random() * Math.PI * 2;
  const radius =
    Math.sqrt(Math.random()) * Math.max(width, height) * (0.38 + Math.random() * 0.62);

  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    z: spread ? 40 + Math.random() * maxDepth : maxDepth,
    size: 0.35 + Math.random() * 1.7,
    color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
    twinkle: Math.random() * Math.PI * 2,
  };
}

export function GalaxyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars: Star[] = [];
    let frame = 0;
    let lastTime = performance.now();
    const startTime = performance.now();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const maxDepth = 1600;

    const createStars = () => {
      const count =
        width < 600 ? 520 : width < 1100 ? 880 : 1250;
      stars = Array.from({ length: count }, () =>
        createStar(width, height, true),
      );
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
      createStars();
    };

    const render = (time: number) => {
      const delta = Math.min(34, time - lastTime) / 16.67;
      lastTime = time;
      const elapsed = (time - startTime) / 1000;
      const speed =
        (1.25 + Math.min(15.5, elapsed * 1.65)) *
        delta *
        (reduceMotion ? 0.35 : 1);
      const cx = width / 2;
      const cy = height * 0.46;
      const focal = Math.min(width, height) * 0.9;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";

      for (const star of stars) {
        star.z -= speed;
        star.twinkle += 0.018 * delta;

        if (star.z <= 16) {
          Object.assign(star, createStar(width, height));
          star.z = maxDepth;
        }

        const scale = focal / star.z;
        const x = cx + star.x * scale;
        const y = cy + star.y * scale;
        if (x < -80 || x > width + 80 || y < -80 || y > height + 80) {
          Object.assign(star, createStar(width, height));
          star.z = maxDepth;
          continue;
        }

        const trailScale = focal / (star.z + speed * 4 + 3);
        const trailX = cx + star.x * trailScale;
        const trailY = cy + star.y * trailScale;
        const depth = 1 - star.z / maxDepth;
        const alpha = Math.min(1, 0.14 + depth * 0.95);
        const twinkle =
          0.78 + Math.sin(star.twinkle + star.x * 0.01) * 0.22;
        const lineWidth = Math.max(
          0.35,
          star.size * (0.4 + depth * 2.3) * twinkle,
        );

        ctx.strokeStyle = `rgba(${star.color}, ${alpha})`;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(trailX, trailY);
        ctx.lineTo(x, y);
        ctx.stroke();

        if (star.size > 1.45 && depth > 0.35) {
          ctx.fillStyle = `rgba(${star.color}, ${alpha * 0.72})`;
          ctx.beginPath();
          ctx.arc(x, y, lineWidth * 0.72, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalCompositeOperation = "source-over";
      frame = requestAnimationFrame(render);
    };

    resize();
    frame = requestAnimationFrame(render);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="galaxy-canvas"
      aria-hidden="true"
    />
  );
}
