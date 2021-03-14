import { createSlice } from '@reduxjs/toolkit';

import axiosTMDB from '../../common/axios-tmdb';

const peopleSlice = createSlice({
  name: 'people',
  initialState: { data: [] },

  reducers: {
    fetchPeople(state, action) {
      state.data = action.payload.results;
    },
  },
});

const fetchPeopleData = () => async (dispatch) => {
  const response = await axiosTMDB.get('', {
    params: {
      path: 'person/popular',
    },
  });

  dispatch(peopleSlice.actions.fetchPeople(response.data));
};

export const peopleActions = { ...peopleSlice.actions, fetchPeopleData };
export default peopleSlice.reducer;
