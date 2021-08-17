import { useErrorHandler } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import {
  IMG_BASE_URL,
  IMG_SIZES,
  useGetEpisodeQuery,
  VIDEO_TYPES,
} from '~/api/tmdb';
import noImageImg from '~/assets/img/no-image-wide.svg';
import { AllVideos, BackToHeader, useSelectionBar } from '~/shared/components';
import { ROUTE_NAMES, TOP_VIDEO_AMOUNT } from '~/shared/constants';
import { useLazyImages, useScrollToTop } from '~/shared/hooks';
import { getVideosData } from '~/shared/selectors';
import { getImagePath } from '~/shared/utils';

export const EpisodeVideos = () => {
  useScrollToTop();

  const { id, seasonNumber, episodeNumber } = useParams();
  const { data, error, isLoading } = useGetEpisodeQuery({
    id,
    seasonNumber,
    episodeNumber,
  });
  const { selected, setSelected } = useSelectionBar(VIDEO_TYPES.trailer.key);

  useErrorHandler(error);
  useLazyImages({ isLoading, triggers: [selected] });

  const selectHandler = (e, key) => {
    setSelected(key);
  };

  return (
    <AllVideos
      isLoading={isLoading}
      videosData={getVideosData(data?.videos.results)}
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
