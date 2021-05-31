import AllVideos from '~components/AllVideos';
import BackToHeader from '~components/BackToHeader';

import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';
import useScrollToTop from '~common/hooks/useScrollToTop';
import { ROUTE_NAMES } from '~common/constants';

import noImageImg from '~assets/img/no-image.svg';

import useTVShowsState from './hooks/useTVShowsState';

const TVShowAllVideos = () => {
  useScrollToTop();

  const { data } = useTVShowsState();

  let posterImg;

  if (data) {
    posterImg = data.poster_path
      ? `${IMG_BASE_URL}${IMG_SIZES.poster}${data.poster_path}`
      : noImageImg;
  }

  return (
    <>
      {data ? (
        <AllVideos
          data={data.videos.results}
          header={
            <BackToHeader
              title={data.name}
              imgPath={posterImg}
              path={`${ROUTE_NAMES.tvShow}/${data.id}`}
              linkName="Back to TV Show"
            />
          }
        />
      ) : (
        'Loading...'
      )}
    </>
  );
};

export default TVShowAllVideos;
