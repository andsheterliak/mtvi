const { paths } = require('./helpers.conf');

const resolveConf = {
  // Extensions priority order for imports to be able to omit them, example: 'app' without '.js'.
  extensions: ['.tsx', '.ts', '.jsx', '.js', '.d.ts', '.json'],

  alias: {
    '~': paths.src,
  },
};

module.exports = resolveConf;
