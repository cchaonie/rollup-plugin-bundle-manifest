import { OutputOptions, OutputAsset, OutputChunk, Plugin } from 'rollup';

import { Config } from './types';

export default function bundleManifest({
  output,
  name = 'bundle-manifest.json',
}: Config): Plugin {
  const bundleManifest: Record<string, object> = {};

  return {
    name: 'bundle-manifest',
    generateBundle(
      options: OutputOptions,
      bundle: { [fileName: string]: OutputAsset | OutputChunk }
    ) {
      for (const [fileName, output] of Object.entries(bundle)) {
        if (output.type === 'asset') {
          const { type, name } = output;
          bundleManifest[fileName] = {
            type,
            name,
          };
        }
        if (output.type === 'chunk') {
          const { code, map, ...rest } = output;
          bundleManifest[fileName] = rest;
        }
      }

      const outputDir = output || options.dir;

      if (!outputDir) {
        throw new Error(
          "Couldn't find output directory, please make sure to set it in your config"
        );
      }

      this.emitFile({
        fileName: name,
        type: 'asset',
        source: JSON.stringify(bundleManifest, undefined, 2),
      });
    },
  };
}
