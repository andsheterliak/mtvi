const sortMediaQueries = require('postcss-sort-media-queries');
const autoprefixer = require('autoprefixer');
const postcssNormalize = require('postcss-normalize');
const cssnano = require('cssnano');

const { isProd } = require('./webpack/helpers.conf');

const plugins = [
  sortMediaQueries({
    sort: 'mobile-first', // Default: 'mobile-first'.
  }),

  autoprefixer(),
  postcssNormalize({
    forceImport: 'normalize.css'
  }),
];

if (isProd) {
  plugins.push(
    cssnano({
      preset: [
        'default',

        {
          svgo: false,
        },
      ],
    })
  );
}

module.exports = { plugins };
