import { useErrorHandler } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import {
  Layout,
  MainContainer,
  MainContent,
  Separator,
  Spacer,
} from '~/components';
import { useLazyImages, useScrollToTop } from '~/hooks';
import { useGetTVShowQuery } from '~/services/tmdb';
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
            <TVShowHeader isLoading={isLoading} data={data} />

            <Separator />

            <SeriesCast isLoading={isLoading} data={data} />

            <Separator />

            <LastSeason isLoading={isLoading} data={data} />

            <Separator />

            <TVShowVideos isLoading={isLoading} data={data} />
          </Layout>
        </MainContainer>
      </MainContent>
    </>
  );
};
