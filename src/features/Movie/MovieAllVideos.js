import { useSelector } from 'react-redux';

import AllVideos from '~components/AllVideos';
import BackToHeader from '~components/BackToHeader';
import { useSelectionBar } from '~components/SelectionBar';

import { IMG_BASE_URL, IMG_SIZES, VIDEO_TYPES } from '~common/tmdb-config';
import useScrollToTop from '~common/hooks/useScrollToTop';
import { ROUTE_NAMES } from '~common/constants';
import { createGetVideosDataInstance } from '~common/selectors';

import noImageImg from '~assets/img/no-image.svg';

import useMovie from './hooks/useMovie';
import { getData } from './movieSelectors';

const getVideos = (state) => getData(state)?.videos.results;
const getVideosData = createGetVideosDataInstance(getVideos);

const MovieAllVideos = () => {
  useScrollToTop();
  useMovie();

  const { selected, setSelected } = useSelectionBar(VIDEO_TYPES.trailer.key);
  const videosData = useSelector(getVideosData);
  const data = useSelector(getData);

  const selectHandler = (e, key) => {
    setSelected(key);
  };

  let posterImg;

  if (data) {
    posterImg = data.poster_path
      ? `${IMG_BASE_URL}${IMG_SIZES.poster}${data.poster_path}`
      : noImageImg;
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

export default MovieAllVideos;
