import produce from 'immer';
import { useCallback, useReducer } from 'react';
import { formatDateToAPI } from '~/shared/utils';

const ACTION_TYPES = {
  validateDate: 'validateDate',
  toggleGenres: 'toggleGenres',
  sortBy: 'sortBy',
  setDateFrom: 'setDateFrom',
  setDateTo: 'setDateTo',
  changeUserScore: 'changeUserScore',
  setDefaultOptions: 'setDefaultOptions',
  acceptOptions: 'acceptOptions',
  resetOptions: 'resetOptions',
};

const actions = Object.values(ACTION_TYPES).reduce(
  (actionTypes, actionType) => {
    return {
      ...actionTypes,

      [actionType](payload) {
        return { type: actionType, payload };
      },
    };
  },
  {}
);

const initState = (initialOptions) => {
  return {
    options: initialOptions,
    isReadyToAccept: false,
    isOptionsValid: true,
  };
};

// eslint-disable-next-line consistent-return
const reducer = produce((state, { payload, type }) => {
  switch (type) {
    case ACTION_TYPES.validateDate:
      if (payload.date?.toString() === 'Invalid Date') {
        state.isOptionsValid = false;
        state.isReadyToAccept = false;
      } else {
        state.isOptionsValid = true;
        state.isReadyToAccept = true;
      }
      break;

    case ACTION_TYPES.toggleGenres:
      state.options.genres.forEach((item) => {
        if (item.id !== payload.id) return;
        item.isSelected = !item.isSelected;
      });

      if (state.isOptionsValid) state.isReadyToAccept = true;
      break;

    case ACTION_TYPES.sortBy:
      state.options.sortBy = payload.value;
      if (state.isOptionsValid) state.isReadyToAccept = true;
      break;

    case ACTION_TYPES.setDateFrom:
      state.options.dates.from = formatDateToAPI(payload.date);
      break;

    case ACTION_TYPES.setDateTo:
      state.options.dates.to = formatDateToAPI(payload.date);
      break;

    case ACTION_TYPES.changeUserScore:
      state.options.userScore = payload.value;
      if (state.isOptionsValid) state.isReadyToAccept = true;
      break;

    case ACTION_TYPES.setDefaultOptions:
      return initState(payload.defaultOptions);

    case ACTION_TYPES.acceptOptions:
      state.isReadyToAccept = false;
      break;

    case ACTION_TYPES.resetOptions:
      return initState(payload.initialOptions);

    default:
      break;
  }
});

export const useOptions = (initialOptions, defaultOptions) => {
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

  const setDefaultOptions = () => {
    dispatch(actions.setDefaultOptions({ defaultOptions }));
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
    setDefaultOptions,
  };
};
