import { useErrorHandler } from 'react-error-boundary';

import useScrollToTop from '~common/hooks/useScrollToTop';
import { ifIsData } from '~common/utils/getData';
import { ROUTE_NAMES } from '~common/constants';
import { useGetPeopleQuery } from '~common/services/tmdb';
import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';
import useLazyImages from '~common/hooks/useLazyImages';

import FocusableContainer, { useFocus } from '~components/FocusableContainer';
import CardsGrid from '~components/grids/CardsGrid';
import MainContainer from '~components/MainContainer';
import RouteHeader from '~components/RouteHeader';
import MainContent from '~components/MainContent';
import NoContent from '~components/NoContent';
import PersonCards from '~components/cards/PersonCards';
import Pagination, { usePagination } from '~components/Pagination';
import noUserImage from '~assets/img/no-user-photo.svg';

const People = ({ titleName }) => {
  useScrollToTop();

  const { focus, containerRef } = useFocus();
  const { page, changePage } = usePagination();
  const { data, isLoading, isFetching, error } = useGetPeopleQuery({ page });

  useErrorHandler(error);
  useLazyImages({ isLoading: isFetching, triggers: [page] });

  const changePageHandler = (event, newPage) => {
    if (!changePage(newPage)) return;
    focus();
  };

  const isData = ifIsData(data?.results);

  const cards =
    !isFetching && !isData ? (
      <NoContent message="No data available for this page." />
    ) : (
      <CardsGrid>
        <PersonCards
          isLoading={isFetching}
          cardsData={data?.results}
          routeName={ROUTE_NAMES.person}
          imgData={{
            basePath: IMG_BASE_URL,
            size: IMG_SIZES.profile,
            fallback: noUserImage,
          }}
        />
      </CardsGrid>
    );

  return (
    <MainContainer>
      <RouteHeader titleName={titleName} />

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

export default People;
