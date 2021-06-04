import { combineReducers } from 'redux';

import moviesReducer from '~features/movies/moviesSlice';
import movieReducer from '~features/movie/movieSlice';
import tvShowsReducer from '~features/tvShows/tvShowsSlice';
import tvShowReducer from '~features/tvShow/tvShowSlice';
import seasonReducer from '~features/season/seasonSlice';
import peopleReducer from '~features/people/peopleSlice';
import personReducer from '~features/person/personSlice';
import episodeReducer from '~features/episode/episodeSlice';

const rootReducer = combineReducers({
  movies: moviesReducer,
  movie: movieReducer,
  tvShows: tvShowsReducer,
  tvShow: tvShowReducer,
  season: seasonReducer,
  people: peopleReducer,
  person: personReducer,
  episode: episodeReducer,
});

export default rootReducer;
