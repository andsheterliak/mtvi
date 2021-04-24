import Movie from '~modules/Movie/Movie';
import Movies from '~modules/Movies/Movies';
import People from '~modules/People/People';
import TVShows from '~modules/TVShows/TVShows';
import TVShow from '~modules/TVShow/TVShow';
import Person from '~modules/Person/Person';

const routes = {
  default: {
    name: 'Movies',
    to: '/',
    redirectTo: '/movies',
    exact: true,
    component: Movies,
  },

  movies: {
    name: 'Movies',
    to: '/movies',
    exact: true,
    component: Movies,
  },

  movie: {
    to: '/movies/:id',
    component: Movie,
  },

  tvShows: {
    name: 'TV Shows',
    to: '/tv',
    exact: true,
    component: TVShows,
  },

  tvShow: {
    to: '/tv/:id',
    component: TVShow,
  },

  people: {
    name: 'People',
    to: '/people',
    exact: true,
    component: People,
  },

  person: {
    to: '/people/:id',
    component: Person,
  },
};

export default routes;
