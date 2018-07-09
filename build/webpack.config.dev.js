'use strict'
let webpack = require('webpack')
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let VueLoaderPlugin = require('vue-loader').VueLoaderPlugin

console.log(__dirname)

module.exports = {
  entry: path.join(__dirname, '..', 'src/main.js'),
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '..', 'dist')
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.join(__dirname, '..', 'src')
    }
  },
  devServer: {
    public: 'http://localhost:8080/',
    port: '8080',
    contentBase: path.join(__dirname, '..', 'src'),
    inline: true
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, '..', 'src'),
        exclude: path.join(__dirname, '..', 'node_modules')
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: path.join(__dirname, '..', 'node_modules')
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      inject: 'body'  //将js注入到body底部
    }),
    new VueLoaderPlugin()
  ]
}