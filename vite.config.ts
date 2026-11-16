import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const rootDir = path.dirname(__filename);

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': rootDir,
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(rootDir, 'index.html'),
          safaris: path.resolve(rootDir, 'safaris.html'),
          eastAfrica: path.resolve(rootDir, 'east-africa.html'),
          destinations: path.resolve(rootDir, 'destinations.html'),
          shop: path.resolve(rootDir, 'shop.html'),
          gallery: path.resolve(rootDir, 'gallery.html'),
          reviews: path.resolve(rootDir, 'reviews.html'),
          about: path.resolve(rootDir, 'about.html'),
          contact: path.resolve(rootDir, 'contact.html'),
          admin: path.resolve(rootDir, 'admin.html'),
          privacyPolicy: path.resolve(rootDir, 'privacy-policy.html'),
          termsOfService: path.resolve(rootDir, 'terms-of-service.html'),
          refundPolicy: path.resolve(rootDir, 'refund-policy.html'),
          cookiePolicy: path.resolve(rootDir, 'cookie-policy.html'),
        },
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio to prevent flickering and port collision
      hmr: false,
      watch: null,
    },
  };
});
