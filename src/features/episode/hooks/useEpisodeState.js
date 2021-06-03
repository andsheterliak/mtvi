import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { episodeActions } from '../episodeSlice';

const useEpisodeState = () => {
  const { id, seasonNumber, episodeNumber } = useParams();
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.episode);

  useEffect(() => {
    dispatch(episodeActions.fetchData({ id, seasonNumber, episodeNumber }));

    return () => {
      dispatch(episodeActions.resetState());
    };
  }, [dispatch, episodeNumber, id, seasonNumber]);

  return { data, params: { id, seasonNumber, episodeNumber } };
};

export default useEpisodeState;
