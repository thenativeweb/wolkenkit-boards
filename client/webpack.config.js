const path = require('path');

const CompressionPlugin = require('compression-webpack-plugin'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
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

const getStyleLoadersFor = function (environment) {
  switch (environment) {
    case 'production':
      return ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: 'wk-[local]--[hash:base64:5]'
            }
          },
          'postcss-loader'
        ]
      });
    default:
      return [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: 'wk-[local]--[hash:base64:5]'
          }
        },
        'postcss-loader'
      ];
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
          test: /\.(css|js|html)$/
        }),
        new ExtractTextPlugin('style.css'),
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
    './index.jsx'
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
          paths.src,
          path.join(__dirname, 'node_modules', 'wolkenkit-ux')
        ],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: getStyleLoadersFor(nodeEnv)
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
