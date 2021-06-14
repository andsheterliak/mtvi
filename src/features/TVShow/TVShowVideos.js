import { useRouteMatch } from 'react-router';
import { useParams } from 'react-router-dom';

import { ROUTE_NAMES } from '~common/constants';
import { useGetTVShowQuery } from '~common/services/tmdb';

import TopVideos from '~components/TopVideos';

const TVShowVideos = () => {
  const { url } = useRouteMatch();
  const { id } = useParams();

  const { videos } = useGetTVShowQuery(id, {
    selectFromResult: ({ data }) => ({
      videos: data.videos.results,
    }),
  });

  return (
    <TopVideos
      title="Videos"
      data={videos}
      videosPath={`${url}/${ROUTE_NAMES.videos}`}
    />
  );
};

export default TVShowVideos;
