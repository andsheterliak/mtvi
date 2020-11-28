const { isDev } = require('./helpers.conf');

const devtoolConf = isDev ? 'cheap-module-eval-source-map' : false;

module.exports = devtoolConf;
