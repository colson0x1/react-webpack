var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'react',
  'lodash',
  'redux',
  'react-redux',
  'react-dom',
  'faker',
  'react-input-range',
  'redux-form',
  'redux-thunk',
];

module.exports = {
  // entry: './src/index.js',
  entry: {
    // Bundle that has all the Application specific code
    bundle: './src/index.js',
    // Bundle that has all the module dependencies
    vendor: VENDOR_LIBS,
  },
  output: {
    path: path.join(__dirname, 'dist'),
    // filename: 'bundle.js',
    // Dynamically update the output budnle name
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/,
      },
    ],
  },
  plugins: [
    // if any common modules, stick in the vendor
    new webpack.optimize.CommonsChunkPlugin({
      // name: 'vendor',
      // purpose of the manifest is to better tell the browser on weather or
      // not the vendor file is actually changed
      names: ['vendor', 'manifest'],
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    // DefinePlugin is used to define window scope global variables that will
    // be define within bundle.js file or really the JavaScript output files
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
