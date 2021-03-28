import { combineReducers } from 'redux';

import moviesReducer from '../modules/Movies/moviesSlice';
import movieReducer from '../modules/Movie/movieSlice';
import tvShowsReducer from '../modules/TVShows/tvShowsSlice';
import tvShowReducer from '../modules/TVShow/tvShowSlice';
import peopleReducer from '../modules/People/peopleSlice';
import personReducer from '../modules/Person/personSlice';

const rootReducer = combineReducers({
  movies: moviesReducer,
  movie: movieReducer,
  tvShows: tvShowsReducer,
  tvShow: tvShowReducer,
  people: peopleReducer,
  person: personReducer,
});

export default rootReducer;
