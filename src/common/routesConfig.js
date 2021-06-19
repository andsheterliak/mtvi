import { ROUTE_NAMES } from '~common/constants';

import Movies from '~features/Movies';
import Movie from '~features/Movie';
import MovieVideos from '~features/MovieVideos';
import MovieCredits from '~features/MovieCredits';
import TVShows from '~features/TVShows';
import TVShow from '~features/TVShow';
import TVShowVideos from '~features/TVShowVideos';
import TVShowCredits from '~features/TVShowCredits';
import Seasons from '~features/Seasons';
import Season from '~features/Season';
import EpisodeCredits from '~features/EpisodeCredits';
import EpisodeVideos from '~features/EpisodeVideos';
import People from '~features/People';
import Person from '~features/Person';
import SearchResults from '~features/SearchResults';
import Page404 from '~components/Page404';

const movies = {
  name: 'Movies',
  to: `/${ROUTE_NAMES.movies}`,
  component: Movies,
  exact: true,
};

const routesConfig = {
  default: {
    name: movies.name,
    to: ROUTE_NAMES.root,
    redirectTo: movies.to,
    exact: true,
    component: movies.component,
  },
  movies,
  movie: {
    to: `/${ROUTE_NAMES.movie}/:id`,
    component: Movie,
    exact: true,
  },
  movieVideos: {
    to: `/${ROUTE_NAMES.movie}/:id/${ROUTE_NAMES.videos}`,
    component: MovieVideos,
    exact: true,
  },
  movieCredits: {
    to: `/${ROUTE_NAMES.movie}/:id/${ROUTE_NAMES.credits}`,
    component: MovieCredits,
    exact: true,
  },
  tvShows: {
    name: 'TV Shows',
    to: `/${ROUTE_NAMES.tvShows}`,
    component: TVShows,
    exact: true,
  },
  tvShow: {
    to: `/${ROUTE_NAMES.tvShow}/:id`,
    component: TVShow,
    exact: true,
  },
  tvShowVideos: {
    to: `/${ROUTE_NAMES.tvShow}/:id/${ROUTE_NAMES.videos}`,
    component: TVShowVideos,
    exact: true,
  },
  tvShowCredits: {
    to: `/${ROUTE_NAMES.tvShow}/:id/${ROUTE_NAMES.credits}`,
    component: TVShowCredits,
    exact: true,
  },
  seasons: {
    to: `/${ROUTE_NAMES.tvShow}/:id/${ROUTE_NAMES.seasons}`,
    component: Seasons,
    exact: true,
  },
  season: {
    to: `/${ROUTE_NAMES.tvShow}/:id/${ROUTE_NAMES.season}/:seasonNumber`,
    component: Season,
    exact: true,
  },
  episodeCredits: {
    to: `/${ROUTE_NAMES.tvShow}/:id/${ROUTE_NAMES.season}/:seasonNumber/${ROUTE_NAMES.episode}/:episodeNumber/${ROUTE_NAMES.credits}`,
    component: EpisodeCredits,
    exact: true,
  },
  episodeVideos: {
    to: `/${ROUTE_NAMES.tvShow}/:id/${ROUTE_NAMES.season}/:seasonNumber/${ROUTE_NAMES.episode}/:episodeNumber/${ROUTE_NAMES.videos}`,
    component: EpisodeVideos,
    exact: true,
  },
  people: {
    name: 'People',
    to: `/${ROUTE_NAMES.people}`,
    component: People,
    exact: true,
  },
  person: {
    to: `/${ROUTE_NAMES.person}/:id`,
    component: Person,
    exact: true,
  },
  searchResults: {
    to: `/${ROUTE_NAMES.search}`,
    component: SearchResults,
    exact: true,
  },
  page404: {
    to: '*',
    component: Page404,
  },
};

export default routesConfig;
