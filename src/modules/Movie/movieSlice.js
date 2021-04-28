import { createSlice } from '@reduxjs/toolkit';

import axiosTMDB from '~common/axios-tmdb';

const initialState = {
  cache: {},
  data: null,
  isLoading: false,
};

const slice = createSlice({
  name: 'movie',
  initialState,

  reducers: {
    resetState(state) {
      return { ...initialState, cache: state.cache };
    },

    fetchDataStart(state) {
      state.isLoading = true;
    },

    fetchDataSuccess(state, { payload }) {
      state.isLoading = false;
      state.data = payload;
      state.cache[payload.id] = payload;
    },

    fetchCached(state, { payload }) {
      state.data = payload;
    },
  },
});

const fetchData = (id) => async (dispatch, getState) => {
  const state = getState().movie;

  if (state.cache[id]) {
    dispatch(slice.actions.fetchCached(state.cache[id]));

    return;
  }

  dispatch(slice.actions.fetchDataStart());

  const response = await axiosTMDB.get('', {
    params: {
      path: `movie/${id}`,
      append_to_response: 'videos,credits,release_dates',
    },
  });

  dispatch(slice.actions.fetchDataSuccess(response.data));
};

export const movieActions = {
  ...slice.actions,
  fetchData,
};

export default slice.reducer;
