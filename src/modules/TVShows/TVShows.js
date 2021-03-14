import { useEffect, useRef } from 'react';

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
  TV_DEFAULT_OPTIONS,
  SORT_TV_BY_OPTIONS,
  USER_SCORE_RANGE,
} from '../common/tmdb-config';
import { getLS } from '../common/utils/storage';
import { tvShowsActions } from './slices/tvShowsSlice';
import useOptions from '../common/hooks/useOptions';
import { TV_OPTIONS_LS_NAME } from './constants';

const Movies = ({ routeName }) => {
  useScrollToTop();
  const dispatch = useDispatch();

  const options = useRef(getLS(TV_OPTIONS_LS_NAME) || TV_DEFAULT_OPTIONS);

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
  } = useOptions(
    TV_OPTIONS_LS_NAME,
    TV_DEFAULT_OPTIONS,
    options,
    tvShowsActions.fetchTVShowsData
  );

  const tvShows = useSelector((state) => state.tvShows.data);

  useEffect(() => {
    dispatch(tvShowsActions.fetchTVShowsData(options.current));
  }, [dispatch]);

  return (
    <PageContainer routeName={routeName}>
      <AdjustmentButton
        ariaLAbel="adjust tv shows"
        openModalHandler={openModalHandler}
      />

      <Modal
        isOpened={isModalOpened}
        closeModalHandler={closeModalHandler}
        title="Adjust TV Shows"
        content={
          <AdjustmentContent
            sortBy={{
              SORT_BY_OPTIONS: SORT_TV_BY_OPTIONS,
              sortBy,
              sortByHandler,
            }}
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
              dateTitle: 'Air Dates',
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
        {tvShows.length ? <Cards cardsData={tvShows} /> : 'Loading...'}
      </CardsGrid>

      <LoadMoreBtn />
    </PageContainer>
  );
};

export default Movies;
