import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getLS, setLS } from '../utils/storage';
import { formatDateToAPI } from '../utils/date';

const changeGenres = (genresList, id) => {
  return genresList.map((item) => {
    if (item.id === id) {
      return { ...item, isSelected: !item.isSelected };
    }

    return item;
  });
};

const useOptions = (userOptionsName, defaultOptionsName, fetchAction) => {
  const dispatch = useDispatch();

  const options = useMemo(() => getLS(userOptionsName) || defaultOptionsName, [
    userOptionsName,
    defaultOptionsName,
  ]); // It is not very expensive, but these options are needed only on mount.

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isReadyToAccept, setIsReadyToAccept] = useState(false);
  const [isOptionsValid, setIsOptionsValid] = useState(true);

  const [genres, setGenres] = useState(options.genres);
  const [sortBy, setSortBy] = useState(options.sortBy);
  const [dateFrom, setDateFrom] = useState(options.dates.from);
  const [dateTo, setDateTo] = useState(options.dates.to);
  const [userScore, setUserScore] = useState(options.userScore);

  const cancelOptions = () => {
    const prevOptions = getLS(userOptionsName) || defaultOptionsName;

    setGenres(prevOptions.genres);
    setSortBy(prevOptions.sortBy);
    setDateFrom(prevOptions.dates.from);
    setDateTo(prevOptions.dates.to);
    setUserScore(prevOptions.userScore);
    setIsReadyToAccept(false);
  };

  const validateIfDateIsInValid = (date) => {
    if (date?.toString() === 'Invalid Date') {
      setIsOptionsValid(false);
      setIsReadyToAccept(false);
    } else {
      setIsOptionsValid(true);
      setIsReadyToAccept(true);
    }
  };

  const openModalHandler = () => {
    setIsModalOpened(true);
  };

  const closeModalHandler = () => {
    setIsModalOpened(false);
    cancelOptions();
    setIsOptionsValid(true);
  };

  const dateFromHandler = (date) => {
    validateIfDateIsInValid(date);
    setDateFrom(formatDateToAPI(date));
  };

  const dateToHandler = (date) => {
    validateIfDateIsInValid(date);
    setDateTo(formatDateToAPI(date));
  };

  const sortByHandler = (e) => {
    setSortBy(e.target.value);
    if (isOptionsValid) setIsReadyToAccept(true);
  };

  const toggleGenreHandler = (id) => {
    setGenres((prevGenres) => {
      return changeGenres(prevGenres, id);
    });

    if (isOptionsValid) setIsReadyToAccept(true);
  };

  const changeUserScoreHandler = (event, newValue) => {
    setUserScore(newValue);
    if (isOptionsValid) setIsReadyToAccept(true);
  };

  const acceptHandler = () => {
    const newUserOptions = {
      sortBy,
      userScore,
      genres,

      dates: {
        from: dateFrom,
        to: dateTo,
      },
    };

    setLS(userOptionsName, newUserOptions);
    dispatch(fetchAction(newUserOptions));
    setIsModalOpened(false);
    setIsReadyToAccept(false);
  };

  return {
    options: {
      sortBy,
      userScore,
      genres,
      dates: { from: dateFrom, to: dateTo },
    },

    isModalOpened,
    isReadyToAccept,
    openModalHandler,
    closeModalHandler,
    dateFromHandler,
    dateToHandler,
    sortByHandler,
    toggleGenreHandler,
    changeUserScoreHandler,
    acceptHandler,
  };
};

export default useOptions;
