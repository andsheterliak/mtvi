import { createSlice } from '@reduxjs/toolkit';

import axiosTMDB from '~common/axios-tmdb';

const initialState = {
  cache: {},
  person: null,
  isLoading: false,
};

const personSlice = createSlice({
  name: 'person',
  initialState,

  reducers: {
    resetState(state) {
      return { ...initialState, cache: state.cache };
    },

    fetchPersonStart(state) {
      state.isLoading = true;
    },

    fetchPersonSuccess(state, { payload }) {
      state.isLoading = false;
      state.person = payload;
      state.cache[payload.id] = payload;
    },

    fetchCached(state, { payload }) {
      state.person = payload;
    },
  },
});

const fetchPerson = (id) => async (dispatch, getState) => {
  const state = getState().person;

  if (state.cache[id]) {
    dispatch(personSlice.actions.fetchCached(state.cache[id]));

    return;
  }

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
