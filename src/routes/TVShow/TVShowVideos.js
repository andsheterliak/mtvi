import { useRouteMatch } from 'react-router';
import { useParams } from 'react-router-dom';
import { useGetTVShowQuery } from '~/api/tmdb';
import { TopVideos } from '~/shared/components';
import { ROUTE_NAMES, TOP_VIDEO_AMOUNT } from '~/shared/constants';
import { getTopItems } from '~/shared/utils';

export const TVShowVideos = () => {
  const { url } = useRouteMatch();
  const { id } = useParams();
  const { data, isLoading } = useGetTVShowQuery(id);

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
