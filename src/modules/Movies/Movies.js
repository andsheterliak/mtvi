import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router';
import ActionsButtons from '../common/components/ActionsButtons';
import AdjustmentContent from '../common/components/Adjustment/AdjustmentContent';
import AdjustmentButton from '../common/components/AdjustmentButton';
import LoadMoreBtn from '../common/components/LoadMoreBtn';
import Modal from '../common/components/Modal';
import PageContainer from '../common/components/PageContainer';
import CardsGrid from '../common/components/Cards/CardsGrid';
import Cards from '../common/components/Cards/Cards';
import CardsPage from '../common/components/Cards/CardsPage';
import RouteHeader from '../common/components/RouteHeader';

import {
  MOVIES_DEFAULT_OPTIONS,
  SORT_MOVIES_BY_OPTIONS,
  USER_SCORE_RANGE,
} from '../common/tmdb-config';
import { moviesActions } from './slices/moviesSlice';
import { MOVIES_OPTIONS_LS_NAME } from './constants';
import useOptions from '../common/hooks/useOptions';
import useScrollToTop from '../common/hooks/useScrollToTop';
import useInfiniteScroll from '../common/hooks/useInfiniteScroll';

const Movies = ({ titleName }) => {
  useScrollToTop();
  const dispatch = useDispatch();
  const history = useHistory();

  const fetchMovies = useCallback(
    (options) => {
      dispatch(moviesActions.resetState());
      dispatch(moviesActions.fetchMovies(options));
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
  } = useOptions(MOVIES_OPTIONS_LS_NAME, MOVIES_DEFAULT_OPTIONS, fetchMovies);

  const nextPage = useSelector((state) => state.movies.page + 1);
  const isMoreData = useSelector((state) => state.movies.isMoreData);
  const isLoading = useSelector((state) => state.movies.isLoading);
  const isLoadMore = useSelector((state) => state.movies.isLoadMore);
  const { movies } = useSelector((state) => state.movies);

  const loadMoreHandler = useCallback(() => {
    dispatch(moviesActions.loadMoreMovies());

    dispatch(moviesActions.fetchMovies({ ...options, page: nextPage }));
  }, [dispatch, nextPage, options]);

  const openMovieHandler = (e, id) => {
    history.push(`/movies/${id}`);
  };

  const infiniteScrollRef = useInfiniteScroll(
    loadMoreHandler,
    isLoadMore,
    isLoading,
    isMoreData
  );

  useEffect(() => {
    fetchMovies(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchMovies]);

  const cards = movies.length ? (
    <CardsPage
      fetchItemHandler={openMovieHandler}
      data={movies}
      CardsComponent={Cards}
    />
  ) : (
    'Loading...'
  );

  return (
    <PageContainer>
      <RouteHeader titleName={titleName} />

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
            sortBy={{
              sortByOptions: SORT_MOVIES_BY_OPTIONS,
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
