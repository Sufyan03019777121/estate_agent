import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forward /api requests to backend
      '/api': {
        target: '',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: '',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
