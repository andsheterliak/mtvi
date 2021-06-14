import { useRouteMatch } from 'react-router';
import { useParams } from 'react-router-dom';

import { ROUTE_NAMES } from '~common/constants';
import { createGetTopCastInstance } from '~common/selectors';
import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';
import { useGetTVShowQuery } from '~common/services/tmdb';
import noImage from '~assets/img/no-image.svg';
import TopCast from '~components/TopCast';

const getCast = (data) => data.aggregate_credits.cast;
const getTopBilledCast = createGetTopCastInstance(getCast);

const SeriesCast = () => {
  const { url } = useRouteMatch();
  const { id } = useParams();

  const { topBilledCast } = useGetTVShowQuery(id, {
    selectFromResult: ({ data }) => ({
      topBilledCast: getTopBilledCast(data),
    }),
  });

  return (
    <TopCast
      creditsPath={`${url}/${ROUTE_NAMES.credits}`}
      seeAllLinkName="Full Cast & Crew"
      title="Series Cast"
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

export default SeriesCast;
