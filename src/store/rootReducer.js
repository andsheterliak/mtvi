import { combineReducers } from 'redux';

import moviesReducer from '../modules/Movies/moviesSlice';
import movieReducer from '../modules/Movie/movieSlice';
import tvShowsReducer from '../modules/TVShows/tvShowsSlice';
import tvShowReducer from '../modules/TVShow/tvShowSlice';
import peopleReducer from '../modules/People/peopleSlice';

const rootReducer = combineReducers({
  movies: moviesReducer,
  movie: movieReducer,
  tvShows: tvShowsReducer,
  tvShow: tvShowReducer,
  people: peopleReducer,
});

export default rootReducer;
