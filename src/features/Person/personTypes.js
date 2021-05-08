const { objectOf, oneOfType, string, number } = require('prop-types');

const idType = oneOfType([string, number]);

const personTypes = {
  id: idType,
  externalIds: objectOf(idType),
};

export default personTypes;
