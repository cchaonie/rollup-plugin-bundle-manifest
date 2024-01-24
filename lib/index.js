import path from 'node:path';

export default function bundleManifest({
  output,
  name = 'bundle-manifest.json',
}) {
  const bundleManifest = {};

  return {
    name: 'bundle-manifest',
    generateBundle(options, bundle) {
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
        this.warn(
          "Couldn't find output directory, please make sure to set it in your config"
        );
        return;
      }

      this.emitFile({
        fileName: path.resolve(outputDir, name),
        type: 'asset',
        source: JSON.stringify(bundleManifest, undefined, 2),
      });
    },
  };
}
