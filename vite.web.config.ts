import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

// Builds the mDrop web frontend (RetroPlayer版) for use with the mDrop HTTP server.
// Output goes to src-mdrop-core/web-placeholder/ so rust_embed picks it up at compile time.
// Run: npm run build:web  → then rebuild Tauri to embed the updated assets.
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: resolve(__dirname, "src-mdrop-core/web-placeholder"),
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        web: resolve(__dirname, "web.html"),
      },
    },
  },
});
