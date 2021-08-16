import { setup } from 'axios-cache-adapter';
import localforage from 'localforage';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const maxAge = HOUR * (process.env.NODE_ENV === 'production' ? 6 : 24);

const configure = () => {
  const forageStore = localforage.createInstance({
    // Prefix all storage keys to prevent conflicts
    name: 'tmdb-cache',
  });

  return setup({
    // `axios` options
    baseURL: '/.netlify/functions/tmdb',

    // `axios-cache-adapter` options
    cache: {
      limit: 100,
      maxAge,
      store: forageStore,
      exclude: { query: false },
    },
  });
};

export const axiosTMDB = configure();
