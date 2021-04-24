import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';

import useScrollToTop from '~common/hooks/useScrollToTop';
import useInfiniteScroll from '~common/hooks/useInfiniteScroll';
import { checkIfIsData } from '~common/utils/getData';
import types from '~common/types';

import CardsGrid from '~components/Cards/CardsGrid';
import MainContainer from '~components/MainContainer';
import LoadMoreBtn from '~components/LoadMoreBtn';
import CardsPage from '~components/Cards/CardsPage';
import RouteHeader from '~components/RouteHeader';
import MainContent from '~components/MainContent';
import PersonCards from './components/PersonCards';

import { peopleActions } from './peopleSlice';

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

    dispatch(peopleActions.fetchPeople({ page: nextPage }));
  }, [dispatch, nextPage]);

  const infiniteScrollRef = useInfiniteScroll(
    loadMoreHandler,
    isLoadMore,
    isLoading,
    isMoreData
  );

  useEffect(() => {
    dispatch(peopleActions.fetchPeople());

    return () => {
      dispatch(peopleActions.resetState());
    };
  }, [dispatch]);

  const cards = checkIfIsData(people) ? (
    <CardsPage data={people} CardsComponent={PersonCards} />
  ) : (
    'Loading...'
  );

  return (
    <MainContainer>
      <RouteHeader titleName={titleName} />

      <MainContent>
        <CardsGrid>{cards}</CardsGrid>
      </MainContent>

      <LoadMoreBtn
        infiniteScrollRef={infiniteScrollRef}
        loadMoreHandler={loadMoreHandler}
        isMoreData={isMoreData}
        isLoading={isLoading}
      />
    </MainContainer>
  );
};

People.propTypes = {
  titleName: types.pageTitle,
};

export default People;
