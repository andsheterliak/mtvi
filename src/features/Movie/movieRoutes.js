import { ROUTE_NAMES } from '~common/constants';
import MoviePage from '.';
import MovieCredits from './MovieCredits';

const movieRoutes = {
  movie: {
    to: `${ROUTE_NAMES.movie}/:id`,
    component: MoviePage,
    exact: true,
  },

  movieCredits: {
    to: `${ROUTE_NAMES.movie}/:id/${ROUTE_NAMES.credits}`,
    component: MovieCredits,
    exact: true,
  },
};

export default movieRoutes;
