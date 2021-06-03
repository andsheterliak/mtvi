import { ROUTE_NAMES } from '~common/constants';

import moviesRoutes from '~features/Movies/moviesRoutes';
import movieRoutes from '~features/Movie/movieRoutes';
import tvShowsRoutes from '~features/TVShows/tvShowsRoutes';
import tvShowRoutes from '~features/TVShow/tvShowRoutes';
import seasonRoutes from '~features/Season/seasonRoutes';
import peopleRoutes from '~features/People/peopleRoutes';
import personRoutes from '~features/Person/personRoutes';
import episodeRoutes from '~features/episode/episodeRoutes';

const routesConfig = {
  default: {
    name: moviesRoutes.movies.name,
    to: ROUTE_NAMES.root,
    redirectTo: moviesRoutes.movies.to,
    exact: true,
    component: moviesRoutes.movies.component,
  },

  ...moviesRoutes,
  ...movieRoutes,
  ...tvShowsRoutes,
  ...tvShowRoutes,
  ...peopleRoutes,
  ...personRoutes,
  ...seasonRoutes,
  ...episodeRoutes,
};

export default routesConfig;
