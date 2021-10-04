import { ChangeEvent } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { Helmet } from 'react-helmet';
import { RovingTabIndexProvider } from 'react-roving-tabindex';
import {
  Options,
  Page,
  SORT_TV_BY_OPTIONS,
  TV_DEFAULT_OPTIONS,
  useGetTVShowsQuery,
  USER_SCORE_RANGE,
} from '~/api/tmdb';
import {
  Adjustment,
  CardsGrid,
  FocusableContainer,
  MainContainer,
  MainContent,
  NoContent,
  PageTitleName,
  Pagination,
  RouteHeader,
  TVShowCards,
  useFocus,
  usePagination,
} from '~/shared/components';
import { useLazyImages, useScrollToTop, useStorage } from '~/shared/hooks';
import { scrollToTop } from '~/shared/utils';

const TV_OPTIONS_STORAGE_NAME = 'tvShowsOptions';

export type TVShowsProps = {
  titleName: PageTitleName;
};

export const TVShows = ({ titleName }: TVShowsProps) => {
  useScrollToTop();

  const { focus, containerRef } = useFocus();
  const { page, changePage } = usePagination();

  const [options, setOptions] = useStorage<Options>({
    name: TV_OPTIONS_STORAGE_NAME,
    defaultValue: TV_DEFAULT_OPTIONS,
  });

  const tvShowsQuery = useGetTVShowsQuery({
    options,
    page,
  });

  useErrorHandler(tvShowsQuery.error);
  useLazyImages({ isLoading: tvShowsQuery.isFetching, triggers: [tvShowsQuery.data] });

  const changePageHandler = (event: ChangeEvent<unknown>, newPage: Page) => {
    if (!changePage(newPage)) return;
    focus();
  };

  const setDefault = () => {
    setOptions(TV_DEFAULT_OPTIONS);
    changePage(1);
    scrollToTop();
  };

  const changeOptions = (newOptions: Options) => {
    setOptions(newOptions);
    changePage(1);
    scrollToTop();
  };

  const isData = tvShowsQuery.isSuccess && tvShowsQuery.data.results.length !== 0;

  const cards =
    !tvShowsQuery.isFetching && !isData ? (
      <NoContent message="There is no data on such TV shows." />
    ) : (
      <CardsGrid>
        {tvShowsQuery.isFetching ? (
          <TVShowCards isLoading={tvShowsQuery.isFetching} cardsData={tvShowsQuery.data?.results} />
        ) : (
          <RovingTabIndexProvider options={{ loopAround: true }}>
            <TVShowCards
              isLoading={tvShowsQuery.isFetching}
              cardsData={tvShowsQuery.data?.results}
            />
          </RovingTabIndexProvider>
        )}
      </CardsGrid>
    );

  return (
    <>
      <Helmet>
        <title>MTvI | {titleName}</title>
        <meta name="keywords" content={titleName} />
      </Helmet>

      <MainContainer>
        <RouteHeader titleName={titleName} />

        <Adjustment
          sortByOptions={SORT_TV_BY_OPTIONS}
          userScoreRange={USER_SCORE_RANGE}
          dateTitle="Air Dates"
          modalTitle="Adjust TV Shows"
          onAccept={changeOptions}
          onSetDefault={setDefault}
          initialOptions={options}
          defaultOptions={TV_DEFAULT_OPTIONS}
          isDisabled={tvShowsQuery.isFetching}
        />

        <FocusableContainer containerRef={containerRef} />

        <MainContent>{cards}</MainContent>

        <Pagination
          isLoading={tvShowsQuery.isLoading}
          isDisabled={tvShowsQuery.isFetching}
          page={page}
          totalPages={tvShowsQuery.data?.total_pages}
          changePageHandler={changePageHandler}
        />
      </MainContainer>
    </>
  );
};
