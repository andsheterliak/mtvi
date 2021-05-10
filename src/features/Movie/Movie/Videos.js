import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';

import { ROUTE_NAMES } from '~common/constants';
import { checkIfIsData } from '~common/utils/getData';

import MainContainer from '~components/MainContainer';

import TopVideos from '~components/TopVideos';

const Videos = () => {
  const { url } = useRouteMatch();
  const { data } = useSelector((state) => state.movie);
  const videos = data.videos?.results;

  if (!checkIfIsData(videos)) return null;

  return (
    <MainContainer>
      <TopVideos
        title="Videos"
        data={videos}
        videosPath={`${url}/${ROUTE_NAMES.videos}`}
      />
    </MainContainer>
  );
};

export default Videos;
