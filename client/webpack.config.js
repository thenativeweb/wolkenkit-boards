const path = require('path');

const CompressionPlugin = require('compression-webpack-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      processenv = require('processenv'),
      webpack = require('webpack');

const nodeEnv = processenv('NODE_ENV');

const paths = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
};

const getEnvironmentVariables = function () {
  return {
    'process.env.NODE_ENV': JSON.stringify(nodeEnv),
    'process.env.API_HOST': processenv('API_HOST') && JSON.stringify(processenv('API_HOST')),
    'process.env.API_PORT': processenv('API_PORT'),
    'process.env.STORAGE_HOST': processenv('STORAGE_HOST') && JSON.stringify(processenv('STORAGE_HOST')),
    'process.env.STORAGE_PORT': processenv('STORAGE_PORT'),
    'process.env.AUTH_IDENTITY_PROVIDER_URL': processenv('AUTH_IDENTITY_PROVIDER_URL') && JSON.stringify(processenv('AUTH_IDENTITY_PROVIDER_URL')),
    'process.env.AUTH_CLIENT_ID': processenv('AUTH_CLIENT_ID') && JSON.stringify(processenv('AUTH_CLIENT_ID'))
  };
};

const getPluginsFor = function (environment) {
  switch (environment) {
    case 'production':
      return [
        new webpack.DefinePlugin(getEnvironmentVariables()),
        new CompressionPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.(js|html)$/
        }),
        new HtmlWebpackPlugin({
          template: path.join(paths.src, 'template.ejs'),
          minify: {
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true
          }
        })
      ];
    default:
      return [
        new webpack.DefinePlugin(getEnvironmentVariables()),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
          template: path.join(paths.src, 'template.ejs')
        })
      ];
  }
};

const configuration = {
  mode: nodeEnv || 'development',
  context: paths.src,
  devtool: 'source-map',
  devServer: {
    contentBase: paths.src,
    compress: true,
    host: 'local.wolkenkit.io',
    port: 8080
  },
  entry: [
    './index.js'
  ],
  output: {
    path: paths.build,
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          paths.src
        ],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(svg|jpe?g|png|gif|ico)$/i,
        use: [
          { loader: 'file-loader' }
        ]
      }
    ]
  },
  plugins: getPluginsFor(nodeEnv)
};

module.exports = configuration;
