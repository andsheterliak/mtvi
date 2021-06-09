import { useSelector } from 'react-redux';

import useScrollToTop from '~common/hooks/useScrollToTop';

import Spacer from '~components/Spacer';
import MainContent from '~components/MainContent';
import Layout from '~components/Layout';
import Separator from '~components/Separator';
import MainContainer from '~components/MainContainer';
import MovieHeader from './MovieHeader';
import TopBilledCast from './TopBilledCast';
import Videos from './Videos';

import useMovie from '../hooks/useMovie';
import { getData } from '../movieSelectors';

const Movie = () => {
  useScrollToTop();
  useMovie();

  const data = useSelector(getData);

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
