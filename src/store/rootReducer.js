import { combineReducers } from 'redux';

import moviesReducer from '../modules/Movies/slices/moviesSlice';

const rootReducer = combineReducers({
  movies: moviesReducer,
});

export default rootReducer;
