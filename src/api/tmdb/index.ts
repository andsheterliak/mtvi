import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import { axiosTMDB } from './axios-tmdb';
import { Options, SEARCH_PATHS, SelectedGenres } from './config-tmdb';
import {
  Episode,
  EpisodeNumber,
  Id,
  MediaTypesKeys,
  Movie,
  MoviesData,
  Page,
  PeopleData,
  Person,
  SearchData,
  Season,
  SeasonNumber,
  TVShow,
  TVShowsData,
} from './types';

export * from './config-tmdb';
export * from './types';

type PageParam = Page | string;
type IdParam = Id | string;
type SeasonNumberParam = SeasonNumber | string;
type EpisodeNumberParam = EpisodeNumber | string;
type QuerySearch = string;
type ResponseError = AxiosError<string>;

const getSelectedGenres = (genres: SelectedGenres) => {
  return genres
    .reduce<number[]>((acc, item) => {
      if (item.isSelected) acc.push(item.id);

      return acc;
    }, [])
    .join(',');
};

const getReturn = <QueryData>(queryData: UseQueryResult<QueryData, ResponseError>) => {
  return {
    ...queryData,

    error: queryData.error
      ? {
          status: queryData.error.response?.status,
          message: queryData.error.response?.data ?? queryData.error.message,
        }
      : null,
  };
};

export const useGetMoviesQuery = ({ options, page }: { options: Options; page: PageParam }) => {
  const queryData = useQuery<MoviesData, ResponseError>(
    ['movies', { page, options }],

    async () => {
      const response = await axiosTMDB.request<MoviesData>({
        params: {
          path: 'discover/movie',
          sort_by: options.sortBy,
          'primary_release_date.gte': options.dates.from,
          'primary_release_date.lte': options.dates.to,
          with_genres: getSelectedGenres(options.genres),
          'vote_average.gte': options.userScore[0],
          'vote_average.lte': options.userScore[1],
          include_adult: false,
          page,
        },
      });

      return response.data;
    },

    { keepPreviousData: true }
  );

  return getReturn(queryData);
};

export const useGetTVShowsQuery = ({ options, page }: { options: Options; page: PageParam }) => {
  const queryData = useQuery<TVShowsData, ResponseError>(
    ['tvShows', { page, options }],

    async () => {
      const response = await axiosTMDB.request<TVShowsData>({
        params: {
          path: 'discover/tv',
          sort_by: options.sortBy,
          'first_air_date.gte': options.dates.from,
          'first_air_date.lte': options.dates.to,
          with_genres: getSelectedGenres(options.genres),
          'vote_average.gte': options.userScore[0],
          'vote_average.lte': options.userScore[1],
          page,
        },
      });

      return response.data;
    },

    { keepPreviousData: true }
  );

  return getReturn(queryData);
};

export const useGetPeopleQuery = ({ page }: { page: PageParam }) => {
  const queryData = useQuery<PeopleData, ResponseError>(
    ['people', { page }],

    async () => {
      const response = await axiosTMDB.request<PeopleData>({
        params: { path: 'person/popular', page },
      });

      return response.data;
    },

    { keepPreviousData: true }
  );

  return getReturn(queryData);
};

export const useGetMovieQuery = (id: IdParam) => {
  const queryData = useQuery<Movie, ResponseError>(['movie', { id }], async () => {
    const response = await axiosTMDB.request<Movie>({
      params: {
        path: `movie/${id}`,
        append_to_response: 'videos,credits,release_dates',
      },
    });

    return response.data;
  });

  return getReturn(queryData);
};

export const useGetTVShowQuery = (id: IdParam) => {
  const queryData = useQuery<TVShow, ResponseError>(['tvShow', { id }], async () => {
    const response = await axiosTMDB.request<TVShow>({
      params: {
        path: `tv/${id}`,
        append_to_response: 'videos,aggregate_credits,content_ratings',
      },
    });

    return response.data;
  });

  return getReturn(queryData);
};

export const useGetSeasonQuery = ({
  id,
  seasonNumber,
}: {
  id: IdParam;
  seasonNumber: SeasonNumberParam;
}) => {
  const queryData = useQuery<Season, ResponseError>(['season', { id, seasonNumber }], async () => {
    const response = await axiosTMDB.request<Season>({
      params: { path: `tv/${id}/season/${seasonNumber}` },
    });

    return response.data;
  });

  return getReturn(queryData);
};

export const useGetEpisodeQuery = ({
  id,
  seasonNumber,
  episodeNumber,
}: {
  id: IdParam;
  seasonNumber: SeasonNumberParam;
  episodeNumber: EpisodeNumberParam;
}) => {
  const queryData = useQuery<Episode, ResponseError>(
    ['episode', { id, seasonNumber, episodeNumber }],
    async () => {
      const response = await axiosTMDB.request<Episode>({
        params: {
          path: `tv/${id}/season/${seasonNumber}/episode/${episodeNumber}`,
          append_to_response: 'credits,videos',
        },
      });

      return response.data;
    }
  );

  return getReturn(queryData);
};

export const useGetPersonQuery = (id: IdParam) => {
  const queryData = useQuery<Person, ResponseError>(['person', { id }], async () => {
    const response = await axiosTMDB.request<Person>({
      params: {
        path: `person/${id}`,
        append_to_response: 'movie_credits,tv_credits,external_ids',
      },
    });

    return response.data;
  });

  return getReturn(queryData);
};

export const useGetSearchQuery = (query: QuerySearch) => {
  const queryData = useQuery<SearchData, ResponseError>(
    ['search', { query }],

    async () => {
      const response = await axiosTMDB.request<SearchData>({
        params: { path: 'search/multi', query },
      });

      return response.data;
    },

    { enabled: false, keepPreviousData: true }
  );

  return getReturn(queryData);
};

export type SearchResultsData = {
  [SEARCH_PATHS.movie]: MoviesData;
  [SEARCH_PATHS.tv]: TVShowsData;
  [SEARCH_PATHS.person]: PeopleData;
};

export const useGetSearchResultsQuery = ({
  query,
  page,
  searchIn,
}: {
  query: QuerySearch;
  searchIn: MediaTypesKeys;
  page: PageParam;
}) => {
  const queryData = useQuery<SearchResultsData, ResponseError>(
    ['searchResults', { query, page }],

    async () => {
      const fetchSearchItem = <ResponseData>(searchPath: MediaTypesKeys) => {
        return axiosTMDB.request<ResponseData>({
          params: {
            path: `search/${searchPath}`,
            query,
            page: searchIn === searchPath ? page : 1,
          },
        });
      };

      const moviesPromise = fetchSearchItem<MoviesData>(SEARCH_PATHS.movie);
      const tvShowsPromise = fetchSearchItem<TVShowsData>(SEARCH_PATHS.tv);
      const peoplePromise = fetchSearchItem<PeopleData>(SEARCH_PATHS.person);

      const response = await Promise.all([moviesPromise, tvShowsPromise, peoplePromise]);

      const data: SearchResultsData = {
        movie: response[0].data,
        tv: response[1].data,
        person: response[2].data,
      };

      return data;
    },

    { keepPreviousData: true }
  );

  return getReturn(queryData);
};
