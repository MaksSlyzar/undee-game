import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: "src",
  publicDir: "public",
  resolve: {
    alias: {
      "@core": path.resolve(__dirname, "src/core"),
      "@network": path.resolve(__dirname, "src/network"),
      "@game": path.resolve(__dirname, "src/game"),
      "@game-objects": path.resolve(__dirname, "src/game/game-objects"),
      "@gui": path.resolve(__dirname, "src/gui"),
      "@hud": path.resolve(__dirname, "src/hud")
    }
  },
  build: {
    outDir: "../dist"
  }
});

