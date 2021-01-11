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
      include: paths.src,

      use: [
        {
          loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        },

        {
          loader: 'css-loader',

          options: {
            sourceMap: true,

            modules: {
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
        },

        {
          loader: 'postcss-loader',

          options: {
            sourceMap: true,
          },
        },
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
