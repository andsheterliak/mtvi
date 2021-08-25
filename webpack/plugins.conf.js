const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const { isDev, paths } = require('./helpers.conf');

const pluginsConf = [
  new HtmlWebpackPlugin({
    template: paths.pages.input,
  }),

  // Must be after HtmlWebpackPlugin
  new MiniCssExtractPlugin({
    filename: paths.styles.output,
  }),

  new ImageminPlugin({
    disable: isDev,

    /**
     * Sometimes it is necessary to work with external unminified but optimized svg files, then they just need to be minified (remove spaces/newlines).
     */

    test: /\.svg$/,
    optipng: null,
    pngquant: null,
    jpegtran: null,
    gifsicle: null,

    // full: true - Disable all the plugins and enable only plugins in the plugins array. If plugins array is empty, only spaces/newlines will be removed.
    svgo: {
      full: true,
      plugins: [],
    },
  }),

  new ESLintPlugin({
    extensions: ['js', 'jsx', 'ts', 'tsx'],
    failOnError: false,
  }),

  new CopyPlugin({
    patterns: [{ from: paths.robots.input, to: paths.robots.output }],
  }),

  new DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
];

if (isDev)
  pluginsConf.push(
    new ReactRefreshWebpackPlugin({
      overlay: false,
    })
  );

module.exports = pluginsConf;
