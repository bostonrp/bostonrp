
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
    minify: false,
    watch: false,
    logLevel: 'info',
    outfile: './packages/gamemode/index.js',

    plugins: [
        inlineImportPlugin()
    ]
}).finally(() => console.log('Client build!'));

build({
    entryPoints: [
        './src/client/index.ts'
    ],
    logLevel: 'info',
    platform: 'node',
    bundle: true,
    minify: true,
    watch: false,
    outfile: './client_packages/client.js',

    plugins: [
        inlineImportPlugin()
    ]
}).finally(() => console.log('Server build!'));