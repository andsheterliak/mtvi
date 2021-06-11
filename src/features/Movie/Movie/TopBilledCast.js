import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';

import { ROUTE_NAMES } from '~common/constants';
import { createGetTopCastInstance } from '~common/selectors';
import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';
import TopCast from '~components/TopCast';
import noImage from '~assets/img/no-image.svg';

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
      routeName={ROUTE_NAMES.person}
      imgData={{
        basePath: IMG_BASE_URL,
        size: IMG_SIZES.profile,
        fallback: noImage,
      }}
    />
  );
};

export default TopBilledCast;
