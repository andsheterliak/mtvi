import { createSlice } from '@reduxjs/toolkit';

import axiosTMDB from '../../common/axios-tmdb';

const tvShowsSlice = createSlice({
  name: 'tvShows',
  initialState: { data: [] },

  reducers: {
    fetchTVShows(state, action) {
      state.data = action.payload.results;
    },
  },
});

const fetchTVShowsData = (options) => async (dispatch) => {
  const genres = options.genres
    .reduce((acc, item) => {
      if (item.isSelected) acc.push(item.id);

      return acc;
    }, [])
    .join(',');

  const response = await axiosTMDB.get('', {
    params: {
      path: 'discover/tv',
      sort_by: options.sortBy,
      'first_air_date.gte': options.releaseDates.from,
      'first_air_date.lte': options.releaseDates.to,
      with_genres: genres,
      'vote_average.gte': options.userScoreRange[0],
      'vote_average.lte': options.userScoreRange[1],
    },
  });

  dispatch(tvShowsSlice.actions.fetchTVShows(response.data));
};

export const tvShowsActions = { ...tvShowsSlice.actions, fetchTVShowsData };
export default tvShowsSlice.reducer;
