import { createSlice } from '@reduxjs/toolkit';

import axiosTMDB from '../../common/axios-tmdb';
import checkIfIsNextPage from '../../common/utils/checkIfIsNextPage';
import getSelectedGenres from '../../common/utils/getSelectedGenres';

const tvShowsSlice = createSlice({
  name: 'tvShows',
  initialState: {
    data: [],
    page: 1,
    isMoreData: false,
    isLoading: true,
    isLoadMore: false,
  },

  reducers: {
    loadMoreTVShows(state) {
      state.isLoadMore = true;
    },

    fetchTVShowsStart(state) {
      state.isLoading = true;
    },

    fetchTVShowsSuccess(state, { payload }) {
      const isMoreData = checkIfIsNextPage(payload.page, payload.total_pages);

      state.isLoading = false;
      state.data.push({ pageData: payload.results, pageNum: payload.page });
      state.isMoreData = isMoreData;
      state.page = payload.page;
    },

    fetchTVShowsWithNewOptionsSuccess(state, { payload }) {
      const isMoreData = checkIfIsNextPage(payload.page, payload.total_pages);

      state.isLoading = false;
      state.data = [{ pageData: payload.results, pageNum: payload.page }];
      state.isMoreData = isMoreData;
      state.page = payload.page;
      state.isLoadMore = false;
    },
  },
});

const getTVShows = async (options) => {
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

  return response;
};

const fetchTVShows = (options) => async (dispatch) => {
  dispatch(tvShowsActions.fetchTVShowsStart());

  const response = await getTVShows(options);

  dispatch(tvShowsSlice.actions.fetchTVShowsSuccess(response.data));
};

const fetchTVShowsWithNewOptions = (options) => async (dispatch) => {
  dispatch(tvShowsActions.fetchTVShowsStart());

  const response = await getTVShows(options);

  dispatch(
    tvShowsSlice.actions.fetchTVShowsWithNewOptionsSuccess(response.data)
  );
};

export const tvShowsActions = {
  ...tvShowsSlice.actions,
  fetchTVShows,
  fetchTVShowsWithNewOptions,
};

export default tvShowsSlice.reducer;
