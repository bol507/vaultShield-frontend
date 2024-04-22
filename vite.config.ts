import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths()],
  rollupOptions: {
    // Configura los cargadores (loaders) para los archivos
    // con extensión ".html"
    input: {
      include: ['**/*.html']
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './testSetup.js'
  },
  testTimeout: 10000
});
