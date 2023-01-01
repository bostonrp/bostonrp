
// OTHERS

// IMPORTS

const WebpackObfuscator = require('webpack-obfuscator');

// CODE

module.exports = {
    mode: 'production',

    plugins: [
        new WebpackObfuscator({
            rotateStringArray: true,
        }, ['./client_packages/client.js'])
    ]
}