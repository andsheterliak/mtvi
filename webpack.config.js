const webpackConfig = {
  context: require('./webpack/context.conf'),
  mode: require('./webpack/mode.conf'),
  entry: require('./webpack/entry.conf'),
  output: require('./webpack/output.conf'),
  resolve: require('./webpack/resolve.conf'),
  devtool: require('./webpack/devtool.conf'),
  devServer: require('./webpack/devServer.conf'),
  performance: require('./webpack/performance.conf'),
  optimization: require('./webpack/optimization.conf'),
  plugins: require('./webpack/plugins.conf'),
  module: require('./webpack/module.conf'),
};

module.exports = webpackConfig;
