import useScrollToTop from '~common/hooks/useScrollToTop';

import Spacer from '~components/Spacer';
import MainContent from '~components/MainContent';
import Layout from '~components/Layout';
import MovieHeader from './MovieHeader';
import TopBilledCast from './TopBilledCast';
import useMovieState from '../hooks/useMovieState';
import Videos from './Videos';

const Movie = () => {
  useScrollToTop();

  const { data } = useMovieState();

  return (
    <>
      <Spacer />

      {data ? (
        <MainContent>
          <Layout>
            <MovieHeader />

            <TopBilledCast />

            <Videos />
          </Layout>
        </MainContent>
      ) : (
        'Loading'
      )}
    </>
  );
};

export default Movie;
