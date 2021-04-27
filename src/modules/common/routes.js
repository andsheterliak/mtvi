import { ROUTE_NAMES } from '~common/constants';

import Movie from '~modules/Movie/Movie';
import Movies from '~modules/Movies/Movies';
import People from '~modules/People/People';
import TVShows from '~modules/TVShows/TVShows';
import TVShow from '~modules/TVShow/TVShow';
import Person from '~modules/Person/Person';

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
    exact: true,
    component: Movies,
  },

  movie: {
    to: `${ROUTE_NAMES.movie}:id`,
    component: Movie,
  },

  tvShows: {
    name: 'TV Shows',
    to: ROUTE_NAMES.tvShows,
    exact: true,
    component: TVShows,
  },

  tvShow: {
    to: `${ROUTE_NAMES.tvShow}:id`,
    component: TVShow,
  },

  people: {
    name: 'People',
    to: ROUTE_NAMES.people,
    exact: true,
    component: People,
  },

  person: {
    to: `${ROUTE_NAMES.person}:id`,
    component: Person,
  },
};

export default routes;
