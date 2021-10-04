import { useErrorHandler } from 'react-error-boundary';
import { Helmet } from 'react-helmet';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import { RovingTabIndexProvider } from 'react-roving-tabindex';
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
  Selection,
  SelectionDataItem,
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

const getSelectionData = (searchData: SearchResultsData | undefined) => {
  if (!searchData) return null;

  const movie: SelectionDataItem<MovieItems> = {
    name: searchPathsToNames.movie,
    amount: searchData.movie.total_results,
    data: searchData.movie.results,
  };

  const tv: SelectionDataItem<TVShowItems> = {
    name: searchPathsToNames.tv,
    amount: searchData.tv.total_results,
    data: searchData.tv.results,
  };

  const person: SelectionDataItem<PersonItems> = {
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
  const searchResultsQuery = useGetSearchResultsQuery({ page, query, searchIn });

  useErrorHandler(searchResultsQuery.error);

  useLazyImages({
    isLoading: searchResultsQuery.isFetching,
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

  const totalPages = searchResultsQuery.data?.[searchIn].total_pages;
  const selectionBarData = getSelectionData(searchResultsQuery.data);

  let content;

  if (
    !searchResultsQuery.isFetching &&
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
    let cards;

    switch (searchIn) {
      case SEARCH_PATHS.movie:
        cards = (
          <MovieCards
            isLoading={searchResultsQuery.isFetching}
            cardsData={selectionBarData?.movie.data}
          />
        );

        break;

      case SEARCH_PATHS.tv:
        cards = (
          <TVShowCards
            isLoading={searchResultsQuery.isFetching}
            cardsData={selectionBarData?.tv.data}
          />
        );

        break;

      case SEARCH_PATHS.person:
        cards = (
          <PersonCards
            isLoading={searchResultsQuery.isFetching}
            cardsData={selectionBarData?.person.data}
          />
        );

        break;

      default:
        break;
    }

    content = (
      <CardsGrid>
        {searchResultsQuery.isFetching ? (
          cards
        ) : (
          <RovingTabIndexProvider options={{ loopAround: true }}>{cards}</RovingTabIndexProvider>
        )}
      </CardsGrid>
    );
  }

  return (
    <>
      {searchResultsQuery.isLoading ? null : (
        <Helmet>
          <title>
            MTvI | Search Results - {query} | Search In - {searchIn}
          </title>

          <meta name="keywords" content={`search, ${query}, ${searchIn}`} />
        </Helmet>
      )}

      <Spacer />

      <MainContent>
        <MainContainer>
          <PageGrid>
            <Selection
              itemSkeletonAmount={Object.keys(searchPathsToNames).length}
              isLoading={searchResultsQuery.isFetching}
              title="Search Results"
              data={selectionBarData}
              selectHandler={selectHandler}
              selected={searchIn}
              tabPanelElement={
                <>
                  <FocusableContainer containerRef={containerRef} />

                  {content}

                  <Pagination
                    isLoading={searchResultsQuery.isLoading}
                    isDisabled={searchResultsQuery.isFetching}
                    page={page}
                    totalPages={totalPages}
                    changePageHandler={changePageHandler}
                  />
                </>
              }
            />
          </PageGrid>
        </MainContainer>
      </MainContent>
    </>
  );
};
