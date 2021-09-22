import { Genre, Genres, MediaTypes } from './types';

export const IMG_BASE_URL = 'https://image.tmdb.org/t/p/';

export const IMG_SIZES = {
  poster: {
    w92: 'w92',
    w154: 'w154',
    w342: 'w342',
  },
  backdrop: {
    w780: 'w780',
    w1280: 'w1280',
  },
  profile: {
    w185: 'w185',
    h632: 'h632',
  },
  profileFace: {
    w90h90: 'w90_and_h90_face',
  },
  still: {
    w300: 'w300',
    w500: 'w500',
  }, // TV Show Episode img
};

type SortKeys = 'popularityDesc' | 'popularityAsc' | 'ratingDesc' | 'ratingAsc';
type SortMoviesKeys = SortKeys | 'releaseDateDesc' | 'releaseDateAsc';
type SortTVKeys = SortKeys | 'firstAirDateDesc' | 'firstAirDateAsc';

export type SortOption = { name: string; apiName: string };

export const SORT_MOVIES_BY_OPTIONS: Record<SortMoviesKeys, SortOption> = {
  popularityDesc: {
    name: 'Popularity Descending',
    apiName: 'popularity.desc',
  },

  popularityAsc: {
    name: 'Popularity Ascending',
    apiName: 'popularity.asc',
  },

  releaseDateDesc: {
    name: 'Release Data Descending',
    apiName: 'primary_release_date.desc',
  },

  releaseDateAsc: {
    name: 'Release Data Ascending',
    apiName: 'primary_release_date.asc',
  },

  ratingDesc: {
    name: 'Rating Descending',
    apiName: 'vote_average.desc',
  },

  ratingAsc: {
    name: 'Rating Ascending',
    apiName: 'vote_average.asc',
  },
};

export const SORT_TV_BY_OPTIONS: Record<SortTVKeys, SortOption> = {
  popularityDesc: {
    name: 'Popularity Descending',
    apiName: 'popularity.desc',
  },

  popularityAsc: {
    name: 'Popularity Ascending',
    apiName: 'popularity.asc',
  },

  firstAirDateDesc: {
    name: 'First Air Date Descending',
    apiName: 'first_air_date.desc',
  },

  firstAirDateAsc: {
    name: 'First Air Date Ascending',
    apiName: 'first_air_date.asc',
  },

  ratingDesc: {
    name: 'Rating Descending',
    apiName: 'vote_average.desc',
  },

  ratingAsc: {
    name: 'Rating Ascending',
    apiName: 'vote_average.asc',
  },
};

export type UserScoreRange = { min: number; max: number };

export const USER_SCORE_RANGE: UserScoreRange = { min: 0, max: 10 };

export const MOVIE_GENRES: Genres = [
  {
    id: 28,
    name: 'Action',
  },
  {
    id: 12,
    name: 'Adventure',
  },
  {
    id: 16,
    name: 'Animation',
  },
  {
    id: 35,
    name: 'Comedy',
  },
  {
    id: 80,
    name: 'Crime',
  },
  {
    id: 99,
    name: 'Documentary',
  },
  {
    id: 18,
    name: 'Drama',
  },
  {
    id: 10751,
    name: 'Family',
  },
  {
    id: 14,
    name: 'Fantasy',
  },
  {
    id: 36,
    name: 'History',
  },
  {
    id: 27,
    name: 'Horror',
  },
  {
    id: 10402,
    name: 'Music',
  },
  {
    id: 9648,
    name: 'Mystery',
  },
  {
    id: 10749,
    name: 'Romance',
  },
  {
    id: 878,
    name: 'Science Fiction',
  },
  {
    id: 10770,
    name: 'TV Movie',
  },
  {
    id: 53,
    name: 'Thriller',
  },
  {
    id: 10752,
    name: 'War',
  },
  {
    id: 37,
    name: 'Western',
  },
];

export const TV_GENRES: Genres = [
  {
    id: 10759,
    name: 'Action & Adventure',
  },
  {
    id: 16,
    name: 'Animation',
  },
  {
    id: 35,
    name: 'Comedy',
  },
  {
    id: 80,
    name: 'Crime',
  },
  {
    id: 99,
    name: 'Documentary',
  },
  {
    id: 18,
    name: 'Drama',
  },
  {
    id: 10751,
    name: 'Family',
  },
  {
    id: 10762,
    name: 'Kids',
  },
  {
    id: 9648,
    name: 'Mystery',
  },
  {
    id: 10763,
    name: 'News',
  },
  {
    id: 10764,
    name: 'Reality',
  },
  {
    id: 10765,
    name: 'Sci-Fi & Fantasy',
  },
  {
    id: 10766,
    name: 'Soap',
  },
  {
    id: 10767,
    name: 'Talk',
  },
  {
    id: 10768,
    name: 'War & Politics',
  },
  {
    id: 37,
    name: 'Western',
  },
];

export type SelectedGenres = (Genre & { isSelected: boolean })[];

export type OptionsDate = string | null;

export type Options = {
  sortBy: string;
  userScore: [number, number];
  genres: SelectedGenres;
  dates: { from: OptionsDate; to: OptionsDate };
};

export const MOVIES_DEFAULT_OPTIONS: Options = {
  sortBy: SORT_MOVIES_BY_OPTIONS.popularityDesc.apiName,
  userScore: [USER_SCORE_RANGE.min, USER_SCORE_RANGE.max],

  genres: MOVIE_GENRES.map((item) => {
    return { ...item, isSelected: false };
  }),

  dates: {
    from: null,
    to: null,
  },
};

export const TV_DEFAULT_OPTIONS: Options = {
  sortBy: SORT_TV_BY_OPTIONS.popularityDesc.apiName,
  userScore: [USER_SCORE_RANGE.min, USER_SCORE_RANGE.max],

  genres: TV_GENRES.map((item) => {
    return { ...item, isSelected: false };
  }),

  dates: {
    from: null,
    to: null,
  },
};

export const SEARCH_PATHS: MediaTypes = {
  movie: 'movie',
  tv: 'tv',
  person: 'person',
};

type VideoTypesItem = { key: string; name: string };

const createVideoTypes = <VideoTypes extends Record<string, VideoTypesItem>>(
  videoTypes: VideoTypes
) => videoTypes;

export const VIDEO_TYPES = createVideoTypes({
  trailer: { key: 'Trailer', name: 'Trailers' },
  teaser: { key: 'Teaser', name: 'Teasers' },
  clip: { key: 'Clip', name: 'Clips' },
  behindTheScenes: { key: 'Behind the Scenes', name: 'Behind the Scenes' },
  blooper: { key: 'Bloopers', name: 'Bloopers' },
  featurette: { key: 'Featurette', name: 'Featurettes' },
  openingCredits: { key: 'Opening Credits', name: 'Opening Credits' },
});

export type VideoTypeKeys = keyof typeof VIDEO_TYPES;
