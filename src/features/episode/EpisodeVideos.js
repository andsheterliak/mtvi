import { useSelector } from 'react-redux';

import AllVideos from '~components/AllVideos';
import BackToHeader from '~components/BackToHeader';
import { useSelectionBar } from '~components/SelectionBar';
import { IMG_BASE_URL, IMG_SIZES, VIDEO_TYPES } from '~common/tmdb-config';
import useScrollToTop from '~common/hooks/useScrollToTop';
import { ROUTE_NAMES } from '~common/constants';
import { createGetVideosDataInstance } from '~common/selectors';
import noImageImg from '~assets/img/no-image-wide.svg';
import useEpisode from './hooks/useEpisode';
import { getData } from './episodeSelectors';

const getVideos = (state) => getData(state)?.videos.results;
const getVideosData = createGetVideosDataInstance(getVideos);

const EpisodeVideos = () => {
  useScrollToTop();

  const { params } = useEpisode();
  const { selected, setSelected } = useSelectionBar(VIDEO_TYPES.trailer.key);
  const data = useSelector(getData);
  const videosData = useSelector(getVideosData);

  const selectHandler = (e, key) => {
    setSelected(key);
  };

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
