import { useRouteMatch } from 'react-router';
import { useParams } from 'react-router-dom';
import { useGetMovieQuery } from '~/api/tmdb';
import { TopCast } from '~/shared/components';
import { ROUTE_NAMES, TOP_ITEM_AMOUNT } from '~/shared/constants';
import { getTopItems } from '~/shared/utils';
import { IdParam } from '../types';

export const TopBilledCast = () => {
  const { url } = useRouteMatch();
  const { id } = useParams<IdParam>();
  const movieQuery = useGetMovieQuery(id);

  const cast = movieQuery.data?.credits.cast;

  return (
    <TopCast
      isLoading={movieQuery.isLoading}
      creditsPath={`${url}/${ROUTE_NAMES.credits}`}
      seeAllLinkName="Full Cast & Crew"
      title="Top Billed Cast"
      data={cast && getTopItems(cast, TOP_ITEM_AMOUNT)}
      castAmount={TOP_ITEM_AMOUNT}
      routeName={ROUTE_NAMES.person}
    />
  );
};
