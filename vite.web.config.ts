import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
import fs from "node:fs";

const pdfjsWasmCopy = () => ({
  name: "pdfjs-wasm-copy",
  closeBundle() {
    const wasmSrc = resolve(__dirname, "node_modules/pdfjs-dist/wasm");
    const pdfjsDst = resolve(__dirname, "src-mdrop-core/web-placeholder/pdfjs");
    fs.mkdirSync(pdfjsDst, { recursive: true });
    for (const f of ["jbig2.wasm", "openjpeg.wasm", "qcms_bg.wasm"]) {
      fs.copyFileSync(resolve(wasmSrc, f), resolve(pdfjsDst, f));
    }
  },
});

// Builds the mDrop web frontend (RetroPlayer版) for use with the mDrop HTTP server.
// Output goes to src-mdrop-core/web-placeholder/ so rust_embed picks it up at compile time.
// Run: npm run build:web  → then rebuild Tauri to embed the updated assets.
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss(), pdfjsWasmCopy()],
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
