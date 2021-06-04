import { ROUTE_NAMES } from '~common/constants';

import moviesRoutes from '~features/movies/moviesRoutes';
import movieRoutes from '~features/movie/movieRoutes';
import tvShowsRoutes from '~features/tvShows/tvShowsRoutes';
import tvShowRoutes from '~features/tvShow/tvShowRoutes';
import seasonRoutes from '~features/season/seasonRoutes';
import peopleRoutes from '~features/people/peopleRoutes';
import personRoutes from '~features/person/personRoutes';
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
