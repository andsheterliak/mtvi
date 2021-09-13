import { useRouteMatch } from 'react-router';
import { useParams } from 'react-router-dom';
import { useGetTVShowQuery } from '~/api/tmdb';
import { TopCast } from '~/shared/components';
import { ROUTE_NAMES, TOP_ITEM_AMOUNT } from '~/shared/constants';
import { getTopItems } from '~/shared/utils';
import { IdParam } from '../types';

export const SeriesCast = () => {
  const { url } = useRouteMatch();
  const { id } = useParams<IdParam>();
  const tvShowQuery = useGetTVShowQuery(id);

  const cast = tvShowQuery.data?.aggregate_credits.cast;

  return (
    <TopCast
      isLoading={tvShowQuery.isLoading}
      creditsPath={`${url}/${ROUTE_NAMES.credits}`}
      seeAllLinkName="Full Cast & Crew"
      title="Series Cast"
      data={cast && getTopItems(cast, TOP_ITEM_AMOUNT)}
      castAmount={TOP_ITEM_AMOUNT}
      routeName={ROUTE_NAMES.person}
    />
  );
};
