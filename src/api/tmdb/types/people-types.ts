import * as Common from './common-types';

type VoteCount = number;

export type PeopleData = {
  page: Common.Page;
  total_pages: Common.TotalPages;
  total_results: Common.TotalResults;
  results: Common.PersonItem[];
};

type BaseMovieCredit = {
  vote_count: VoteCount;
  id: Common.Id;
  poster_path: Common.ImagePath;
  title: Common.Name;
  release_date: Common.ReleaseDate;
  vote_average: Common.VoteAverage;
};

export type MovieCreditCast = BaseMovieCredit & {
  character: Common.Character;
};

export type MovieCreditCrew = BaseMovieCredit & {
  job: Common.Job;
  department: Common.Department;
};

type BaseTVCredit = {
  vote_count: VoteCount;
  id: Common.Id;
  poster_path: Common.ImagePath;
  name: Common.Name;
  first_air_date: Common.ReleaseDate;
  vote_average: Common.VoteAverage;
};

export type TVCreditCast = BaseTVCredit & {
  character: Common.Character;
};

export type TVCreditCrew = BaseTVCredit & {
  job: Common.Job;
  department: Common.Department;
};

type ExternalId = string | null;

export type PersonLifeDates = string | null;

export type Person = {
  profile_path: Common.ImagePath;
  name: Common.Name;
  biography: string;

  external_ids: {
    facebook_id: ExternalId;
    instagram_id: ExternalId;
    twitter_id: ExternalId;
  };

  birthday: PersonLifeDates;
  deathday: PersonLifeDates;
  place_of_birth: string | null;
  gender: 0 | 1 | 2;
  known_for_department: string | null;

  movie_credits: {
    cast: MovieCreditCast[];
    crew: MovieCreditCrew[];
  };

  tv_credits: {
    cast: TVCreditCast[];
    crew: TVCreditCrew[];
  };
};
