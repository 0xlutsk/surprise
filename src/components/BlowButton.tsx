import { AnimatePresence, motion } from "framer-motion";
import { WindIcon } from "./Icons";

type BlowButtonProps = {
  visible: boolean;
  onBlow: () => void;
  disabled?: boolean;
  caption?: string;
};

export function BlowButton({
  visible,
  onBlow,
  disabled,
  caption,
}: BlowButtonProps) {
  return (
    <div className="blow-area">
      <AnimatePresence>
        {visible && (
          <motion.div
            className="blow-button-wrap"
            initial={{ opacity: 0, y: 18, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.94 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.button
              type="button"
              className="blow-button"
              onClick={onBlow}
              disabled={disabled}
              whileHover={{ scale: 1.045, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
            >
              <span className="blow-button__icon">
                <WindIcon />
              </span>
              <span>Suflă! 💨</span>
              <span className="blow-button__shine" aria-hidden="true" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.p
          key={visible ? "ready" : "waiting"}
          className="blow-caption"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.35 }}
        >
          {caption ??
            (visible
              ? "Apasă pentru a stinge lumânările."
              : "Lumânările se aprind...")}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
