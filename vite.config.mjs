import { defineConfig } from 'vite';
import { resolve } from 'path';
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        booking: resolve(__dirname, 'src/page/booking/index.html'),
        seat: resolve(__dirname, 'src/page/seat/index.html'),
        payment: resolve(__dirname, 'src/page/payment/index.html'),
      },
    },
  },
});
