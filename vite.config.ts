import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //@ts-ignore
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          framer: ['framer-motion'],
          supabase: ['@supabase/supabase-js'],
          ui: ['react-router-dom', 'react-i18next', 'i18next'],
          store: ['@reduxjs/toolkit', 'react-redux']
        }
      }
    }
  }
})
