import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    server: {
      deps: {
        inline: ['@mui/material', '@mui/x-date-pickers', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
      },
    },
  },
})
