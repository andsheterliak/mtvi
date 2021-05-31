import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { tvShowActions } from '../tvShowSlice';

const useTVShowsState = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data } = useSelector((state) => state.tvShow);

  useEffect(() => {
    dispatch(tvShowActions.fetchData(id));

    return () => {
      dispatch(tvShowActions.resetState());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data };
};

export default useTVShowsState;
