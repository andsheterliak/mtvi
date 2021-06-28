const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { isDev, paths } = require('./helpers.conf');

const styleLoaders = {
  styleLoader: {
    loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
  },

  cssLoader: {
    loader: 'css-loader',

    options: {
      sourceMap: true,
    },
  },

  cssLoaderModules: {
    loader: 'css-loader',

    options: {
      modules: {
        localIdentName: '[name]__[local]--[hash:base64:5]',
      },

      sourceMap: true,
    },
  },

  postCSSLoader: {
    loader: 'postcss-loader',

    options: {
      sourceMap: true,
    },
  },
};

const moduleConf = {
  rules: [
    // JS

    {
      test: /\.jsx?$/,
      include: paths.src,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },

    // CSS

    {
      test: /\.css$/,
      exclude: /\.module\.css$/,

      use: [
        styleLoaders.styleLoader,
        styleLoaders.cssLoader,
        styleLoaders.postCSSLoader,
      ],
    },

    {
      test: /\.module\.css$/,
      include: paths.src,

      use: [
        styleLoaders.styleLoader,
        styleLoaders.cssLoaderModules,
        styleLoaders.postCSSLoader,
      ],
    },

    // HTML

    {
      test: /\.html$/,
      include: paths.src,
      loader: 'html-loader',
    },

    // Img

    {
      test: /\.(png|jpe?g|gif|svg)$/,
      include: paths.src,
      loader: 'file-loader',

      options: {
        name: paths.img.output.filename,
        outputPath: paths.img.output.folder,
      },
    },

    // Fonts

    {
      test: /\.(ttf|eot|woff2?)$/,
      loader: 'file-loader',

      options: {
        name: paths.fonts.output.filename,
        outputPath: paths.fonts.output.folder,
      },
    },
  ],
};

module.exports = moduleConf;
