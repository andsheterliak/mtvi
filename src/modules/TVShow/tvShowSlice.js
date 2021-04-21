import { createSlice } from '@reduxjs/toolkit';

import axiosTMDB from '@common/axios-tmdb';

const initialState = {
  tvShow: null,
  isLoading: false,
};

const tvShowSlice = createSlice({
  name: 'tvShow',
  initialState,

  reducers: {
    resetState() {
      return initialState;
    },

    fetchTVShowStart(state) {
      state.isLoading = true;
    },

    fetchTVShowSuccess(state, { payload }) {
      state.isLoading = false;
      state.tvShow = payload;
    },
  },
});

const fetchTVShow = (id) => async (dispatch) => {
  dispatch(tvShowSlice.actions.fetchTVShowStart());

  const response = await axiosTMDB.get('', {
    params: {
      path: `tv/${id}`,
      append_to_response: 'videos,credits,content_ratings',
    },
  });

  dispatch(tvShowSlice.actions.fetchTVShowSuccess(response.data));
};

export const tvShowActions = {
  ...tvShowSlice.actions,
  fetchTVShow,
};

export default tvShowSlice.reducer;
