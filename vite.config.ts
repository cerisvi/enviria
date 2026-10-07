import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // In produzione su enviriahub.it il sito starà alla radice del dominio ('/').
  // Il build per l'anteprima su GitHub Pages (repo project page) usa invece '/enviria/'.
  base: process.env.GITHUB_PAGES ? '/enviria/' : '/',
})
