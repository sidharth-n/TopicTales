import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        short_name: "MyApp",
        name: "My Progressive Web App",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "/icons/icon-512x512.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
      },
      workbox: {}, // You can leave this empty for default Workbox configuration
    }),
  ],
});
