const { paths, dirNames } = require('./helpers.conf');

const resolveConf = {
  // Extensions priority order for imports to be able to omit them, example: 'app' without '.js'.
  extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],

  alias: {
    '~': paths.src,
    '~assets': `${paths.src}/${dirNames.assets}`,
    '~features': `${paths.src}/${dirNames.features}`,
    '~common': `${paths.src}/${dirNames.common}`,
    '~components': `${paths.src}/${dirNames.common}/${dirNames.components}`,
  },
};

module.exports = resolveConf;
