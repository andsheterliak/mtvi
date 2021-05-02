import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import useScrollToTop from '~common/hooks/useScrollToTop';

import Spacer from '~components/Spacer';
import MainContent from '~components/MainContent';
import MainContainer from '~components/MainContainer';
import Layout from '~components/Layout';
import MovieHeader from './MovieHeader';

import { movieActions } from './movieSlice';
import TopBilledCast from './TopBilledCast';

const Movie = () => {
  useScrollToTop();

  const dispatch = useDispatch();
  const { id } = useParams();

  const { data } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(movieActions.fetchData(id));

    return () => {
      dispatch(movieActions.resetState());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Spacer />

      {data ? (
        <MainContent>
          <MainContainer>
            <Layout>
              <MovieHeader />

              <TopBilledCast />
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
