import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: true,
    lib: {
      entry: {
        services: resolve(__dirname, 'src/services.ts'),
        stores: resolve(__dirname, 'src/stores.ts'),
      },
      formats: ['es', 'cjs'],
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      entryRoot: 'src',
    }),
  ],
})
