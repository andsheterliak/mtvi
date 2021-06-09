import { ROUTE_NAMES } from '~common/constants';
import EpisodeCredits from './EpisodeCredits';
import EpisodeVideos from './EpisodeVideos';

const episodeRoutes = {
  episodeCredits: {
    to: `/${ROUTE_NAMES.tvShow}/:id/${ROUTE_NAMES.season}/:seasonNumber/${ROUTE_NAMES.episode}/:episodeNumber/${ROUTE_NAMES.credits}`,
    component: EpisodeCredits,
    exact: true,
  },

  episodeVideos: {
    to: `/${ROUTE_NAMES.tvShow}/:id/${ROUTE_NAMES.season}/:seasonNumber/${ROUTE_NAMES.episode}/:episodeNumber/${ROUTE_NAMES.videos}`,
    component: EpisodeVideos,
    exact: true,
  },
};

export default episodeRoutes;
