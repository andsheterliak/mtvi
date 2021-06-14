import { configureStore } from '@reduxjs/toolkit';

import tmdbApi from '~common/services/tmdb';

const reducers = {
  [tmdbApi.reducerPath]: tmdbApi.reducer,
};

const store = configureStore({
  reducer: reducers,

  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(tmdbApi.middleware);
  },
});

export default store;
