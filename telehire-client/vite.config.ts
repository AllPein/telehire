import { defineConfig } from 'vite';
import * as path from 'path';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  base: ((process.env.GITHUB_REPOSITORY ?? '') + '/').match(/(\/.*)/)?.[1],
});
