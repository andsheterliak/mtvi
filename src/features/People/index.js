import useScrollToTop from '~common/hooks/useScrollToTop';
import { ifIsData } from '~common/utils/getData';
import { ROUTE_NAMES } from '~common/constants';
import { useGetPeopleQuery } from '~common/services/tmdb';
import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';

import FocusableContainer, { useFocus } from '~components/FocusableContainer';
import CardsGrid from '~components/grids/CardsGrid';
import MainContainer from '~components/MainContainer';
import RouteHeader from '~components/RouteHeader';
import MainContent from '~components/MainContent';
import PersonCards from './components/PersonCards';
import Pagination, { usePagination } from '~components/Pagination';
import noImage from '~assets/img/no-image.svg';

const People = ({ titleName }) => {
  useScrollToTop();

  const { focus, containerRef } = useFocus();
  const { page, changePage } = usePagination();
  const { data, isLoading } = useGetPeopleQuery({ page });

  const changePageHandler = (event, newPage) => {
    if (!changePage(newPage)) return;
    focus();
  };

  const isData = ifIsData(data);

  const cards = isData ? (
    <PersonCards
      cardsData={data.results}
      routeName={ROUTE_NAMES.person}
      imgData={{
        basePath: IMG_BASE_URL,
        size: IMG_SIZES.profile,
        fallback: noImage,
      }}
    />
  ) : (
    'Loading...'
  );

  return (
    <MainContainer>
      <RouteHeader titleName={titleName} />

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

export default People;
