import { motion } from "framer-motion";
import type { BirthdayScene } from "../types";

const scenes: BirthdayScene[] = ["entrance", "cake", "galaxy"];
const labels: Record<BirthdayScene, string> = {
  entrance: "Surpriza",
  cake: "Dorința",
  galaxy: "Universul",
};

type SceneDotsProps = {
  active: BirthdayScene;
  light?: boolean;
};

export function SceneDots({ active, light }: SceneDotsProps) {
  const activeIndex = scenes.indexOf(active);

  return (
    <div
      className={`scene-dots ${light ? "scene-dots--light" : ""}`}
      aria-label={`Scena ${activeIndex + 1} din 3: ${labels[active]}`}
    >
      {scenes.map((scene, index) => (
        <span
          className={`scene-dot ${index === activeIndex ? "is-active" : ""} ${
            index < activeIndex ? "is-done" : ""
          }`}
          key={scene}
        >
          {index === activeIndex && (
            <motion.span
              className="scene-dot__fill"
              layoutId="scene-dot-fill"
              transition={{ type: "spring", stiffness: 380, damping: 34 }}
            />
          )}
        </span>
      ))}
    </div>
  );
}
