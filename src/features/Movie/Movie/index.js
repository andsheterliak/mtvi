import useScrollToTop from '~common/hooks/useScrollToTop';

import Spacer from '~components/Spacer';
import MainContent from '~components/MainContent';
import Layout from '~components/Layout';
import Separator from '~components/Separator';
import MainContainer from '~components/MainContainer';
import MovieHeader from './MovieHeader';
import TopBilledCast from './TopBilledCast';
import Videos from './Videos';

import useMovieState from '../hooks/useMovieState';

const Movie = () => {
  useScrollToTop();

  const { data } = useMovieState();

  return (
    <>
      <Spacer />

      {data ? (
        <MainContent>
          <MovieHeader />

          <Spacer />

          <MainContainer>
            <Layout>
              <TopBilledCast />

              <Separator />

              <Videos />
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
