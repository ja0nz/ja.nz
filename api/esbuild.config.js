import { buildSync } from 'esbuild'
buildSync({
  entryPoints: ['./src/index.ts'],
  format: 'esm',
  mainFields: ['browser', 'module', 'main'],
  outfile: './build/worker.mjs',
  bundle: true,
  minify: false,
  sourcemap: false,
  charset: 'utf8',
  platform: 'neutral',
})
