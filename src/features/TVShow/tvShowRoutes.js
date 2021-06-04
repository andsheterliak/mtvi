import { ROUTE_NAMES } from '~common/constants';
import TVShow from './TVShow';
import AllSeasons from './AllSeasons';
import TVShowAllVideos from './TVShowAllVideos';
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

  tvShowVideos: {
    to: `${ROUTE_NAMES.tvShow}/:id/${ROUTE_NAMES.videos}`,
    component: TVShowAllVideos,
    exact: true,
  },

  tvShowSeasons: {
    to: `${ROUTE_NAMES.tvShow}/:id/${ROUTE_NAMES.seasons}`,
    component: AllSeasons,
    exact: true,
  },
};

export default tvShowRoutes;
