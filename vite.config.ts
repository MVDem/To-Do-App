import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/To-Do-App',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/styles/Global.scss"; `,
      },
    },
  },
  server: {
    host: true,
    port: 3000,
    watch: {
      usePolling: true,
    },
  },
});
