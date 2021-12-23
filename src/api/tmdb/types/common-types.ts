export type ImagePath = string | null;
export type Page = number;
export type Id = number;
export type ReleaseDate = string;
export type EpisodeNumber = number;
export type SeasonNumber = number;
export type VoteAverage = number;
export type TotalPages = number;
export type TotalResults = number;
export type Status = string;
export type ISO31661 = string;
export type Overview = string;
export type Character = string;
export type Job = string;
export type Department = string;
export type Name = string;
export type Certification = string;

export type Video = {
  key: string;
  name: Name;
  site: string;
  type: string;
};

export type Videos = Video[];

export type Genre = { id: Id; name: Name };
export type Genres = Genre[];

export type BaseCastItem = {
  id: Id;
  profile_path: ImagePath;
  name: Name;
};

export type Cast = (BaseCastItem & { character: Character })[];

export type BaseCrewItem = {
  department: Department;
  name: Name;
  id: Id;
  profile_path: ImagePath;
};

export type Crew = (BaseCrewItem & { job: Job })[];

export type MediaTypes = {
  movie: 'movie';
  tv: 'tv';
  person: 'person';
};

export type MediaTypesKeys = keyof MediaTypes;

export type MovieItem = {
  poster_path: ImagePath;
  id: Id;
  release_date: ReleaseDate;
  title: Name;
  vote_average: VoteAverage;
};

export type MovieItems = MovieItem[];

export type TVShowItem = {
  poster_path: ImagePath;
  id: Id;
  first_air_date: ReleaseDate;
  name: Name;
  vote_average: VoteAverage;
};

export type TVShowItems = TVShowItem[];

export type PersonItem = {
  known_for: ({ name: Name } | { title: Name })[];
  profile_path: ImagePath;
  id: Id;
  name: Name;
};

export type PersonItems = PersonItem[];
