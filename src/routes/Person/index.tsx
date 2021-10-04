import { useErrorHandler } from 'react-error-boundary';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';
import { useGetPersonQuery } from '~/api/tmdb';
import { Layout, MainContainer, MainContent, Separator, Spacer } from '~/shared/components';
import { useLazyImages, useScrollToTop } from '~/shared/hooks';
import { IdParam } from '../types';
import { CreditsList } from './CreditsList';
import { KnownFor } from './KnownFor';
import { PersonHeader } from './PersonHeader';

export const Person = () => {
  useScrollToTop();

  const { id } = useParams<IdParam>();
  const personQuery = useGetPersonQuery(id);

  useErrorHandler(personQuery.error);
  useLazyImages({ isLoading: personQuery.isLoading, triggers: [personQuery.data] });

  return (
    <>
      {personQuery.isLoading ? null : (
        <Helmet>
          <title>MTvI | {personQuery.data!.name}</title>
          <meta name="keywords" content={personQuery.data!.name} />
        </Helmet>
      )}

      <Spacer />

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
    </>
  );
};
