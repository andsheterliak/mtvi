import { ROUTE_NAMES } from '~common/constants';
import EpisodeCredits from './EpisodeCredits';

const episodeRoutes = {
  episodeCredits: {
    to: `${ROUTE_NAMES.tvShow}/:id/${ROUTE_NAMES.season}/:seasonNumber/${ROUTE_NAMES.episode}/:episodeNumber/${ROUTE_NAMES.credits}`,
    component: EpisodeCredits,
    exact: true,
  },
};

export default episodeRoutes;
