import { useErrorHandler } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import {
  IMG_BASE_URL,
  IMG_SIZES,
  useGetMovieQuery,
  VIDEO_TYPES,
} from '~/api/tmdb';
import noImageImg from '~/assets/img/no-image.svg';
import { AllVideos, BackToHeader, useSelectionBar } from '~/components';
import { ROUTE_NAMES, TOP_VIDEO_AMOUNT } from '~/constants';
import { useLazyImages, useScrollToTop } from '~/hooks';
import { createGetVideosDataInstance } from '~/selectors';
import { getImagePath } from '~/utils';

const getVideos = (data) => data?.videos.results;
const getVideosData = createGetVideosDataInstance(getVideos);

export const MovieVideos = () => {
  useScrollToTop();

  const { id } = useParams();
  const { data, error, isLoading } = useGetMovieQuery(id);
  const { selected, setSelected } = useSelectionBar(VIDEO_TYPES.trailer.key);
  const videosData = getVideosData(data);

  useErrorHandler(error);
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
          title={data?.title}
          imgPath={getImagePath({
            basePath: IMG_BASE_URL,
            path: data?.poster_path,
            size: IMG_SIZES.poster.w154,
            fallback: noImageImg,
          })}
          path={`/${ROUTE_NAMES.movie}/${data?.id}`}
          linkName="Back to movie"
        />
      }
    />
  );
};
