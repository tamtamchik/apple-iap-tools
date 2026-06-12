import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  // Keep the file names the package has always shipped (index.js / index.mjs / index.d.ts)
  outExtensions: ({ format }) => ({
    js: format === 'cjs' ? '.js' : '.mjs',
    dts: format === 'cjs' ? '.d.ts' : '.d.mts',
  }),
})
