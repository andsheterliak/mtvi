import { createSlice } from '@reduxjs/toolkit';

import axiosTMDB from '~common/axios-tmdb';
import { getSelectedGenres } from '~common/utils/getData';

const initialState = {
  cache: {},
  data: [],
  currentPage: 1,
  totalPages: null,
  isLoading: false,
  options: null,
};

const slice = createSlice({
  name: 'tvShows',
  initialState,

  reducers: {
    resetState() {
      return initialState;
    },

    saveOptions(state, { payload }) {
      state.options = payload;
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
  const state = getState().tvShows;

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
      path: 'discover/tv',
      sort_by: options.sortBy,
      'first_air_date.gte': options.dates.from,
      'first_air_date.lte': options.dates.to,
      with_genres: getSelectedGenres(options.genres),
      'vote_average.gte': options.userScore[0],
      'vote_average.lte': options.userScore[1],
      page: options.page,
    },
  });

  dispatch(slice.actions.fetchDataSuccess(response.data));
};

export const tvShowsActions = {
  ...slice.actions,
  fetchData,
};

export default slice.reducer;
