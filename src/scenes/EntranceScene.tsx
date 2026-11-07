import { motion } from "framer-motion";
import { Balloons } from "../components/Balloons";
import { Confetti } from "../components/Confetti";
import { ScratchCard } from "../components/ScratchCard";
import { SparkleField } from "../components/SparkleField";
import { HeartIcon, SparkleIcon } from "../components/Icons";
import type { SoundName } from "../hooks/useAudio";

type EntranceSceneProps = {
  onComplete: () => void;
  play: (sound: SoundName) => void;
};

export function EntranceScene({ onComplete, play }: EntranceSceneProps) {
  return (
    <section className="entrance-scene" aria-label="Prima surpriză">
      <div className="entrance-bg" aria-hidden="true">
        <span className="dream-blob dream-blob--one" />
        <span className="dream-blob dream-blob--two" />
        <span className="dream-blob dream-blob--three" />
        <span className="dream-blob dream-blob--four" />
        <span className="dream-grain" />
      </div>

      <Confetti />
      <Balloons />
      <SparkleField variant="entrance" />

      <div className="entrance-content">
        <motion.header
          className="entrance-header"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="eyebrow">
            <SparkleIcon className="eyebrow__spark" />
            <span>O zi mare pentru cineva special</span>
            <SparkleIcon className="eyebrow__spark" />
          </div>
          <h1 className="entrance-title">
            Hei, <span className="script-accent">Dumi!</span>
            <HeartIcon className="entrance-title__heart" />
          </h1>
          <p className="entrance-subtitle">
            Am ascuns ceva magic printre confetti...
            <br />
            <span>Răzuiește și descoperă.</span>
          </p>
        </motion.header>

        <ScratchCard onComplete={onComplete} play={play} />

        <motion.p
          className="entrance-note"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="entrance-note__dot" />
          un cadou mic, o surpriză mare
          <span className="entrance-note__dot" />
        </motion.p>
      </div>

      <div className="entrance-vignette" aria-hidden="true" />
    </section>
  );
}
