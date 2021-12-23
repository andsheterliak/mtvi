import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { produce } from 'immer';
import { useCallback, useReducer } from 'react';
import { Genre, Options } from '~/api/tmdb';
import { SortByEvent, SortByValue, UserScoreEvent, UserScoreValue } from './types';

const formatDateToAPI = (date: MaterialUiPickersDate) => {
  // If no date return null to disable validation in DatePicker.
  if (!date) return null;

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedDate = [year, month, day]
    // [2021, 1, 10] => 2021-01-10
    .map((item) => {
      let itemStr = item.toString();

      if (itemStr.length === 1) {
        itemStr = `0${itemStr}`;
      }

      return itemStr;
    })
    .join('-');

  return formattedDate;
};

type ActionType =
  | { type: 'validateDate'; payload: { date: MaterialUiPickersDate } }
  | { type: 'setDateFrom'; payload: { date: MaterialUiPickersDate } }
  | { type: 'setDateTo'; payload: { date: MaterialUiPickersDate } }
  | { type: 'sortBy'; payload: { value: SortByValue } }
  | { type: 'toggleGenres'; payload: { id: Genre['id'] } }
  | { type: 'changeUserScore'; payload: { value: Options['userScore'] } }
  | { type: 'acceptOptions' }
  | { type: 'setDefaultOptions'; payload: { defaultOptions: Options } }
  | { type: 'resetOptions'; payload: { initialOptions: Options } };

const initState = (initialOptions: Options) => {
  return {
    options: initialOptions,
    isReadyToAccept: false,
    isOptionsValid: true,
  };
};

const reducer = produce((state: ReturnType<typeof initState>, action: ActionType) => {
  switch (action.type) {
    case 'validateDate':
      if (action.payload.date?.toString() === 'Invalid Date') {
        state.isOptionsValid = false;
        state.isReadyToAccept = false;
      } else {
        state.isOptionsValid = true;
        state.isReadyToAccept = true;
      }

      break;

    case 'setDateFrom':
      state.options.dates.from = formatDateToAPI(action.payload.date);
      break;

    case 'setDateTo':
      state.options.dates.to = formatDateToAPI(action.payload.date);
      break;

    case 'sortBy':
      state.options.sortBy = action.payload.value;
      if (state.isOptionsValid) state.isReadyToAccept = true;
      break;

    case 'toggleGenres':
      state.options.genres.forEach((item) => {
        if (item.id !== action.payload.id) return;
        item.isSelected = !item.isSelected;
      });

      if (state.isOptionsValid) state.isReadyToAccept = true;
      break;

    case 'changeUserScore':
      state.options.userScore = action.payload.value;
      if (state.isOptionsValid) state.isReadyToAccept = true;
      break;

    case 'setDefaultOptions':
      return initState(action.payload.defaultOptions);

    case 'acceptOptions':
      state.isReadyToAccept = false;
      break;

    case 'resetOptions':
      return initState(action.payload.initialOptions);

    default:
      break;
  }
});

export const useOptions = (initialOptions: Options, defaultOptions: Options) => {
  const [state, dispatch] = useReducer(reducer, initialOptions, initState);

  const setDateFromHandler = useCallback(
    (date: MaterialUiPickersDate) => {
      dispatch({ type: 'validateDate', payload: { date } });
      dispatch({ type: 'setDateFrom', payload: { date } });
    },
    [dispatch]
  );

  const setDateToHandler = useCallback(
    (date: MaterialUiPickersDate) => {
      dispatch({ type: 'validateDate', payload: { date } });
      dispatch({ type: 'setDateTo', payload: { date } });
    },
    [dispatch]
  );

  const sortByHandler = useCallback(
    (event: SortByEvent) => {
      dispatch({ type: 'sortBy', payload: { value: event.target.value as SortByValue } });
    },
    [dispatch]
  );

  const toggleGenreHandler = useCallback(
    (id: Genre['id']) => {
      dispatch({ type: 'toggleGenres', payload: { id } });
    },
    [dispatch]
  );

  const changeUserScoreHandler = (event: UserScoreEvent, value: UserScoreValue) => {
    dispatch({ type: 'changeUserScore', payload: { value } as { value: Options['userScore'] } });
  };

  const acceptOptions = () => {
    dispatch({ type: 'acceptOptions' });
  };

  const setDefaultOptions = () => {
    dispatch({ type: 'setDefaultOptions', payload: { defaultOptions } });
  };

  const resetOptions = () => {
    dispatch({ type: 'resetOptions', payload: { initialOptions } });
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
