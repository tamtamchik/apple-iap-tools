import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  // Keep the historical artifact names (index.js / index.mjs / index.d.ts) and pair the ESM build with index.d.mts
  outExtensions: ({ format }) => ({
    js: format === 'cjs' ? '.js' : '.mjs',
    dts: format === 'cjs' ? '.d.ts' : '.d.mts',
  }),
})
