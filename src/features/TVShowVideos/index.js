import { useParams } from 'react-router-dom';

import AllVideos from '~components/AllVideos';
import BackToHeader from '~components/BackToHeader';
import { useSelectionBar } from '~components/SelectionBar';

import { IMG_BASE_URL, IMG_SIZES, VIDEO_TYPES } from '~common/tmdb-config';
import useScrollToTop from '~common/hooks/useScrollToTop';
import { ROUTE_NAMES } from '~common/constants';
import { createGetVideosDataInstance } from '~common/selectors';
import { getImagePath } from '~common/utils/getData';
import { useGetTVShowQuery } from '~common/services/tmdb';

import noImageImg from '~assets/img/no-image.svg';

const getVideos = (data) => data?.videos.results;
const getVideosData = createGetVideosDataInstance(getVideos);

const TVShowVideos = () => {
  useScrollToTop();

  const { id } = useParams();
  const { data } = useGetTVShowQuery(id);

  const { selected, setSelected } = useSelectionBar(VIDEO_TYPES.trailer.key);
  const videosData = getVideosData(data);

  const selectHandler = (e, key) => {
    setSelected(key);
  };

  let posterImg;

  if (data) {
    posterImg = getImagePath({
      basePath: IMG_BASE_URL,
      size: IMG_SIZES.poster,
      path: data.poster_path,
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
              title={data.name}
              imgPath={posterImg}
              path={`/${ROUTE_NAMES.tvShow}/${data.id}`}
              linkName="Back to TV Show"
            />
          }
        />
      ) : (
        'Loading...'
      )}
    </>
  );
};

export default TVShowVideos;
