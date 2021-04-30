import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  TV_DEFAULT_OPTIONS,
  SORT_TV_BY_OPTIONS,
  USER_SCORE_RANGE,
} from '~common/tmdb-config';
import useFocusContainer from '~common/hooks/useFocusContainer';
import { getLS, setLS } from '~common/utils/storage';
import { checkIfIsData } from '~common/utils/getData';
import { scrollToTop } from '~common/utils/dom';
import types from '~common/types';

import Adjustment from '~modules/Adjustment/Adjustment';
import Cards from '~components/Cards/Cards';
import MainContainer from '~components/MainContainer';
import CardsGrid from '~components/CardsGrid';
import RouteHeader from '~components/RouteHeader';
import MainContent from '~components/MainContent';
import Pagination from '~components/Pagination';

import { TV_OPTIONS_STORAGE_NAME } from './tvShowsConstants';
import { tvShowsActions } from './tvShowsSlice';

const TVShows = ({ titleName }) => {
  const { focus, FocusableContainer } = useFocusContainer();
  const dispatch = useDispatch();

  const { data, isLoading, options, currentPage, totalPages } = useSelector(
    (state) => state.tvShows
  );

  const fetchDataWithNewOptions = useCallback(
    (newOptions) => {
      dispatch(tvShowsActions.saveOptions(newOptions));
      dispatch(tvShowsActions.fetchData({ ...newOptions, page: currentPage }));
      setLS(TV_OPTIONS_STORAGE_NAME, newOptions);
    },
    [currentPage, dispatch]
  );

  const changePageHandler = (e, page) => {
    if (currentPage === page) return;

    dispatch(tvShowsActions.fetchData({ ...options, page }));
    focus();
    scrollToTop();
  };

  const isData = checkIfIsData(data);

  useEffect(() => {
    if (isData) return;

    const startingOptions =
      getLS(TV_OPTIONS_STORAGE_NAME) || TV_DEFAULT_OPTIONS;

    dispatch(tvShowsActions.saveOptions(startingOptions));
    dispatch(
      tvShowsActions.fetchData({ ...startingOptions, page: currentPage })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cards = isData ? <Cards cardsData={data} /> : 'Loading...';

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

TVShows.propTypes = {
  titleName: types.pageTitle,
};

export default TVShows;
