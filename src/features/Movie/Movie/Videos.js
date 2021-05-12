import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';

import { ROUTE_NAMES } from '~common/constants';
import { checkIfIsData } from '~common/utils/getData';

import TopVideos from '~components/TopVideos';

const Videos = () => {
  const { url } = useRouteMatch();
  const { data } = useSelector((state) => state.movie);
  const videos = data.videos?.results;

  if (!checkIfIsData(videos)) return null;

  return (
    <TopVideos
      title="Videos"
      data={videos}
      videosPath={`${url}/${ROUTE_NAMES.videos}`}
    />
  );
};

export default Videos;
