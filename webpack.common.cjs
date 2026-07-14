const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    home: './src/home.js',
    ministries: './src/ministries/ministries.js',
    info: './src/info/info.js',
    news: './src/news/news.js',
    weather: './src/weather/weather.js',
    'content-page': './src/content-page.js',
    'about-page': './src/about/about-page.js',
    'pibss-common': './src/pibss/pibss-common.js',
    'pibss-display': './src/pibss/pibss-display.js',
    'pibss-manage': './src/pibss/pibss-manage.js',
    'pibss-statistics': './src/pibss/pibss-statistics.js',
    'pibss-login': './src/pibss/pibss-login.js'
  },
  externals: {
    '/pagefind/pagefind-component-ui.js': 'module /pagefind/pagefind-component-ui.js',
    '/pagefind/pagefind-component-ui.css': 'module /pagefind/pagefind-component-ui.css',
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
      template: './src/weather/weather.html',
      filename: 'weather/index.html',
      chunks: ['weather']
    }),
    new HtmlWebpackPlugin({
      template: './src/pibss/index.html',
      filename: 'pibss/index.html',
      chunks: ['pibss-common', 'pibss-display']
    }),
    new HtmlWebpackPlugin({
      template: './src/pibss/manage.html',
      filename: 'pibss/manage.html',
      chunks: ['pibss-common', 'pibss-manage']
    }),
    new HtmlWebpackPlugin({
      template: './src/pibss/statistics.html',
      filename: 'pibss/statistics/index.html',
      chunks: ['pibss-common', 'pibss-statistics']
    }),
    new HtmlWebpackPlugin({
      template: './src/pibss/login.html',
      filename: 'pibss/login.html',
      chunks: ['pibss-common', 'pibss-login']
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
            ],
            urlFilter: (attribute, value, resourcePath) => {
              // Tell Webpack NOT to try and process or resolve anything in /pagefind/
              if (value.startsWith('/pagefind/')) {
                return false;
              }
              return true;
            },
          }
        }
      }
    ]
  }
}
