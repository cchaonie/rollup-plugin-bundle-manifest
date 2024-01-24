import test from 'ava';

import bundleManifest from '../lib/index.js';

test('should generate bundle manifest for assets', t => {
  const mockOptions = {
    dir: '/path/to/output',
  };

  const mockBundle = {
    'file1.js': {
      type: 'asset',
      name: 'file1',
    },
    'file2.js': {
      type: 'asset',
      name: 'file2',
    },
  };

  const plugin = bundleManifest({ output: '/path/to/output' });

  plugin.generateBundle(mockOptions, mockBundle);
});
