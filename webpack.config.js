'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'src/dist')
  },
  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, 'src/dist'),
      },
      {
        directory: path.resolve(__dirname, 'src/assets'),
        publicPath: '/assets'
      }
    ],
    port: 3000,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin({ filename: 'styles.css' }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets',
          to: 'assets'
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          MiniCssExtractPlugin.loader, // Extracts CSS into separate files
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer({
                    overrideBrowserslist: ['last 2 versions', '> 1%', 'not ie <= 8']
                  })
                ]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'node_modules')],
                quietDeps: true // Suppress warnings from dependencies
              }
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        include: path.resolve(__dirname, 'src/assets/icons')
      }
    ]
  }
}