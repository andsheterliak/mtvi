import { useRouteMatch } from 'react-router';

import { ROUTE_NAMES, TOP_ITEM_AMOUNT } from '~common/constants';
import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';
import TopCast from '~components/TopCast';
import noImage from '~assets/img/no-image.svg';
import { getTopItems } from '~common/utils/getData';

const TopBilledCast = ({ isLoading, data }) => {
  const { url } = useRouteMatch();

  return (
    <TopCast
      isLoading={isLoading}
      creditsPath={`${url}/${ROUTE_NAMES.credits}`}
      seeAllLinkName="Full Cast & Crew"
      title="Top Billed Cast"
      data={getTopItems(data?.credits.cast, TOP_ITEM_AMOUNT)}
      castAmount={TOP_ITEM_AMOUNT}
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
