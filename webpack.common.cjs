const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    home: './src/home.js',
    central: './src/ministries/central.js',
    food: './src/ministries/food.js',
    'foreign-affairs': './src/ministries/foreign-affairs.js',
    health: './src/ministries/health.js',
    finance: './src/ministries/finance.js',
    immigration: './src/ministries/immigration.js',
    technology: './src/ministries/technology.js',
    defence: './src/ministries/defence.js',
    info: './src/info/info.js',
    'info-page': './src/info/info-page.js',
    news: './src/news/news.js',
    'news-article': './src/news/news-article.js',
    pkGov: './src/about/pk-gov.js',
    govIdentity: './src/about/gov-identity.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: false,
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      template: './src/about/pk-gov.html',
      filename: 'about/pk-gov/index.html',
      chunks: ['pkGov']
    }),
    new HtmlWebpackPlugin({
      template: './src/about/gov-identity.html',
      filename: 'about/gov-identity/index.html',
      chunks: ['govIdentity']
    })
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          sources: {
            list: [
              '...',
              {
                tag: 'img',
                attribute: 'src',
                type: 'src'
              }
            ]
          }
        }
      }
    ]
  }
}
