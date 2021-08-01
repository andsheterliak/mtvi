import { ROUTE_NAMES } from '~/constants';
import { EpisodeCredits } from '~/screens/EpisodeCredits';
import { EpisodeVideos } from '~/screens/EpisodeVideos';
import { Movie } from '~/screens/Movie';
import { MovieCredits } from '~/screens/MovieCredits';
import { Movies } from '~/screens/Movies';
import { MovieVideos } from '~/screens/MovieVideos';
import { Page404 } from '~/screens/Page404';
import { People } from '~/screens/People';
import { Person } from '~/screens/Person';
import { SearchResults } from '~/screens/SearchResults';
import { Season } from '~/screens/Season';
import { Seasons } from '~/screens/Seasons';
import { TVShow } from '~/screens/TVShow';
import { TVShowCredits } from '~/screens/TVShowCredits';
import { TVShows } from '~/screens/TVShows';
import { TVShowVideos } from '~/screens/TVShowVideos';

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
