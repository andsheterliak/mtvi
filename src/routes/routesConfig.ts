import { FunctionComponent } from 'react';
import { ROUTE_NAMES } from '~/shared/constants';
import { EpisodeCredits } from './EpisodeCredits';
import { EpisodeVideos } from './EpisodeVideos';
import { Movie } from './Movie';
import { MovieCredits } from './MovieCredits';
import { Movies, MoviesProps } from './Movies';
import { MovieVideos } from './MovieVideos';
import { Page404, Page404Props } from './Page404';
import { People, PeopleProps } from './People';
import { Person } from './Person';
import { SearchResults } from './SearchResults';
import { Season } from './Season';
import { Seasons } from './Seasons';
import { TVShow } from './TVShow';
import { TVShowCredits } from './TVShowCredits';
import { TVShows, TVShowsProps } from './TVShows';
import { TVShowVideos } from './TVShowVideos';

type RouteItem<Props = Record<string, unknown>> = {
  to: string;
  redirectTo?: string;
  exact?: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: FunctionComponent<any>;
  props?: Props;
};

const movies: RouteItem<MoviesProps> = {
  to: `/${ROUTE_NAMES.movies}`,
  component: Movies,
  exact: true,
  props: { titleName: 'Movies' },
};

const home: RouteItem = {
  to: ROUTE_NAMES.root,
  redirectTo: movies.to,
  exact: true,
};

const movie: RouteItem = {
  to: `/${ROUTE_NAMES.movie}/:id`,
  component: Movie,
  exact: true,
};

const movieVideos: RouteItem = {
  to: `/${ROUTE_NAMES.movie}/:id/${ROUTE_NAMES.videos}`,
  component: MovieVideos,
  exact: true,
};

const movieCredits: RouteItem = {
  to: `/${ROUTE_NAMES.movie}/:id/${ROUTE_NAMES.credits}`,
  component: MovieCredits,
  exact: true,
};

const tvShows: RouteItem<TVShowsProps> = {
  to: `/${ROUTE_NAMES.tvShows}`,
  component: TVShows,
  exact: true,
  props: { titleName: 'TV Shows' },
};

const tvShow: RouteItem = {
  to: `/${ROUTE_NAMES.tvShow}/:id`,
  component: TVShow,
  exact: true,
};

const tvShowVideos: RouteItem = {
  to: `/${ROUTE_NAMES.tvShow}/:id/${ROUTE_NAMES.videos}`,
  component: TVShowVideos,
  exact: true,
};

const tvShowCredits: RouteItem = {
  to: `/${ROUTE_NAMES.tvShow}/:id/${ROUTE_NAMES.credits}`,
  component: TVShowCredits,
  exact: true,
};

const seasons: RouteItem = {
  to: `/${ROUTE_NAMES.tvShow}/:id/${ROUTE_NAMES.seasons}`,
  component: Seasons,
  exact: true,
};

const season: RouteItem = {
  to: `/${ROUTE_NAMES.tvShow}/:id/${ROUTE_NAMES.season}/:seasonNumber`,
  component: Season,
  exact: true,
};

const episodeCredits: RouteItem = {
  to: `/${ROUTE_NAMES.tvShow}/:id/${ROUTE_NAMES.season}/:seasonNumber/${ROUTE_NAMES.episode}/:episodeNumber/${ROUTE_NAMES.credits}`,
  component: EpisodeCredits,
  exact: true,
};

const episodeVideos: RouteItem = {
  to: `/${ROUTE_NAMES.tvShow}/:id/${ROUTE_NAMES.season}/:seasonNumber/${ROUTE_NAMES.episode}/:episodeNumber/${ROUTE_NAMES.videos}`,
  component: EpisodeVideos,
  exact: true,
};

const people: RouteItem<PeopleProps> = {
  to: `/${ROUTE_NAMES.people}`,
  component: People,
  exact: true,
  props: { titleName: 'People' },
};

const person: RouteItem = {
  to: `/${ROUTE_NAMES.person}/:id`,
  component: Person,
  exact: true,
};

const searchResults: RouteItem = {
  to: `/${ROUTE_NAMES.search}`,
  component: SearchResults,
  exact: true,
};

const page404: RouteItem<Page404Props> = {
  to: '*',
  component: Page404,
  props: { homePath: home.redirectTo! },
};

export const routesConfig = [
  movies,
  home,
  movie,
  movieVideos,
  movieCredits,
  tvShows,
  tvShow,
  tvShowVideos,
  tvShowCredits,
  seasons,
  season,
  episodeCredits,
  episodeVideos,
  people,
  person,
  searchResults,
  page404,
];

export const linksConfig = {
  home: { to: home.redirectTo! },
  movies: { name: movies.props!.titleName, to: movies.to },
  tvShows: { name: tvShows.props!.titleName, to: tvShows.to },
  people: { name: people.props!.titleName, to: people.to },
};
