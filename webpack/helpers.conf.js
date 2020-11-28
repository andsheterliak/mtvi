const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const dirNames = {
  src: 'src',
  dist: 'dist',
  scripts: 'scripts',
  styles: 'styles',
  assets: 'assets',
  img: 'img',
  favicon: 'favicon', 
  fonts: 'fonts',
};

const paths = {
  src: path.resolve(__dirname, `../${dirNames.src}`),
  dist: path.resolve(__dirname, `../${dirNames.dist}`),
  publicPath: '/',

  img: {
    // Base dir depends on 'output.path' property.
    output: {
      filename: isDev ? '[name].[ext]' : `[name].[contenthash].[ext]`,
      folder: isDev ? '' : `${dirNames.assets}/${dirNames.img}`,
    },
  },

  fonts: {
    // Base dir depends on 'output.path' property.
    output: {
      filename: isDev ? '[name].[ext]' : `[name].[contenthash].[ext]`,
      folder: isDev ? '' : `${dirNames.assets}/${dirNames.fonts}`,
    },
  },

  favicon: {
    from: `${dirNames.assets}/favicon/`, // Base dir depends on 'context' property.
    to: `${dirNames.assets}/favicon/`, // Base dir depends on 'output.path' property.
  },

  pages: {
    index: {
      filename: 'index.html',
      template: `index.html`, // Base dir depends on 'context' property.
    },
  },

  styles: {
    // Base dir depends on 'output.path' property.
    outputFilename: isDev
      ? '[name].css'
      : `${dirNames.styles}/[name].[contenthash].css`,

    // Base dir depends on 'context' property.
    stylelintFiles: './**/*.(css|scss)'
  },

  scripts: {
    entries: {
      app: `./index.js`, // Base dir depends on 'context' property.
    },

    output: {
      // Base dir depends on 'output.path' property.
      filename: isDev
        ? '[name].js'
        : `${dirNames.scripts}/[name].[contenthash].js`,
    },
  },
};

module.exports = { isDev, isProd, paths };
