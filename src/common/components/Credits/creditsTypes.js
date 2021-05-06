import { array, object, objectOf, oneOfType } from 'prop-types';

const creditsTypes = {
  creditsData: objectOf(oneOfType([object, array])),
};

export default creditsTypes;
