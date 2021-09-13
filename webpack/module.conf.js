const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { isDev, paths } = require('./helpers.conf');

const styleLoaders = {
  styleLoader: {
    loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
  },

  cssLoader: {
    loader: 'css-loader',
  },

  cssLoaderModules: {
    loader: 'css-loader',

    options: {
      modules: {
        localIdentName: '[name]__[local]--[hash:base64:5]',
      },
    },
  },

  postCSSLoader: {
    loader: 'postcss-loader',
  },
};

const moduleConf = {
  rules: [
    // JS

    {
      test: /\.(ts|js)x?$/,
      include: paths.src,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },

    // CSS

    {
      test: /\.css$/,
      exclude: /\.module\.css$/,
      use: [styleLoaders.styleLoader, styleLoaders.cssLoader, styleLoaders.postCSSLoader],
    },

    // CSS Modules

    {
      test: /\.module\.css$/,
      include: paths.src,
      use: [styleLoaders.styleLoader, styleLoaders.cssLoaderModules, styleLoaders.postCSSLoader],
    },

    // HTML

    {
      test: /\.html$/,
      include: paths.src,

      use: [
        {
          loader: 'html-loader',

          options: {
            minimize: false, // HtmlWebpackPlugin will minify html files.
          },
        },
      ],
    },

    // Img

    {
      test: /\.(png|jpe?g|gif|svg)$/,
      include: paths.src,
      type: 'asset/resource',

      generator: {
        filename: paths.img.output,
      },
    },

    // Fonts

    {
      test: /\.(ttf|eot|woff2?)$/,
      include: paths.src,
      type: 'asset/resource',

      generator: {
        filename: paths.fonts.output,
      },
    },
  ],
};

module.exports = moduleConf;
