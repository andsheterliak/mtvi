import { number } from 'prop-types';
import types from '~common/types';

const projectsTimelineTypes = {
  name: types.generic.name,
  path: types.generic.path.isRequired,
  year: number,
};

export default projectsTimelineTypes;
