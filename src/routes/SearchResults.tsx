import { useErrorHandler } from 'react-error-boundary';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import {
  MediaTypesKeys,
  MovieItems,
  PersonItems,
  SearchResultsData,
  SEARCH_PATHS,
  TVShowItems,
  useGetSearchResultsQuery,
} from '~/api/tmdb';
import {
  CardsGrid,
  ChangePageHandler,
  FocusableContainer,
  MainContainer,
  MainContent,
  MovieCards,
  NoContent,
  PageGrid,
  Pagination,
  PersonCards,
  SelectHandler,
  SelectionBar,
  SelectionBarItem,
  Spacer,
  TVShowCards,
  useFocus,
  usePagination,
} from '~/shared/components';
import { useLazyImages, useScrollToTop } from '~/shared/hooks';

const searchPathsToNames = {
  [SEARCH_PATHS.movie]: 'Movies',
  [SEARCH_PATHS.tv]: 'TV Shows',
  [SEARCH_PATHS.person]: 'People',
};

const getSelectionBarData = (searchData: SearchResultsData | undefined) => {
  if (!searchData) return null;

  const movie: SelectionBarItem<MovieItems> = {
    name: searchPathsToNames.movie,
    amount: searchData.movie.total_results,
    data: searchData.movie.results,
  };

  const tv: SelectionBarItem<TVShowItems> = {
    name: searchPathsToNames.tv,
    amount: searchData.tv.total_results,
    data: searchData.tv.results,
  };

  const person: SelectionBarItem<PersonItems> = {
    name: searchPathsToNames.person,
    amount: searchData.person.total_results,
    data: searchData.person.results,
  };

  return { movie, tv, person };
};

const useSearchParams = () => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  return {
    query: params.get('query') ?? '',
    searchIn: (params.get('searchIn') as MediaTypesKeys) ?? SEARCH_PATHS.movie,
  };
};

export const SearchResults = () => {
  useScrollToTop();

  const history = useHistory();
  const { url } = useRouteMatch();
  const { containerRef, focus } = useFocus();

  const { query, searchIn } = useSearchParams();
  const { page, changePage } = usePagination();
  const SearchResultsQuery = useGetSearchResultsQuery({ page, query, searchIn });

  useErrorHandler(SearchResultsQuery.error);

  useLazyImages({
    isLoading: SearchResultsQuery.isFetching,
    triggers: [searchIn, page],
  });

  const changePageHandler: ChangePageHandler = (event, newPage) => {
    if (!changePage(newPage)) return;
    focus();
  };

  const selectHandler: SelectHandler = (searchInValue) => {
    const params = new URLSearchParams();

    params.set('searchIn', searchInValue);
    params.set('query', query);
    history.push(`${url}?${params}`);
  };

  const totalPages = SearchResultsQuery.data?.[searchIn].total_pages;
  const selectionBarData = getSelectionBarData(SearchResultsQuery.data);

  let content;

  if (
    !SearchResultsQuery.isFetching &&
    (!selectionBarData || selectionBarData[searchIn].data.length === 0)
  ) {
    content = (
      <NoContent
        message={`There are no ${searchPathsToNames[
          searchIn
        ].toLowerCase()} that matched your query.`}
      />
    );
  } else {
    const searchInToCardsMap = {
      [SEARCH_PATHS.movie]: (
        <MovieCards
          isLoading={SearchResultsQuery.isFetching}
          cardsData={selectionBarData?.movie.data}
        />
      ),

      [SEARCH_PATHS.tv]: (
        <TVShowCards
          isLoading={SearchResultsQuery.isFetching}
          cardsData={selectionBarData?.tv.data}
        />
      ),

      [SEARCH_PATHS.person]: (
        <PersonCards
          isLoading={SearchResultsQuery.isFetching}
          cardsData={selectionBarData?.person.data}
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
              isLoading={SearchResultsQuery.isFetching}
              title="Search Results"
              data={selectionBarData}
              selectHandler={selectHandler}
              selected={searchIn}
            />

            <div>
              <FocusableContainer containerRef={containerRef} />

              {content}

              <Pagination
                isLoading={SearchResultsQuery.isLoading}
                isDisabled={SearchResultsQuery.isFetching}
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
