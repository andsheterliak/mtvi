import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';

import { ROUTE_NAMES } from '~common/constants';
import { getTopItems } from '~common/utils/getData';

import TopCast from '~components/TopCast';

const TopBilledCast = () => {
  const { url } = useRouteMatch();

  const { data } = useSelector((state) => state.movie);

  let topBilledCast = data.credits?.cast;
  topBilledCast = getTopItems(topBilledCast);

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
