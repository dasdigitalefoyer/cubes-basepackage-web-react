import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    minify: true,
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'pcstoremodule',
      fileName: 'pcstoremodule',
    },
    rollupOptions: {
      external: ['zustand', 'mqtt'], // Add external dependencies here
      output: {
        globals: {
          zustand: 'createStore', // Provide global variable name for Zustand
          mqtt: 'mqtt', // Provide global variable name for mqtt.js
        },
      },
    },
  },
  plugins: [dts()],
})
