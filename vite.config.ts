import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

import manifestJson from "./public/manifest.json";

const manifest = manifestJson as ManifestOptions;

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: "public",
      filename: "service-worker.js",
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
        type: "module",
        navigateFallback: "index.html",
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        cleanupOutdatedCaches: true,
      },
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "logo192.png"],
      manifest: manifest,
      injectManifest: {
        injectionPoint: undefined,
      },
      minify: false,
    }),
  ],
});
