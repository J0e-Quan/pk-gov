const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    home: './src/home.js',
    ministries: './src/ministries/ministries.js',
    info: './src/info/info.js',
    news: './src/news/news.js',
    pkGov: './src/about/pk-gov.js',
    govIdentity: './src/about/gov-identity.js',
    weather: './src/weather/weather.js',
    'content-page': './src/content-page.js'
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
