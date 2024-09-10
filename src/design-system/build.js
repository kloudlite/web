import { build } from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import p from './package.json' assert { type: 'json' };
// import p from './folder/file.json' assert { type: 'json' };

const { externalDependencies } = p;

// const entryFile = 'components/*';
const outPath = './dist';
const shared = {
  bundle: true,
  entryPoints: ['components/*', 'components/**/*'],
  loader: { '.js': 'jsx' },

  external: Object.keys(externalDependencies),
  logLevel: 'info',
  minify: false,
  sourcemap: false,
  plugins: [sassPlugin()],
};

build({
  ...shared,
  format: 'esm',
  outdir: `${outPath}/mjs`,
  target: ['esnext', 'node20.6.0'],
});

build({
  ...shared,
  format: 'cjs',
  outdir: `${outPath}/cjs`,
  target: ['esnext', 'node20.6.0'],
});
