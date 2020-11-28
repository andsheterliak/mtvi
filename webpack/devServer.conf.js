const devServerConf = {
  open: false,
  hot: true,

  // To be able connect through wifi.
  host: '0.0.0.0',
  useLocalIp: true,

  overlay: {
    warnings: false,
    errors: false,
  },

  historyApiFallback: true, // For SPA.
};

module.exports = devServerConf;
