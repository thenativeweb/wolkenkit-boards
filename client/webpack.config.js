const path = require('path');

const processenv = require('processenv'),
      webpack = require('webpack');

const isProductionMode = processenv('NODE_ENV') === 'production';

const paths = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
};

const configuration = {
  devtool: 'eval',
  context: paths.src,
  devServer: {
    contentBase: paths.src,
    compress: true,
    host: 'local.wolkenkit.io',
    port: 8080
  },
  entry: [
    './index.jsx',
    './index.html',
    './index.scss'
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
        use: [
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
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          { loader: 'sass-loader', options: { includePaths: [ './node_modules' ]}}
        ]
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
  }
};

if (isProductionMode) {
  configuration.plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.API_HOST': processenv('API_HOST') && JSON.stringify(processenv('API_HOST')),
      'process.env.API_PORT': processenv('API_PORT'),
      'process.env.STORAGE_HOST': processenv('STORAGE_HOST') && JSON.stringify(processenv('STORAGE_HOST')),
      'process.env.STORAGE_PORT': processenv('STORAGE_PORT'),
      'process.env.AUTH_IDENTITY_PROVIDER_URL': processenv('AUTH_IDENTITY_PROVIDER_URL') && JSON.stringify(processenv('AUTH_IDENTITY_PROVIDER_URL')),
      'process.env.AUTH_CLIENT_ID': processenv('AUTH_CLIENT_ID') && JSON.stringify(processenv('AUTH_CLIENT_ID'))
    }),
    new webpack.optimize.UglifyJsPlugin()
  ];

  configuration.devtool = undefined;
}

module.exports = configuration;
