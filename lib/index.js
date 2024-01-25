export default function bundleManifest({
  output,
  name = 'bundle-manifest.json',
} = {}) {
  const bundleManifest = {};

  return {
    name: 'bundle-manifest',
    generateBundle(options, bundle) {
      for (const [fileName, output] of Object.entries(bundle)) {
        console.log(output);
        if (output.type === 'asset') {
          const { type, name } = output;
          bundleManifest[fileName] = {
            type,
            name,
          };
        }

        if (output.type === 'chunk') {
          const {
            dynamicImports,
            isDynamicEntry,
            isEntry,
            isImplicitEntry,
            name,
          } = output;
          bundleManifest[fileName] = {
            dynamicImports,
            isDynamicEntry,
            isEntry,
            isImplicitEntry,
            name,
          };
        }
      }

      const outputDir = output || options.dir;

      if (!outputDir) {
        this.error(
          "Couldn't find output directory, please make sure to set it in your config"
        );
        return;
      }

      this.emitFile({
        fileName: name,
        type: 'asset',
        source: JSON.stringify(bundleManifest, undefined, 2),
      });
    },
  };
}
