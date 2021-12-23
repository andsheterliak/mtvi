import * as Common from './common-types';

export type TVShowsData = {
  page: Common.Page;
  total_pages: Common.TotalPages;
  total_results: Common.TotalResults;
  results: Common.TVShowItems;
};

export type TVShowCast = (Common.BaseCastItem & {
  roles: {
    character: Common.Character;
  }[];
})[];

export type TVShowCertifications = {
  iso_3166_1: Common.ISO31661;
  rating: Common.Certification;
}[];

export type SeasonItem = {
  id: Common.Id;
  poster_path: Common.ImagePath;
  name: Common.Name;
  air_date: Common.ReleaseDate;
  episode_count: number;
  season_number: Common.SeasonNumber;
  overview: Common.Overview;
};

export type TVShowCredits = {
  cast: TVShowCast;
  crew: (Common.BaseCrewItem & { jobs: { job: Common.Job }[] })[];
};

export type TVShow = {
  id: Common.Id;
  overview: Common.Overview;
  name: Common.Name;
  backdrop_path: Common.ImagePath;
  poster_path: Common.ImagePath;
  created_by: { name: Common.Name; id: Common.Id }[];
  first_air_date: Common.ReleaseDate;

  content_ratings: {
    results: TVShowCertifications;
  };

  genres: Common.Genres;
  episode_run_time: number[];
  networks: { name: Common.Name }[];
  vote_average: Common.VoteAverage;
  status: Common.Status;
  aggregate_credits: TVShowCredits;
  seasons: SeasonItem[];
  videos: { results: Common.Videos };
};

export type SeasonEpisode = {
  still_path: Common.ImagePath;
  id: Common.Id;
  name: Common.Name;
  overview: Common.Overview;
  air_date: Common.ReleaseDate;
  vote_average: Common.VoteAverage;
  episode_number: Common.EpisodeNumber;
};

export type Season = {
  poster_path: Common.ImagePath;
  name: Common.Name;
  episodes: SeasonEpisode[];
};

export type EpisodeCredits = {
  cast: Common.Cast;
  guest_stars: Common.Cast;
  crew: Common.Crew;
};

export type Episode = {
  season_number: Common.SeasonNumber;
  episode_number: Common.EpisodeNumber;
  name: Common.Name;
  still_path: Common.ImagePath;
  credits: EpisodeCredits;
  videos: { results: Common.Videos };
};
