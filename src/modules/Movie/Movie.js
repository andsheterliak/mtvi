import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import Spacer from '~components/Spacer';
import MainContent from '~components/MainContent';
import MovieHeader from './MovieHeader';

import { movieActions } from './movieSlice';

const Movie = () => {
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
          <MovieHeader />
        </MainContent>
      ) : (
        'Loading'
      )}
    </>
  );
};

export default Movie;
