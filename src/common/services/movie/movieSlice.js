import { createSlice } from '@reduxjs/toolkit';

import axiosTMDB from '~common/axios-tmdb';

const initialState = {
  data: null,
  isLoading: true,
};

const slice = createSlice({
  name: 'movie',
  initialState,

  reducers: {
    resetState() {
      return initialState;
    },

    fetchDataStart(state) {
      state.isLoading = true;
    },

    fetchDataSuccess(state, { payload }) {
      state.isLoading = false;
      state.data = payload;
    },
  },
});

const fetchData = (id) => async (dispatch) => {
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
