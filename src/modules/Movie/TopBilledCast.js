import { useSelector } from 'react-redux';

import { ROUTE_NAMES } from '~common/constants';
import { checkIfIsData, getTopItems } from '~common/utils/getData';

import Cast from '~components/Cast/Cast';
import MainContainer from '~components/MainContainer';

const TopBilledCast = () => {
  const { data } = useSelector((state) => state.movie);

  const topBilledCast = data.credits?.cast;

  if (!checkIfIsData(topBilledCast)) return null;

  return (
    <MainContainer>
      <Cast
        creditsPath={`${ROUTE_NAMES.movieCredits}/${data.id}`}
        seeAllLinkName="Full Cast & Crew"
        title="Top Billed Cast"
        data={getTopItems(topBilledCast)}
      />
    </MainContainer>
  );
};

export default TopBilledCast;
