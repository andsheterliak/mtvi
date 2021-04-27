import { createSlice } from '@reduxjs/toolkit';

import axiosTMDB from '~common/axios-tmdb';

const initialState = {
  cache: {},
  people: [],
  currentPage: 1,
  totalPages: null,
  isLoading: false,
};

const peopleSlice = createSlice({
  name: 'people',
  initialState,

  reducers: {
    resetState() {
      return initialState;
    },

    fetchPeopleStart(state) {
      state.isLoading = true;
    },

    fetchPeopleSuccess(state, { payload }) {
      state.isLoading = false;
      state.currentPage = payload.page;
      state.people = payload.results;
      state.cache[payload.page] = payload.results;
      state.totalPages = payload.total_pages;
    },

    fetchCachedSuccess(state, { payload }) {
      state.isLoading = false;
      state.currentPage = payload.page;
      state.people = payload.data;
    },
  },
});

const fetchPeople = (options) => async (dispatch, getState) => {
  dispatch(peopleSlice.actions.fetchPeopleStart());

  const state = getState().people;

  if (state.cache[options.page]) {
    dispatch(
      peopleSlice.actions.fetchCachedSuccess({
        data: state.cache[options.page],
        page: options.page,
      })
    );

    return;
  }

  const response = await axiosTMDB.get('', {
    params: {
      path: 'person/popular',
      page: options.page,
    },
  });

  dispatch(peopleSlice.actions.fetchPeopleSuccess(response.data));
};

export const peopleActions = { ...peopleSlice.actions, fetchPeople };
export default peopleSlice.reducer;
