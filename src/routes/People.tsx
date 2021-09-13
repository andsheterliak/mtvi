import { ChangeEvent } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { Page, useGetPeopleQuery } from '~/api/tmdb';
import {
  CardsGrid,
  FocusableContainer,
  MainContainer,
  MainContent,
  NoContent,
  PageTitleName,
  Pagination,
  PersonCards,
  RouteHeader,
  useFocus,
  usePagination,
} from '~/shared/components';
import { useLazyImages, useScrollToTop } from '~/shared/hooks';

export type PeopleProps = {
  titleName: PageTitleName;
};

export const People = ({ titleName }: PeopleProps) => {
  useScrollToTop();

  const { focus, containerRef } = useFocus();
  const { page, changePage } = usePagination();
  const peopleQuery = useGetPeopleQuery({ page });

  useErrorHandler(peopleQuery.error);
  useLazyImages({ isLoading: peopleQuery.isFetching, triggers: [page] });

  const changePageHandler = (event: ChangeEvent<unknown>, newPage: Page) => {
    if (!changePage(newPage)) return;
    focus();
  };

  const isData = peopleQuery.isSuccess && peopleQuery.data.results.length !== 0;

  const cards =
    !peopleQuery.isFetching && !isData ? (
      <NoContent message="No data available for this page." />
    ) : (
      <CardsGrid>
        <PersonCards isLoading={peopleQuery.isFetching} cardsData={peopleQuery.data?.results} />
      </CardsGrid>
    );

  return (
    <MainContainer>
      <RouteHeader titleName={titleName} />

      <FocusableContainer containerRef={containerRef} />

      <MainContent>{cards}</MainContent>

      <Pagination
        isLoading={peopleQuery.isLoading}
        isDisabled={peopleQuery.isFetching}
        page={page}
        totalPages={peopleQuery.data?.total_pages}
        changePageHandler={changePageHandler}
      />
    </MainContainer>
  );
};
