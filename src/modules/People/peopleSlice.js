import { createSlice } from '@reduxjs/toolkit';

import axiosTMDB from '~common/axios-tmdb';

const initialState = {
  cache: {},
  data: [],
  currentPage: 1,
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
      state.currentPage = payload.page;
      state.data = payload.results;
      state.cache[payload.page] = payload.results;
      state.totalPages = payload.total_pages;
    },

    fetchCached(state, { payload }) {
      state.currentPage = payload.page;
      state.data = payload.data;
    },
  },
});

const fetchData = (options) => async (dispatch, getState) => {
  const state = getState().people;

  if (state.cache[options.page]) {
    dispatch(
      slice.actions.fetchCached({
        data: state.cache[options.page],
        page: options.page,
      })
    );

    return;
  }

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
