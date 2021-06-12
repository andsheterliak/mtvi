import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import { createSelector } from '@reduxjs/toolkit';

import Cards from '~components/Cards';
import CardsGrid from '~components/grids/CardsGrid';
import PageGrid from '~components/grids/PageGrid';
import MainContainer from '~components/MainContainer';
import MainContent from '~components/MainContent';
import NoContent from '~components/NoContent';
import Pagination, { usePagination } from '~components/Pagination';
import SelectionBar from '~components/SelectionBar';
import Spacer from '~components/Spacer';
import FocusableContainer, { useFocus } from '~components/FocusableContainer';
import PersonCards from '~features/People/components/PersonCards';
import { searchActions } from './searchSlice';
import { IMG_BASE_URL, IMG_SIZES, SEARCH_PATHS } from '~common/tmdb-config';
import { ifIsData } from '~common/utils/getData';
import useScrollToTop from '~common/hooks/useScrollToTop';
import { ROUTE_NAMES } from '~common/constants';
import noImage from '~assets/img/no-image.svg';

const searchPathsToNames = {
  [SEARCH_PATHS.movie]: 'Movies',
  [SEARCH_PATHS.tvShow]: 'TV Shows',
  [SEARCH_PATHS.person]: 'People',
};

const getSearchData = (state) => state.search.data;

const getSelectionBarData = createSelector(getSearchData, (searchData) => {
  if (!searchData) return null;

  const selectionBarData = {};

  Object.entries(searchData).forEach(([key, value]) => {
    const name = searchPathsToNames[key];

    selectionBarData[key] = {
      name,
      amount: value.total_results,
      data: value.results,
    };
  });

  return selectionBarData;
});

const Search = () => {
  useScrollToTop();

  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { url } = useRouteMatch();

  const { containerRef, focus } = useFocus();

  const { searchIn, query } = useMemo(() => {
    const params = new URLSearchParams(location.search);

    return {
      query: params.get('query'),
      searchIn: params.get('searchIn'),
    };
  }, [location.search]);

  const { page, changePage } = usePagination();

  const isLoading = useSelector((state) => state.search.isLoading);
  const totalPages = useSelector(
    (state) => state.search.data?.[searchIn].total_pages
  );
  const selectionBarData = useSelector(getSelectionBarData);

  let content;

  if (selectionBarData) {
    const { data } = selectionBarData[searchIn];

    if (ifIsData(data)) {
      const cards =
        searchIn === SEARCH_PATHS.person ? (
          <PersonCards
            cardsData={data}
            routeName={ROUTE_NAMES.person}
            imgData={{
              basePath: IMG_BASE_URL,
              size: IMG_SIZES.profile,
              fallback: noImage,
            }}
          />
        ) : (
          <Cards
            cardsData={data}
            routeNames={{
              tvShow: ROUTE_NAMES.tvShow,
              movie: ROUTE_NAMES.movie,
            }}
            imgData={{
              basePath: IMG_BASE_URL,
              size: IMG_SIZES.poster,
              fallback: noImage,
            }}
          />
        );

      content = <CardsGrid>{cards}</CardsGrid>;
    } else {
      content = (
        <NoContent
          message={`There are no ${selectionBarData[
            searchIn
          ].name.toLowerCase()} that matched your query.`}
        />
      );
    }
  }

  useEffect(() => {
    if (query) {
      dispatch(searchActions.fetchData({ searchIn, query, page }));
    }
  }, [dispatch, page, query, searchIn]);

  useEffect(() => {
    return () => {
      dispatch(searchActions.resetState());
    };
  }, [dispatch]);

  const changePageHandler = (event, newPage) => {
    if (!changePage(event, newPage));
    focus();
  };

  const selectHandler = (e, searchInValue) => {
    const params = new URLSearchParams();

    params.set('searchIn', searchInValue);
    params.set('query', query);
    history.push(`${url}?${params}`);
  };

  return (
    <>
      <Spacer />

      {selectionBarData ? (
        <MainContent>
          <MainContainer>
            <PageGrid>
              <SelectionBar
                title="Search Results"
                data={selectionBarData}
                selectHandler={selectHandler}
                selected={searchIn}
              />

              <div>
                <FocusableContainer containerRef={containerRef}>
                  {content}
                </FocusableContainer>

                <Pagination
                  isLoading={isLoading}
                  page={page}
                  totalPages={totalPages}
                  changePageHandler={changePageHandler}
                />
              </div>
            </PageGrid>
          </MainContainer>
        </MainContent>
      ) : (
        'Loading...'
      )}
    </>
  );
};

export { default as searchReducer } from './searchSlice';
export default Search;
