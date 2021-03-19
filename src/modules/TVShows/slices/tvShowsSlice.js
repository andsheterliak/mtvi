import { createSlice } from '@reduxjs/toolkit';

import axiosTMDB from '../../common/axios-tmdb';
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

    fetchTVShows(state, { payload }) {
      const isMoreData = payload.page + 1 <= payload.total_pages;

      state.isLoading = false;
      state.data.push({ pageData: payload.results, pageNum: payload.page });
      state.isMoreData = isMoreData;
      state.page = payload.page;
    },
  },
});

const fetchTVShowsData = (options) => async (dispatch) => {
  dispatch(tvShowsActions.fetchTVShowsStart());

  const response = await axiosTMDB.get('', {
    params: {
      path: 'discover/tv',
      sort_by: options.sortBy,
      'first_air_date.gte': options.releaseDates.from,
      'first_air_date.lte': options.releaseDates.to,
      with_genres: getSelectedGenres(options.genres),
      'vote_average.gte': options.userScoreRange[0],
      'vote_average.lte': options.userScoreRange[1],
      page: options.page || 1,
    },
  });

  dispatch(tvShowsSlice.actions.fetchTVShows(response.data));
};

export const tvShowsActions = { ...tvShowsSlice.actions, fetchTVShowsData };
export default tvShowsSlice.reducer;
