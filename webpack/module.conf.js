const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { isDev, paths } = require('./helpers.conf');

const setJSLoaders = () => {
  const loaders = ['babel-loader'];

  if (isDev) {
    loaders.push({
      loader: 'eslint-loader',

      options: {
        fix: true,
        emitWarning: true, // Emit warnings instead of errors.
      },
    });
  }

  return loaders;
};

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
      // ! CSS modules
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
      loader: setJSLoaders(),
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
      include: paths.src,
      loader: 'file-loader',

      options: {
        name: paths.fonts.output.filename,
        outputPath: paths.fonts.output.folder,
      },
    },
  ],
};

module.exports = moduleConf;
