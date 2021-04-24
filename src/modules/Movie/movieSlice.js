import { createSlice } from '@reduxjs/toolkit';

import axiosTMDB from '~common/axios-tmdb';

const initialState = {
  movie: null,
  isLoading: false,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,

  reducers: {
    resetState() {
      return initialState;
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

const fetchMovie = (id) => async (dispatch) => {
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
