import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'plugin-inspect-react-code'

// GitHub Pages serves a project site from https://<user>.github.io/<repo>/, so
// the bundle needs that subpath as its base. The deploy workflow passes it in
// as VITE_BASE (derived from the repo name) rather than hardcoding it here;
// local dev leaves it unset and builds at the root.
const base = process.env.VITE_BASE ?? '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [inspectAttr(), react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
