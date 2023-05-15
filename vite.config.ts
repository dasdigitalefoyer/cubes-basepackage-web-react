import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [react(), dts({ insertTypesEntry: true, outputDir: 'dist/types' }), nodePolyfills()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'puzzlecube-core',
      fileName: (format) => `puzzlecube-core.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'zustand'],
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
          'zustand': 'create'
        }
      }
    }
  }
})
