/**
 * Created by ray.xie on 9/12/2016.
 */

// eslint-disable-next-line
const webpack = require('webpack');

module.exports = {
    entry: [
        'babel-polyfill',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/dev-server',
        './src/index.jsx'],

    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['react-hot', 'babel'],
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

    debug: true,
    devtool: 'source-map',


    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
};
