const { paths, dirNames } = require('./helpers.conf');

const resolveConf = {
  // Extensions priority order for imports to be able to omit them, example: 'app' without '.js'.
  extensions: ['.js', '.json', '.jsx'],

  alias: {
    // To replace standard react-dom with @hot-loader/react-dom
    'react-dom': '@hot-loader/react-dom',
    '@': paths.src,
    '@assets': `${paths.src}/${dirNames.assets}`,
    '@modules': `${paths.src}/${dirNames.modules}`,
    '@common': `${paths.src}/${dirNames.modules}/${dirNames.common}`,
    '@components': `${paths.src}/${dirNames.modules}/${dirNames.common}/${dirNames.components}`,
  },
};

module.exports = resolveConf;
