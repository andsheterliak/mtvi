import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';

import CardsGrid from '../common/components/Cards/CardsGrid';
import PageContainer from '../common/components/PageContainer';
import PersonCards from './components/PersonCards';
import LoadMoreBtn from '../common/components/LoadMoreBtn';
import CardsPage from '../common/components/Cards/CardsPage';
import RouteHeader from '../common/components/RouteHeader';

import { peopleActions } from './slices/peopleSlice';
import useScrollToTop from '../common/hooks/useScrollToTop';
import useInfiniteScroll from '../common/hooks/useInfiniteScroll';

const People = ({ titleName }) => {
  useScrollToTop();

  const dispatch = useDispatch();

  const nextPage = useSelector((state) => state.people.page + 1);
  const isMoreData = useSelector((state) => state.people.isMoreData);
  const isLoading = useSelector((state) => state.people.isLoading);
  const isLoadMore = useSelector((state) => state.people.isLoadMore);
  const { people } = useSelector((state) => state.people);

  const loadMoreHandler = useCallback(() => {
    dispatch(peopleActions.loadMorePeople());

    dispatch(peopleActions.fetchPeopleData({ page: nextPage }));
  }, [dispatch, nextPage]);

  const infiniteScrollRef = useInfiniteScroll(
    loadMoreHandler,
    isLoadMore,
    isLoading,
    isMoreData
  );

  useEffect(() => {
    dispatch(peopleActions.resetState());
    dispatch(peopleActions.fetchPeopleData());
  }, [dispatch]);

  const cards = people.length ? (
    <CardsPage data={people} path="/people/" CardsComponent={PersonCards} />
  ) : (
    'Loading...'
  );

  return (
    <PageContainer>
      <RouteHeader titleName={titleName} />

      <main>
        <CardsGrid>{cards}</CardsGrid>
      </main>

      <LoadMoreBtn
        infiniteScrollRef={infiniteScrollRef}
        loadMoreHandler={loadMoreHandler}
        isMoreData={isMoreData}
        isLoading={isLoading}
      />
    </PageContainer>
  );
};

export default People;
