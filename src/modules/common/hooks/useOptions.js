import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setLS } from '../utils/storage';
import { formatDateToAPI } from '../utils/date';

const changeGenres = (genresList, id) => {
  return genresList.map((item) => {
    if (item.id === id) {
      return { ...item, isSelected: !item.isSelected };
    }

    return item;
  });
};

const useOptions = (
  userOptionsName,
  defaultOptionsName,
  options,
  fetchAction
) => {
  const dispatch = useDispatch();

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isReadyToAccept, setIsReadyToAccept] = useState(false);
  const [isOptionsValid, setIsOptionsValid] = useState(true);

  const [genres, setGenres] = useState(options.current.genres);
  const [sortBy, setSortBy] = useState(options.current.sortBy);
  const [dateFrom, setDateFrom] = useState(options.current.releaseDates.from);
  const [dateTo, setDateTo] = useState(options.current.releaseDates.to);
  const [userScore, setUserScore] = useState(options.current.userScoreRange);

  const cancelOptions = () => {
    setGenres(options.current.genres);
    setSortBy(options.current.sortBy);
    setDateFrom(options.current.releaseDates.from);
    setDateTo(options.current.releaseDates.to);
    setUserScore(options.current.userScoreRange);
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
      userScoreRange: userScore,
      genres,

      releaseDates: {
        from: dateFrom,
        to: dateTo,
      },
    };

    options.current = newUserOptions;
    setLS(userOptionsName, newUserOptions);
    dispatch(fetchAction(newUserOptions));
    setIsModalOpened(false);
    setIsReadyToAccept(false);
  };

  return {
    sortBy,
    userScore,
    genres,
    dateFrom,
    dateTo,
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
