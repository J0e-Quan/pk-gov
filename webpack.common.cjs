const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    home: './src/home.js',
    central: './src/ministries/central.js',
    food: './src/ministries/food.js',
    foreignAffairs: './src/ministries/foreign-affairs.js',
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
    govIdentity: './src/about/gov-identity.js',
    weather: './src/weather/weather.js'
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
      template: './src/ministries/central.html',
      filename: 'ministries/central/index.html',
      chunks: ['central']
    }),
    new HtmlWebpackPlugin({
      template: './src/ministries/defence.html',
      filename: 'ministries/defence/index.html',
      chunks: ['defence']
    }),
    new HtmlWebpackPlugin({
      template: './src/ministries/finance.html',
      filename: 'ministries/finance/index.html',
      chunks: ['finance']
    }),
    new HtmlWebpackPlugin({
      template: './src/ministries/food.html',
      filename: 'ministries/food/index.html',
      chunks: ['food']
    }),
    new HtmlWebpackPlugin({
      template: './src/ministries/foreign-affairs.html',
      filename: 'ministries/foreign-affairs/index.html',
      chunks: ['foreignAffairs']
    }),
    new HtmlWebpackPlugin({
      template: './src/ministries/health.html',
      filename: 'ministries/health/index.html',
      chunks: ['health']
    }),
    new HtmlWebpackPlugin({
      template: './src/ministries/immigration.html',
      filename: 'ministries/immigration/index.html',
      chunks: ['immigration']
    }),
    new HtmlWebpackPlugin({
      template: './src/ministries/technology.html',
      filename: 'ministries/technology/index.html',
      chunks: ['technology']
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
    }),
    new HtmlWebpackPlugin({
      template: './src/weather/weather.html',
      filename: 'weather/index.html',
      chunks: ['weather']
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
