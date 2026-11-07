import { useEffect } from "react";
import { motion } from "framer-motion";
import { GalaxyCanvas } from "../components/Galaxy";
import { WishField } from "../components/WishField";
import { HeartIcon, ReplayIcon, SparkleIcon } from "../components/Icons";
import type { SoundName } from "../hooks/useAudio";

type GalaxySceneProps = {
  play: (sound: SoundName) => void;
  onReplay: () => void;
};

const shootingStars = [
  { top: "16%", left: "8%", delay: "1.5s", duration: "7s" },
  { top: "38%", left: "64%", delay: "4.4s", duration: "9s" },
  { top: "70%", left: "20%", delay: "7.2s", duration: "8s" },
];

export function GalaxyScene({ play, onReplay }: GalaxySceneProps) {
  useEffect(() => {
    const firstChime = window.setTimeout(() => play("chime"), 950);
    const secondChime = window.setTimeout(() => play("sparkle"), 4850);
    return () => {
      window.clearTimeout(firstChime);
      window.clearTimeout(secondChime);
    };
  }, [play]);

  return (
    <section className="galaxy-scene" aria-label="Finalul: o galaxie de urări">
      <div className="galaxy-bg" aria-hidden="true">
        <span className="galaxy-nebula galaxy-nebula--one" />
        <span className="galaxy-nebula galaxy-nebula--two" />
        <span className="galaxy-nebula galaxy-nebula--three" />
        <span className="galaxy-dust" />
      </div>

      <GalaxyCanvas />

      <div className="galaxy-wrap" aria-hidden="true">
        <motion.div
          className="galaxy-scale"
          initial={{ scale: 0.05, opacity: 0, rotate: -20 }}
          animate={{ scale: 2.72, opacity: 1, rotate: 3 }}
          transition={{ duration: 11.5, ease: [0.16, 0.62, 0.22, 1] }}
        >
          <div className="galaxy">
            <span className="galaxy__halo" />
            <span className="galaxy__arm galaxy__arm--one" />
            <span className="galaxy__arm galaxy__arm--two" />
            <span className="galaxy__arm galaxy__arm--three" />
            <span className="galaxy__dust-ring" />
            <span className="galaxy__core" />
            <span className="galaxy__core-star" />
          </div>
        </motion.div>
      </div>

      <div className="shooting-stars" aria-hidden="true">
        {shootingStars.map((star, index) => (
          <span
            key={index}
            className="shooting-star"
            style={
              {
                top: star.top,
                left: star.left,
                "--shooting-delay": star.delay,
                "--shooting-duration": star.duration,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="galaxy-dedication">
        <motion.div
          className="galaxy-dedication__inner"
          initial={{ opacity: 0, y: 24, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 4.15, duration: 1.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="galaxy-dedication__eyebrow">
            <SparkleIcon />
            astăzi, universul sărbătorește
            <SparkleIcon />
          </span>
          <h1>
            <span className="galaxy-dedication__script">La mulți ani,</span>
            <span className="galaxy-dedication__name">
              Dumi! <HeartIcon className="galaxy-dedication__heart" />
            </span>
          </h1>
          <span className="galaxy-dedication__age">21</span>
        </motion.div>
      </div>

      <WishField />

      <motion.div
        className="galaxy-signature"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 8.2, duration: 1.1 }}
      >
        <span>cu drag, pentru Dumi</span>
        <HeartIcon />
      </motion.div>

      <motion.button
        type="button"
        className="replay-button"
        onClick={onReplay}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 9.5, duration: 0.9 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Reia experiența de la început"
      >
        <ReplayIcon />
        <span>Reia</span>
      </motion.button>

      <motion.div
        className="galaxy-flash"
        aria-hidden="true"
        initial={{ opacity: 0.92 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
      />

      <div className="galaxy-vignette" aria-hidden="true" />
    </section>
  );
}
