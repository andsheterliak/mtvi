import Movies from '../modules/common/Movies/Movies';
import People from '../modules/People/People';
import TVShows from '../modules/TVShows/TVShows';

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
