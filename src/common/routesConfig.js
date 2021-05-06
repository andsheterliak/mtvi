import { ROUTE_NAMES } from '~common/constants';

import Movie from '~features/Movie/Movie';
import Movies from '~features/Movies/Movies';
import People from '~features/People/People';
import TVShows from '~features/TVShows/TVShows';
import TVShow from '~features/TVShow/TVShow';
import Person from '~features/Person/Person';
import MovieCredits from '~features/Movie/MovieCredits';

const routesConfig = {
  default: {
    name: 'Movies',
    to: ROUTE_NAMES.root,
    redirectTo: ROUTE_NAMES.movies,
    exact: true,
    component: Movies,
  },

  movies: {
    name: 'Movies',
    to: ROUTE_NAMES.movies,
    component: Movies,
    exact: true,
  },

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

  tvShows: {
    name: 'TV Shows',
    to: ROUTE_NAMES.tvShows,
    component: TVShows,
    exact: true,
  },

  tvShow: {
    to: `${ROUTE_NAMES.tvShow}/:id`,
    component: TVShow,
    exact: true,
  },

  people: {
    name: 'People',
    to: ROUTE_NAMES.people,
    component: People,
    exact: true,
  },

  person: {
    to: `${ROUTE_NAMES.person}/:id`,
    component: Person,
    exact: true,
  },
};

export default routesConfig;
