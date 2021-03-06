import { useMemo, useRef } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import { createSelector } from '@reduxjs/toolkit';
import { useErrorHandler } from 'react-error-boundary';

import CardsGrid from '~components/grids/CardsGrid';
import PageGrid from '~components/grids/PageGrid';
import MainContainer from '~components/MainContainer';
import MainContent from '~components/MainContent';
import NoContent from '~components/NoContent';
import Pagination, { usePagination } from '~components/Pagination';
import SelectionBar from '~components/SelectionBar';
import Spacer from '~components/Spacer';
import FocusableContainer, { useFocus } from '~components/FocusableContainer';
import PersonCards from '~components/cards/PersonCards';
import MovieCards from '~components/cards/MovieCards';
import TVShowCards from '~components/cards/TVShowCards';
import { IMG_BASE_URL, IMG_SIZES, SEARCH_PATHS } from '~common/tmdb-config';
import { ifIsData } from '~common/utils/getData';
import useScrollToTop from '~common/hooks/useScrollToTop';
import { ROUTE_NAMES } from '~common/constants';
import { useGetSearchResultsQuery } from '~common/services/tmdb';
import useLazyImages from '~common/hooks/useLazyImages';
import noImage from '~assets/img/no-image.svg';
import noUserImage from '~assets/img/no-user-photo.svg';

const searchPathsToNames = {
  [SEARCH_PATHS.movie]: 'Movies',
  [SEARCH_PATHS.tv]: 'TV Shows',
  [SEARCH_PATHS.person]: 'People',
};

const getSelectionBarData = createSelector(
  (data) => data,
  (searchData) => {
    if (!ifIsData(searchData)) return null;

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
  }
);

const useSearchResultsParams = () => {
  const location = useLocation();
  const prevSearchRef = useRef({ query: null, page: null });

  const { searchIn, query, isSearchChanged } = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const currentQuery = params.get('query');
    const currantPage = params.get('page');

    // To skip re-render on searchIn.
    const isChanged =
      prevSearchRef.current.query !== currentQuery ||
      prevSearchRef.current.page !== currantPage;

    prevSearchRef.current = { query: currentQuery, page: currantPage };

    return {
      query: currentQuery,
      isSearchChanged: isChanged,
      searchIn: params.get('searchIn'),
    };
  }, [location.search]);

  return { searchIn, query, isSearchChanged };
};

const SearchResults = () => {
  useScrollToTop();

  const history = useHistory();
  const { url } = useRouteMatch();
  const { containerRef, focus } = useFocus();

  const { isSearchChanged, query, searchIn } = useSearchResultsParams();
  const { page, changePage } = usePagination();

  const {
    data: searchData,
    isLoading,
    error,
    isFetching,
  } = useGetSearchResultsQuery(
    { page, query, searchIn },
    { skip: !query || !isSearchChanged }
  );

  useErrorHandler(error);
  useLazyImages({
    isLoading: isFetching,
    triggers: [searchIn, page],
  });

  const changePageHandler = (event, newPage) => {
    if (!changePage(newPage));
    focus();
  };

  const selectHandler = (e, searchInValue) => {
    const params = new URLSearchParams();

    params.set('searchIn', searchInValue);
    params.set('query', query);
    history.push(`${url}?${params}`);
  };

  const totalPages = searchData?.[searchIn].total_pages;
  const selectionBarData = getSelectionBarData(searchData);

  let content;

  if (!isFetching && !ifIsData(selectionBarData?.[searchIn].data)) {
    content = (
      <NoContent
        message={`There are no ${searchPathsToNames[
          searchIn
        ].toLowerCase()} that matched your query.`}
      />
    );
  } else {
    const data = selectionBarData?.[searchIn].data;

    const searchInToCardsToMap = {
      [SEARCH_PATHS.person]: (
        <PersonCards
          isLoading={isFetching}
          cardsData={data}
          routeName={ROUTE_NAMES.person}
          imgData={{
            basePath: IMG_BASE_URL,
            size: IMG_SIZES.profile.h632,
            fallback: noUserImage,
          }}
        />
      ),

      [SEARCH_PATHS.movie]: (
        <MovieCards
          isLoading={isFetching}
          cardsData={data}
          routeName={ROUTE_NAMES.movie}
          imgData={{
            basePath: IMG_BASE_URL,
            size: IMG_SIZES.poster.w342,
            fallback: noImage,
          }}
        />
      ),

      [SEARCH_PATHS.tv]: (
        <TVShowCards
          isLoading={isFetching}
          cardsData={data}
          routeName={ROUTE_NAMES.tvShow}
          imgData={{
            basePath: IMG_BASE_URL,
            size: IMG_SIZES.poster.w342,
            fallback: noImage,
          }}
        />
      ),
    };

    content = <CardsGrid>{searchInToCardsToMap[searchIn]}</CardsGrid>;
  }

  return (
    <>
      <Spacer />

      <MainContent>
        <MainContainer>
          <PageGrid>
            <SelectionBar
              itemSkeletonAmount={Object.keys(searchPathsToNames).length}
              isLoading={isFetching}
              title="Search Results"
              data={selectionBarData}
              selectHandler={selectHandler}
              selected={searchIn}
            />

            <div>
              <FocusableContainer containerRef={containerRef} />

              {content}

              <Pagination
                isLoading={isLoading}
                isFetching={isFetching}
                page={page}
                totalPages={totalPages}
                changePageHandler={changePageHandler}
              />
            </div>
          </PageGrid>
        </MainContainer>
      </MainContent>
    </>
  );
};

export default SearchResults;
