import { createSlice } from '@reduxjs/toolkit';

import axiosTMDB from '~common/axios-tmdb';

const initialState = {
  data: null,
  totalPages: null,
  isLoading: false,
};

const slice = createSlice({
  name: 'search',
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

const fetchData = ({ search, page }) => async (dispatch) => {
  dispatch(slice.actions.fetchDataStart());

  const response = await axiosTMDB.get('', {
    params: {
      path: 'search/multi',
      query: search,
      page,
    },
  });

  dispatch(slice.actions.fetchDataSuccess(response.data));
};

export const searchActions = {
  ...slice.actions,
  fetchData,
};

export default slice.reducer;
