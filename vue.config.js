
// REQUIRES

const { defineConfig } = require('@vue/cli-service');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// CODE

module.exports = defineConfig({
  transpileDependencies: true,

  outputDir: "./client_packages/cef",

  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hot: false
  },

  publicPath: './',

  pages: {
    index: {
      entry: './src/web/main.js',
      template: './src/web/index.html',
      filename: 'index.html',
    },
},

  pluginOptions: {
    vueI18n: {
      locale: 'ru',
      fallbackLocale: 'en',
      localeDir: 'locales',
      fullInstall: true
    }
  },

  configureWebpack: {
    performance: {
      maxAssetSize: 500000,
    },

    devServer: {
      historyApiFallback: true
    },

    plugins: process.env.copyWebpack ? [
      new CopyWebpackPlugin({
        patterns: [
          { from: './src/web/public/', to: 'public' }
        ]
      })
    ] : [
      new CopyWebpackPlugin({
        patterns: [
          { from: './src/web/public/', to: '' }
        ]
      })
    ]
  }
})
