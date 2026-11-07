import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BirthdayCake } from "../components/BirthdayCake";
import { BlowButton } from "../components/BlowButton";
import { Candle } from "../components/Candles";
import { Lighter } from "../components/Lighter";
import { SparkleField } from "../components/SparkleField";
import { HeartIcon, SparkleIcon, StarIcon } from "../components/Icons";
import type { SoundName } from "../hooks/useAudio";

type CakeSceneProps = {
  onComplete: () => void;
  play: (sound: SoundName) => void;
};

type LighterStage = "hidden" | "landed" | "first" | "second" | "away";

const sparkleBurst = Array.from({ length: 20 }, (_, index) => ({
  left: 14 + ((index * 37) % 72),
  top: 26 + ((index * 53) % 54),
  size: 8 + (index % 4) * 4,
  delay: (index % 6) * 0.06,
  drift: -18 - (index % 5) * 8,
  color:
    index % 4 === 0
      ? "#ffe49b"
      : index % 4 === 1
        ? "#ffadd0"
        : index % 4 === 2
          ? "#cbb6ff"
          : "#b4edff",
}));

const bunting = Array.from({ length: 11 }, (_, index) => ({
  rotate: index % 2 === 0 ? 4 : -4,
  color:
    index % 3 === 0
      ? "#ff9fc4"
      : index % 3 === 1
        ? "#c6b1ff"
        : "#ffd889",
}));

