import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import react from '@vitejs/plugin-react'
import * as packageJson from './package.json'

export default defineConfig({
  plugins: [dts(), nodePolyfills(), react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'pcstoremodule',
      fileName: 'pcstoremodule',
    },
  },
})
