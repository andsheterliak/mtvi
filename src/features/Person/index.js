import { useParams } from 'react-router';

import useScrollToTop from '~common/hooks/useScrollToTop';
import { useGetPersonQuery } from '~common/services/tmdb';

import MainContainer from '~components/MainContainer';
import Layout from '~components/Layout';
import Spacer from '~components/Spacer';
import MainContent from '~components/MainContent';
import PersonHeader from './PersonHeader';
import CreditsList from './CreditsList';
import KnownFor from './KnownFor';

import Separator from '~components/Separator';

const Person = () => {
  useScrollToTop();

  const { id } = useParams();
  const { data } = useGetPersonQuery(id);

  return (
    <>
      <Spacer />

      {data ? (
        <MainContent>
          <MainContainer>
            <Layout>
              <PersonHeader />

              <Separator />

              <KnownFor />

              <Separator />

              <CreditsList />
            </Layout>
          </MainContainer>
        </MainContent>
      ) : (
        'Loading'
      )}
    </>
  );
};

export default Person;
