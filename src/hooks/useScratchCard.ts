import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";

type Point = { x: number; y: number };

type UseScratchCardOptions = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  hostRef: RefObject<HTMLDivElement | null>;
  threshold?: number;
  onUnlock?: () => void;
};

function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  points = 4,
) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i += 1) {
    const r = i % 2 === 0 ? radius : radius * 0.36;
    const angle = (Math.PI / points) * i - Math.PI / 2;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

function paintCoating(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  ctx.clearRect(0, 0, width, height);
  ctx.globalCompositeOperation = "source-over";

  const base = ctx.createLinearGradient(0, 0, width, height);
  base.addColorStop(0, "#f4dce8");
  base.addColorStop(0.26, "#eadcf2");
  base.addColorStop(0.54, "#dce8f7");
  base.addColorStop(0.78, "#f7e7df");
  base.addColorStop(1, "#f2dfd0");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, width, height);

  const glow = ctx.createRadialGradient(
    width * 0.28,
    height * 0.15,
    4,
    width * 0.28,
    height * 0.15,
    width * 0.8,
  );
  glow.addColorStop(0, "rgba(255,255,255,.7)");
  glow.addColorStop(0.5, "rgba(255,255,255,.08)");
  glow.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalAlpha = 0.18;
  for (let x = -height; x < width + height; x += 28) {
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + height, height);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  for (let i = 0; i < 110; i += 1) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const r = Math.random() * 1.5 + 0.3;
    ctx.globalAlpha = 0.12 + Math.random() * 0.28;
    ctx.fillStyle = i % 4 === 0 ? "#ffffff" : "#b394b8";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  const starSpots = [
    [0.09, 0.2, 0.018],
    [0.17, 0.77, 0.012],
    [0.3, 0.13, 0.011],
    [0.43, 0.82, 0.015],
    [0.57, 0.11, 0.009],
    [0.68, 0.79, 0.014],
    [0.8, 0.21, 0.012],
    [0.91, 0.67, 0.017],
    [0.5, 0.22, 0.008],
    [0.77, 0.47, 0.008],
  ];
  starSpots.forEach(([x, y, r], index) => {
    ctx.save();
    ctx.globalAlpha = 0.3 + (index % 3) * 0.12;
    ctx.fillStyle = index % 2 === 0 ? "#fff8d5" : "#ffffff";
    drawStar(ctx, x * width, y * height, r * Math.min(width, height), 4);
    ctx.restore();
  });

  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,.56)";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 7]);
  ctx.beginPath();
  ctx.roundRect(13, 13, width - 26, height - 26, 24);
  ctx.stroke();
  ctx.restore();

  const titleSize = Math.max(17, Math.min(27, width * 0.045));
  const subSize = Math.max(13, Math.min(18, width * 0.031));
  const centerY = height * 0.5;

  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillStyle = "rgba(255,255,255,.7)";
  ctx.font = `700 ${titleSize}px Fredoka, sans-serif`;
  ctx.fillText("Răzuiește aici", width / 2 + 0.8, centerY - 11 + 0.8);

  ctx.fillStyle = "#75506f";
  ctx.font = `600 ${titleSize}px Fredoka, sans-serif`;
  ctx.fillText("Răzuiește aici", width / 2, centerY - 11);

  ctx.fillStyle = "rgba(105, 78, 108, .78)";
  ctx.font = `700 ${subSize}px Nunito, sans-serif`;
  ctx.fillText("pentru o surpriză! ✨", width / 2, centerY + subSize + 4);

  const pillWidth = Math.min(166, width * 0.4);
  const pillHeight = Math.max(22, height * 0.07);
  const pillY = height - pillHeight - 22;
  ctx.fillStyle = "rgba(255,255,255,.42)";
  ctx.beginPath();
  ctx.roundRect(
    width / 2 - pillWidth / 2,
    pillY,
    pillWidth,
    pillHeight,
    pillHeight / 2,
  );
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,.58)";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = "rgba(101, 70, 102, .62)";
  ctx.font = `800 ${Math.max(9, Math.min(11, width * 0.019))}px Nunito, sans-serif`;
  ctx.fillText("70% · deblochează surpriza", width / 2, pillY + pillHeight / 2 + 0.5);

  ctx.restore();
}

