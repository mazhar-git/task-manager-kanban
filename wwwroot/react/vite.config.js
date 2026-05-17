import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    base: process.env.NODE_ENV === 'production'
        ? '/taskmanager/'
        : '/',
  server: {
    port: 5173,
    proxy: {
      '/api': {
             target: 'https://localhost:7222',
        changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '/api'),
            secure: false,
      }
    }
  }
});
