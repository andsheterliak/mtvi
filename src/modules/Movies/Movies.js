import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoadMoreBtn from '../common/components/LoadMoreBtn';
import MainContainer from '../common/components/MainContainer';
import CardsGrid from '../common/components/Cards/CardsGrid';
import Cards from '../common/components/Cards/Cards';
import CardsPage from '../common/components/Cards/CardsPage';
import RouteHeader from '../common/components/RouteHeader';
import Adjustment from '../Adjustment/Adjustment';
import MainContent from '../common/components/MainContent';

import {
  MOVIES_DEFAULT_OPTIONS,
  SORT_MOVIES_BY_OPTIONS,
  USER_SCORE_RANGE,
} from '../common/tmdb-config';
import { moviesActions } from './moviesSlice';
import { MOVIES_OPTIONS_LS_NAME } from './constants';
import useScrollToTop from '../common/hooks/useScrollToTop';
import useInfiniteScroll from '../common/hooks/useInfiniteScroll';
import { getLS } from '../common/utils/storage';

const Movies = ({ titleName }) => {
  useScrollToTop();

  const dispatch = useDispatch();

  const fetchMoviesWithNewOptions = useCallback(
    (options) => {
      dispatch(moviesActions.resetState());
      dispatch(moviesActions.saveOptions(options));
      dispatch(moviesActions.fetchMovies(options));
    },
    [dispatch]
  );

  const nextPage = useSelector((state) => state.movies.page + 1);
  const isMoreData = useSelector((state) => state.movies.isMoreData);
  const isLoading = useSelector((state) => state.movies.isLoading);
  const isLoadMore = useSelector((state) => state.movies.isLoadMore);
  const { movies } = useSelector((state) => state.movies);
  const { options } = useSelector((state) => state.movies);

  const loadMoreHandler = useCallback(() => {
    dispatch(moviesActions.loadMoreMovies());

    dispatch(moviesActions.fetchMovies({ ...options, page: nextPage }));
  }, [dispatch, nextPage, options]);

  const infiniteScrollRef = useInfiniteScroll(
    loadMoreHandler,
    isLoadMore,
    isLoading,
    isMoreData
  );

  useEffect(() => {
    const startingOptions =
      getLS(MOVIES_OPTIONS_LS_NAME) || MOVIES_DEFAULT_OPTIONS;

    dispatch(moviesActions.saveOptions(startingOptions));
    dispatch(moviesActions.fetchMovies(startingOptions));

    return () => {
      dispatch(moviesActions.resetState());
    };
  }, [dispatch]);

  const cards =
    movies.length !== 0 ? (
      <CardsPage data={movies} CardsComponent={Cards} />
    ) : (
      'Loading...'
    );

  return (
    <MainContainer>
      <RouteHeader titleName={titleName} />

      {options && (
        <Adjustment
          optionsLSName={MOVIES_OPTIONS_LS_NAME}
          sortByOptions={SORT_MOVIES_BY_OPTIONS}
          userScoreRange={USER_SCORE_RANGE}
          dateTitle="Release Dates"
          modalTitle="Adjust Movies"
          fetchItems={fetchMoviesWithNewOptions}
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

export default Movies;
