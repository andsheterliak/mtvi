import { useRouteMatch } from 'react-router';
import { TopVideos } from '~/components';
import { ROUTE_NAMES, TOP_VIDEO_AMOUNT } from '~/constants';
import { getTopItems } from '~/utils';

export const MovieVideos = ({ isLoading, data }) => {
  const { url } = useRouteMatch();

  return (
    <TopVideos
      isLoading={isLoading}
      videoAmount={TOP_VIDEO_AMOUNT}
      title="Videos"
      data={getTopItems(data?.videos.results, TOP_VIDEO_AMOUNT)}
      videosPath={`${url}/${ROUTE_NAMES.videos}`}
    />
  );
};
