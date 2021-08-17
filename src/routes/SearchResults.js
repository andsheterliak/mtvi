import { useErrorHandler } from 'react-error-boundary';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import {
  IMG_BASE_URL,
  IMG_SIZES,
  SEARCH_PATHS,
  useGetSearchResultsQuery,
} from '~/api/tmdb';
import noImage from '~/assets/img/no-image.svg';
import noUserImage from '~/assets/img/no-user-photo.svg';
import {
  CardsGrid,
  FocusableContainer,
  MainContainer,
  MainContent,
  MovieCards,
  NoContent,
  PageGrid,
  Pagination,
  PersonCards,
  SelectionBar,
  Spacer,
  TVShowCards,
  useFocus,
  usePagination,
} from '~/shared/components';
import { ROUTE_NAMES } from '~/shared/constants';
import { useLazyImages, useScrollToTop } from '~/shared/hooks';
import { ifIsData } from '~/shared/utils';

const searchPathsToNames = {
  [SEARCH_PATHS.movie]: 'Movies',
  [SEARCH_PATHS.tv]: 'TV Shows',
  [SEARCH_PATHS.person]: 'People',
};

const getSelectionBarData = (searchData) => {
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
};

const useSearchParams = () => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  return {
    query: params.get('query'),
    searchIn: params.get('searchIn'),
  };
};

export const SearchResults = () => {
  useScrollToTop();

  const history = useHistory();
  const { url } = useRouteMatch();
  const { containerRef, focus } = useFocus();

  const { query, searchIn } = useSearchParams();
  const { page, changePage } = usePagination();

  const {
    data: searchData,
    isLoading,
    error,
    isFetching,
  } = useGetSearchResultsQuery({ page, query, searchIn });

  useErrorHandler(error);
  useLazyImages({
    isLoading: isFetching,
    triggers: [searchIn, page],
  });

  const changePageHandler = (event, newPage) => {
    if (!changePage(newPage)) return;
    focus();
  };

  const selectHandler = (event, searchInValue) => {
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

    const searchInToCardsMap = {
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

    content = <CardsGrid>{searchInToCardsMap[searchIn]}</CardsGrid>;
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
