import { useParams } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';

import useScrollToTop from '~common/hooks/useScrollToTop';

import Spacer from '~components/Spacer';
import MainContent from '~components/MainContent';
import Layout from '~components/Layout';
import Separator from '~components/Separator';
import MainContainer from '~components/MainContainer';
import MovieHeader from './MovieHeader';
import TopBilledCast from './TopBilledCast';
import MovieVideos from './MovieVideos';
import { useGetMovieQuery } from '~common/services/tmdb';
import useLazyImages from '~common/hooks/useLazyImages';

const Movie = () => {
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

export default Movie;
