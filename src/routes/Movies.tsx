import { useErrorHandler } from 'react-error-boundary';
import {
  MOVIES_DEFAULT_OPTIONS,
  Options,
  SORT_MOVIES_BY_OPTIONS,
  useGetMoviesQuery,
  USER_SCORE_RANGE,
} from '~/api/tmdb';
import {
  Adjustment,
  CardsGrid,
  ChangePageHandler,
  FocusableContainer,
  MainContainer,
  MainContent,
  MovieCards,
  NoContent,
  PageTitleName,
  Pagination,
  RouteHeader,
  useFocus,
  usePagination,
} from '~/shared/components';
import { useLazyImages, useScrollToTop, useStorage } from '~/shared/hooks';
import { scrollToTop } from '~/shared/utils';

const MOVIES_OPTIONS_STORAGE_NAME = 'moviesOptions';

export type MoviesProps = {
  titleName: PageTitleName;
};

export const Movies = ({ titleName }: MoviesProps) => {
  useScrollToTop();

  const { focus, containerRef } = useFocus();
  const { page, changePage } = usePagination();

  const [options, setOptions] = useStorage<Options>({
    name: MOVIES_OPTIONS_STORAGE_NAME,
    defaultValue: MOVIES_DEFAULT_OPTIONS,
  });

  const moviesQuery = useGetMoviesQuery({ options, page });

  useErrorHandler(moviesQuery.error);
  useLazyImages({ isLoading: moviesQuery.isFetching, triggers: [moviesQuery.data] });

  const changePageHandler: ChangePageHandler = (event, newPage) => {
    if (!changePage(newPage)) return;
    focus();
  };

  const setDefault = () => {
    setOptions(MOVIES_DEFAULT_OPTIONS);
    changePage(1);
    scrollToTop();
  };

  const changeOptions = (newOptions: Options) => {
    setOptions(newOptions);
    changePage(1);
    scrollToTop();
  };

  const isData = moviesQuery.isSuccess && moviesQuery.data.results.length !== 0;

  const cards =
    !moviesQuery.isFetching && !isData ? (
      <NoContent message="There is no data on such movies." />
    ) : (
      <CardsGrid>
        <MovieCards isLoading={moviesQuery.isFetching} cardsData={moviesQuery.data?.results} />
      </CardsGrid>
    );

  return (
    <MainContainer>
      <RouteHeader titleName={titleName} />

      <Adjustment
        sortByOptions={SORT_MOVIES_BY_OPTIONS}
        userScoreRange={USER_SCORE_RANGE}
        dateTitle="Release Dates"
        modalTitle="Adjust Movies"
        onAccept={changeOptions}
        onSetDefault={setDefault}
        initialOptions={options}
        defaultOptions={MOVIES_DEFAULT_OPTIONS}
        isDisabled={moviesQuery.isFetching}
      />

      <FocusableContainer containerRef={containerRef} />

      <MainContent>{cards}</MainContent>

      <Pagination
        isLoading={moviesQuery.isLoading}
        isDisabled={moviesQuery.isFetching}
        page={page}
        totalPages={moviesQuery.data?.total_pages}
        changePageHandler={changePageHandler}
      />
    </MainContainer>
  );
};