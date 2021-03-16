import { createSlice } from '@reduxjs/toolkit';

import axiosTMDB from '../../common/axios-tmdb';
import getSelectedGenres from '../../common/utils/getSelectedGenres';

const moviesSlice = createSlice({
  name: 'movies',

  initialState: {
    data: [],
    page: null,
    isMoreData: false,
  },

  reducers: {
    fetchMovies(state, { payload }) {
      const isMoreData = payload.page + 1 <= payload.total_pages;

      state.data.push({ pageData: payload.results, pageNum: payload.page });
      state.isMoreData = isMoreData;
      state.page = payload.page;
    },
  },
});

const fetchMoviesData = (options) => async (dispatch) => {
  const response = await axiosTMDB.get('', {
    params: {
      path: 'discover/movie',
      sort_by: options.sortBy,
      'primary_release_date.gte': options.releaseDates.from,
      'primary_release_date.lte': options.releaseDates.to,
      with_genres: getSelectedGenres(options.genres),
      'vote_average.gte': options.userScoreRange[0],
      'vote_average.lte': options.userScoreRange[1],
      include_adult: false,
      page: options.page || 1,
    },
  });

  dispatch(moviesSlice.actions.fetchMovies(response.data));
};

export const moviesActions = { ...moviesSlice.actions, fetchMoviesData };
export default moviesSlice.reducer;
