import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  MOVIES_DEFAULT_OPTIONS,
  SORT_MOVIES_BY_OPTIONS,
  USER_SCORE_RANGE,
} from '~common/tmdb-config';
import useFocusContainer from '~common/hooks/useFocusContainer';
import { getLS } from '~common/utils/storage';
import { checkIfIsData } from '~common/utils/getData';
import { scrollToTop } from '~common/utils/dom';
import types from '~common/types';

import Adjustment from '~modules/Adjustment/Adjustment';
import MainContainer from '~components/MainContainer';
import CardsGrid from '~components/CardsGrid';
import Cards from '~components/Cards/Cards';
import RouteHeader from '~components/RouteHeader';
import MainContent from '~components/MainContent';

import { moviesActions } from './moviesSlice';
import { MOVIES_OPTIONS_LS_NAME } from './moviesConstants';
import Pagination from '~components/Pagination';

const Movies = ({ titleName }) => {
  const { focus, FocusableContainer } = useFocusContainer();
  const dispatch = useDispatch();

  const fetchMoviesWithNewOptions = useCallback(
    (options) => {
      dispatch(moviesActions.resetState());
      dispatch(moviesActions.saveOptions(options));
      dispatch(moviesActions.fetchMovies(options));
    },
    [dispatch]
  );

  const { movies, isLoading, options, currentPage, totalPages } = useSelector(
    (state) => state.movies
  );

  const changePageHandler = (e, page) => {
    if (currentPage === page) return;

    dispatch(moviesActions.fetchMovies({ ...options, page }));
    focus();
    scrollToTop();
  };

  const isData = checkIfIsData(movies);

  useEffect(() => {
    if (isData) return;

    const startingOptions =
      getLS(MOVIES_OPTIONS_LS_NAME) || MOVIES_DEFAULT_OPTIONS;

    dispatch(moviesActions.saveOptions(startingOptions));
    dispatch(
      moviesActions.fetchMovies({ ...startingOptions, page: currentPage })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cards = isData ? <Cards cardsData={movies} /> : 'Loading...';

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

      <FocusableContainer>
        <MainContent>
          <CardsGrid>{cards}</CardsGrid>
        </MainContent>
      </FocusableContainer>

      {isData && (
        <Pagination
          isLoading={isLoading}
          page={currentPage}
          totalPages={totalPages}
          changePageHandler={changePageHandler}
        />
      )}
    </MainContainer>
  );
};

Movies.propTypes = {
  titleName: types.pageTitle,
};

export default Movies;
