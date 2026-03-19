import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
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
