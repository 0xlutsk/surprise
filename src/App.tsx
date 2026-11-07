import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SceneDots } from "./components/SceneDots";
import { SoundToggle } from "./components/SoundToggle";
import { useAudio } from "./hooks/useAudio";
import { CakeScene } from "./scenes/CakeScene";
import { EntranceScene } from "./scenes/EntranceScene";
import { GalaxyScene } from "./scenes/GalaxyScene";
import type { BirthdayScene } from "./types";

const sceneTransition = {
  duration: 0.9,
  ease: [0.65, 0, 0.35, 1] as const,
};

function App() {
  const [scene, setScene] = useState<BirthdayScene>("entrance");
  const [muted, setMuted] = useState(false);
  const play = useAudio(muted);
  const isGalaxy = scene === "galaxy";

  useEffect(() => {
    const titles: Record<BirthdayScene, string> = {
      entrance: "La mulți ani, Dumi! · 21",
      cake: "Pune-ți o dorință ✨ · Dumi 21",
      galaxy: "Un univers de urări · Dumi 21",
    };
    document.title = titles[scene];
  }, [scene]);

  const goToScene = useCallback((next: BirthdayScene) => {
    setScene((current) => (current === next ? current : next));
  }, []);

  const replay = useCallback(() => {
    setScene("entrance");
  }, []);

  return (
    <div
      className={`app-shell ${isGalaxy ? "app-shell--galaxy" : ""}`}
      data-scene={scene}
    >
      <div className="app-chrome">
        <motion.div
          className={`app-brand ${isGalaxy ? "app-brand--light" : ""}`}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          aria-label="Dumi, 21 de ani"
        >
          <span className="app-brand__spark" aria-hidden="true">
            ✦
          </span>
          <span className="app-brand__name">Dumi</span>
          <span className="app-brand__age">21</span>
        </motion.div>

        <SceneDots active={scene} light={isGalaxy} />

        <SoundToggle
          muted={muted}
          onToggle={() => setMuted((value) => !value)}
          light={isGalaxy}
        />
      </div>

      <AnimatePresence mode="wait">
        {scene === "entrance" && (
          <motion.main
            key="entrance"
            className="scene-layer"
            initial={{ opacity: 0, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985, filter: "blur(9px)" }}
            transition={sceneTransition}
          >
            <EntranceScene
              play={play}
              onComplete={() => goToScene("cake")}
            />
          </motion.main>
        )}

        {scene === "cake" && (
          <motion.main
            key="cake"
            className="scene-layer"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03, filter: "blur(10px)" }}
            transition={sceneTransition}
          >
            <CakeScene play={play} onComplete={() => goToScene("galaxy")} />
          </motion.main>
        )}

        {scene === "galaxy" && (
          <motion.main
            key="galaxy"
            className="scene-layer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          >
            <GalaxyScene play={play} onReplay={replay} />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
