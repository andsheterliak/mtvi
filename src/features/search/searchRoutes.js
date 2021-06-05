import { ROUTE_NAMES } from '~common/constants';
import Search from './Search';

const searchRoutes = {
  search: {
    to: ROUTE_NAMES.search,
    component: Search,
    exact: true,
  },
};

export default searchRoutes;
