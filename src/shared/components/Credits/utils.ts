import {
  Character,
  EpisodeCredits,
  Id,
  ImagePath,
  MovieCredits,
  Name,
  TVShowCredits,
} from '~/api/tmdb';
import { CreditsName } from './types';

const creditNameToTitle = (name: string) => {
  return name
    .split('_')
    .map((namePart) => `${namePart[0].toUpperCase()}${namePart.substring(1)}`)
    .join(' ');
};

type Credits =
  | TVShowCredits['cast']
  | TVShowCredits['crew']
  | MovieCredits['cast']
  | MovieCredits['crew']
  | EpisodeCredits['cast']
  | EpisodeCredits['crew']
  | EpisodeCredits['guest_stars'];

export type CustomCredit = {
  name: Name;
  info: Character | undefined;
  id: Id;
  profilePath: ImagePath;
};

export type CustomCredits = CustomCredit[];

const createTeam = (
  crew: TVShowCredits['crew'] | MovieCredits['crew'] | EpisodeCredits['crew']
) => {
  const preTeam: {
    [department: CreditsName]: {
      [id: number]: CustomCredit;
    };
  } = {};

  crew.forEach((item) => {
    const { department, name, id, profile_path: profilePath } = item;

    let info = '';

    if ('jobs' in item) {
      info = item.jobs.map((jobItem) => jobItem.job).join(', ');
    }

    if ('job' in item) info = item.job;

    if (!preTeam[department]) {
      preTeam[department] = {
        [id]: { name, info, id, profilePath },
      };

      return;
    }

    const savedDepartment = preTeam[department];

    if (savedDepartment[id]) {
      const savedItem = savedDepartment[id];

      savedItem.info += savedItem.info && info ? `, ${info}` : info;

      return;
    }

    savedDepartment[id] = { name, info, id, profilePath };
  });

  const team: {
    [department: string]: CustomCredits;
  } = {};

  Object.entries(preTeam).forEach(([departmentName, departmentData]) => {
    team[departmentName] = Object.values(departmentData);
  });

  return team;
};

export const getCreditsData = (
  credits: TVShowCredits | MovieCredits | EpisodeCredits | undefined
) => {
  if (!credits) return null;

  const isCreditItems = Object.values(credits).some((item: Credits) => {
    return item.length !== 0;
  });

  if (!isCreditItems) return null;

  const commonCredits: {
    [creditName: string]: CustomCredits;
  } = {};

  Object.entries(credits).forEach(([creditName, creditItems]: [string, Credits]) => {
    if (creditName === 'crew') return;
    if (creditItems.length === 0) return;

    creditName = creditNameToTitle(creditName);

    commonCredits[creditName] = creditItems.map((item) => {
      const { id, profile_path: profilePath, name } = item;

      let info = '';

      if ('roles' in item) {
        info = item.roles
          .map((roleItem) => roleItem.character)
          .filter(Boolean)
          .join(', ');
      }

      if ('character' in item) info = item.character;

      return {
        name,
        info,
        id,
        profilePath,
      };
    });
  });

  if (credits.crew.length === 0) return commonCredits;

  const team = createTeam(credits.crew);

  return { ...commonCredits, Team: team };
};

export type CustomCreditsData = ReturnType<typeof getCreditsData>;
export type CustomTeamCredits = ReturnType<typeof createTeam>;
