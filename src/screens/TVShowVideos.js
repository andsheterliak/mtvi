import { useErrorHandler } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import noImageImg from '~/assets/img/no-image.svg';
import { AllVideos, BackToHeader, useSelectionBar } from '~/components';
import { ROUTE_NAMES, TOP_VIDEO_AMOUNT } from '~/constants';
import { useLazyImages, useScrollToTop } from '~/hooks';
import { createGetVideosDataInstance } from '~/selectors';
import { useGetTVShowQuery } from '~/services/tmdb';
import { IMG_BASE_URL, IMG_SIZES, VIDEO_TYPES } from '~/tmdb-config';
import { getImagePath } from '~/utils';

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
