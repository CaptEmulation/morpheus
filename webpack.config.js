const webpack = require('webpack');
const path = require('path');

module.exports = {
  target: "web",
  entry: {
    app: './client/js/app',
    vendor: ['lodash', 'three']
  },
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: ['ng-annotate', 'babel-loader'],
      }, {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
  ]
}
