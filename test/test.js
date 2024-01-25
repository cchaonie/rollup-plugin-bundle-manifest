import test from 'ava';

import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { rollup } from 'rollup';

import bundleManifest from '../lib/index.js';
import css from 'rollup-plugin-postcss';

const dir = resolve(fileURLToPath(import.meta.url), '..');

test('should generate bundle manifest for single chunk', async t => {
  const bundle = await rollup({
    input: resolve(dir, 'fixtures/batman.js'),
    plugins: [bundleManifest()],
  });

  const { output } = await bundle.generate({
    dir: resolve(dir, 'dist'),
  });

  const manifest = output.filter(
    ({ type, fileName }) =>
      type === 'asset' && fileName.endsWith('bundle-manifest.json')
  );

  t.snapshot(manifest[0].source);
});

test('should generate bundle manifest for chunks', async t => {
  const bundle = await rollup({
    input: resolve(dir, 'fixtures/robin.js'),
    plugins: [bundleManifest()],
  });

  const { output } = await bundle.generate({
    dir: resolve(dir, 'dist'),
  });

  const manifest = output.filter(
    ({ type, fileName }) =>
      type === 'asset' && fileName.endsWith('bundle-manifest.json')
  );

  t.snapshot(manifest[0].source);
});

test('should generate bundle manifest for a chunk which import css', async t => {
  const bundle = await rollup({
    input: resolve(dir, 'fixtures/joker.js'),
    plugins: [bundleManifest(), css()],
  });

  const { output } = await bundle.generate({
    dir: resolve(dir, 'dist'),
  });

  const manifest = output.filter(
    ({ type, fileName }) =>
      type === 'asset' && fileName.endsWith('bundle-manifest.json')
  );

  t.snapshot(manifest[0].source);
});

test('should generate bundle manifest for chunks and assets', async t => {
  const bundle = await rollup({
    input: resolve(dir, 'fixtures/joker.js'),
    plugins: [css({ extract: 'style.css' }), bundleManifest()],
  });

  const { output } = await bundle.generate({
    dir: resolve(dir, 'dist'),
  });

  const manifest = output.filter(
    ({ type, fileName }) =>
      type === 'asset' && fileName.endsWith('bundle-manifest.json')
  );

  t.snapshot(manifest[0].source);
});
