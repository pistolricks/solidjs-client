import { defineConfig } from "@solidjs/start/config";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    vite: {
        // vite options
        plugins: [
            tailwindcss(),
        ],
        server: {
            port: 3000,
        },
        build: {
            target: 'esnext',
        },
    },
});
