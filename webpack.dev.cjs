const { merge } = require('webpack-merge')
const common = require('./webpack.common.cjs')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    static: {
        directory: path.join(__dirname, 'dist'),
      },
    hot: true,
    historyApiFallback: true,
    watchFiles: ['./src/**/*.html'],
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ]
})
