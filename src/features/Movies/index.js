import {
  IMG_BASE_URL,
  IMG_SIZES,
  MOVIES_DEFAULT_OPTIONS,
  SORT_MOVIES_BY_OPTIONS,
  USER_SCORE_RANGE,
} from '~common/tmdb-config';
import useScrollToTop from '~common/hooks/useScrollToTop';
import { ifIsData } from '~common/utils/getData';

import Adjustment from '~components/Adjustment';
import MainContainer from '~components/MainContainer';
import CardsGrid from '~components/grids/CardsGrid';
import Cards from '~components/Cards';
import RouteHeader from '~components/RouteHeader';
import MainContent from '~components/MainContent';
import Pagination, { usePagination } from '~components/Pagination';
import FocusableContainer, { useFocus } from '~components/FocusableContainer';
import noImage from '~assets/img/no-image.svg';
import { MOVIES_OPTIONS_STORAGE_NAME } from './moviesConstants';
import { ROUTE_NAMES } from '~common/constants';
import { useGetMoviesQuery } from '~common/services/tmdb';
import useOptions from '~common/hooks/useOptions';

const Movies = ({ titleName }) => {
  useScrollToTop();

  const { focus, containerRef } = useFocus();
  const { page, changePage } = usePagination();

  const { options, setOptions } = useOptions({
    storageOptionsName: MOVIES_OPTIONS_STORAGE_NAME,
    defaultOptions: MOVIES_DEFAULT_OPTIONS,
  });

  const { data, isLoading } = useGetMoviesQuery({ options, page });

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
        sortByOptions={SORT_MOVIES_BY_OPTIONS}
        userScoreRange={USER_SCORE_RANGE}
        dateTitle="Release Dates"
        modalTitle="Adjust Movies"
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

export default Movies;
