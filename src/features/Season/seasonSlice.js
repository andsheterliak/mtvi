import { createSlice } from '@reduxjs/toolkit';

import axiosTMDB from '~common/axios-tmdb';

const initialState = {
  data: null,
  isLoading: true,
};

const slice = createSlice({
  name: 'season',
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

const fetchData = ({ id, seasonNumber }) => async (dispatch) => {
  dispatch(slice.actions.fetchDataStart());

  const response = await axiosTMDB.get('', {
    params: {
      path: `tv/${id}/season/${seasonNumber}`,
    },
  });

  dispatch(slice.actions.fetchDataSuccess(response.data));
};

export const seasonActions = {
  ...slice.actions,
  fetchData,
};

export default slice.reducer;
