import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { getLS, setLS } from '../utils/storage';
import { MOVIES_DEFAULT_OPTIONS } from '../tmdb-config';
import { formatDateToAPI } from '../utils/date';
import { moviesActions } from '../../Movies/slices/moviesSlice';

const changeGenres = (genresList, id) => {
  return genresList.map((item) => {
    if (item.id === id) {
      return { ...item, isSelected: !item.isSelected };
    }

    return item;
  });
};

const useOptions = () => {
  const dispatch = useDispatch();

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isReadyToAccept, setIsReadyToAccept] = useState(false);
  const [isOptionsValid, setIsOptionsValid] = useState(true);

  const [genres, setGenres] = useState(() => {
    return getLS('moviesUserOptions')?.genres || MOVIES_DEFAULT_OPTIONS.genres;
  });

  const [sortBy, setSortBy] = useState(() => {
    return getLS('moviesUserOptions')?.sortBy || MOVIES_DEFAULT_OPTIONS.sortBy;
  });

  const [dateFrom, setDateFrom] = useState(() => {
    return (
      getLS('moviesUserOptions')?.releaseDates.from ||
      MOVIES_DEFAULT_OPTIONS.releaseDates.from
    );
  });

  const [dateTo, setDateTo] = useState(() => {
    return (
      getLS('moviesUserOptions')?.releaseDates.to ||
      MOVIES_DEFAULT_OPTIONS.releaseDates.to
    );
  });

  const [userScore, setUserScore] = useState(() => {
    return (
      getLS('moviesUserOptions')?.userScoreRange ||
      MOVIES_DEFAULT_OPTIONS.userScoreRange
    );
  });

  const cancelOptions = () => {
    const options = getLS('moviesUserOptions') || MOVIES_DEFAULT_OPTIONS;

    setGenres(options.genres);
    setSortBy(options.sortBy);
    setDateFrom(options.releaseDates.from);
    setDateTo(options.releaseDates.to);
    setUserScore(options.userScoreRange);
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
    const options = {
      sortBy,
      userScoreRange: userScore,
      genres,

      releaseDates: {
        from: dateFrom,
        to: dateTo,
      },
    };

    setLS('moviesUserOptions', options);
    dispatch(moviesActions.fetchMoviesData(options));
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
