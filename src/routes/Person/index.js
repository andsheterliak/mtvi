import { useErrorHandler } from 'react-error-boundary';
import { useParams } from 'react-router';
import { useGetPersonQuery } from '~/api/tmdb';
import {
  Layout,
  MainContainer,
  MainContent,
  Separator,
  Spacer,
} from '~/shared/components';
import { useLazyImages, useScrollToTop } from '~/shared/hooks';
import { CreditsList } from './CreditsList';
import { KnownFor } from './KnownFor';
import { PersonHeader } from './PersonHeader';

export const Person = () => {
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
