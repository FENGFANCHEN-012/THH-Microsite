import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// Plain Vite config (the Figma Make version depends on Figma-only plugins
// and a .figma/make/site.json file that is not part of the export).
export default defineConfig({
  // Relative base so the built site works from any folder (e.g. GitHub Pages).
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
