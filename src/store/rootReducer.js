import { combineReducers } from 'redux';

import moviesReducer from '../modules/Movies/slices/moviesSlice';
import tvShowsReducer from '../modules/TVShows/slices/tvShowsSlice';

const rootReducer = combineReducers({
  movies: moviesReducer,
  tvShows: tvShowsReducer,
});

export default rootReducer;
