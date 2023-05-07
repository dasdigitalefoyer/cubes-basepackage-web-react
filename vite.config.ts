import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { externalizeDeps } from 'vite-plugin-externalize-deps'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'pcstoremodule',
      fileName: 'pcstoremodule',
    },
  },
  plugins: [dts(), externalizeDeps()],
})
