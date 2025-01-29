import { defineConfig } from "@solidjs/start/config";
import solidPlugin from 'vite-plugin-solid';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    vite: {
        // vite options
        plugins: [
            tailwindcss(),
            solidPlugin({})
        ],
        server: {
            port: 3000,
        },
        build: {
            target: 'esnext',
        },
    },
});
