import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  test: { // Add  test configuration
    globals: true,
    environment: 'jsdom', // Simulate browser environment
    setupFiles: ['./src/setupTests.js'],
  },
})