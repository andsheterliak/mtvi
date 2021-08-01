import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from './services/tmdb';

const reducers = {
  [tmdbApi.reducerPath]: tmdbApi.reducer,
};

export const store = configureStore({
  reducer: reducers,

  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(tmdbApi.middleware);
  },
});
