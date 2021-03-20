import { createSlice } from '@reduxjs/toolkit';

import axiosTMDB from '../../common/axios-tmdb';
import checkIfIsNextPage from '../../common/utils/checkIfIsNextPage';
import getSelectedGenres from '../../common/utils/getSelectedGenres';

const initialState = {
  movies: [],
  movie: null,
  page: 1,
  isMoreData: false,
  isLoading: false,
  isLoadMore: false,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,

  reducers: {
    resetState() {
      return initialState;
    },

    loadMoreMovies(state) {
      state.isLoadMore = true;
    },

    fetchMoviesStart(state) {
      state.isLoading = true;
    },

    fetchMoviesSuccess(state, { payload }) {
      const isMoreData = checkIfIsNextPage(payload.page, payload.total_pages);

      state.isLoading = false;
      state.movies.push({ pageData: payload.results, pageNum: payload.page });
      state.isMoreData = isMoreData;
      state.page = payload.page;
    },

    fetchMovieStart(state) {
      state.isLoading = true;
    },

    fetchMovieSuccess(state, { payload }) {
      state.isLoading = false;
      state.movie = payload;
    },
  },
});

const fetchMovies = (options) => async (dispatch) => {
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
      page: options.page || 1,
    },
  });

  dispatch(moviesSlice.actions.fetchMoviesSuccess(response.data));
};

const fetchMovie = (id) => async (dispatch) => {
  dispatch(moviesSlice.actions.fetchMovieStart());

  const response = await axiosTMDB.get('', {
    params: {
      path: `movie/${id}`,
      append_to_response: 'videos,credits',
    },
  });

  dispatch(moviesSlice.actions.fetchMovieSuccess(response.data));
};

export const moviesActions = {
  ...moviesSlice.actions,
  fetchMovies,
  fetchMovie,
};

export default moviesSlice.reducer;
