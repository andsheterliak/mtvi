import { Video } from '~/api/tmdb';

export type VideoData = {
  id: Video['key'];
  name: Video['name'];
};
