import { createSlice } from '@reduxjs/toolkit';

import axiosTMDB from '~common/axios-tmdb';

const initialState = {
  data: null,
  isLoading: true,
};

const slice = createSlice({
  name: 'person',
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
      path: `person/${id}`,
      append_to_response: 'movie_credits,tv_credits,external_ids',
    },
  });

  dispatch(slice.actions.fetchDataSuccess(response.data));
};

export const personActions = { ...slice.actions, fetchData };
export default slice.reducer;
