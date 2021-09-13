import { Character, Id, Job, Name, ReleaseDate } from '~/api/tmdb';
import { Path } from '~/shared/types';

export type TimelineEmploymentItem = {
  name: string;
  value: Character | Job;
};

export type TimelineItem = {
  id: Id;
  name: Name;
  year: number | null;
  dateStr: ReleaseDate;
  path: Path;

  employment: {
    [departmentKey: string]: TimelineEmploymentItem;
  };
};

export type TimelineItems = TimelineItem[];

export type TimelineData = {
  [idKey: number]: TimelineItem;
};
