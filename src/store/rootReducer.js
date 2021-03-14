import { combineReducers } from 'redux';

import moviesReducer from '../modules/Movies/slices/moviesSlice';
import tvShowsReducer from '../modules/TVShows/slices/tvShowsSlice';
import peopleReducer from '../modules/People/slices/peopleSlice';

const rootReducer = combineReducers({
  movies: moviesReducer,
  tvShows: tvShowsReducer,
  people: peopleReducer,
});

export default rootReducer;
