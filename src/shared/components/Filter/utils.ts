import { FilterConfig } from './types';

export const createFilterConfig = <Config extends FilterConfig>(config: Config) => {
  return config;
};
