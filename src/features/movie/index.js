import { useParams } from 'react-router-dom';

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

const Movie = () => {
  useScrollToTop();

  const { id } = useParams();
  const { data } = useGetMovieQuery(id);

  return (
    <>
      <Spacer />

      {data ? (
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
      ) : (
        'Loading'
      )}
    </>
  );
};

export default Movie;
