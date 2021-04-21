import { createSlice } from '@reduxjs/toolkit';

import axiosTMDB from '@common/axios-tmdb';

const initialState = {
  people: [],
  page: 1,
  isMoreData: false,
  isLoading: false,
  isLoadMore: false,
};

const peopleSlice = createSlice({
  name: 'people',
  initialState,

  reducers: {
    resetState() {
      return initialState;
    },

    loadMorePeople(state) {
      state.isLoadMore = true;
    },

    fetchPeopleStart(state) {
      state.isLoading = true;
    },

    fetchPeopleSuccess(state, { payload }) {
      const isMoreData = payload.page + 1 <= payload.total_pages;

      state.isLoading = false;
      state.people.push({ pageData: payload.results, pageNum: payload.page });
      state.isMoreData = isMoreData;
      state.page = payload.page;
    },
  },
});

const fetchPeople = (options) => async (dispatch) => {
  dispatch(peopleSlice.actions.fetchPeopleStart());

  const response = await axiosTMDB.get('', {
    params: {
      path: 'person/popular',
      page: options?.page || 1,
    },
  });

  dispatch(peopleSlice.actions.fetchPeopleSuccess(response.data));
};

export const peopleActions = { ...peopleSlice.actions, fetchPeople };
export default peopleSlice.reducer;
