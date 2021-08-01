import { useErrorHandler } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import noImageImg from '~/assets/img/no-image-wide.svg';
import { AllVideos, BackToHeader, useSelectionBar } from '~/components';
import { ROUTE_NAMES, TOP_VIDEO_AMOUNT } from '~/constants';
import { useLazyImages, useScrollToTop } from '~/hooks';
import { createGetVideosDataInstance } from '~/selectors';
import { useGetEpisodeQuery } from '~/services/tmdb';
import { IMG_BASE_URL, IMG_SIZES, VIDEO_TYPES } from '~/tmdb-config';
import { getImagePath } from '~/utils';

const getVideos = (data) => data?.videos.results;
const getVideosData = createGetVideosDataInstance(getVideos);

export const EpisodeVideos = () => {
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
            size: IMG_SIZES.still.w300,
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
