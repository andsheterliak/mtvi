const TerserPlugin = require('terser-webpack-plugin');

const optimizationConf = {
  moduleIds: 'hashed', // performance: fix hashing
  // runtimeChunk: true, // Keep the runtime chunk separated to enable long term caching. (Useful if there is more than one entry).

  /**
   * -------- splitChunks info:
   * If you have a dynamic imported file and it requires a package from node_modules: such package also will be splitted, if you don't want to, just exclude it.
   */
  splitChunks: {
    chunks: 'all', // Include all types of chunks async (dynamic imports) and initial (node_modules).

    /**
     * -------- name info:
     * Since the chunk name includes all origin chunk names it’s recommended for production builds with long term caching to NOT include [name] in the filenames, or switch off name generation via optimization.splitChunks.name: false. Elsewise files will invalidate i. e. when more chunks with the same vendors are added.
     *
     * Disable names for chunks, example: polyfills~app.7d473b584b576a22c8ee.js --> 1.7d473b584b576a22c8ee.js.
     */
    name: false,

    /**
     * To configure chunks groups.
     *  To exclude specific module it is necessary to 'group' closing slash "[\\/]node_modules[\\/](?!module[\\/])", or multiple modules "[\\/]node_modules[\\/](?!(module|module2)[\\/])".
     */
    // cacheGroups: {
    //   // Disable default groups.
    //   default: false,
    // //  vendors: false,

    //   polyfills: {
    //     test: /[\\/]node_modules[\\/](core-js|regenerator-runtime)[\\/]/,
    //     priority: 10,
    //     enforce: true,
    //   },

    //   vendors: {
    //     test: /[\\/]node_modules[\\/]/,
    //     enforce: true,
    //   },
    // },
  },

  // Set source map for TerserPlugin only if you want to enable it for production (default: false), also change devtool.
  // sourceMap: true.
  minimizer: [new TerserPlugin()],
};

module.exports = optimizationConf;
