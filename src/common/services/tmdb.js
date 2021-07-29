import { createApi } from '@reduxjs/toolkit/query/react';

import axiosTMDB from '~common/lib/axios-tmdb';
import { SEARCH_PATHS } from '~common/tmdb-config';
import { getSelectedGenres } from '~common/utils/getData';

const axiosBaseQuery = ({ baseUrl = '' } = {}) => {
  return async ({ params }) => {
    try {
      const result = await axiosTMDB.get(baseUrl, { params });

      return { data: result.data };
    } catch (error) {
      return {
        error: {
          status: error.response?.status,
          message: error.response?.data.message,
        },
      };
    }
  };
};

const tmdbApi = createApi({
  baseQuery: axiosBaseQuery(),
  reducerPath: 'tmdbApi',

  endpoints: ({ query }) => ({
    getMovies: query({
      query: ({ options, page }) => ({
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
      }),
    }),

    getTVShows: query({
      query: ({ options, page }) => ({
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
      }),
    }),

    getPeople: query({
      query: ({ page }) => ({
        params: { path: 'person/popular', page },
      }),
    }),

    getMovie: query({
      query: (id) => ({
        params: {
          path: `movie/${id}`,
          append_to_response: 'videos,credits,release_dates',
        },
      }),
    }),

    getTVShow: query({
      query: (id) => ({
        params: {
          path: `tv/${id}`,
          append_to_response: 'videos,aggregate_credits,content_ratings',
        },
      }),
    }),

    getSeason: query({
      query: ({ id, seasonNumber }) => ({
        params: { path: `tv/${id}/season/${seasonNumber}` },
      }),
    }),

    getEpisode: query({
      query: ({ id, seasonNumber, episodeNumber }) => ({
        params: {
          path: `tv/${id}/season/${seasonNumber}/episode/${episodeNumber}`,
          append_to_response: 'credits,videos',
        },
      }),
    }),

    getPerson: query({
      query: (id) => ({
        params: {
          path: `person/${id}`,
          append_to_response: 'movie_credits,tv_credits,external_ids',
        },
      }),
    }),

    getSearch: query({
      async queryFn(params, _queryApi, _extraOptions, fetchWithBQ) {
        if (!params.query) return { data: null };

        const result = await fetchWithBQ({
          params: {
            path: 'search/multi',
            query: params.query,
          },
        });

        return result.data ? { data: result.data } : { error: result.error };
      },
    }),

    getSearchResults: query({
      async queryFn(params) {
        try {
          const promises = Object.values(SEARCH_PATHS).map((path) => {
            return axiosTMDB.get('', {
              params: {
                path: `search/${path}`,
                query: params.query,
                page: params.searchIn === path ? params.page : 1,
              },
            });
          });

          const response = await Promise.all(promises);

          const data = response.reduce((acc, item) => {
            const key = item.config.params.path.split('/')[1]; // Example: '/path' --> 'path'

            acc[key] = { ...item.data };
            return acc;
          }, {});

          return { data };
        } catch (error) {
          return {
            error: {
              status: error.response?.status,
              message: error.response?.data.message,
            },
          };
        }
      },
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetTVShowsQuery,
  useGetPeopleQuery,
  useGetMovieQuery,
  useGetTVShowQuery,
  useGetSeasonQuery,
  useGetEpisodeQuery,
  useGetPersonQuery,
  useGetSearchQuery,
  useGetSearchResultsQuery,
} = tmdbApi;

export default tmdbApi;
