import { string } from 'prop-types';
import types from '~common/types';

const videoCardsTypes = {
  name: types.generic.name.isRequired,
  id: string.isRequired,
};

export default videoCardsTypes;
