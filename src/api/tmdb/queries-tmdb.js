import { useQuery } from 'react-query';
import { getSelectedGenres } from '~/shared/utils';
import { axiosTMDB } from './axios-tmdb';
import { SEARCH_PATHS } from './config-tmdb';

const getReturn = (queryData) => {
  return {
    ...queryData,

    error: queryData.error
      ? {
          status: queryData.error.response?.status,
          message:
            queryData.error.response?.data.message ?? queryData.error.message,
        }
      : null,
  };
};

export const useGetMoviesQuery = ({ options, page }) => {
  const queryData = useQuery(
    ['movies', { page, options }],
    async () => {
      const response = await axiosTMDB({
        method: 'get',
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

export const useGetTVShowsQuery = ({ options, page }) => {
  const queryData = useQuery(
    ['tvShows', { page, options }],
    async () => {
      const response = await axiosTMDB({
        method: 'get',
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

export const useGetPeopleQuery = ({ page }) => {
  const queryData = useQuery(
    ['people', { page }],
    async () => {
      const response = await axiosTMDB({
        method: 'get',
        params: { path: 'person/popular', page },
      });

      return response.data;
    },
    { keepPreviousData: true }
  );

  return getReturn(queryData);
};

export const useGetMovieQuery = (id) => {
  const queryData = useQuery(['movie', { id }], async () => {
    const response = await axiosTMDB({
      method: 'get',
      params: {
        path: `movie/${id}`,
        append_to_response: 'videos,credits,release_dates',
      },
    });

    return response.data;
  });

  return getReturn(queryData);
};

export const useGetTVShowQuery = (id) => {
  const queryData = useQuery(['tvShow', { id }], async () => {
    const response = await axiosTMDB({
      method: 'get',
      params: {
        path: `tv/${id}`,
        append_to_response: 'videos,aggregate_credits,content_ratings',
      },
    });

    return response.data;
  });

  return getReturn(queryData);
};

export const useGetSeasonQuery = ({ id, seasonNumber }) => {
  const queryData = useQuery(['season', { id, seasonNumber }], async () => {
    const response = await axiosTMDB({
      method: 'get',
      params: { path: `tv/${id}/season/${seasonNumber}` },
    });

    return response.data;
  });

  return getReturn(queryData);
};

export const useGetEpisodeQuery = ({ id, seasonNumber, episodeNumber }) => {
  const queryData = useQuery(
    ['episode', { id, seasonNumber, episodeNumber }],
    async () => {
      const response = await axiosTMDB({
        method: 'get',
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

export const useGetPersonQuery = (id) => {
  const queryData = useQuery(['person', { id }], async () => {
    const response = await axiosTMDB({
      method: 'get',
      params: {
        path: `person/${id}`,
        append_to_response: 'movie_credits,tv_credits,external_ids',
      },
    });

    return response.data;
  });

  return getReturn(queryData);
};

export const useGetSearchQuery = (query) => {
  const queryData = useQuery(
    ['search', { query }],
    async () => {
      const response = await axiosTMDB({
        method: 'get',
        params: { path: 'search/multi', query },
      });

      return response.data;
    },
    { enabled: false, keepPreviousData: true }
  );

  return getReturn(queryData);
};

export const useGetSearchResultsQuery = ({ query, page, searchIn }) => {
  const queryData = useQuery(
    ['searchResults', { query, page }],
    async () => {
      const promises = Object.values(SEARCH_PATHS).map((path) => {
        return axiosTMDB({
          method: 'get',
          params: {
            path: `search/${path}`,
            query,
            page: searchIn === path ? page : 1,
          },
        });
      });

      const response = await Promise.all(promises);

      const data = response.reduce((acc, item) => {
        const key = item.config.params.path.split('/')[1]; // Example: '/path' --> 'path'

        acc[key] = item.data;
        return acc;
      }, {});

      return data;
    },
    { keepPreviousData: true }
  );

  return getReturn(queryData);
};
