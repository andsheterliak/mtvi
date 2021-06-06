import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { tvShowActions } from '../tvShowSlice';

const useTVShowsState = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const data = useSelector((state) => state.tvShow.data);

  useEffect(() => {
    dispatch(tvShowActions.fetchData(id));

    return () => {
      dispatch(tvShowActions.resetState());
    };
  }, [dispatch, id]);

  return { data };
};

export default useTVShowsState;
