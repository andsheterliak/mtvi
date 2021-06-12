import { useSelector } from 'react-redux';

import useScrollToTop from '~common/hooks/useScrollToTop';
import { getMovieData } from '~common/services/movie/movieSelectors';
import useMovie from '~common/services/movie/useMovie';

import Spacer from '~components/Spacer';
import MainContent from '~components/MainContent';
import Layout from '~components/Layout';
import Separator from '~components/Separator';
import MainContainer from '~components/MainContainer';
import MovieHeader from './MovieHeader';
import TopBilledCast from './TopBilledCast';
import Videos from './Videos';

const Movie = () => {
  useScrollToTop();
  useMovie();

  const data = useSelector(getMovieData);

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
