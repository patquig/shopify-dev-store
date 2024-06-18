import path from 'path';
import { defineConfig } from 'vite';
import vitePluginString from 'vite-plugin-string';

export default defineConfig({
  plugins: [vitePluginString()],
  build: {
    outDir: 'assets',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/main.js'),
      },
      output: {
        dir: path.resolve(__dirname, 'assets'),
        entryFileNames: `[name].min.js`,
        assetFileNames: `[name].[ext]`,
        format: 'es',
      },
    },
    minify: 'esbuild',
    sourcemap: true,
    emptyOutDir: false,
  },
  mode: 'dev',
});
