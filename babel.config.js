const { isDev } = require('./webpack/helpers.conf'); // Or use function which returns api object to get env - https://babeljs.io/docs/en/config-files#config-function-api.

const config = {
  presets: [
    [
      '@babel/preset-env',

      {
        bugfixes: true, // Will be set by default in next major version.

        corejs: '3.20.1',
        useBuiltIns: 'usage', // To include polyfills which are used in the project.
      },
    ],

    // Starting from Babel 8, "automatic" will be the default runtime.
    [
      '@babel/preset-react',

      {
        runtime: 'automatic', // To use new JSX transform.
      },
    ],

    '@babel/preset-typescript',
  ],

  plugins: [],
};

if (isDev) config.plugins.push('react-refresh/babel');

module.exports = config;
