import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages project sites live under /<repository-name>/.
// The workflow injects VITE_BASE_PATH so the repo name never has to be hard-coded.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base =
    env.VITE_BASE_PATH || (mode === "production" ? "/happybirthday/" : "/");

  return {
    base,
    plugins: [react()],
    build: {
      outDir: "dist",
      assetsDir: "assets",
    },
  };
});
