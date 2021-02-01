import Movies from '../features/Movies/Movies';
import People from '../features/People/People';
import TVShows from '../features/TVShows/TVShows';

const routes = {
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
