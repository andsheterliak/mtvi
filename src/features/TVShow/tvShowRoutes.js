import { ROUTE_NAMES } from '~common/constants';
import TVShow from '.';
import TVShowCredits from './TVShowCredits';

const tvShowRoutes = {
  tvShow: {
    to: `${ROUTE_NAMES.tvShow}/:id`,
    component: TVShow,
    exact: true,
  },

  tvShowCredits: {
    to: `${ROUTE_NAMES.tvShow}/:id/${ROUTE_NAMES.credits}`,
    component: TVShowCredits,
    exact: true,
  },
};

export default tvShowRoutes;
