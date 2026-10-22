import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The agent API runs as a separate Node process. During development Vite
// proxies /api to it so the browser talks to a single origin.
const API_TARGET = process.env.VITE_AGENT_API_TARGET || 'http://localhost:8787'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: API_TARGET,
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
