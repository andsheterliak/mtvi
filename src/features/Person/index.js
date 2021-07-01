import { useParams } from 'react-router';
import { useErrorHandler } from 'react-error-boundary';

import useScrollToTop from '~common/hooks/useScrollToTop';
import { useGetPersonQuery } from '~common/services/tmdb';
import useLazyImages from '~common/hooks/useLazyImages';

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
  const { data, error, isLoading } = useGetPersonQuery(id);

  useErrorHandler(error);
  useLazyImages({ isLoading, triggers: [data] });

  return (
    <>
      <Spacer />

      <MainContent>
        <MainContainer>
          <Layout>
            <PersonHeader isLoading={isLoading} data={data} />

            <Separator />

            <KnownFor isLoading={isLoading} data={data} />

            <Separator />

            <CreditsList isLoading={isLoading} data={data} />
          </Layout>
        </MainContainer>
      </MainContent>
    </>
  );
};

export default Person;
