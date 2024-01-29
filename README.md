# rollup-plugin-bundle-manifest

[![codecov](https://codecov.io/gh/cchaonie/rollup-plugin-bundle-manifest/graph/badge.svg?token=8OPRV3XE0X)](https://codecov.io/gh/cchaonie/rollup-plugin-bundle-manifest)

A rollup plugin to generate a manifest file for the bundle.

## Why

I was going to build a react SSR app based on rollup. Then I encountered a problem, how to generate the `script` tags in the initial HTML on the server side.

I need to know all the entries JS and assets in the client bundles, so I create this rollup plugin.
