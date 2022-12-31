
// IMPORTS

const esbuild = require('esbuild');
const inlineImportPlugin = require('esbuild-plugin-inline-import');

// CODE

esbuild.build({
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
}).finally(() => console.log('Client build!'));

esbuild.build({
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
}).finally(() => console.log('Server build!'));