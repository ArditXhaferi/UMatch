import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss({
          config: fileURLToPath(new URL('tailwind.config.js', import.meta.url)),
        }),
        autoprefixer,
      ],
    },
  },
}); 