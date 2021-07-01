const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyPlugin = require('copy-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const { isDev, paths, isProd } = require('./helpers.conf');

const pluginsConf = [
  new CleanWebpackPlugin(),

  new HtmlWebpackPlugin({
    filename: paths.pages.index.filename,
    template: paths.pages.index.template,
  }),

  // Must be after HtmlWebpackPlugin
  new MiniCssExtractPlugin({
    filename: paths.styles.outputFilename,
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

  new CopyPlugin({
    patterns: [paths.favicon, paths.robots],
  }),

  new ESLintPlugin({
    extensions: ['js', 'jsx'],
    fix: true,
    failOnError: false,
  }),

  new DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
];

if (isDev) pluginsConf.push(new ReactRefreshWebpackPlugin({
  overlay: false,
}));

module.exports = pluginsConf;
