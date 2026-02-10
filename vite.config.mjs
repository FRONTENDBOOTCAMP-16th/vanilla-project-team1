// vite.config.mjs
import { defineConfig } from 'vite';
import path from 'node:path';

const pages = ['main', 'booking', 'seat', 'payment'];

export default defineConfig({
  server: { port: 3000 },
  plugins: [
    {
      name: 'mpa-dev-rewrite',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const pathname = (req.url || '').split('?')[0];

          const hit = pages.find((p) => pathname === `/${p}` || pathname === `/${p}/`);
          if (hit) {
            req.url = `/src/page/${hit}/index.html`;
          }
          next();
        });
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/page/main/index.html'),
        booking: path.resolve(__dirname, 'src/page/booking/index.html'),
        seat: path.resolve(__dirname, 'src/page/seat/index.html'),
        payment: path.resolve(__dirname, 'src/page/payment/index.html'),
      },
    },
  },
});
