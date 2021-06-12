import { createSlice } from '@reduxjs/toolkit';
import { useCallback, useReducer } from 'react';

import { formatDateToAPI } from '~common/utils/date';

const initState = (initialOptions) => {
  return {
    options: initialOptions,
    isReadyToAccept: false,
    isOptionsValid: true,
  };
};

const slice = createSlice({
  name: 'options',

  reducers: {
    validateDate(state, { payload }) {
      if (payload.date?.toString() === 'Invalid Date') {
        state.isOptionsValid = false;
        state.isReadyToAccept = false;
      } else {
        state.isOptionsValid = true;
        state.isReadyToAccept = true;
      }
    },

    toggleGenres(state, { payload }) {
      state.options.genres.forEach((item) => {
        if (item.id !== payload.id) return;
        item.isSelected = !item.isSelected;
      });

      if (state.isOptionsValid) state.isReadyToAccept = true;
    },

    sortBy(state, { payload }) {
      state.options.sortBy = payload.value;
      if (state.isOptionsValid) state.isReadyToAccept = true;
    },

    setDateFrom(state, { payload }) {
      state.options.dates.from = formatDateToAPI(payload.date);
    },

    setDateTo(state, { payload }) {
      state.options.dates.to = formatDateToAPI(payload.date);
    },

    changeUserScore(state, { payload }) {
      state.options.userScore = payload.value;
      if (state.isOptionsValid) state.isReadyToAccept = true;
    },

    acceptOptions(state) {
      state.isReadyToAccept = false;
    },

    resetOptions(state, { payload }) {
      return initState(payload.initialOptions);
    },
  },
});

const { reducer, actions } = slice;

const useOptions = (initialOptions) => {
  const [state, dispatch] = useReducer(reducer, initialOptions, initState);

  const resetOptions = () => {
    dispatch(actions.resetOptions({ initialOptions }));
  };

  const setDateFromHandler = useCallback(
    (date) => {
      dispatch(actions.validateDate({ date }));
      dispatch(actions.setDateFrom({ date }));
    },
    [dispatch]
  );

  const setDateToHandler = useCallback(
    (date) => {
      dispatch(actions.validateDate({ date }));
      dispatch(actions.setDateTo({ date }));
    },
    [dispatch]
  );

  const sortByHandler = useCallback(
    (e) => {
      dispatch(actions.sortBy({ value: e.target.value }));
    },
    [dispatch]
  );

  const toggleGenreHandler = useCallback(
    (id) => {
      dispatch(actions.toggleGenres({ id }));
    },
    [dispatch]
  );

  const changeUserScoreHandler = (event, value) => {
    dispatch(actions.changeUserScore({ value }));
  };

  const acceptOptions = () => {
    dispatch(actions.acceptOptions());
  };

  return {
    options: state.options,
    isReadyToAccept: state.isReadyToAccept,
    resetOptions,
    setDateFromHandler,
    setDateToHandler,
    sortByHandler,
    toggleGenreHandler,
    changeUserScoreHandler,
    acceptOptions,
  };
};

export default useOptions;
