import { ROUTE_NAMES } from '~common/constants';

import Movie from '~modules/Movie/Movie';
import Movies from '~modules/Movies/Movies';
import People from '~modules/People/People';
import TVShows from '~modules/TVShows/TVShows';
import TVShow from '~modules/TVShow/TVShow';
import Person from '~modules/Person/Person';
import MovieCredits from '~modules/Movie/MovieCredits';

const routes = {
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
    to: `${ROUTE_NAMES.movieCredits}/:id`,
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

export default routes;
