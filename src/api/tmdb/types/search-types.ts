import * as Common from './common-types';

type MovieSearchItem = Common.MovieItem & {
  media_type: Common.MediaTypes['movie'];
};

type TVSearchItem = Common.TVShowItem & {
  media_type: Common.MediaTypes['tv'];
};

type PersonSearchItem = Common.PersonItem & {
  media_type: Common.MediaTypes['person'];
};

export type SearchData = {
  page: Common.Page;
  total_pages: Common.TotalPages;
  total_results: Common.TotalResults;
  results: (MovieSearchItem | TVSearchItem | PersonSearchItem)[];
};
