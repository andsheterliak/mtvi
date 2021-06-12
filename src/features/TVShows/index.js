import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  TV_DEFAULT_OPTIONS,
  SORT_TV_BY_OPTIONS,
  USER_SCORE_RANGE,
  IMG_BASE_URL,
  IMG_SIZES,
} from '~common/tmdb-config';
import useScrollToTop from '~common/hooks/useScrollToTop';
import { getLS, setLS } from '~common/utils/storage';
import { ifIsData } from '~common/utils/getData';

import Adjustment from '~components/Adjustment';
import FocusableContainer, { useFocus } from '~components/FocusableContainer';
import Cards from '~components/Cards';
import MainContainer from '~components/MainContainer';
import CardsGrid from '~components/grids/CardsGrid';
import RouteHeader from '~components/RouteHeader';
import MainContent from '~components/MainContent';
import Pagination, { usePagination } from '~components/Pagination';
import noImage from '~assets/img/no-image.svg';
import { TV_OPTIONS_STORAGE_NAME } from './tvShowsConstants';
import { tvShowsActions } from './tvShowsSlice';
import { ROUTE_NAMES } from '~common/constants';

const TVShows = ({ titleName }) => {
  useScrollToTop();

  const { focus, containerRef } = useFocus();
  const dispatch = useDispatch();
  const { page, changePage } = usePagination();

  const data = useSelector((state) => state.tvShows.data);
  const isLoading = useSelector((state) => state.tvShows.isLoading);
  const options = useSelector((state) => state.tvShows.options);
  const totalPages = useSelector((state) => state.tvShows.totalPages);

  const fetchDataWithNewOptions = useCallback(
    (newOptions) => {
      dispatch(tvShowsActions.saveOptions(newOptions));
      dispatch(tvShowsActions.fetchData({ ...newOptions, page }));
      setLS(TV_OPTIONS_STORAGE_NAME, newOptions);
    },
    [page, dispatch]
  );

  const changePageHandler = (event, newPage) => {
    if (!changePage(event, newPage)) return;
    focus();
  };

  const isData = ifIsData(data);

  useEffect(() => {
    const startingOptions =
      options || getLS(TV_OPTIONS_STORAGE_NAME) || TV_DEFAULT_OPTIONS;

    if (!options) dispatch(tvShowsActions.saveOptions(startingOptions));

    dispatch(tvShowsActions.fetchData({ ...startingOptions, page }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page]);

  useEffect(() => {
    return () => {
      dispatch(tvShowsActions.resetState());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cards = isData ? (
    <Cards
      cardsData={data}
      routeNames={{ tvShow: ROUTE_NAMES.tvShow, movie: ROUTE_NAMES.movie }}
      imgData={{
        basePath: IMG_BASE_URL,
        size: IMG_SIZES.poster,
        fallback: noImage,
      }}
    />
  ) : (
    'Loading...'
  );

  return (
    <MainContainer>
      <RouteHeader titleName={titleName} />

      {options && (
        <Adjustment
          sortByOptions={SORT_TV_BY_OPTIONS}
          userScoreRange={USER_SCORE_RANGE}
          dateTitle="Air Dates"
          modalTitle="Adjust TV Shows"
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

export { default as tvShowsReducer } from './tvShowsSlice';
export default TVShows;