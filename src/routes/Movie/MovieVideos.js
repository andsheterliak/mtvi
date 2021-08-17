import { useRouteMatch } from 'react-router';
import { useParams } from 'react-router-dom';
import { useGetMovieQuery } from '~/api/tmdb';
import { TopVideos } from '~/shared/components';
import { ROUTE_NAMES, TOP_VIDEO_AMOUNT } from '~/shared/constants';
import { getTopItems } from '~/shared/utils';

export const MovieVideos = () => {
  const { url } = useRouteMatch();
  const { id } = useParams();
  const { data, isLoading } = useGetMovieQuery(id);

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
