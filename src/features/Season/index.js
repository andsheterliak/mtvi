import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';
import BackToHeader from '~components/BackToHeader';
import MainContent from '~components/MainContent';
import Spacer from '~components/Spacer';
import noImg from '~assets/img/no-image.svg';
import { seasonActions } from './seasonSlice';
import { ROUTE_NAMES } from '~common/constants';

const Season = () => {
  const { id, seasonNumber } = useParams();
  const dispatch = useDispatch();

  console.log('params', ':', id, seasonNumber);

  const { data } = useSelector((state) => state.season);

  useEffect(() => {
    dispatch(seasonActions.fetchData({ id, seasonNumber }));

    return () => {
      dispatch(seasonActions.resetState());
    };
  }, [dispatch, id, seasonNumber]);

  let imgPath;

  if (data) {
    console.log('data', ':', data);

    imgPath = data.poster_path
      ? `${IMG_BASE_URL}${IMG_SIZES.poster}${data.poster_path}`
      : noImg;
  }

  return (
    <>
      <Spacer />

      {data ? (
        <MainContent>
          <BackToHeader
            imgPath={imgPath}
            path={`${ROUTE_NAMES.tvShow}/${id}`}
            linkName="Back to TV Show"
            title={data.name}
          />

          <Spacer />
        </MainContent>
      ) : (
        'Loading...'
      )}
    </>
  );
};

export default Season;
