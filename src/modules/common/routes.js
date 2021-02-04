import Movies from '../Movies/Movies';
import People from '../People/People';
import TVShows from '../TVShows/TVShows';

const routes = {
  default: {
    name: 'Movies',
    to: '/',
    redirectTo: '/movies',
    component: Movies,
  },

  movies: {
    name: 'Movies',
    to: '/movies',
    component: Movies,
  },

  tv: {
    name: 'TV Shows',
    to: '/tv',
    component: TVShows,
  },

  people: {
    name: 'People',
    to: '/people',
    component: People,
  },
};

export default routes;
