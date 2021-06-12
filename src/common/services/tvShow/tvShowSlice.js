import { createSlice } from '@reduxjs/toolkit';

import axiosTMDB from '~common/axios-tmdb';

const initialState = {
  data: null,
  isLoading: true,
};

const slice = createSlice({
  name: 'tvShow',
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
      path: `tv/${id}`,
      append_to_response: 'videos,aggregate_credits,content_ratings',
    },
  });

  dispatch(slice.actions.fetchDataSuccess(response.data));
};

export const tvShowActions = {
  ...slice.actions,
  fetchData,
};

export default slice.reducer;
