import { defineConfig } from "vite";

export default defineConfig({
  root: "./",
  base: "/chat/", // 👈 This fixes relative paths for Axum mount
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
});
