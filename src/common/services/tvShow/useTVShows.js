import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import { tvShowActions } from './tvShowSlice';

const useTVShows = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(tvShowActions.fetchData(id));

    return () => {
      dispatch(tvShowActions.resetState());
    };
  }, [dispatch, id]);
};

export default useTVShows;
