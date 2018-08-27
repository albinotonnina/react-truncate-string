// const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

// const isCI = process.env.CI === 'true'
// const isMac = process.platform === 'darwin'

module.exports = {
  generateWebpackConfig: function generateWebpackConfig(
    entryFiles,
    aliasObject
  ) {
    return {
      mode: 'development',
      entry: {test: entryFiles},
      devtool: 'eval-source-map',
      output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
      },
      devServer: {
        contentBase: './'
      },
      resolve: {
        alias: aliasObject
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, './test-lib/index.ejs')
        })
      ],
      module: {
        rules: [
          {
            test: /\.js?$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          }
        ]
      }
    }
  },
  port: 1111,
  renderOptions: {
    viewport: {deviceScaleFactor: 2}
  }
}
