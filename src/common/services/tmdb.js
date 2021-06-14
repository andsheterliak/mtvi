import { createApi } from '@reduxjs/toolkit/query/react';

import axiosTMDB from '~common/axios-tmdb';
import { SEARCH_PATHS } from '~common/tmdb-config';
import { getSelectedGenres } from '~common/utils/getData';

const axiosBaseQuery = ({ baseUrl = '' } = {}) => async ({
  params,
  method = 'get',
}) => {
  try {
    const result = await axiosTMDB[method](baseUrl, { params });
    return { data: result.data };
  } catch (error) {
    return {
      error: error.response?.data,
    };
  }
};

const tmdbApi = createApi({
  baseQuery: axiosBaseQuery(),
  reducerPath: 'tmdbApi',

  endpoints: (builder) => ({
    getMovies: builder.query({
      query({ options, page }) {
        return {
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
        };
      },
    }),

    getTVShows: builder.query({
      query({ options, page }) {
        return {
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
        };
      },
    }),

    getPeople: builder.query({
      query({ page }) {
        return {
          params: { path: 'person/popular', page },
        };
      },
    }),

    getMovie: builder.query({
      query(id) {
        return {
          params: {
            path: `movie/${id}`,
            append_to_response: 'videos,credits,release_dates',
          },
        };
      },
    }),

    getTVShow: builder.query({
      query(id) {
        return {
          params: {
            path: `tv/${id}`,
            append_to_response: 'videos,aggregate_credits,content_ratings',
          },
        };
      },
    }),

    getSeason: builder.query({
      query({ id, seasonNumber }) {
        return {
          params: { path: `tv/${id}/season/${seasonNumber}` },
        };
      },
    }),

    getEpisode: builder.query({
      query({ id, seasonNumber, episodeNumber }) {
        return {
          params: {
            path: `tv/${id}/season/${seasonNumber}/episode/${episodeNumber}`,
            append_to_response: 'credits,videos',
          },
        };
      },
    }),

    getPerson: builder.query({
      query(id) {
        return {
          params: {
            path: `person/${id}`,
            append_to_response: 'movie_credits,tv_credits,external_ids',
          },
        };
      },
    }),

    getSearch: builder.query({
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
          return { error: error.response?.data };
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
} = tmdbApi;

export default tmdbApi;
