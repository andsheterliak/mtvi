import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import { episodeActions } from './episodeSlice';

const useEpisode = () => {
  const { id, seasonNumber, episodeNumber } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(episodeActions.fetchData({ id, seasonNumber, episodeNumber }));

    return () => {
      dispatch(episodeActions.resetState());
    };
  }, [dispatch, episodeNumber, id, seasonNumber]);

  return { params: { id, seasonNumber, episodeNumber } };
};

export default useEpisode;
