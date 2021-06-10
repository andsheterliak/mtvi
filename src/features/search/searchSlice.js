import { createSlice } from '@reduxjs/toolkit';

import axiosTMDB from '~common/axios-tmdb';
import { SEARCH_PATHS } from '~common/tmdb-config';

const initialState = {
  data: null,
  isLoading: true,
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
      state.data = payload;
    },
  },
});

const fetchData = ({ searchIn, query, page }) => async (dispatch) => {
  dispatch(slice.actions.fetchDataStart());

  const promises = Object.values(SEARCH_PATHS).map((path) => {
    return axiosTMDB.get('', {
      params: {
        path: `search/${path}`,
        query,
        page: searchIn === path ? page : 1,
      },
    });
  });

  const response = await Promise.all(promises);

  const data = response.reduce((acc, item) => {
    const key = item.config.params.path.split('/')[1];

    acc[key] = { ...item.data };
    return acc;
  }, {});

  dispatch(slice.actions.fetchDataSuccess(data));
};

export const searchActions = {
  ...slice.actions,
  fetchData,
};

export default slice.reducer;
