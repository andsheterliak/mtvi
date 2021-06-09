import { ROUTE_NAMES } from '~common/constants';
import Season from './Season';

const seasonRoutes = {
  season: {
    to: `/${ROUTE_NAMES.tvShow}/:id/${ROUTE_NAMES.season}/:seasonNumber`,
    component: Season,
    exact: true,
  },
};

export default seasonRoutes;
