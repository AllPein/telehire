import { defineConfig } from 'vite';
import * as path from 'path';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  build: {
    sourcemap: true,
    minify: false,
  },
  base: ((process.env.GITHUB_REPOSITORY ?? '') + '/').match(/(\/.*)/)?.[1],
});
