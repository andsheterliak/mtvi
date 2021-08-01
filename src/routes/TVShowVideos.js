import { useErrorHandler } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import {
  IMG_BASE_URL,
  IMG_SIZES,
  useGetTVShowQuery,
  VIDEO_TYPES,
} from '~/api/tmdb';
import noImageImg from '~/assets/img/no-image.svg';
import { AllVideos, BackToHeader, useSelectionBar } from '~/shared/components';
import { ROUTE_NAMES, TOP_VIDEO_AMOUNT } from '~/shared/constants';
import { useLazyImages, useScrollToTop } from '~/shared/hooks';
import { createGetVideosDataInstance } from '~/shared/selectors';
import { getImagePath } from '~/shared/utils';

const getVideos = (data) => data?.videos.results;
const getVideosData = createGetVideosDataInstance(getVideos);

export const TVShowVideos = () => {
  useScrollToTop();

  const { id } = useParams();
  const { data, isLoading, error } = useGetTVShowQuery(id);

  useErrorHandler(error);

  const { selected, setSelected } = useSelectionBar(VIDEO_TYPES.trailer.key);
  const videosData = getVideosData(data);

  useLazyImages({ isLoading, triggers: [selected] });

  const selectHandler = (e, key) => {
    setSelected(key);
  };

  return (
    <AllVideos
      videosData={videosData}
      selectHandler={selectHandler}
      selected={selected}
      isLoading={isLoading}
      videoAmount={TOP_VIDEO_AMOUNT}
      header={
        <BackToHeader
          isLoading={isLoading}
          title={data?.name}
          imgPath={getImagePath({
            basePath: IMG_BASE_URL,
            size: IMG_SIZES.poster.w154,
            path: data?.poster_path,
            fallback: noImageImg,
          })}
          path={`/${ROUTE_NAMES.tvShow}/${data?.id}`}
          linkName="Back to TV Show"
        />
      }
    />
  );
};
