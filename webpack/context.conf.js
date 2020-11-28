const { paths } = require('./helpers.conf');

const contextConf = paths.src; // Specify the 'src' path, some configs like 'HtmlWebpackPlugin' template prop will use this context as a base dir.

module.exports = contextConf;
