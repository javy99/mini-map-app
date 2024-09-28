/// <reference types="vite/client" />

declare module "virtual:pwa-register" {
  export function registerSW(options?: { immediate?: boolean }): Promise<void>;
}

declare global {
  interface ManifestOptions {
    name: string;
    short_name: string;
    start_url: string;
    display: "fullscreen" | "standalone" | "minimal-ui" | "browser";
    background_color: string;
    theme_color: string;
    icons: Array<{
      src: string;
      sizes: string;
      type: string;
      purpose?: string;
    }>;
  }
}

// To ensure this file is treated as a module
export {};
