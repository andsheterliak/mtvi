import { createSlice } from '@reduxjs/toolkit';

import axiosTMDB from '~common/axios-tmdb';

const initialState = {
  data: [],
  totalPages: null,
  isLoading: false,
};

const slice = createSlice({
  name: 'people',
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
      state.data = payload.results;
      state.totalPages = payload.total_pages;
    },
  },
});

const fetchData = (options) => async (dispatch) => {
  dispatch(slice.actions.fetchDataStart());

  const response = await axiosTMDB.get('', {
    params: {
      path: 'person/popular',
      page: options.page,
    },
  });

  dispatch(slice.actions.fetchDataSuccess(response.data));
};

export const peopleActions = { ...slice.actions, fetchData };
export default slice.reducer;
