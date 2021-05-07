import { ROUTE_NAMES } from '~common/constants';
import TVShows from '.';

const tvShowsRoutes = {
  tvShows: {
    name: 'TV Shows',
    to: ROUTE_NAMES.tvShows,
    component: TVShows,
    exact: true,
  },
};

export default tvShowsRoutes;
