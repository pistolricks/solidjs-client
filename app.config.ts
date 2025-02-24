import { defineConfig } from "@solidjs/start/config";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
   server: {
      experimental: {
         websocket: true,
      }
   },
   ssr: false,
//   vite: {
//
//      // vite options
//      plugins: [
//          tailwindcss()
//      ],
//      server: {
//         port: 3000,
//      },
//      build: {
//         target: 'esnext',
//      },
//   },
}).addRouter({
   name: "ws",
   type: "http",
   handler: "./src/lib/ws.ts",
   target: "server",
   base: "/ws",
});
