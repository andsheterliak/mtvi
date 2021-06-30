import { useParams } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';

import AllVideos from '~components/AllVideos';
import BackToHeader from '~components/BackToHeader';
import { useSelectionBar } from '~components/SelectionBar';
import { IMG_BASE_URL, IMG_SIZES, VIDEO_TYPES } from '~common/tmdb-config';
import useScrollToTop from '~common/hooks/useScrollToTop';
import { ROUTE_NAMES, TOP_VIDEO_AMOUNT } from '~common/constants';
import { createGetVideosDataInstance } from '~common/selectors';
import { getImagePath } from '~common/utils/getData';
import { useGetEpisodeQuery } from '~common/services/tmdb';
import useLazyImages from '~common/hooks/useLazyImages';
import noImageImg from '~assets/img/no-image-wide.svg';

const getVideos = (data) => data?.videos.results;
const getVideosData = createGetVideosDataInstance(getVideos);

const EpisodeVideos = () => {
  useScrollToTop();

  const { id, seasonNumber, episodeNumber } = useParams();
  const { data, error, isLoading } = useGetEpisodeQuery({
    id,
    seasonNumber,
    episodeNumber,
  });
  const { selected, setSelected } = useSelectionBar(VIDEO_TYPES.trailer.key);
  const videosData = getVideosData(data);

  useErrorHandler(error);
  useLazyImages({ isLoading, triggers: [selected] });

  const selectHandler = (e, key) => {
    setSelected(key);
  };

  return (
    <AllVideos
      isLoading={isLoading}
      videosData={videosData}
      selectHandler={selectHandler}
      selected={selected}
      videoAmount={TOP_VIDEO_AMOUNT}
      header={
        <BackToHeader
          isLoading={isLoading}
          title={`${data?.season_number}x${data?.episode_number} ${data?.name}`}
          imgPath={getImagePath({
            basePath: IMG_BASE_URL,
            path: data?.still_path,
            size: IMG_SIZES.still,
            fallback: noImageImg,
          })}
          imgShape="wide"
          path={`/${ROUTE_NAMES.tvShow}/${id}/${ROUTE_NAMES.season}/${seasonNumber}`}
          linkName="Back to Season"
        />
      }
    />
  );
};

export default EpisodeVideos;
