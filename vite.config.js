import { defineConfig } from 'vite'
import vitePluginString from 'vite-plugin-string'

export default defineConfig({
  plugins: [vitePluginString()],
  build: {
    rollupOptions: {
      input: './src/main.js',
      output: {
        dir: 'asset',
        format: 'es',
      }
    },
    minify: 'esbuild',
    sourcemap: true,
    emptyOutDir: false,
  },
  mode: 'dev',
})
