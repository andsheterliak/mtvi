import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import Spacer from '~common/components/Spacer';
import MainContent from '~common/components/MainContent';
import TVShowHeader from './TVShowHeader';

import { tvShowActions } from './tvShowSlice';

const TVShow = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { tvShow } = useSelector((state) => state.tvShow);

  useEffect(() => {
    dispatch(tvShowActions.fetchTVShow(id));

    return () => {
      dispatch(tvShowActions.resetState());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Spacer />

      {tvShow ? (
        <MainContent>
          <TVShowHeader />
        </MainContent>
      ) : (
        'Loading'
      )}
    </>
  );
};

export default TVShow;
