import { createSlice } from '@reduxjs/toolkit';

import axiosTMDB from '../../common/axios-tmdb';
import checkIfIsNextPage from '../../common/utils/checkIfIsNextPage';
import getSelectedGenres from '../../common/utils/getSelectedGenres';

const initialState = {
  tvShows: [],
  page: 1,
  isMoreData: false,
  isLoading: false,
  isLoadMore: false,
};

const tvShowsSlice = createSlice({
  name: 'tvShows',
  initialState,

  reducers: {
    resetState() {
      return initialState;
    },

    loadMoreTVShows(state) {
      state.isLoadMore = true;
    },

    fetchTVShowsStart(state) {
      state.isLoading = true;
    },

    fetchTVShowsSuccess(state, { payload }) {
      const isMoreData = checkIfIsNextPage(payload.page, payload.total_pages);

      state.isLoading = false;
      state.tvShows.push({ pageData: payload.results, pageNum: payload.page });
      state.isMoreData = isMoreData;
      state.page = payload.page;
    },
  },
});

const fetchTVShows = (options) => async (dispatch) => {
  dispatch(tvShowsActions.fetchTVShowsStart());

  const response = await axiosTMDB.get('', {
    params: {
      path: 'discover/tv',
      sort_by: options.sortBy,
      'first_air_date.gte': options.dates.from,
      'first_air_date.lte': options.dates.to,
      with_genres: getSelectedGenres(options.genres),
      'vote_average.gte': options.userScore[0],
      'vote_average.lte': options.userScore[1],
      page: options.page || 1,
    },
  });

  dispatch(tvShowsSlice.actions.fetchTVShowsSuccess(response.data));
};

export const tvShowsActions = {
  ...tvShowsSlice.actions,
  fetchTVShows,
};

export default tvShowsSlice.reducer;
