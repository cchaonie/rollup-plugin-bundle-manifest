export default function bundleManifest({ name = 'bundle-manifest.json' } = {}) {
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

      this.emitFile({
        fileName: name,
        type: 'asset',
        source: JSON.stringify(bundleManifest, undefined, 2),
      });
    },
  };
}
