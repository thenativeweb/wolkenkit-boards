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

const getDevToolFor = function (environment) {
  switch (environment) {
    case 'production':
      return undefined;
    default:
      return 'cheap-module-source-map';
  }
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
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.(js|html)$/
        }),
        new webpack.optimize.UglifyJsPlugin(),
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
  devtool: getDevToolFor(nodeEnv),
  context: paths.src,
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
        test: /\.html$/,
        use: [
          { loader: 'file-loader', options: { name: '[name].[ext]' }}
        ]
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
