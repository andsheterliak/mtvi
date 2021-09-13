import { useErrorHandler } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import { useGetMovieQuery } from '~/api/tmdb';
import { Layout, MainContainer, MainContent, Separator, Spacer } from '~/shared/components';
import { useLazyImages, useScrollToTop } from '~/shared/hooks';
import { IdParam } from '../types';
import { MovieHeader } from './MovieHeader';
import { MovieVideos } from './MovieVideos';
import { TopBilledCast } from './TopBilledCast';

export const Movie = () => {
  useScrollToTop();

  const { id } = useParams<IdParam>();
  const movieQuery = useGetMovieQuery(id);

  useErrorHandler(movieQuery.error);
  useLazyImages({ isLoading: movieQuery.isLoading, triggers: [movieQuery.data] });

  return (
    <>
      <Spacer />

      <MainContent>
        <MainContainer>
          <Layout>
            <MovieHeader />

            <Separator />

            <TopBilledCast />

            <Separator />

            <MovieVideos />
          </Layout>
        </MainContainer>
      </MainContent>
    </>
  );
};
