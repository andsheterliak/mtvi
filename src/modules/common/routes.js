import Movie from '../Movie/Movie';
import Movies from '../Movies/Movies';
import People from '../People/People';
import TVShows from '../TVShows/TVShows';
import TVShow from '../TVShow/TVShow';
import Person from '../Person/Person';

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
