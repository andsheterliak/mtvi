const { paths } = require('./helpers.conf');

const outputConf = {
  filename: paths.scripts.output.filename,
  path: paths.dist,
  publicPath: paths.publicPath, // Info: https://www.programmersought.com/article/923487066/
};

module.exports = outputConf;
