import { useSelector } from 'react-redux';

import { checkIfIsData, getTopItems } from '~common/utils/getData';

import Cast from '~components/Cast/Cast';

const TopBilledCast = () => {
  const { data } = useSelector((state) => state.movie);

  const topBilledCast = data.credits?.cast;

  if (!checkIfIsData(topBilledCast)) return null;

  // ! path: `${ROUTE_NAMES.movieCredits}/${data.id}`

  return (
    <Cast
      creditsPath={'/path'}
      seeAllLinkName="Full Cast & Crew"
      title="Top Billed Cast"
      data={getTopItems(topBilledCast)}
    />
  );
};

export default TopBilledCast;
