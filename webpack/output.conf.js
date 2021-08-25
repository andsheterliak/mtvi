const { paths } = require('./helpers.conf');

const outputConf = {
  filename: paths.scripts.output,
  path: paths.dist,
  clean: true,
  publicPath: paths.publicPath,
};

module.exports = outputConf;
