import { ROUTE_NAMES } from '~common/constants';
import People from '.';

const peopleRoutes = {
  people: {
    name: 'People',
    to: ROUTE_NAMES.people,
    component: People,
    exact: true,
  },
};

export default peopleRoutes;
