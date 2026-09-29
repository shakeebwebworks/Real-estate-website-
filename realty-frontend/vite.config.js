import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// /api and /media calls go to Django while developing
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://127.0.0.1:8000",
      "/media": "http://127.0.0.1:8000",
    },
  },
});