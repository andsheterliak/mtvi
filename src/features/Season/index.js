import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router';

import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';
import { getImagePath } from '~common/utils/getData';
import BackToHeader from '~components/BackToHeader';
import MainContent from '~components/MainContent';
import Spacer from '~components/Spacer';
import noImg from '~assets/img/no-image.svg';
import noWideImg from '~assets/img/no-image-wide.svg';
import { seasonActions } from './seasonSlice';
import { ROUTE_NAMES } from '~common/constants';
import EpisodeCards from './components/EpisodeCards';
import Layout from '~components/Layout';
import MainContainer from '~components/MainContainer';

const Season = () => {
  const { id, seasonNumber } = useParams();
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  const data = useSelector((state) => state.season.data);

  useEffect(() => {
    dispatch(seasonActions.fetchData({ id, seasonNumber }));

    return () => {
      dispatch(seasonActions.resetState());
    };
  }, [dispatch, id, seasonNumber]);

  let imgPath;

  if (data) {
    imgPath = getImagePath({
      basePath: IMG_BASE_URL,
      size: IMG_SIZES.poster,
      path: data.poster_path,
      fallback: noImg,
    });
  }

  return (
    <>
      <Spacer />

      {data ? (
        <Layout>
          <BackToHeader
            imgPath={imgPath}
            path={`/${ROUTE_NAMES.tvShow}/${id}`}
            linkName="Back to TV Show"
            title={data.name}
          />

          <MainContainer>
            <MainContent>
              <EpisodeCards
                data={data.episodes}
                basePath={url}
                imgData={{
                  basePath: IMG_BASE_URL,
                  size: IMG_SIZES.still,
                  fallback: noWideImg,
                }}
              />
            </MainContent>
          </MainContainer>
        </Layout>
      ) : (
        'Loading...'
      )}
    </>
  );
};

export { default as seasonReducer } from './seasonSlice';
export default Season;
