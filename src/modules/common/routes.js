import Movie from '../Movie/Movie';
import Movies from '../Movies/Movies';
import People from '../People/People';
import TVShows from '../TVShows/TVShows';

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

  tv: {
    name: 'TV Shows',
    to: '/tv',
    exact: true,
    component: TVShows,
  },

  people: {
    name: 'People',
    to: '/people',
    exact: true,
    component: People,
  },
};

export default routes;
