import { useRouteMatch } from 'react-router';
import { useParams } from 'react-router-dom';
import { useGetMovieQuery } from '~/api/tmdb';
import { TopVideos } from '~/shared/components';
import { ROUTE_NAMES, TOP_VIDEO_AMOUNT } from '~/shared/constants';
import { getTopItems } from '~/shared/utils';
import { IdParam } from '../types';

export const MovieVideos = () => {
  const { url } = useRouteMatch();
  const { id } = useParams<IdParam>();
  const movieQuery = useGetMovieQuery(id);

  const videos = movieQuery.data?.videos.results;

  return (
    <TopVideos
      isLoading={movieQuery.isLoading}
      videoAmount={TOP_VIDEO_AMOUNT}
      title="Videos"
      data={videos && getTopItems(videos, TOP_VIDEO_AMOUNT)}
      videosPath={`${url}/${ROUTE_NAMES.videos}`}
    />
  );
};
