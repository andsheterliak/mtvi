import { useErrorHandler } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import { useGetMovieQuery } from '~/api/tmdb';
import {
  Layout,
  MainContainer,
  MainContent,
  Separator,
  Spacer,
} from '~/components';
import { useLazyImages, useScrollToTop } from '~/hooks';
import { MovieHeader } from './MovieHeader';
import { MovieVideos } from './MovieVideos';
import { TopBilledCast } from './TopBilledCast';

export const Movie = () => {
  useScrollToTop();

  const { id } = useParams();
  const { data, error, isLoading } = useGetMovieQuery(id);

  useErrorHandler(error);
  useLazyImages({ isLoading, triggers: [data] });

  return (
    <>
      <Spacer />

      <MainContent>
        <MainContainer>
          <Layout>
            <MovieHeader isLoading={isLoading} data={data} />

            <Separator />

            <TopBilledCast isLoading={isLoading} data={data} />

            <Separator />

            <MovieVideos isLoading={isLoading} data={data} />
          </Layout>
        </MainContainer>
      </MainContent>
    </>
  );
};
