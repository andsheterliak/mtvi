const resolveConf = {
  // Extensions priority order for imports to be able to omit them, example: 'app' without '.js'.
  extensions: ['.js', '.json', '.jsx'], 

  // To replace standard react-dom with @hot-loader/react-dom
  alias: {
    'react-dom': '@hot-loader/react-dom'
  }
};

module.exports = resolveConf;
