import { useRouteMatch } from 'react-router';
import { useParams } from 'react-router-dom';

import { ROUTE_NAMES } from '~common/constants';
import { useGetMovieQuery } from '~common/services/tmdb';

import TopVideos from '~components/TopVideos';

const MovieVideos = () => {
  const { url } = useRouteMatch();
  const { id } = useParams();

  const { videos } = useGetMovieQuery(id, {
    selectFromResult: ({ data }) => ({ videos: data.videos.results }),
  });

  return (
    <TopVideos
      title="Videos"
      data={videos}
      videosPath={`${url}/${ROUTE_NAMES.videos}`}
    />
  );
};

export default MovieVideos;
