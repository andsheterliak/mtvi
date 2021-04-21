import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import useScrollToTop from '@common/hooks/useScrollToTop';

import Spacer from '@common/components/Spacer';
import MainContent from '@common/components/MainContent';
import TVShowHeader from './TVShowHeader';

import { tvShowActions } from './tvShowSlice';

const TVShow = () => {
  useScrollToTop();

  const dispatch = useDispatch();
  const { id } = useParams();

  const { tvShow } = useSelector((state) => state.tvShow);

  useEffect(() => {
    dispatch(tvShowActions.fetchTVShow(id));

    return () => {
      dispatch(tvShowActions.resetState());
    };
  }, [dispatch, id]);

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
