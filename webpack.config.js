
// OTHERS

// delete process.env.TS_NODE_PROJECT;

// IMPORTS

import WebpackObfuscator from 'webpack-obfuscator';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// CODE

const __dirname = dirname(fileURLToPath(import.meta.url));

const client = {
    mode: 'production',
    entry: './src/client/index.ts',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },

    resolve: {
        extensions: ['.ts', '.json'],
        plugins: [
            new TsconfigPathsPlugin({
                baseUrl: __dirname,
                configFile: "./tsconfig.json",
                extensions: [".js", ".ts", ".tsx"],
            }),
        ]
    },

    performance: {
        maxAssetSize: 500000,
        maxEntrypointSize: 500000
    },

    output: {
        filename: 'client.js',
        path: path.join(__dirname, './client_packages')
    },

    plugins: [
        new WebpackObfuscator({
            rotateStringArray: true
        }, ['./client_packages/index.mjs'])
    ]
};

const server = {
    mode: 'production',
    entry: './src/server/index.ts',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },

    experiments: {
        outputModule: true,
    },

    externalsPresets: { node: true },
    externalsType: 'module',
    externals: {
        'sequelize': 'sequelize',
    },

    resolve: {
        extensions: ['.ts', '.json'],
        plugins: [
            new TsconfigPathsPlugin({
                baseUrl: __dirname,
                configFile: "./tsconfig.json",
                extensions: [".js", ".ts", ".tsx"],
            }),
        ]
    },

    performance: {
        maxAssetSize: 500000,
        maxEntrypointSize: 500000
    },

    output: {
        path: path.join(__dirname, './packages/gamemode'),
        filename: "index.mjs"
    },

    plugins: [
        // new WebpackObfuscator({
        //     rotateStringArray: true
        // }, ['./packages/gamemode/index.js']),
    ]
};

export default [client, server];