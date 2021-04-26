const { isDev } = require('./webpack/helpers.conf');

const config = {
  presets: [
    [
      '@babel/preset-env',

      {
        bugfixes: true, // Will be set by default in next major version.
        corejs: '3.7.0',
        useBuiltIns: 'usage',
      },
    ],

    // Starting from Babel 8, "automatic" will be the default runtime.
    [
      '@babel/preset-react',

      {
        runtime: 'automatic', // To use new JSX transform.
      },
    ],
  ],

  plugins: [],
};

if (isDev) config.plugins.push('react-refresh/babel');

module.exports = config;
