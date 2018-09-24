const baseWebpackConfig = require('./webpack.base.conf')
const path = require('path');
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const env = process.env.NODE_ENV // node environment variable
const config = require('../config/config.' + env + '.json')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production', // webpack default compress (optimize)
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: path.posix.join(config.assetsSubDirectory, 'js/[name].[chunkhash].js'),
    chunkFilename: path.posix.join(config.assetsSubDirectory, 'js/[id].[chunkhash].js')
  },
  plugins: [
    // MiniCssExtractPlugin => extract css
    new MiniCssExtractPlugin({
      filename: path.posix.join(config.assetsSubDirectory, 'css/[name].[hash].css'),
      chunkFilename: path.posix.join(config.assetsSubDirectory, 'css/[id].[hash].css')
    })
  ],
  optimization: {
    noEmitOnErrors: true,
    concatenateModules: true,
    namedModules: true,
    minimizer: [
      new UglifyJsPlugin({ // comporess js (optimize)
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({}) // compress css(optimize)
    ],
    splitChunks: {
      chunks: 'all',
      name: 'common',
    },
    // runtimeChunk: {
    //   name: 'runtime'
    // }
  }
})
module.exports = webpackConfig
