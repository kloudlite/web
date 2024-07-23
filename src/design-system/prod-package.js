import fs from 'fs';
import path from 'path';

import logger from '~/root/lib/client/helpers/log';
import p from './package.json' with { type: 'json' };

const {
  externalDependencies,
  devDependencies,
  dependencies,
  version,
  description,
  license,
  author,
  keywords,
} = p;

const startingDirectory = './dist/mjs'; // Change this to your desired starting directory

function readDirectoryRecursively(directoryPath, p) {
  let result = {};

  const files = fs.readdirSync(path.join(startingDirectory, directoryPath));

  files.forEach((file) => {
    const filePath = path.join(startingDirectory, directoryPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      result = {
        ...result,
        ...readDirectoryRecursively(
          path.join(directoryPath, file),
          `${p}/${file}`
        ),
      };
    } else if (
      stats.isFile() &&
      stats.size > 0 &&
      path.extname(file) === '.js'
    ) {
      const key = `${path.join(directoryPath, file.replace('.js', ''))}`;
      result[`./${key}`] = {
        import: `./mjs/${key}.js`,
        require: `./cjs/${key}.js`,
      };
    }
  });

  return result;
}

const getProdPackage = () => {
  const jsonResult = readDirectoryRecursively('', '.');

  const p = {
    name: 'kl-design-system',
    private: false,
    version,
    description,
    license,
    author,
    keywords,
    main: './cjs/index.js',
    module: './mjs/index.js',
    exports: {
      './index.css': {
        import: './mjs/css/index.css',
        require: './cjs/css/index.css',
      },
      ...jsonResult,
    },
    files: ['./'],
    types: '.',
    dependencies,
    devDependencies,
    peerDependencies: externalDependencies,
  };

  return JSON.stringify(p, null, 2);
};

const outPath = './dist';
const setup = () => {
  const packageJson = getProdPackage();

  if (!fs.existsSync(outPath)) {
    fs.mkdirSync(outPath);
  }

  try {
    fs.writeFileSync(`${outPath}/package.json`, packageJson);
  } catch (e) {
    logger.log('e', e);
  }

  logger.log('Done!');
};

setup();
