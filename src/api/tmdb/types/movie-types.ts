import * as Common from './common-types';

export type MoviesData = {
  page: Common.Page;
  total_pages: Common.TotalPages;
  total_results: Common.TotalResults;
  results: Common.MovieItems;
};

export type MovieCertifications = {
  iso_3166_1: Common.ISO31661;
  release_dates: { certification: Common.Certification }[];
}[];

export type MovieCredits = { cast: Common.Cast; crew: Common.Crew };

export type Movie = {
  id: Common.Id;
  poster_path: Common.ImagePath;
  overview: Common.Overview | null;
  title: Common.Name;
  backdrop_path: Common.ImagePath;
  release_date: Common.ReleaseDate;
  runtime: number | null;
  vote_average: Common.VoteAverage;
  status: Common.Status;

  release_dates: {
    results: MovieCertifications;
  };

  credits: MovieCredits;
  genres: Common.Genres;
  videos: { results: Common.Videos };
};
