import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    services: 'src/services.ts',
    stores: 'src/stores.ts',
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
  minify: true,
  treeshake: true,
})
