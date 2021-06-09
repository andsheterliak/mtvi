import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';

import { ROUTE_NAMES } from '~common/constants';
import { createGetTopCastInstance } from '~common/selectors';
import TopCast from '~components/TopCast';

const getCast = (state) => state.movie.data.credits.cast;
const getTopBilledCast = createGetTopCastInstance(getCast);

const TopBilledCast = () => {
  const { url } = useRouteMatch();
  const topBilledCast = useSelector(getTopBilledCast);

  return (
    <TopCast
      creditsPath={`${url}/${ROUTE_NAMES.credits}`}
      seeAllLinkName="Full Cast & Crew"
      title="Top Billed Cast"
      data={topBilledCast}
    />
  );
};

export default TopBilledCast;
