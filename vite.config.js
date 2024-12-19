import { defineConfig } from "vite";

export default defineConfig({
  root: "./src/front",
  build: {
    rollupOptions: {
      input: {
        main: "./src/front/index.html",
        about: "./src/front/pages/game.html",
      },
    },
    outDir: "../../dist/front",
    target: "es2022",
  },
});
