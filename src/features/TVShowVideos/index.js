import { useParams } from 'react-router-dom';

import AllVideos from '~components/AllVideos';
import BackToHeader from '~components/BackToHeader';
import { useSelectionBar } from '~components/SelectionBar';

import { IMG_BASE_URL, IMG_SIZES, VIDEO_TYPES } from '~common/tmdb-config';
import useScrollToTop from '~common/hooks/useScrollToTop';
import { ROUTE_NAMES, TOP_VIDEO_AMOUNT } from '~common/constants';
import { createGetVideosDataInstance } from '~common/selectors';
import { getImagePath } from '~common/utils/getData';
import { useGetTVShowQuery } from '~common/services/tmdb';

import noImageImg from '~assets/img/no-image.svg';

const getVideos = (data) => data?.videos.results;
const getVideosData = createGetVideosDataInstance(getVideos);

const TVShowVideos = () => {
  useScrollToTop();

  const { id } = useParams();
  const { data, isLoading } = useGetTVShowQuery(id);

  const { selected, setSelected } = useSelectionBar(VIDEO_TYPES.trailer.key);
  const videosData = getVideosData(data);

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
            size: IMG_SIZES.poster,
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

export default TVShowVideos;
