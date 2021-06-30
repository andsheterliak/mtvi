import { useParams } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';

import AllVideos from '~components/AllVideos';
import BackToHeader from '~components/BackToHeader';
import { useSelectionBar } from '~components/SelectionBar';

import { getImagePath } from '~common/utils/getData';
import { IMG_BASE_URL, IMG_SIZES, VIDEO_TYPES } from '~common/tmdb-config';
import useScrollToTop from '~common/hooks/useScrollToTop';
import { ROUTE_NAMES, TOP_VIDEO_AMOUNT } from '~common/constants';
import { createGetVideosDataInstance } from '~common/selectors';
import { useGetMovieQuery } from '~common/services/tmdb';
import useLazyImages from '~common/hooks/useLazyImages';

import noImageImg from '~assets/img/no-image.svg';

const getVideos = (data) => data?.videos.results;
const getVideosData = createGetVideosDataInstance(getVideos);

const MovieVideos = () => {
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

export default MovieVideos;
