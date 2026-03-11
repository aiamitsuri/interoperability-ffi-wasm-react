import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  plugins: [
    react(),
    wasm(),
    topLevelAwait()
  ],
  optimizeDeps: {
    // 🚩 FORCE VITE TO IGNORE THIS PACKAGE DURING OPTIMIZATION
    exclude: ["@aiamitsuri/interoperability-ffi-wasm"]
  }
});
//ramramjiramramjuramramji
//ramramjiramramjuramramji
//ramramjiramramjuramramji