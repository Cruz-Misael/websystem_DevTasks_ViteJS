import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://186.219.134.247:8888",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
