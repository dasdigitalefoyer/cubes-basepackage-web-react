import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    emptyOutDir: false,
    outDir: 'dist',
    sourcemap: true,
    lib: {
      entry: {
        services: resolve(__dirname, 'src/service.ts'),
        stores: resolve(__dirname, 'src/store.ts'),
      },
      formats: ['es', 'cjs'],
    },
  },
  plugins: [dts()],
})
