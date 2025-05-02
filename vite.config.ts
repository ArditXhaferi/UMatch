/// <reference types="vite/client" />

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const isLocal = env.APP_ENV === 'local';

    return {
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.tsx'],
                ssr: 'resources/js/ssr.tsx',
                refresh: true,
            }),
            react(),
            tailwindcss(),
        ],
        esbuild: {
            jsx: 'automatic',
        },
        resolve: {
            alias: {
                'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
            },
        },
        server: {
            hmr: isLocal ? {
                host: 'localhost',
            } : false,
            host: isLocal ? 'localhost' : '0.0.0.0',
            port: 5173,
            strictPort: true,
            cors: true,
        },
        build: {
            outDir: 'public/build',
            assetsDir: '',
            manifest: true,
            rollupOptions: {
                output: {
                    manualChunks: undefined,
                },
            },
        },
        base: isLocal ? undefined : '/build/',
    };
});
