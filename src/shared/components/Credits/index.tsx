import { EpisodeCredits, MovieCredits, TVShowCredits } from '~/api/tmdb';
import { Layout } from '~/shared/components/Layout';
import { MainContainer } from '~/shared/components/MainContainer';
import { MainContent } from '~/shared/components/MainContent';
import { NoContent } from '~/shared/components/NoContent';
import { Spacer } from '~/shared/components/Spacer';
import { RouteName } from '~/shared/constants';
import { IsLoading } from '~/shared/types';
import { CreditSections } from './CreditSections';
import { getCreditsData } from './utils';

type Props = {
  isLoading: IsLoading;
  routeName: RouteName;
  header: JSX.Element;
  credits: MovieCredits | TVShowCredits | EpisodeCredits | undefined;
};

export const Credits = ({ credits, header, routeName, isLoading }: Props) => {
  const content =
    !isLoading && !credits ? (
      <NoContent message="We don't have added any credits." />
    ) : (
      <CreditSections isLoading={isLoading} data={getCreditsData(credits)} routeName={routeName} />
    );

  return (
    <>
      <Spacer />

      <Layout>
        {header}

        <MainContent>
          <MainContainer>
            <Layout>{content}</Layout>
          </MainContainer>
        </MainContent>
      </Layout>
    </>
  );
};
