const { paths } = require('./helpers.conf');

const outputConf = {
  filename: paths.scripts.output.filename,
  path: paths.dist,
  
  /**
   * Server will use this path as a base path.
   * Example: "publicPath: '/base' --> https://domain.tld/base/home".
   * More Info: https://www.programmersought.com/article/923487066/.
   */
  publicPath: paths.publicPath,
};

module.exports = outputConf;
