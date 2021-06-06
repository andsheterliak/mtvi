import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  MOVIES_DEFAULT_OPTIONS,
  SORT_MOVIES_BY_OPTIONS,
  USER_SCORE_RANGE,
} from '~common/tmdb-config';
import useScrollToTop from '~common/hooks/useScrollToTop';
import { getLS, setLS } from '~common/utils/storage';
import { checkIfIsData } from '~common/utils/getData';

import Adjustment from '~features/Adjustment';
import MainContainer from '~components/MainContainer';
import CardsGrid from '~components/grids/CardsGrid';
import Cards from '~components/Cards';
import RouteHeader from '~components/RouteHeader';
import MainContent from '~components/MainContent';
import Pagination, { usePagination } from '~components/Pagination';
import FocusableContainer, { useFocus } from '~components/FocusableContainer';

import { moviesActions } from './moviesSlice';
import { MOVIES_OPTIONS_STORAGE_NAME } from './moviesConstants';

const Movies = ({ titleName }) => {
  useScrollToTop();

  const { focus, containerRef } = useFocus();
  const dispatch = useDispatch();
  const { page, changePage } = usePagination();

  const data = useSelector((state) => state.movies.data);
  const isLoading = useSelector((state) => state.movies.isLoading);
  const options = useSelector((state) => state.movies.options);
  const totalPages = useSelector((state) => state.movies.totalPages);

  const fetchDataWithNewOptions = useCallback(
    (newOptions) => {
      dispatch(moviesActions.saveOptions(newOptions));
      dispatch(moviesActions.fetchData({ ...newOptions, page }));
      setLS(MOVIES_OPTIONS_STORAGE_NAME, newOptions);
    },
    [dispatch, page]
  );

  const changePageHandler = (event, newPage) => {
    if (!changePage(event, newPage)) return;
    focus();
  };

  const isData = checkIfIsData(data);

  useEffect(() => {
    const startingOptions =
      options || getLS(MOVIES_OPTIONS_STORAGE_NAME) || MOVIES_DEFAULT_OPTIONS;

    if (!options) dispatch(moviesActions.saveOptions(startingOptions));

    dispatch(moviesActions.fetchData({ ...startingOptions, page }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page]);

  useEffect(() => {
    return () => {
      dispatch(moviesActions.resetState());
    };
  }, [dispatch]);

  const cards = isData ? <Cards cardsData={data} /> : 'Loading...';

  return (
    <MainContainer>
      <RouteHeader titleName={titleName} />

      {options && (
        <Adjustment
          sortByOptions={SORT_MOVIES_BY_OPTIONS}
          userScoreRange={USER_SCORE_RANGE}
          dateTitle="Release Dates"
          modalTitle="Adjust Movies"
          onAcceptCallback={fetchDataWithNewOptions}
          initialOptions={options}
        />
      )}

      <FocusableContainer containerRef={containerRef}>
        <MainContent>
          <CardsGrid>{cards}</CardsGrid>
        </MainContent>
      </FocusableContainer>

      {isData && (
        <Pagination
          isLoading={isLoading}
          page={page}
          totalPages={totalPages}
          changePageHandler={changePageHandler}
        />
      )}
    </MainContainer>
  );
};

export default Movies;
