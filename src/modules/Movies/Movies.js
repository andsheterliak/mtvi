import { useEffect } from 'react';

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
import useOptions from '../common/hooks/useOptions';
import { MOVIES_OPTIONS_LS_NAME } from './constants';

const Movies = ({ routeName }) => {
  useScrollToTop();
  const dispatch = useDispatch();

  const {
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
  } = useOptions();

  const movies = useSelector((state) => state.movies.data);

  useEffect(() => {
    const options = getLS(MOVIES_OPTIONS_LS_NAME) || MOVIES_DEFAULT_OPTIONS;

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
        actions={
          <ActionsButtons
            isReadyToAccept={isReadyToAccept}
            cancelHandler={closeModalHandler}
            acceptHandler={acceptHandler}
          />
        }
      />

      <CardsGrid>
        {movies.length ? <Cards cardsData={movies} /> : 'Loading...'}
      </CardsGrid>

      <LoadMoreBtn />
    </PageContainer>
  );
};

export default Movies;