export function CakeScene({ onComplete, play }: CakeSceneProps) {
  const [candle2Drop, setCandle2Drop] = useState(false);
  const [candle1Drop, setCandle1Drop] = useState(false);
  const [lighterStage, setLighterStage] = useState<LighterStage>("hidden");
  const [flame2, setFlame2] = useState(false);
  const [flame1, setFlame1] = useState(false);
  const [lit, setLit] = useState(false);
  const [blowing, setBlowing] = useState(false);
  const [extinguished, setExtinguished] = useState(false);
  const [showWind, setShowWind] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const completeRef = useRef(onComplete);
  const playRef = useRef(play);

  useEffect(() => {
    completeRef.current = onComplete;
    playRef.current = play;
  }, [onComplete, play]);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => {
        setCandle2Drop(true);
        playRef.current("pop");
      }, 980),
      window.setTimeout(() => {
        setCandle1Drop(true);
        playRef.current("pop");
      }, 1510),
      window.setTimeout(() => {
        setLighterStage("landed");
        playRef.current("tick");
      }, 2130),
      window.setTimeout(() => {
        setLighterStage("first");
        playRef.current("sparkle");
      }, 2880),
      window.setTimeout(() => {
        setFlame2(true);
      }, 3230),
      window.setTimeout(() => {
        setLighterStage("second");
        playRef.current("sparkle");
      }, 3660),
      window.setTimeout(() => {
        setFlame1(true);
      }, 4010),
      window.setTimeout(() => {
        setLighterStage("away");
        setLit(true);
        playRef.current("chime");
      }, 4560),
    ];
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  useEffect(() => {
    if (!blowing) return;
    setShowWind(true);
    playRef.current("whoosh");

    const extinguishTimer = window.setTimeout(() => {
      setExtinguished(true);
      setShowBurst(true);
      playRef.current("sparkle");
    }, 520);
    const windTimer = window.setTimeout(() => setShowWind(false), 1550);
    const completeTimer = window.setTimeout(() => {
      completeRef.current();
    }, 3450);

    return () => {
      window.clearTimeout(extinguishTimer);
      window.clearTimeout(windTimer);
      window.clearTimeout(completeTimer);
    };
  }, [blowing]);

  const handleBlow = () => {
    if (!lit || blowing) return;
    setBlowing(true);
  };

  const lighterAnimate = {
    hidden: { y: "-140vh", x: "0cqw", opacity: 0, rotate: -14 },
    landed: { y: "0cqw", x: "0cqw", opacity: 1, rotate: -6 },
    first: { y: "-3cqw", x: "-17cqw", opacity: 1, rotate: -20 },
    second: { y: "-4cqw", x: "-31cqw", opacity: 1, rotate: -20 },
    away: { y: "-34cqw", x: "-7cqw", opacity: 0, rotate: -8 },
  } satisfies Record<LighterStage, Record<string, string | number>>;

  const caption = blowing
    ? extinguished
      ? "Dorința ta a fost trimisă în univers... ✨"
      : "Suflă... stingem lumânările!"
    : lit
      ? "Apasă pentru a stinge lumânările."
      : "Lumânările se aprind...";

  return (
    <section className="cake-scene" aria-label="A doua surpriză: tortul">
      <div className="cake-bg" aria-hidden="true">
        <span className="cake-bg__glow" />
        <span className="cake-bg__blob cake-bg__blob--one" />
        <span className="cake-bg__blob cake-bg__blob--two" />
        <span className="cake-bg__blob cake-bg__blob--three" />
        <span className="cake-bg__grain" />
        <div className="bunting">
          {bunting.map((flag, index) => (
            <span
              key={index}
              className="bunting__flag"
              style={
                {
                  "--flag-color": flag.color,
                  "--flag-rotate": `${flag.rotate}deg`,
                  "--flag-delay": `${index * 0.12}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
        <div className="cake-bokeh">
          {Array.from({ length: 14 }, (_, index) => (
            <span
              key={index}
              style={
                {
                  left: `${(index * 23 + 7) % 100}%`,
                  top: `${(index * 31 + 14) % 100}%`,
                  width: 4 + (index % 4) * 5,
                  height: 4 + (index % 4) * 5,
                  animationDelay: `${index * 0.4}s`,
                  animationDuration: `${5 + (index % 5)}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>

      <SparkleField variant="cake" />

      <div className="cake-content">
        <motion.header
          className="cake-heading"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
        >
          <div className="eyebrow eyebrow--warm">
            <SparkleIcon className="eyebrow__spark" />
            <span>Scena 2 · dorința ta</span>
            <SparkleIcon className="eyebrow__spark" />
          </div>
          <AnimatePresence mode="wait">
            <motion.h1
              key={extinguished ? "sent" : "wish"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}
            >
              {extinguished ? "Dorință trimisă ✨" : "Pune-ți o dorință ✨"}
            </motion.h1>
          </AnimatePresence>
          <p>
            {extinguished
              ? "Universul a primit-o. Acum hai să o sărbătorim."
              : "Închide ochii, gândește-te la ce îți dorești cel mai mult."}
          </p>
        </motion.header>

        <div className="cake-stage">
          <div className="cake-halo" aria-hidden="true" />
          <div className={`cake-rig ${lit ? "is-floating" : ""}`}>
            <motion.div
              className="cake-fall"
              initial={{ y: "-118vh", rotate: -8, scale: 0.92 }}
              animate={{ y: 0, rotate: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 72,
                damping: 12,
                mass: 1.05,
                delay: 0.15,
              }}
            >
              <BirthdayCake />
            </motion.div>

            <motion.div
              className="candle-anchor candle-anchor--2"
              initial={{ y: "-132vh" }}
              animate={{ y: candle2Drop ? 0 : "-132vh" }}
              transition={{ type: "spring", stiffness: 120, damping: 14, mass: 0.8 }}
            >
              <Candle
                number="2"
                lit={flame2 && !extinguished}
                extinguished={extinguished}
                flickering={blowing && !extinguished}
              />
            </motion.div>

            <motion.div
              className="candle-anchor candle-anchor--1"
              initial={{ y: "-132vh" }}
              animate={{ y: candle1Drop ? 0 : "-132vh" }}
              transition={{ type: "spring", stiffness: 120, damping: 14, mass: 0.8 }}
            >
              <Candle
                number="1"
                lit={flame1 && !extinguished}
                extinguished={extinguished}
                flickering={blowing && !extinguished}
              />
            </motion.div>

            <motion.div
              className="lighter-anchor"
              initial={lighterAnimate.hidden}
              animate={lighterAnimate[lighterStage]}
              transition={
                lighterStage === "landed"
                  ? { type: "spring", stiffness: 105, damping: 13, mass: 0.9 }
                  : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
              }
            >
              <Lighter
                flameOn={
                  (lighterStage === "first" || lighterStage === "second") &&
                  !extinguished
                }
              />
            </motion.div>
          </div>

          {showBurst && (
            <div className="cake-burst" aria-hidden="true">
              {sparkleBurst.map((sparkle, index) => (
                <motion.span
                  key={index}
                  style={{
                    left: `${sparkle.left}%`,
                    top: `${sparkle.top}%`,
                    color: sparkle.color,
                  }}
                  initial={{ opacity: 0, scale: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1, 0.8, 0.2],
                    y: sparkle.drift,
                  }}
                  transition={{
                    duration: 1.9,
                    delay: sparkle.delay,
                    ease: "easeOut",
                  }}
                >
                  {index % 3 === 0 ? (
                    <HeartIcon width={sparkle.size} height={sparkle.size} />
                  ) : index % 3 === 1 ? (
                    <StarIcon width={sparkle.size} height={sparkle.size} />
                  ) : (
                    <SparkleIcon width={sparkle.size} height={sparkle.size} />
                  )}
                </motion.span>
              ))}
            </div>
          )}

          <AnimatePresence>
            {showWind && (
              <motion.div
                className="wind-layer"
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[0, 1, 2].map((line) => (
                  <motion.div
                    key={line}
                    className={`wind-swoosh wind-swoosh--${line + 1}`}
                    initial={{ y: "10vh", opacity: 0, scale: 0.7 }}
                    animate={{
                      y: "-18vh",
                      opacity: [0, 0.9, 0.85, 0],
                      scale: [0.7, 1.15, 1.25, 1.35],
                    }}
                    transition={{
                      duration: 1.25,
                      delay: line * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    <svg viewBox="0 0 260 150" fill="none">
                      <path
                        d="M9 109c48-6 48-49 91-54 42-5 52 31 94 20 20-5 33-18 49-38"
                        stroke="url(#wind-gradient)"
                        strokeWidth="7"
                        strokeLinecap="round"
                      />
                      <path
                        d="M35 130c36-4 43-32 76-37 38-6 46 25 81 14 16-5 26-14 38-29"
                        stroke="url(#wind-gradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        opacity="0.7"
                      />
                      <defs>
                        <linearGradient
                          id="wind-gradient"
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="0"
                        >
                          <stop stopColor="#ffffff" stopOpacity="0" />
                          <stop offset="0.4" stopColor="#dff6ff" stopOpacity="0.9" />
                          <stop offset="1" stopColor="#d8c6ff" stopOpacity="0.1" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <BlowButton
          visible={lit && !blowing}
          onBlow={handleBlow}
          disabled={!lit || blowing}
          caption={caption}
        />
      </div>

      <div className="cake-vignette" aria-hidden="true" />
    </section>
  );
}
