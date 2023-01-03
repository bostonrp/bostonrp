
// IMPORTS

import { build } from 'esbuild';
import inlineImportPlugin from 'esbuild-plugin-inline-import';

// CODE

build({
    entryPoints: [
        './src/server/index.ts'
    ],

    platform: 'node',
    bundle: true,
    minify: true,
    watch: true,
    outfile: './packages/gamemode/index.js',

    plugins: [
        inlineImportPlugin()
    ]
}).finally(() => console.log('Client watching!'));

build({
    entryPoints: [
        './src/client/index.ts'
    ],

    platform: 'node',
    bundle: true,
    minify: true,
    watch: true,
    outfile: './client_packages/client.js',

    plugins: [
        inlineImportPlugin()
    ]
}).finally(() => console.log('Server watching!'));