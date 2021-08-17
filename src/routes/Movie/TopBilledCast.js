import { useRouteMatch } from 'react-router';
import { useParams } from 'react-router-dom';
import { IMG_BASE_URL, IMG_SIZES, useGetMovieQuery } from '~/api/tmdb';
import noImage from '~/assets/img/no-image.svg';
import { TopCast } from '~/shared/components';
import { ROUTE_NAMES, TOP_ITEM_AMOUNT } from '~/shared/constants';
import { getTopItems } from '~/shared/utils';

export const TopBilledCast = () => {
  const { url } = useRouteMatch();
  const { id } = useParams();
  const { data, isLoading } = useGetMovieQuery(id);

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
