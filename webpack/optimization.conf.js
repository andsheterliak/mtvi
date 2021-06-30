const TerserPlugin = require('terser-webpack-plugin');

const optimizationConf = {
  moduleIds: 'hashed', // performance: fix hashing
  // runtimeChunk: true, // Keep the runtime chunk separated to enable long term caching. (Useful if there is more than one entry).

  splitChunks: {
    chunks: 'all', // Include all types of chunks async (dynamic imports) and initial (node_modules).

    // Disable names for chunks, example: polyfills~app.7d473b584b576a22c8ee.js --> 1.7d473b584b576a22c8ee.js.
    // name: false,

    /**
     * To configure chunks groups.
     *  To exclude specific module it is necessary to 'group' closing slash "[\\/]node_modules[\\/](?!module[\\/])", or multiple modules "[\\/]node_modules[\\/](?!(module|module2)[\\/])".
     */
    cacheGroups: {
      // Disable default groups.
      default: false,
      //  vendors: false,

      react: {
        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        priority: 10,
        enforce: true,
      },

      polyfills: {
        test: /[\\/]node_modules[\\/](core-js|regenerator-runtime)[\\/]/,
        priority: 10,
        enforce: true,
      },

      vendors: {
        test: /[\\/]node_modules[\\/]/,
        maxSize: 1024 * 300, // Split vendors if maxSize (in bytes) is reached, (maxSize is only a hint and could be violated when modules are bigger than maxSize or splitting would violate minSize).
        enforce: true,
      },
    },
  },

  // Set source map for TerserPlugin only if you want to enable it for production (default: false), also change devtool.
  // sourceMap: true.
  minimizer: [new TerserPlugin()],
};

module.exports = optimizationConf;
