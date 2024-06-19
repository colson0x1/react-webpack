var webpack = require('webpack');
var path = require('path');

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
    filename: '[name].js',
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
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
  ],
};
