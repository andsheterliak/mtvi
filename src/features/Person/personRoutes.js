import { ROUTE_NAMES } from '~common/constants';
import Person from '.';

const personRoutes = {
  person: {
    to: `${ROUTE_NAMES.person}/:id`,
    component: Person,
    exact: true,
  },
};

export default personRoutes;
