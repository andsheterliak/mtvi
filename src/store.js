import { configureStore } from '@reduxjs/toolkit';

import { moviesReducer } from '~features/Movies';
import movieReducer from '~common/services/movie/movieSlice';
import { tvShowsReducer } from '~features/TVShows';
import tvShowReducer from '~common/services/tvShow/tvShowSlice';
import { seasonReducer } from '~features/Season';
import { peopleReducer } from '~features/People';
import { personReducer } from '~features/Person';
import episodeReducer from '~common/services/episode/episodeSlice';
import { searchReducer } from '~features/Search';

const reducers = {
  movies: moviesReducer,
  movie: movieReducer,
  tvShows: tvShowsReducer,
  tvShow: tvShowReducer,
  season: seasonReducer,
  people: peopleReducer,
  person: personReducer,
  episode: episodeReducer,
  search: searchReducer,
};

const store = configureStore({
  reducer: reducers,
});

export default store;
