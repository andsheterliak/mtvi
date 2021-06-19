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
import Cards from '~components/Cards';
import MainContainer from '~components/MainContainer';
import CardsGrid from '~components/grids/CardsGrid';
import RouteHeader from '~components/RouteHeader';
import MainContent from '~components/MainContent';
import Pagination, { usePagination } from '~components/Pagination';
import noImage from '~assets/img/no-image.svg';
import { TV_OPTIONS_STORAGE_NAME } from './tvShowsConstants';
import { ROUTE_NAMES } from '~common/constants';
import { useGetTVShowsQuery } from '~common/services/tmdb';
import useOptions from '~common/hooks/useOptions';

const TVShows = ({ titleName }) => {
  useScrollToTop();

  const { focus, containerRef } = useFocus();
  const { page, changePage } = usePagination();

  const { options, setOptions } = useOptions({
    storageOptionsName: TV_OPTIONS_STORAGE_NAME,
    defaultOptions: TV_DEFAULT_OPTIONS,
  });

  useScrollToTop({ triggers: [options] });

  const { data, isLoading, error } = useGetTVShowsQuery({ options, page });

  useErrorHandler(error);

  const changePageHandler = (event, newPage) => {
    if (!changePage(newPage)) return;
    focus();
  };

  const changeOptions = (newOptions) => {
    setOptions(newOptions);
    changePage(1);
  };

  const isData = ifIsData(data);

  const cards = isData ? (
    <Cards
      cardsData={data.results}
      routeNames={{ tvShow: ROUTE_NAMES.tvShow, movie: ROUTE_NAMES.movie }}
      imgData={{
        basePath: IMG_BASE_URL,
        size: IMG_SIZES.poster,
        fallback: noImage,
      }}
    />
  ) : (
    'Loading...'
  );

  return (
    <MainContainer>
      <RouteHeader titleName={titleName} />

      <Adjustment
        sortByOptions={SORT_TV_BY_OPTIONS}
        userScoreRange={USER_SCORE_RANGE}
        dateTitle="Air Dates"
        modalTitle="Adjust TV Shows"
        onAcceptCallback={changeOptions}
        initialOptions={options}
      />

      <FocusableContainer containerRef={containerRef}>
        <MainContent>
          <CardsGrid>{cards}</CardsGrid>
        </MainContent>
      </FocusableContainer>

      {isData && (
        <Pagination
          isLoading={isLoading}
          page={page}
          totalPages={data.total_pages}
          changePageHandler={changePageHandler}
        />
      )}
    </MainContainer>
  );
};

export default TVShows;
