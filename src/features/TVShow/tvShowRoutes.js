import { ROUTE_NAMES } from '~common/constants';
import TVShow from './TVShow';

const tvShowRoutes = {
  tvShow: {
    to: `${ROUTE_NAMES.tvShow}/:id`,
    component: TVShow,
    exact: true,
  },
};

export default tvShowRoutes;
