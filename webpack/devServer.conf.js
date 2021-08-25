const devServerConf = {
  hot: true,
  historyApiFallback: true, // For SPA.
  port: 8080,

  client: {
    overlay: false,
  },
};

module.exports = devServerConf;
