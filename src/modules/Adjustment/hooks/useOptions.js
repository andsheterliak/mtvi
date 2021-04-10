import { useCallback, useState } from 'react';

import { setLS } from '../../common/utils/storage';
import { formatDateToAPI } from '../../common/utils/date';

const changeGenres = (genresList, id) => {
  return genresList.map((item) => {
    if (item.id === id) {
      return { ...item, isSelected: !item.isSelected };
    }

    return item;
  });
};

const useOptions = (userOptionsName, fetchAction, options) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isReadyToAccept, setIsReadyToAccept] = useState(false);
  const [isOptionsValid, setIsOptionsValid] = useState(true);

  const [genres, setGenres] = useState(options.genres);
  const [sortBy, setSortBy] = useState(options.sortBy);
  const [dateFrom, setDateFrom] = useState(options.dates.from);
  const [dateTo, setDateTo] = useState(options.dates.to);
  const [userScore, setUserScore] = useState(options.userScore);

  const cancelOptions = () => {
    setGenres(options.genres);
    setSortBy(options.sortBy);
    setDateFrom(options.dates.from);
    setDateTo(options.dates.to);
    setUserScore(options.userScore);
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

  const dateFromHandler = useCallback((date) => {
    validateIfDateIsInValid(date);
    setDateFrom(formatDateToAPI(date));
  }, []);

  const dateToHandler = useCallback((date) => {
    validateIfDateIsInValid(date);
    setDateTo(formatDateToAPI(date));
  }, []);

  const sortByHandler = useCallback(
    (e) => {
      setSortBy(e.target.value);
      if (isOptionsValid) setIsReadyToAccept(true);
    },
    [isOptionsValid]
  );

  const toggleGenreHandler = useCallback(
    (id) => {
      setGenres((prevGenres) => {
        return changeGenres(prevGenres, id);
      });

      if (isOptionsValid) setIsReadyToAccept(true);
    },
    [isOptionsValid]
  );

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
    fetchAction(newUserOptions);
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
