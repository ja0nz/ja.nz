import { buildSync } from 'esbuild'
buildSync({
  entryPoints: ['./src/index.ts'],
  format: 'esm',
  outfile: './dist/worker.mjs',
  bundle: true,
  minify: false,
  sourcemap: true,
  target: ['node16'],
  platform: 'node',
})
