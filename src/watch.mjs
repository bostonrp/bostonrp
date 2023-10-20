
// IMPORTS

import { build } from 'esbuild';
import { watch } from "chokidar";
import inlineImportPlugin from 'esbuild-plugin-inline-import';

// CODE

const buildServer = async () => {
    build({
        entryPoints: [
            './src/server/index.ts'
        ],
    
        platform: 'node',
        bundle: true,
        minify: true,
        logLevel: 'info',
        watch: true,
        outfile: './packages/gamemode/index.js',
        plugins: [
            inlineImportPlugin()
        ]
    })
}

const serverWatcher = watch(['./src/server/index.ts']);

buildServer()

serverWatcher.on("change", () => {
    buildServer()
})

serverWatcher.on("ready", () => {
    console.info("[WATCH] Server watch started")
})

const buildClient = async () => {
    build({
        entryPoints: [
            './src/client/index.ts'
        ],
    
        platform: 'node',
        bundle: true,
        minify: true,
        logLevel: 'info',
        watch: true,
        outfile: './client_packages/client.js',
        plugins: [
            inlineImportPlugin()
        ]
    });
}

const clientWatcher = watch(['./src/client/index.ts']);

buildClient()

clientWatcher.on("change", () => {
    buildClient()
})

clientWatcher.on("ready", () => {
    console.info("[WATCH] Client watch started")
})
