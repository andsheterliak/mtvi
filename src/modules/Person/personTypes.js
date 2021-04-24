const { objectOf, oneOfType, string, number } = require('prop-types');

const personTypes = {
  externalIds: objectOf(oneOfType([string, number])),
};

export default personTypes;
