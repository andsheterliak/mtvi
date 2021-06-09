import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';

import { ROUTE_NAMES } from '~common/constants';

import TopVideos from '~components/TopVideos';

const Videos = () => {
  const { url } = useRouteMatch();
  const videos = useSelector((state) => state.movie.data.videos?.results);

  return (
    <TopVideos
      title="Videos"
      data={videos}
      videosPath={`${url}/${ROUTE_NAMES.videos}`}
    />
  );
};

export default Videos;
