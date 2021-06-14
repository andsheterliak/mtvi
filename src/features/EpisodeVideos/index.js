import { useSelector } from 'react-redux';

import AllVideos from '~components/AllVideos';
import BackToHeader from '~components/BackToHeader';
import { useSelectionBar } from '~components/SelectionBar';
import { IMG_BASE_URL, IMG_SIZES, VIDEO_TYPES } from '~common/tmdb-config';
import useScrollToTop from '~common/hooks/useScrollToTop';
import { ROUTE_NAMES } from '~common/constants';
import { createGetVideosDataInstance } from '~common/selectors';
import useEpisode from '~common/services/episode/useEpisode';
import { getEpisodeData } from '~common/services/episode/episodeSelectors';
import { getImagePath } from '~common/utils/getData';
import noImageImg from '~assets/img/no-image-wide.svg';

const getVideos = (state) => getEpisodeData(state)?.videos.results;
const getVideosData = createGetVideosDataInstance(getVideos);

const EpisodeVideos = () => {
  useScrollToTop();

  const { params } = useEpisode();
  const { selected, setSelected } = useSelectionBar(VIDEO_TYPES.trailer.key);
  const data = useSelector(getEpisodeData);
  const videosData = useSelector(getVideosData);

  const selectHandler = (e, key) => {
    setSelected(key);
  };

  let stillImg;

  if (data) {
    stillImg = getImagePath({
      basePath: IMG_BASE_URL,
      path: data.still_path,
      size: IMG_SIZES.still,
      fallback: noImageImg,
    });
  }

  return (
    <>
      {data ? (
        <AllVideos
          videosData={videosData}
          selectHandler={selectHandler}
          selected={selected}
          header={
            <BackToHeader
              title={`${data.season_number}x${data.episode_number} ${data.name}`}
              imgPath={stillImg}
              path={`/${ROUTE_NAMES.tvShow}/${params.id}/${ROUTE_NAMES.season}/${params.seasonNumber}`}
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
