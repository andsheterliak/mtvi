import { useErrorHandler } from 'react-error-boundary';
import { IMG_BASE_URL, IMG_SIZES, useGetPeopleQuery } from '~/api/tmdb';
import noUserImage from '~/assets/img/no-user-photo.svg';
import {
  CardsGrid,
  FocusableContainer,
  MainContainer,
  MainContent,
  NoContent,
  Pagination,
  PersonCards,
  RouteHeader,
  useFocus,
  usePagination,
} from '~/components';
import { ROUTE_NAMES } from '~/constants';
import { useLazyImages, useScrollToTop } from '~/hooks';
import { ifIsData } from '~/utils';

export const People = ({ titleName }) => {
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
            size: IMG_SIZES.profile.h632,
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
