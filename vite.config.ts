/// <reference types="vite/client" />

import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const isLocal = env.APP_ENV === 'local';

    return {
        plugins: [
            laravel({
                input: [
                    'resources/css/app.css',
                    'resources/js/app.tsx',
                ],
                refresh: true,
            }),
            react(),
        ],
        resolve: {
            alias: {
                ziggy: resolve(__dirname, 'vendor/tightenco/ziggy'),
            },
        },
        build: {
            build: {
                manifest: true,
                outDir: 'public/build',
                emptyOutDir: true,
                manifestFileName: 'manifest.json', // ✅ ADD THIS LINE
                rollupOptions: {
                  input: {
                    app: resolve(__dirname, 'resources/js/app.tsx'),
                  },
                  output: {
                    manualChunks: undefined,
                  },
                },
              },
              
        server: {
            host: isLocal ? 'localhost' : '0.0.0.0',
            port: 5173,
            strictPort: true,
            cors: true,
            hmr: isLocal ? { host: 'localhost' } : false,
        },
        base: isLocal ? undefined : '/build/',
    };
});
