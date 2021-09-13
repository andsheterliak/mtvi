import { useRouteMatch } from 'react-router';
import { useParams } from 'react-router-dom';
import { useGetTVShowQuery } from '~/api/tmdb';
import { TopVideos } from '~/shared/components';
import { ROUTE_NAMES, TOP_VIDEO_AMOUNT } from '~/shared/constants';
import { getTopItems } from '~/shared/utils';
import { IdParam } from '../types';

export const TVShowVideos = () => {
  const { url } = useRouteMatch();
  const { id } = useParams<IdParam>();
  const tvShowQuery = useGetTVShowQuery(id);

  const videos = tvShowQuery.data?.videos.results;

  return (
    <TopVideos
      isLoading={tvShowQuery.isLoading}
      title="Videos"
      data={videos && getTopItems(videos, TOP_VIDEO_AMOUNT)}
      videoAmount={TOP_VIDEO_AMOUNT}
      videosPath={`${url}/${ROUTE_NAMES.videos}`}
    />
  );
};
