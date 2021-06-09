import { useSelector } from 'react-redux';

import AllVideos from '~components/AllVideos';
import BackToHeader from '~components/BackToHeader';
import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';
import useScrollToTop from '~common/hooks/useScrollToTop';
import { ROUTE_NAMES } from '~common/constants';
import noImageImg from '~assets/img/no-image-wide.svg';
import useEpisode from './hooks/useEpisode';
import { getData } from './episodeSelectors';

const EpisodeVideos = () => {
  useScrollToTop();

  const { params } = useEpisode();
  const data = useSelector(getData);

  let stillImg;

  if (data) {
    stillImg = data.still_path
      ? `${IMG_BASE_URL}${IMG_SIZES.still}${data.still_path}`
      : noImageImg;
  }

  return (
    <>
      {data ? (
        <AllVideos
          data={data.videos.results}
          header={
            <BackToHeader
              title={`${data.season_number}x${data.episode_number} ${data.name}`}
              imgPath={stillImg}
              path={`${ROUTE_NAMES.tvShow}/${params.id}/${ROUTE_NAMES.season}/${params.seasonNumber}`}
              linkName="Back to Season"
            />
          }
        />
      ) : (
        'Loading...'
      )}
    </>
  );
};

export default EpisodeVideos;
