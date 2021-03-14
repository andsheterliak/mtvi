import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import CardsGrid from '../common/components/Cards/CardsGrid';
import PageContainer from '../common/components/PageContainer';
import PersonCards from './components/PersonCards';
import LoadMoreBtn from '../common/components/LoadMoreBtn';
import useScrollToTop from '../common/hooks/useScrollToTop';
import { peopleActions } from './slices/peopleSlice';

const People = ({ routeName }) => {
  useScrollToTop();
  const dispatch = useDispatch();

  const people = useSelector((state) => state.people.data);

  useEffect(() => {
    dispatch(peopleActions.fetchPeopleData());
  }, [dispatch]);

  return (
    <PageContainer routeName={routeName}>
      <CardsGrid>
        {people.length ? <PersonCards cardsData={people} /> : 'Loading...'}
      </CardsGrid>

      <LoadMoreBtn />
    </PageContainer>
  );
};

export default People;
