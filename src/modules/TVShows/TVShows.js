import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ActionsButtons from '../common/components/ActionsButtons';
import AdjustmentContent from '../common/components/Adjustment/AdjustmentContent';
import AdjustmentButton from '../common/components/AdjustmentButton';
import Cards from '../common/components/Cards/Cards';
import LoadMoreBtn from '../common/components/LoadMoreBtn';
import Modal from '../common/components/Modal';
import PageContainer from '../common/components/PageContainer';
import CardsGrid from '../common/components/Cards/CardsGrid';
import CardsPage from '../common/components/Cards/CardsPage';

import {
  TV_DEFAULT_OPTIONS,
  SORT_TV_BY_OPTIONS,
  USER_SCORE_RANGE,
} from '../common/tmdb-config';
import { TV_OPTIONS_LS_NAME } from './constants';
import { tvShowsActions } from './slices/tvShowsSlice';
import useOptions from '../common/hooks/useOptions';
import useInfiniteScroll from '../common/hooks/useInfiniteScroll';
import useScrollToTop from '../common/hooks/useScrollToTop';

const Movies = ({ routeName }) => {
  useScrollToTop();
  const dispatch = useDispatch();

  const {
    options,
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
    tvShowsActions.fetchTVShowsWithNewOptions
  );

  const nextPage = useSelector((state) => state.tvShows.page + 1);
  const isMoreData = useSelector((state) => state.tvShows.isMoreData);
  const isLoading = useSelector((state) => state.tvShows.isLoading);
  const isLoadMore = useSelector((state) => state.tvShows.isLoadMore);
  const tvShows = useSelector((state) => state.tvShows.data);

  const loadMoreHandler = useCallback(() => {
    dispatch(tvShowsActions.loadMoreTVShows());

    dispatch(tvShowsActions.fetchTVShows({ ...options, page: nextPage }));
  }, [dispatch, nextPage, options]);

  const infiniteScrollRef = useInfiniteScroll(
    loadMoreHandler,
    isLoadMore,
    isLoading,
    isMoreData
  );

  useEffect(() => {
    dispatch(tvShowsActions.fetchTVShows(options));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const cards = tvShows.length ? (
    <CardsPage data={tvShows} CardsComponent={Cards} />
  ) : (
    'Loading...'
  );

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
              sortByOptions: SORT_TV_BY_OPTIONS,
              sortBy: options.sortBy,
              sortByHandler,
            }}
            userScore={{
              userScoreRange: USER_SCORE_RANGE,
              changeUserScoreHandler,
              userScore: options.userScore,
            }}
            genres={{
              genres: options.genres,
              toggleGenreHandler,
            }}
            dates={{
              dates: options.dates,
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

      <CardsGrid>{cards}</CardsGrid>

      <LoadMoreBtn
        infiniteScrollRef={infiniteScrollRef}
        loadMoreHandler={loadMoreHandler}
        isMoreData={isMoreData}
        isLoading={isLoading}
      />
    </PageContainer>
  );
};

export default Movies;
