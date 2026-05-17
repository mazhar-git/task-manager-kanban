import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    base: '/taskmanager/',
  server: {
    port: 5173,
    proxy: {
      '/api': {
             target: 'https://localhost:7222',
            //target: 'https://localhost:3380/TaskManagerAPI',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      }
    }
  }
});
