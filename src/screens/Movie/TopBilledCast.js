import { useRouteMatch } from 'react-router';
import noImage from '~/assets/img/no-image.svg';
import { TopCast } from '~/components';
import { ROUTE_NAMES, TOP_ITEM_AMOUNT } from '~/constants';
import { IMG_BASE_URL, IMG_SIZES } from '~/tmdb-config';
import { getTopItems } from '~/utils';

export const TopBilledCast = ({ isLoading, data }) => {
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
        size: IMG_SIZES.profile.h632,
        fallback: noImage,
      }}
    />
  );
};
