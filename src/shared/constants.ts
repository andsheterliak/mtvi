export type RouteName = string;

const createRouteNames = <RouteNames extends Record<string, RouteName>>(routeNames: RouteNames) => {
  return routeNames;
}; // Constrained Identity Function

export const ROUTE_NAMES = createRouteNames({
  root: '/',
  movies: 'movies',
  movie: 'movie',
  credits: `credits`,
  tvShows: 'tvShows',
  tvShow: 'tvShow',
  people: 'people',
  person: 'person',
  videos: 'videos',
  seasons: 'seasons',
  season: 'season',
  episode: 'episode',
  search: 'search',
});

export type ItemAmount = number;

export const TOP_ITEM_AMOUNT: ItemAmount = 9;
export const TOP_VIDEO_AMOUNT: ItemAmount = 6;

export const FALLBACK_VALUE = '-';

export const LAZY_IMG_CLASS_NAME = 'lazy-img';
