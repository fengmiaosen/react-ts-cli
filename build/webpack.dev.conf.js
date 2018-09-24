const baseWebpackConfig = require('./webpack.base.conf')
const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const env = process.env.NODE_ENV // node environment variable
const config = require('../config/config.' + env + '.json')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [
    // webpack-dev-server
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    clientLogLevel: 'warning', // browser print info of webpack-dev-server
    contentBase: path.join(__dirname, '/dist'),
    inline: true,
    hot: true,
    host: 'localhost',
    port: config.port,
    publicPath: '/',
    open: false,
  }
})
module.exports = webpackConfig
