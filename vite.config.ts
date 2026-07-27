import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  // Use relative paths so the build keeps working even if the repo name changes.
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        tijuca: resolve(__dirname, 'tijuca.html'),
      },
    },
  },
});
