import { useParams } from 'react-router-dom';

import AllVideos from '~components/AllVideos';
import BackToHeader from '~components/BackToHeader';
import { useSelectionBar } from '~components/SelectionBar';

import { getImagePath } from '~common/utils/getData';
import { IMG_BASE_URL, IMG_SIZES, VIDEO_TYPES } from '~common/tmdb-config';
import useScrollToTop from '~common/hooks/useScrollToTop';
import { ROUTE_NAMES } from '~common/constants';
import { createGetVideosDataInstance } from '~common/selectors';
import { useGetMovieQuery } from '~common/services/tmdb';

import noImageImg from '~assets/img/no-image.svg';

const getVideos = (data) => data?.videos.results;
const getVideosData = createGetVideosDataInstance(getVideos);

const MovieVideos = () => {
  useScrollToTop();

  const { id } = useParams();
  const { data } = useGetMovieQuery(id);
  const { selected, setSelected } = useSelectionBar(VIDEO_TYPES.trailer.key);
  const videosData = getVideosData(data);

  const selectHandler = (e, key) => {
    setSelected(key);
  };

  let posterImg;

  if (data) {
    posterImg = getImagePath({
      basePath: IMG_BASE_URL,
      path: data.poster_path,
      size: IMG_SIZES.poster,
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
              title={data.title}
              imgPath={posterImg}
              path={`/${ROUTE_NAMES.movie}/${data.id}`}
              linkName="Back to movie"
            />
          }
        />
      ) : (
        'Loading...'
      )}
    </>
  );
};

export default MovieVideos;
