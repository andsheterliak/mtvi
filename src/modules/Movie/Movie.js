import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import Spacer from '../common/components/Spacer';
import MainContent from '../common/components/MainContent';
import MovieHeader from './MovieHeader';

import useScrollToTop from '../common/hooks/useScrollToTop';
import { movieActions } from './movieSlice';

const Movie = () => {
  useScrollToTop();

  const dispatch = useDispatch();
  const { id } = useParams();

  const { movie } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(movieActions.fetchMovie(id));

    return () => {
      dispatch(movieActions.resetState());
    };
  }, [dispatch, id]);

  return (
    <>
      <Spacer />

      {movie ? (
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
