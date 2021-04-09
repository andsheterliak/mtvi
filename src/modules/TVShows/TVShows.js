import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ActionsButtons from '../common/components/Adjustment/ActionsButtons';
import AdjustmentContent from '../common/components/Adjustment/AdjustmentContent';
import AdjustmentButton from '../common/components/Adjustment/AdjustmentButton';
import Cards from '../common/components/Cards/Cards';
import LoadMoreBtn from '../common/components/LoadMoreBtn';
import Modal from '../common/components/Modal';
import PageContainer from '../common/components/PageContainer';
import CardsGrid from '../common/components/Cards/CardsGrid';
import CardsPage from '../common/components/Cards/CardsPage';
import RouteHeader from '../common/components/RouteHeader';

import {
  TV_DEFAULT_OPTIONS,
  SORT_TV_BY_OPTIONS,
  USER_SCORE_RANGE,
} from '../common/tmdb-config';
import { TV_OPTIONS_LS_NAME } from './constants';
import { tvShowsActions } from './tvShowsSlice';
import useOptions from '../common/hooks/useOptions';
import useInfiniteScroll from '../common/hooks/useInfiniteScroll';
import useScrollToTop from '../common/hooks/useScrollToTop';

const Movies = ({ titleName }) => {
  useScrollToTop();

  const dispatch = useDispatch();

  const fetchTVShows = useCallback(
    (options) => {
      dispatch(tvShowsActions.resetState());
      dispatch(tvShowsActions.fetchTVShows(options));
    },
    [dispatch]
  );

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
  } = useOptions(TV_OPTIONS_LS_NAME, TV_DEFAULT_OPTIONS, fetchTVShows);

  const nextPage = useSelector((state) => state.tvShows.page + 1);
  const isMoreData = useSelector((state) => state.tvShows.isMoreData);
  const isLoading = useSelector((state) => state.tvShows.isLoading);
  const isLoadMore = useSelector((state) => state.tvShows.isLoadMore);
  const { tvShows } = useSelector((state) => state.tvShows);

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

    return () => {
      dispatch(tvShowsActions.resetState());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const cards = tvShows.length ? (
    <CardsPage path="/tv/" data={tvShows} CardsComponent={Cards} />
  ) : (
    'Loading...'
  );

  return (
    <PageContainer>
      <RouteHeader titleName={titleName} />

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

      <main>
        <CardsGrid>{cards}</CardsGrid>
      </main>

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
