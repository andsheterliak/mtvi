const { isDev } = require('./helpers.conf');

const devtoolConf = isDev ? 'eval-source-map' : false;

module.exports = devtoolConf;
