import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/sport-management/', // Añade esta línea
  plugins: [react()], // O Vue si estás usando Vue
});

