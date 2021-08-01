import { useErrorHandler } from 'react-error-boundary';
import {
  IMG_BASE_URL,
  IMG_SIZES,
  MOVIES_DEFAULT_OPTIONS,
  SORT_MOVIES_BY_OPTIONS,
  useGetMoviesQuery,
  USER_SCORE_RANGE,
} from '~/api/tmdb';
import noImage from '~/assets/img/no-image.svg';
import {
  Adjustment,
  CardsGrid,
  FocusableContainer,
  MainContainer,
  MainContent,
  MovieCards,
  NoContent,
  Pagination,
  RouteHeader,
  useFocus,
  usePagination,
} from '~/shared/components';
import { ROUTE_NAMES } from '~/shared/constants';
import { useLazyImages, useOptions, useScrollToTop } from '~/shared/hooks';
import { ifIsData, scrollToTop } from '~/shared/utils';

const MOVIES_OPTIONS_STORAGE_NAME = 'moviesOptions';

export const Movies = ({ titleName }) => {
  useScrollToTop();

  const { focus, containerRef } = useFocus();
  const { page, changePage } = usePagination();

  const { options, setOptions } = useOptions({
    storageOptionsName: MOVIES_OPTIONS_STORAGE_NAME,
    defaultOptions: MOVIES_DEFAULT_OPTIONS,
  });

  const { data, isLoading, isFetching, error } = useGetMoviesQuery({
    options,
    page,
  });

  useErrorHandler(error);
  useLazyImages({ isLoading: isFetching, triggers: [data] });

  const changePageHandler = (event, newPage) => {
    if (!changePage(newPage)) return;
    focus();
  };

  const setDefault = () => {
    setOptions(MOVIES_DEFAULT_OPTIONS);
    changePage(1);
    scrollToTop();
  };

  const changeOptions = (newOptions) => {
    setOptions(newOptions);
    changePage(1);
    scrollToTop();
  };

  const isData = ifIsData(data?.results);

  const cards =
    !isFetching && !isData ? (
      <NoContent message="There is no data on such movies." />
    ) : (
      <CardsGrid>
        <MovieCards
          isLoading={isFetching}
          cardsData={data?.results}
          routeName={ROUTE_NAMES.movie}
          imgData={{
            basePath: IMG_BASE_URL,
            size: IMG_SIZES.poster.w342,
            fallback: noImage,
          }}
        />
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
        isDisabled={isFetching}
      />

      <FocusableContainer containerRef={containerRef} />

      <MainContent>{cards}</MainContent>

      <Pagination
        isLoading={isLoading}
        isDisabled={isFetching}
        page={page}
        totalPages={data?.total_pages}
        changePageHandler={changePageHandler}
      />
    </MainContainer>
  );
};