export function useScratchCard({
  canvasRef,
  hostRef,
  threshold = 0.7,
  onUnlock,
}: UseScratchCardOptions) {
  const [progress, setProgress] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<Point | null>(null);
  const unlockedRef = useRef(false);
  const progressRef = useRef(0);
  const lastCheckRef = useRef(0);
  const lastSizeRef = useRef({ width: 0, height: 0 });
  const onUnlockRef = useRef(onUnlock);

  useEffect(() => {
    onUnlockRef.current = onUnlock;
  }, [onUnlock]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let disposed = false;

    const setup = (force = false) => {
      if (disposed || unlockedRef.current) return;
      const rect = host.getBoundingClientRect();
      if (rect.width < 20 || rect.height < 20) return;
      if (
        !force &&
        Math.abs(rect.width - lastSizeRef.current.width) < 1 &&
        Math.abs(rect.height - lastSizeRef.current.height) < 1
      ) {
        return;
      }

      lastSizeRef.current = { width: rect.width, height: rect.height };
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paintCoating(ctx, rect.width, rect.height);
      progressRef.current = 0;
      setProgress(0);
    };

    frame = requestAnimationFrame(() => setup(true));
    const observer = new ResizeObserver(() => setup());
    observer.observe(host);

    if (document.fonts?.ready) {
      void document.fonts.ready.then(() => {
        if (!unlockedRef.current && progressRef.current < 0.005) {
          setup(true);
        }
      });
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [canvasRef, hostRef]);

  const finish = useCallback(() => {
    if (unlockedRef.current) return;
    unlockedRef.current = true;
    drawingRef.current = false;
    progressRef.current = 1;
    setProgress(1);
    setIsUnlocked(true);
    setIsScratching(false);
    onUnlockRef.current?.();
  }, []);

  const sampleProgress = useCallback(
    (force = false) => {
      if (unlockedRef.current) return;
      const canvas = canvasRef.current;
      if (!canvas || canvas.width === 0 || canvas.height === 0) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const now = performance.now();
      if (!force && now - lastCheckRef.current < 150) return;
      lastCheckRef.current = now;

      let data: Uint8ClampedArray;
      try {
        data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      } catch {
        return;
      }

      const step = Math.max(
        3,
        Math.round(Math.min(canvas.width, canvas.height) / 92),
      );
      let cleared = 0;
      let total = 0;

      for (let y = Math.floor(step / 2); y < canvas.height; y += step) {
        for (let x = Math.floor(step / 2); x < canvas.width; x += step) {
          const alpha = data[(y * canvas.width + x) * 4 + 3];
          total += 1;
          if (alpha < 72) cleared += 1;
        }
      }

      if (total === 0) return;
      const nextProgress = cleared / total;
      if (nextProgress > progressRef.current + 0.002) {
        progressRef.current = nextProgress;
        setProgress(nextProgress);
      }

      if (nextProgress >= threshold) {
        finish();
      }
    },
    [canvasRef, finish, threshold],
  );

  const erase = useCallback(
    (point: Point, previous: Point | null) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const rect = canvas.getBoundingClientRect();
      const brush = Math.max(
        14,
        Math.min(32, Math.min(rect.width, rect.height) * 0.076),
      );

      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.globalAlpha = 0.35;
      ctx.lineWidth = brush * 2.7;
      ctx.strokeStyle = "#000";
      ctx.fillStyle = "#000";
      if (previous) {
        ctx.beginPath();
        ctx.moveTo(previous.x, previous.y);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(point.x, point.y, brush * 1.35, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 1;
      ctx.lineWidth = brush * 1.8;
      if (previous) {
        ctx.beginPath();
        ctx.moveTo(previous.x, previous.y);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(point.x, point.y, brush, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    },
    [canvasRef],
  );

  const getPoint = useCallback(
    (event: ReactPointerEvent<HTMLCanvasElement>): Point => {
      const rect = event.currentTarget.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    },
    [],
  );

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLCanvasElement>) => {
      if (unlockedRef.current) return;
      event.preventDefault();
      const point = getPoint(event);
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {
        // Pointer capture is a progressive enhancement.
      }
      drawingRef.current = true;
      lastPointRef.current = point;
      setIsScratching(true);
      erase(point, null);
    },
    [erase, getPoint],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLCanvasElement>) => {
      if (!drawingRef.current || unlockedRef.current) return;
      event.preventDefault();
      const point = getPoint(event);
      erase(point, lastPointRef.current);
      lastPointRef.current = point;
      sampleProgress(false);
    },
    [erase, getPoint, sampleProgress],
  );

  const endScratch = useCallback(
    (event: ReactPointerEvent<HTMLCanvasElement>) => {
      if (!drawingRef.current) return;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      drawingRef.current = false;
      lastPointRef.current = null;
      setIsScratching(false);
      sampleProgress(true);
    },
    [sampleProgress],
  );

  const onPointerUp = useCallback(
    (event: ReactPointerEvent<HTMLCanvasElement>) => {
      endScratch(event);
    },
    [endScratch],
  );

  const onPointerCancel = useCallback(
    (event: ReactPointerEvent<HTMLCanvasElement>) => {
      endScratch(event);
    },
    [endScratch],
  );

  return {
    canvasRef,
    hostRef,
    progress,
    isUnlocked,
    isScratching,
    threshold,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
      onLostPointerCapture: onPointerCancel,
    },
  };
}
