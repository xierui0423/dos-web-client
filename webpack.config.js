/**
 * Created by ray.xie on 9/12/2016.
 */

const webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.jsx'],

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
    }],
  },
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'bundle.js',
  },

  devServer: {
    contentBase: './dist',
    hot: true,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
