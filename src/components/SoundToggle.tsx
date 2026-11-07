import { motion } from "framer-motion";
import { SpeakerIcon } from "./Icons";

type SoundToggleProps = {
  muted: boolean;
  onToggle: () => void;
  light?: boolean;
};

export function SoundToggle({ muted, onToggle, light }: SoundToggleProps) {
  return (
    <motion.button
      type="button"
      className={`sound-toggle ${light ? "sound-toggle--light" : ""}`}
      onClick={onToggle}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      aria-label={muted ? "Pornește sunetul" : "Oprește sunetul"}
      aria-pressed={!muted}
      title={muted ? "Pornește sunetul" : "Oprește sunetul"}
    >
      <SpeakerIcon muted={muted} className="sound-toggle__icon" />
      <span className="sound-toggle__bars" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    </motion.button>
  );
}
