const TerserPlugin = require('terser-webpack-plugin');
const { isProd } = require('./helpers.conf');

const optimizationConf = {
  // runtimeChunk: true, // Adds an additional chunk containing only the webpack runtime to each entrypoint. (Useful if there is more than one entrypoint).

  splitChunks: isProd
    ? {
        chunks: 'all', // Include all types of chunks async (dynamic imports) and initial (node_modules).

        /**
         * Works in tandem with 'maxSize' for cache group, even with 'enforce: true,' parameter.
         * Takes a number in bytes before min+gz.
         * If a cache group does not have the 'enforce: true' parameter, this cache group will become a chunk only if the modules passing the 'test' are larger than 'minSize'.
         */
        minSize: 1024 * 30,

        /**
         * To exclude specific module it is necessary to 'group' closing slash "[\\/]node_modules[\\/](?!module[\\/])", or multiple modules "[\\/]node_modules[\\/](?!(module|module2)[\\/])".
         */
        cacheGroups: {
          // Disable default groups.
          default: false,
          defaultVendors: false,

          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            priority: 10,
            enforce: true,
          },

          polyfills: {
            test: /[\\/]node_modules[\\/](core-js|regenerator-runtime)[\\/]/,
            name: 'polyfills',
            priority: 10,
            enforce: true,
          },

          'material-ui': {
            test: /[\\/]node_modules[\\/]@material-ui[\\/]/,
            name: 'material-ui',
            priority: 10,
            enforce: true,
          },

          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            enforce: true,
            maxSize: 1024 * 300, // Split the 'vendors' if 'maxSize' (in bytes before min+gz) is reached, ('maxSize' is only a hint and could be violated when modules are bigger than 'maxSize' or splitting would violate 'minSize').
          },
        },
      }
    : undefined,

  minimizer: [new TerserPlugin()],
};

module.exports = optimizationConf;
