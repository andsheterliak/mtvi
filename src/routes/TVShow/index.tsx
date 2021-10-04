import { useErrorHandler } from 'react-error-boundary';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useGetTVShowQuery } from '~/api/tmdb';
import { Layout, MainContainer, MainContent, Separator, Spacer } from '~/shared/components';
import { useLazyImages, useScrollToTop } from '~/shared/hooks';
import { IdParam } from '../types';
import { LastSeason } from './LastSeason';
import { SeriesCast } from './SeriesCast';
import { TVShowHeader } from './TVShowHeader';
import { TVShowVideos } from './TVShowVideos';

export const TVShow = () => {
  useScrollToTop();

  const { id } = useParams<IdParam>();
  const tvShowQuery = useGetTVShowQuery(id);

  useErrorHandler(tvShowQuery.error);
  useLazyImages({ isLoading: tvShowQuery.isLoading, triggers: [tvShowQuery.data] });

  return (
    <>
      {tvShowQuery.isLoading ? null : (
        <Helmet>
          <title>MTvI | {tvShowQuery.data!.name}</title>
          <meta name="keywords" content={tvShowQuery.data!.name} />
        </Helmet>
      )}

      <Spacer />

      <MainContent>
        <MainContainer>
          <Layout>
            <TVShowHeader />

            <Separator />

            <SeriesCast />

            <Separator />

            <LastSeason />

            <Separator />

            <TVShowVideos />
          </Layout>
        </MainContainer>
      </MainContent>
    </>
  );
};
