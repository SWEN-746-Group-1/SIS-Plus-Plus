import { defineConfig } from 'vitest/config'
// import tsConfig from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
 
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    alias: {
      '@': '/src'
    }
  },
})