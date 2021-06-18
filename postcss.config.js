const sortMediaQueries = require('postcss-sort-media-queries');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const { isProd } = require('./webpack/helpers.conf');

const plugins = [
  sortMediaQueries({
    sort: 'mobile-first', // Default: 'mobile-first'.
  }),

  autoprefixer(),
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
