const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    home: './src/home.js',
    global: './src/global.js',
    ministries: './src/ministries/ministries.js',
    weather: './src/weather/weather.js',
    'pibss-common': './src/pibss/pibss-common.js',
    'pibss-display': './src/pibss/pibss-display.js',
    'pibss-manage': './src/pibss/pibss-manage.js',
    'pibss-statistics': './src/pibss/pibss-statistics.js',
    'pibss-login': './src/pibss/pibss-login.js',
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
      chunks: ['home', 'global']
    }),
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
