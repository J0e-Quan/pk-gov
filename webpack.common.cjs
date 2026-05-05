const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    home: './src/home.js',
    cm: './src/ministries/central.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['home'],
    }),
    new HtmlWebpackPlugin({
      template: './src/ministries/central.html',
      filename: 'ministries/central/index.html',
      chunks: ['cm'],
    }),
    new HtmlWebpackPlugin({
      template: './src/ministries/defence.html',
      filename: 'ministries/defence/index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/ministries/finance.html',
      filename: 'ministries/finance/index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/ministries/food.html',
      filename: 'ministries/food/index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/ministries/foreign-affairs.html',
      filename: 'ministries/foreign-affairs/index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/ministries/health.html',
      filename: 'ministries/health/index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/ministries/immigration.html',
      filename: 'ministries/immigration/index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/ministries/technology.html',
      filename: 'ministries/technology/index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/info/index.html',
      filename: 'info/index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/news/index.html',
      filename: 'news/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  }
}
