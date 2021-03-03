import CardsGrid from '../common/components/Cards/CardsGrid';
import PageContainer from '../common/components/PageContainer';
import PersonCards from './components/PersonCards';

import { peopleData } from '../common/fake-data';
import LoadMoreBtn from '../common/components/LoadMoreBtn';
import useScrollToTop from '../common/hooks/useScrollToTop';

const People = ({ routeName }) => {
  useScrollToTop();

  return (
    <PageContainer routeName={routeName}>
      <CardsGrid>
        <PersonCards cardsData={peopleData.results} />
      </CardsGrid>

      <LoadMoreBtn />
    </PageContainer>
  );
};

export default People;
