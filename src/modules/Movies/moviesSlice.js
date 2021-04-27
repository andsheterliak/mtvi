import { createSlice } from '@reduxjs/toolkit';

import axiosTMDB from '~common/axios-tmdb';
import { getSelectedGenres } from '~common/utils/getData';

const initialState = {
  cache: {},
  movies: [],
  currentPage: 1,
  totalPages: null,
  isLoading: false,
  options: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,

  reducers: {
    resetState() {
      return initialState;
    },

    saveOptions(state, { payload }) {
      state.options = payload;
    },

    fetchMoviesStart(state) {
      state.isLoading = true;
    },

    fetchMoviesSuccess(state, { payload }) {
      state.isLoading = false;
      state.currentPage = payload.page;
      state.movies = payload.results;
      state.cache[payload.page] = payload.results;
      state.totalPages = payload.total_pages;
    },

    fetchCached(state, { payload }) {
      state.currentPage = payload.page;
      state.movies = payload.data;
    },
  },
});

const fetchMovies = (options) => async (dispatch, getState) => {
  const state = getState().movies;

  if (state.cache[options.page]) {
    dispatch(
      moviesSlice.actions.fetchCached({
        data: state.cache[options.page],
        page: options.page,
      })
    );

    return;
  }

  dispatch(moviesSlice.actions.fetchMoviesStart());

  const response = await axiosTMDB.get('', {
    params: {
      path: 'discover/movie',
      sort_by: options.sortBy,
      'primary_release_date.gte': options.dates.from,
      'primary_release_date.lte': options.dates.to,
      with_genres: getSelectedGenres(options.genres),
      'vote_average.gte': options.userScore[0],
      'vote_average.lte': options.userScore[1],
      include_adult: false,
      page: options.page,
    },
  });

  dispatch(moviesSlice.actions.fetchMoviesSuccess(response.data));
};

export const moviesActions = {
  ...moviesSlice.actions,
  fetchMovies,
};

export default moviesSlice.reducer;
