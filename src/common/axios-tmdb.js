import localforage from 'localforage';
import { setup } from 'axios-cache-adapter';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const maxAge = HOUR * 24;

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

const axiosTMDB = configure();

export default axiosTMDB;
