import { useErrorHandler } from 'react-error-boundary';
import {
  IMG_BASE_URL,
  IMG_SIZES,
  SORT_TV_BY_OPTIONS,
  TV_DEFAULT_OPTIONS,
  useGetTVShowsQuery,
  USER_SCORE_RANGE,
} from '~/api/tmdb';
import noImage from '~/assets/img/no-image.svg';
import {
  Adjustment,
  CardsGrid,
  FocusableContainer,
  MainContainer,
  MainContent,
  NoContent,
  Pagination,
  RouteHeader,
  TVShowCards,
  useFocus,
  usePagination,
} from '~/shared/components';
import { ROUTE_NAMES } from '~/shared/constants';
import { useLazyImages, useOptions, useScrollToTop } from '~/shared/hooks';
import { ifIsData, scrollToTop } from '~/shared/utils';

const TV_OPTIONS_STORAGE_NAME = 'tvShowsOptions';

export const TVShows = ({ titleName }) => {
  useScrollToTop();

  const { focus, containerRef } = useFocus();
  const { page, changePage } = usePagination();

  const { options, setOptions } = useOptions({
    storageOptionsName: TV_OPTIONS_STORAGE_NAME,
    defaultOptions: TV_DEFAULT_OPTIONS,
  });

  const { data, isLoading, isFetching, error } = useGetTVShowsQuery({
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
    setOptions(TV_DEFAULT_OPTIONS);
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
      <NoContent message="There is no data on such TV shows." />
    ) : (
      <CardsGrid>
        <TVShowCards
          isLoading={isFetching}
          cardsData={data?.results}
          routeName={ROUTE_NAMES.tvShow}
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
        sortByOptions={SORT_TV_BY_OPTIONS}
        userScoreRange={USER_SCORE_RANGE}
        dateTitle="Air Dates"
        modalTitle="Adjust TV Shows"
        onAccept={changeOptions}
        initialOptions={options}
        defaultOptions={TV_DEFAULT_OPTIONS}
        onSetDefault={setDefault}
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
