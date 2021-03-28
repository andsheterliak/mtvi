import { createSlice } from '@reduxjs/toolkit';

import axiosTMDB from '../common/axios-tmdb';

const initialState = {
  person: null,
  isLoading: false,
};

const personSlice = createSlice({
  name: 'person',
  initialState,

  reducers: {
    resetState() {
      return initialState;
    },

    fetchPersonStart(state) {
      state.isLoading = true;
    },

    fetchPersonSuccess(state, { payload }) {
      state.isLoading = false;
      state.person = payload;
    },
  },
});

const fetchPerson = (id) => async (dispatch) => {
  dispatch(personSlice.actions.fetchPersonStart());

  const response = await axiosTMDB.get('', {
    params: {
      path: `person/${id}`,
      append_to_response: 'movie_credits,tv_credits,external_ids',
    },
  });

  dispatch(personSlice.actions.fetchPersonSuccess(response.data));
};

export const personActions = { ...personSlice.actions, fetchPerson };
export default personSlice.reducer;
