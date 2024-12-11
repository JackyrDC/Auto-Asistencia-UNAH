/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
  server: {
    proxy: {
      '/api': {
        target: "http://ad.odis.in:8090", // URL del servidor Odoo
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remueve el prefijo "/api"
      },
      '/api/auth': {
        target: "htp://ad.odis.in:8090/web/session/authenticate",// URL del servidor Odoo
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/auth/, ''), // Remueve el prefijo "/api"
      },
    },
  },
})
