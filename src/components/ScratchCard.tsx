import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useScratchCard } from "../hooks/useScratchCard";
import type { SoundName } from "../hooks/useAudio";
import { HeartIcon, SparkleIcon, StarIcon } from "./Icons";

type ScratchCardProps = {
  onComplete: () => void;
  play: (sound: SoundName) => void;
};

const burstParticles = Array.from({ length: 16 }, (_, index) => {
  const angle = (Math.PI * 2 * index) / 16 + 0.2;
  const distance = 80 + (index % 4) * 24;
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance * 0.72,
    delay: index * 0.018,
    size: 9 + (index % 3) * 4,
    color:
      index % 4 === 0
        ? "#ff89b6"
        : index % 4 === 1
          ? "#ffe7a1"
          : index % 4 === 2
            ? "#cbb6ff"
            : "#a9e7ff",
    kind: index % 3 === 0 ? "heart" : "star",
  };
});

export function ScratchCard({ onComplete, play }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hostRef = useRef<HTMLDivElement | null>(null);
  const completeRef = useRef(onComplete);
  const playRef = useRef(play);

  useEffect(() => {
    completeRef.current = onComplete;
    playRef.current = play;
  }, [onComplete, play]);

  const {
    progress,
    isUnlocked,
    isScratching,
    threshold,
    handlers,
  } = useScratchCard({
    canvasRef,
    hostRef,
    threshold: 0.7,
    onUnlock: () => playRef.current("a"),
  });

  useEffect(() => {
    if (!isUnlocked) return;
    const timer = window.setTimeout(() => {
      completeRef.current();
    }, 2850);
    return () => window.clearTimeout(timer);
  }, [isUnlocked]);

  const percent = Math.min(100, Math.round(progress * 100));

  return (
    <div className="scratch-card-block">
      <motion.div
        className={`scratch-card-wrap ${isUnlocked ? "is-unlocked" : ""}`}
        initial={{ opacity: 0, y: 28, rotate: 2.5, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
        transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="gift-bow" aria-hidden="true">
          <svg viewBox="0 0 140 72">
            <defs>
              <linearGradient id="bow-fill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ffd1e3" />
                <stop offset="0.55" stopColor="#ff9fc5" />
                <stop offset="1" stopColor="#e97eae" />
              </linearGradient>
            </defs>
            <path
              d="M67 28C52 4 20 0 11 18 2 37 33 48 67 38Z"
              fill="url(#bow-fill)"
              stroke="rgba(153,74,112,.18)"
              strokeWidth="1.5"
            />
            <path
              d="M73 28C88 4 120 0 129 18c9 19-22 30-56 20Z"
              fill="url(#bow-fill)"
              stroke="rgba(153,74,112,.18)"
              strokeWidth="1.5"
            />
            <path
              d="M61 42c-10 12-14 22-18 27 9 2 18-1 24-11l7-13Z"
              fill="#f58bb7"
            />
            <path
              d="M79 42c10 12 14 22 18 27-9 2-18-1-24-11l-7-13Z"
              fill="#f58bb7"
            />
            <ellipse cx="70" cy="34" rx="13" ry="12" fill="#ffb1d0" />
            <ellipse cx="66" cy="30" rx="4" ry="3" fill="#ffe3ef" />
          </svg>
        </div>

        <motion.div
          ref={hostRef}
          className={`scratch-card ${isScratching ? "is-scratching" : ""} ${
            isUnlocked ? "is-unlocked" : ""
          }`}
          animate={
            isUnlocked
              ? { boxShadow: "0 34px 100px -28px rgba(211, 92, 151, .6)" }
              : {}
          }
        >
          <div
            className="scratch-card__paper"
            aria-label="Mesaj ascuns: La mulți ani, Dumi! Să ai parte de o zi magică!"
          >
            <span className="scratch-card__corner scratch-card__corner--tl">
              <HeartIcon />
            </span>
            <span className="scratch-card__corner scratch-card__corner--br">
              <SparkleIcon />
            </span>
            <span className="scratch-card__kicker">pentru ziua ta</span>
            <div className="scratch-card__message">
              <span className="scratch-card__script">La mulți ani,</span>
              <h2 className="scratch-card__name">
                Dumi! <HeartIcon className="scratch-card__name-heart" />
              </h2>
              <p className="scratch-card__sub">
                Să ai parte de o zi magică!
              </p>
            </div>
            <span className="scratch-card__watermark" aria-hidden="true">
              21
            </span>
            <div className="scratch-card__doodle" aria-hidden="true">
              <span>✦</span>
              <span>♡</span>
              <span>✦</span>
            </div>
          </div>

          <canvas
            ref={canvasRef}
            className={`scratch-card__canvas ${
              isUnlocked ? "is-unlocked" : ""
            }`}
            aria-label="Zonă de răzuit. Răzuiește 70% pentru a descoperi mesajul."
            {...handlers}
          />

          <div
            className={`scratch-card__sheen ${isUnlocked ? "is-unlocked" : ""}`}
            aria-hidden="true"
          />

          {isUnlocked && (
            <div className="scratch-burst" aria-hidden="true">
              {burstParticles.map((particle, index) => {
                const Icon = particle.kind === "heart" ? HeartIcon : StarIcon;
                return (
                  <motion.span
                    key={index}
                    className="scratch-burst__particle"
                    style={{ color: particle.color }}
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0.2 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      x: particle.x,
                      y: particle.y,
                      scale: [0.2, 1, 0.8, 0.2],
                    }}
                    transition={{
                      duration: 1.8,
                      delay: particle.delay,
                      ease: "easeOut",
                    }}
                  >
                    <Icon width={particle.size} height={particle.size} />
                  </motion.span>
                );
              })}
            </div>
          )}
        </motion.div>
      </motion.div>

      <div className="scratch-meter">
        <div className="scratch-meter__copy">
          <span
            className={`scratch-meter__label ${
              isUnlocked ? "is-unlocked" : ""
            }`}
            aria-live="polite"
          >
            {isUnlocked
              ? "Surpriză deblocată! 💗"
              : isScratching
                ? "Continuă... e aproape!"
                : "Răzuiește ușor, cu mouse-ul sau degetul"}
          </span>
          <span className="scratch-meter__percent">
            {isUnlocked ? "100%" : `${percent}%`}
          </span>
        </div>
        <div
          className="scratch-meter__track"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={isUnlocked ? 100 : percent}
          aria-label="Progres răzuire"
        >
          <motion.span
            className={`scratch-meter__fill ${
              isUnlocked ? "is-unlocked" : ""
            }`}
            animate={{ width: `${isUnlocked ? 100 : percent}%` }}
            transition={{ type: "spring", stiffness: 150, damping: 26 }}
          />
          <span
            className="scratch-meter__threshold"
            style={{ left: `${threshold * 100}%` }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
