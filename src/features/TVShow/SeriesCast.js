import { useRouteMatch } from 'react-router';

import { ROUTE_NAMES, TOP_ITEM_AMOUNT } from '~common/constants';
import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';
import noImage from '~assets/img/no-image.svg';
import TopCast from '~components/TopCast';
import { getTopItems } from '~common/utils/getData';

const SeriesCast = ({ isLoading, data }) => {
  const { url } = useRouteMatch();

  return (
    <TopCast
      isLoading={isLoading}
      creditsPath={`${url}/${ROUTE_NAMES.credits}`}
      seeAllLinkName="Full Cast & Crew"
      title="Series Cast"
      data={getTopItems(data?.aggregate_credits.cast, TOP_ITEM_AMOUNT)}
      castAmount={TOP_ITEM_AMOUNT}
      routeName={ROUTE_NAMES.person}
      imgData={{
        basePath: IMG_BASE_URL,
        size: IMG_SIZES.profile.h632,
        fallback: noImage,
      }}
    />
  );
};

export default SeriesCast;
