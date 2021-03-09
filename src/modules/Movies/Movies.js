import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import ActionsButtons from '../common/components/ActionsButtons';
import AdjustmentContent from '../common/components/Adjustment/AdjustmentContent';
import AdjustmentButton from '../common/components/AdjustmentButton';
import Cards from '../common/components/Cards/Cards';
import LoadMoreBtn from '../common/components/LoadMoreBtn';
import Modal from '../common/components/Modal';
import PageContainer from '../common/components/PageContainer';
import CardsGrid from '../common/components/Cards/CardsGrid';
import useScrollToTop from '../common/hooks/useScrollToTop';

import {
  MOVIES_DEFAULT_OPTIONS,
  SORT_BY_OPTIONS,
  USER_SCORE_RANGE,
} from '../common/tmdb-config';
import { getLS } from '../common/utils/storage';
import { moviesActions } from './slices/moviesSlice';
import { formatDateToAPI } from '../common/utils/date';

// ! Try useReducer for complex state.

const changeGenres = (genresList, id) => {
  return genresList.map((item) => {
    if (item.id === id) {
      return { ...item, isSelected: !item.isSelected };
    }

    return item;
  });
};

const Movies = ({ routeName }) => {
  useScrollToTop();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const dispatch = useDispatch();

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

    if (userScoreRange) return userScoreRange;

    return MOVIES_DEFAULT_OPTIONS.userScoreRange;
  });

  const movies = useSelector((state) => state.movies.data);

  const openModalHandler = () => {
    setIsModalOpened(true);
  };

  const closeModalHandler = () => {
    setIsModalOpened(false);
  };

  const dateFromHandler = (date) => {
    setDateFrom(formatDateToAPI(date));
  };

  const dateToHandler = (date) => {
    setDateTo(formatDateToAPI(date));
  };

  const sortByHandler = (e) => {
    setSortBy(e.target.value);
  };

  const toggleGenreHandler = (id) => {
    setGenres((prevGenres) => {
      return changeGenres(prevGenres, id);
    });
  };

  const changeUserScoreHandler = (event, newValue) => {
    setUserScore(newValue);
  };

  useEffect(() => {
    const options = getLS('moviesUserOptions') || MOVIES_DEFAULT_OPTIONS;

    dispatch(moviesActions.fetchMoviesData(options));
  }, [dispatch]);

  return (
    <PageContainer routeName={routeName}>
      <AdjustmentButton
        ariaLAbel="adjust movies"
        openModalHandler={openModalHandler}
      />

      <Modal
        isOpened={isModalOpened}
        closeModalHandler={closeModalHandler}
        title="Adjust Movies"
        content={
          <AdjustmentContent
            sortBy={{ SORT_BY_OPTIONS, sortBy, sortByHandler }}
            userScore={{
              USER_SCORE_RANGE,
              changeUserScoreHandler,
              userScore,
            }}
            genres={{ genres, toggleGenreHandler }}
            dates={{
              dateFrom,
              dateTo,
              dateFromHandler,
              dateToHandler,
              dateTitle: 'Release Dates',
            }}
          />
        }
        actions={<ActionsButtons />}
      />

      <CardsGrid>
        {movies.length ? <Cards cardsData={movies} /> : 'Loading...'}
      </CardsGrid>

      <LoadMoreBtn />
    </PageContainer>
  );
};

export default Movies;
