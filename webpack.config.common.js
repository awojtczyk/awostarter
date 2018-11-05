const glob = require('glob');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackDashboard = require('webpack-dashboard/plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const options = require('./app/_json/options');
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");

const appPath = {
  scripts: {
    entry: './app/scripts/app.js',
    resolve: 'app/scripts',
    output: './scripts/app.js',
  },
  styles: {
    entry: './app/styles/main.scss',
    resolve: 'app/styles',
    output: './css/app.css',
  },
  jsons: {
    entry: './app/_json',
    output: './_json',
  },
  fonts: {
    entry: './app/fonts',
    output: './fonts',
  },
  images: {
    entry: './app/images',
    output: './images',
  },
  html: {
    entry: './app/**/*.html',
  },
  dist: 'dist',
  url: 'http://127.0.0.1:3000/',
};
const generateHTMLPlugins = () =>
  glob.sync('./app/**/*.html').map(
    dir =>
      new HTMLWebpackPlugin({
        filename: path.basename(dir), // Output
        template: dir, // Input
      }),
  );

module.exports = {
  node: {
    fs: 'empty',
  },
  entry: [appPath.scripts.entry, appPath.styles.entry],
  output: {
    filename: appPath.scripts.output,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
      {
        test: /\.html$/,
        use: [
          'raw-loader',
          {
            loader: 'twig-html-loader',
            options: {
              data: options,
            },
          },
        ],
      },
      {
        test: require.resolve('jquery'),
        use: [
          {
            loader: 'expose-loader',
            options: 'jQuery',
          },
          {
            loader: 'expose-loader',
            options: '$',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpackDashboard(), // Adding webpack-dashboard plugin. Add more plugins by like this -
    new DuplicatePackageCheckerPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
      chunkFilename: '[id].css',
    }),
    new CopyWebpackPlugin([
      { from: appPath.jsons.entry, to: appPath.jsons.output, cache: true },
      { from: appPath.fonts.entry, to: appPath.fonts.output, cache: true },
      { from: appPath.images.entry, to: appPath.images.output, cache: true },
    ]),
    ...generateHTMLPlugins(),
  ],
  stats: {
    colors: true,
  },
  devtool: 'source-map',
};
