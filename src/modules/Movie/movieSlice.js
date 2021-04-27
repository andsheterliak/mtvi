import { createSlice } from '@reduxjs/toolkit';

import axiosTMDB from '~common/axios-tmdb';

const initialState = {
  cache: {},
  movie: null,
  isLoading: false,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,

  reducers: {
    resetState(state) {
      return { ...initialState, cache: state.cache };
    },

    fetchMovieStart(state) {
      state.isLoading = true;
    },

    fetchMovieSuccess(state, { payload }) {
      state.isLoading = false;
      state.movie = payload;
      state.cache[payload.id] = payload;
    },

    fetchCached(state, { payload }) {
      state.movie = payload;
    },
  },
});

const fetchMovie = (id) => async (dispatch, getState) => {
  const state = getState().movie;

  if (state.cache[id]) {
    dispatch(movieSlice.actions.fetchCached(state.cache[id]));

    return;
  }

  dispatch(movieSlice.actions.fetchMovieStart());

  const response = await axiosTMDB.get('', {
    params: {
      path: `movie/${id}`,
      append_to_response: 'videos,credits,release_dates',
    },
  });

  dispatch(movieSlice.actions.fetchMovieSuccess(response.data));
};

export const movieActions = {
  ...movieSlice.actions,
  fetchMovie,
};

export default movieSlice.reducer;
