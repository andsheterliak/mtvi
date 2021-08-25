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
  fonts: 'fonts',
};

const paths = {
  src: path.resolve(__dirname, `../${dirNames.src}`),
  dist: path.resolve(__dirname, `../${dirNames.dist}`),
  publicPath: '/',

  scripts: {
    input: {
      app: './index.js', // Base dir depends on 'context' property.
    },

    // Base dir depends on 'output.path' property.
    output: isDev ? '[name].js' : `${dirNames.scripts}/[name].[contenthash].js`,
  },

  pages: {
    input: 'index.html', // Base dir depends on 'context' property.
  },

  styles: {
    // Base dir depends on 'output.path' property.
    output: isDev
      ? '[name].css'
      : `${dirNames.styles}/[name].[contenthash].css`,
  },

  img: {
    // Base dir depends on 'output.path' property.
    output: isDev
      ? '[name][ext]'
      : `${dirNames.assets}/${dirNames.img}/[name].[contenthash][ext]`,
  },

  fonts: {
    // Base dir depends on 'output.path' property.
    output: isDev
      ? '[name][ext]'
      : `${dirNames.assets}/${dirNames.fonts}/[name].[contenthash][ext]`,
  },

  robots: {
    input: `${dirNames.assets}/robots.txt`, // Base dir depends on 'context' property.
    output: `robots.txt`, // Base dir depends on 'output.path' property.
  },
};

module.exports = { isDev, isProd, paths, dirNames };
