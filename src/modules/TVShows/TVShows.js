import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cards from '../common/components/Cards/Cards';
import LoadMoreBtn from '../common/components/LoadMoreBtn';
import PageContainer from '../common/components/PageContainer';
import CardsGrid from '../common/components/Cards/CardsGrid';
import CardsPage from '../common/components/Cards/CardsPage';
import RouteHeader from '../common/components/RouteHeader';
import Adjustment from '../Adjustment/Adjustment';

import {
  TV_DEFAULT_OPTIONS,
  SORT_TV_BY_OPTIONS,
  USER_SCORE_RANGE,
} from '../common/tmdb-config';
import { TV_OPTIONS_LS_NAME } from './constants';
import { tvShowsActions } from './tvShowsSlice';
import useInfiniteScroll from '../common/hooks/useInfiniteScroll';
import useScrollToTop from '../common/hooks/useScrollToTop';
import { getLS } from '../common/utils/storage';

const Movies = ({ titleName }) => {
  useScrollToTop();

  const dispatch = useDispatch();

  const fetchTVShowsWithNewOptions = useCallback(
    (options) => {
      dispatch(tvShowsActions.resetState());
      dispatch(tvShowsActions.saveOptions(options));
      dispatch(tvShowsActions.fetchTVShows(options));
    },
    [dispatch]
  );

  const nextPage = useSelector((state) => state.tvShows.page + 1);
  const isMoreData = useSelector((state) => state.tvShows.isMoreData);
  const isLoading = useSelector((state) => state.tvShows.isLoading);
  const isLoadMore = useSelector((state) => state.tvShows.isLoadMore);
  const { tvShows } = useSelector((state) => state.tvShows);
  const { options } = useSelector((state) => state.tvShows);

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
    const startingOptions = getLS(TV_OPTIONS_LS_NAME) || TV_DEFAULT_OPTIONS;

    dispatch(tvShowsActions.saveOptions(startingOptions));
    dispatch(tvShowsActions.fetchTVShows(startingOptions));

    return () => {
      dispatch(tvShowsActions.resetState());
    };
  }, [dispatch]);

  const cards = tvShows.length ? (
    <CardsPage path="/tv/" data={tvShows} CardsComponent={Cards} />
  ) : (
    'Loading...'
  );

  return (
    <PageContainer>
      <RouteHeader titleName={titleName} />

      {options && (
        <Adjustment
          optionsLSName={TV_OPTIONS_LS_NAME}
          sortByOptions={SORT_TV_BY_OPTIONS}
          userScoreRange={USER_SCORE_RANGE}
          dateTitle="Air Dates"
          modalTitle="Adjust TV Shows"
          fetchItems={fetchTVShowsWithNewOptions}
          initialOptions={options}
        />
      )}

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
