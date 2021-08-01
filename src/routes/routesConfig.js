import { ROUTE_NAMES } from '~/shared/constants';
import { EpisodeCredits } from './EpisodeCredits';
import { EpisodeVideos } from './EpisodeVideos';
import { Movie } from './Movie';
import { MovieCredits } from './MovieCredits';
import { Movies } from './Movies';
import { MovieVideos } from './MovieVideos';
import { Page404 } from './Page404';
import { People } from './People';
import { Person } from './Person';
import { SearchResults } from './SearchResults';
import { Season } from './Season';
import { Seasons } from './Seasons';
import { TVShow } from './TVShow';
import { TVShowCredits } from './TVShowCredits';
import { TVShows } from './TVShows';
import { TVShowVideos } from './TVShowVideos';

const movies = {
  name: 'Movies',
  to: `/${ROUTE_NAMES.movies}`,
  component: Movies,
  exact: true,
};

export const routesConfig = {
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
