import { ROUTE_NAMES } from '~common/constants';
import Movies from '.';

const moviesRoutes = {
  movies: {
    name: 'Movies',
    to: ROUTE_NAMES.movies,
    component: Movies,
    exact: true,
  },
};

export default moviesRoutes;
