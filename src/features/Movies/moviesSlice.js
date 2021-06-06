import { createSlice } from '@reduxjs/toolkit';

import axiosTMDB from '~common/axios-tmdb';
import { getSelectedGenres } from '~common/utils/getData';

const initialState = {
  data: [],
  totalPages: null,
  isLoading: true,
  options: null,
};

const slice = createSlice({
  name: 'movies',
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
      state.data = payload.results;
      state.totalPages = payload.total_pages;
    },
  },
});

const fetchData = (options) => async (dispatch) => {
  dispatch(slice.actions.fetchDataStart());

  const response = await axiosTMDB.get('', {
    params: {
      path: 'discover/movie',
      sort_by: options.sortBy,
      'primary_release_date.gte': options.dates.from,
      'primary_release_date.lte': options.dates.to,
      with_genres: getSelectedGenres(options.genres),
      'vote_average.gte': options.userScore[0],
      'vote_average.lte': options.userScore[1],
      include_adult: false,
      page: options.page,
    },
  });

  dispatch(slice.actions.fetchDataSuccess(response.data));
};

export const moviesActions = {
  ...slice.actions,
  fetchData,
};

export default slice.reducer;
