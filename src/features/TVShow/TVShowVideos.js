import { useRouteMatch } from 'react-router';

import { ROUTE_NAMES, TOP_VIDEO_AMOUNT } from '~common/constants';
import { getTopItems } from '~common/utils/getData';
import TopVideos from '~components/TopVideos';

const TVShowVideos = ({ isLoading, data }) => {
  const { url } = useRouteMatch();

  return (
    <TopVideos
      isLoading={isLoading}
      title="Videos"
      data={getTopItems(data?.videos.results, TOP_VIDEO_AMOUNT)}
      videoAmount={TOP_VIDEO_AMOUNT}
      videosPath={`${url}/${ROUTE_NAMES.videos}`}
    />
  );
};

export default TVShowVideos;
