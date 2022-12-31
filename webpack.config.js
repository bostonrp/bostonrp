
// OTHERS

// delete process.env.TS_NODE_PROJECT;

// IMPORTS

import WebpackObfuscator from 'webpack-obfuscator';

// CODE

const client = {
    plugins: [
        new WebpackObfuscator({
            rotateStringArray: true
        }, ['./client_packages/index.js'])
    ]
};

export default client;