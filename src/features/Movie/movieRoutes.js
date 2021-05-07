import { ROUTE_NAMES } from '~common/constants';
import Movie from './Movie';
import MovieCredits from './MovieCredits';

const movieRoutes = {
  movie: {
    to: `${ROUTE_NAMES.movie}/:id`,
    component: Movie,
    exact: true,
  },

  movieCredits: {
    to: `${ROUTE_NAMES.movie}/:id/${ROUTE_NAMES.credits}`,
    component: MovieCredits,
    exact: true,
  },
};

export default movieRoutes;
