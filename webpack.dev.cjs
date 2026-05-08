const { merge } = require('webpack-merge')
const common = require('./webpack.common.cjs')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  watchOptions: {
    ignored: /node_modules/,
  },
  cache: false,
  devServer: {
    static: {
        directory: path.join(__dirname, 'dist'),
      },
      stats: {
    orphanModules: true, // This will list them in the terminal
    modules: true,       // Shows all modules for better debugging
  },
    hot: true,
    historyApiFallback: true,
    watchFiles: ['./src/**/*.html', './src/**/*.njk', './src/**/*.md', './src/**/*.css', './src/**/*.js'],
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/styles/[name].css'
    })
  ]
})
