import { useErrorHandler } from 'react-error-boundary';

import {
  TV_DEFAULT_OPTIONS,
  SORT_TV_BY_OPTIONS,
  USER_SCORE_RANGE,
  IMG_BASE_URL,
  IMG_SIZES,
} from '~common/tmdb-config';
import useScrollToTop from '~common/hooks/useScrollToTop';
import { ifIsData } from '~common/utils/getData';

import Adjustment from '~components/Adjustment';
import FocusableContainer, { useFocus } from '~components/FocusableContainer';
import MainContainer from '~components/MainContainer';
import CardsGrid from '~components/grids/CardsGrid';
import RouteHeader from '~components/RouteHeader';
import MainContent from '~components/MainContent';
import NoContent from '~components/NoContent';
import Pagination, { usePagination } from '~components/Pagination';
import TVShowCards from '~components/cards/TVShowCards';
import noImage from '~assets/img/no-image.svg';
import { TV_OPTIONS_STORAGE_NAME } from './tvShowsConstants';
import { ROUTE_NAMES } from '~common/constants';
import { useGetTVShowsQuery } from '~common/services/tmdb';
import useOptions from '~common/hooks/useOptions';
import { scrollToTop } from '~common/utils/dom';
import useLazyImages from '~common/hooks/useLazyImages';

const TVShows = ({ titleName }) => {
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

export default TVShows;
