import { createFilterConfig } from '~/shared/components';

export const filterConfig = createFilterConfig({
  all: { label: 'All', value: 'all' },
  movies: { label: 'Movies', value: 'movies' },
  tvShows: { label: 'TV Shows', value: 'tv' },
});
