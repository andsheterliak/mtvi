import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  TV_DEFAULT_OPTIONS,
  SORT_TV_BY_OPTIONS,
  USER_SCORE_RANGE,
} from '~common/tmdb-config';
import useInfiniteScroll from '~common/hooks/useInfiniteScroll';
import useScrollToTop from '~common/hooks/useScrollToTop';
import { getLS } from '~common/utils/storage';
import { checkIfIsData } from '~common/utils/getData';
import types from '~common/types';

import Adjustment from '~modules/Adjustment/Adjustment';
import Cards from '~components/Cards/Cards';
import LoadMoreBtn from '~components/LoadMoreBtn';
import MainContainer from '~components/MainContainer';
import CardsGrid from '~components/CardsGrid';
import CardsPage from '~components/CardsPage';
import RouteHeader from '~components/RouteHeader';
import MainContent from '~components/MainContent';

import { TV_OPTIONS_LS_NAME } from './constants';
import { tvShowsActions } from './tvShowsSlice';

const TVShows = ({ titleName }) => {
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

  const { options, isMoreData, isLoading, isLoadMore, tvShows } = useSelector(
    (state) => state.tvShows
  );

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

  const cards = checkIfIsData(tvShows) ? (
    <CardsPage data={tvShows} CardsComponent={Cards} />
  ) : (
    'Loading...'
  );

  return (
    <MainContainer>
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

      <MainContent>
        <CardsGrid>{cards}</CardsGrid>
      </MainContent>

      <LoadMoreBtn
        infiniteScrollRef={infiniteScrollRef}
        loadMoreHandler={loadMoreHandler}
        isMoreData={isMoreData}
        isLoading={isLoading}
      />
    </MainContainer>
  );
};

TVShows.propTypes = {
  titleName: types.pageTitle,
};

export default TVShows;
