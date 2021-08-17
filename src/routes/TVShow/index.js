import { useErrorHandler } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import { useGetTVShowQuery } from '~/api/tmdb';
import {
  Layout,
  MainContainer,
  MainContent,
  Separator,
  Spacer,
} from '~/shared/components';
import { useLazyImages, useScrollToTop } from '~/shared/hooks';
import { LastSeason } from './LastSeason';
import { SeriesCast } from './SeriesCast';
import { TVShowHeader } from './TVShowHeader';
import { TVShowVideos } from './TVShowVideos';

export const TVShow = () => {
  useScrollToTop();

  const { id } = useParams();
  const { data, error, isLoading } = useGetTVShowQuery(id);

  useErrorHandler(error);
  useLazyImages({ isLoading, triggers: [data] });

  return (
    <>
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
