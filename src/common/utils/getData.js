import { ROUTE_NAMES } from '~common/constants';

export const checkIfIsData = (data) => {
  if (data === null || typeof data === 'undefined' || data === '') {
    return false;
  }

  if (Array.isArray(data) && data.length === 0) {
    return false;
  }

  if (typeof data === 'object' && Object.keys(data).length === 0) {
    return false;
  }

  return true;
};

export const getCertification = (data) => {
  if (!checkIfIsData(data)) return null;

  let certification;
  let isUSCertification;

  data.some((item) => {
    isUSCertification = item.iso_3166_1 === 'US';

    if (isUSCertification) {
      certification = item.release_dates?.[0].certification || item.rating;
    }

    return isUSCertification;
  });

  return certification;
};

export const getGenres = (genres) => {
  if (!checkIfIsData(genres)) return null;

  return genres.map((item) => item.name).join(', ');
};

export const getHyphenOrData = (value) => {
  const hyphen = '-';

  return checkIfIsData(value) ? value : hyphen;
};

export const getPath = ({ name, firstAirDate, episodeCount }) => {
  return name || firstAirDate || episodeCount
    ? ROUTE_NAMES.tvShow
    : ROUTE_NAMES.movie;
};

export const getSelectedGenres = (genres) => {
  return genres
    .reduce((acc, item) => {
      if (item.isSelected) acc.push(item.id);

      return acc;
    }, [])
    .join(',');
};

export const getTopItems = (items, number = 9) => items.slice(0, number);

const creditNameToTitle = (name) => {
  return name
    .split('_')
    .map((namePart) => `${namePart[0].toUpperCase()}${namePart.substring(1)}`)
    .join(' ');
};

export const createCreditsData = (credits) => {
  const commonCredits = {};
  const crew = {};

  Object.entries(credits).forEach(([creditName, creditItems]) => {
    if (creditName === 'crew') return;
    if (!checkIfIsData(creditItems)) return;

    creditName = creditNameToTitle(creditName);

    commonCredits[creditName] = creditItems.map((item) => {
      const { id, profile_path: profilePath, name } = item;

      const info = item.roles
        ? item.roles
            .map((roleItem) => roleItem.character)
            .filter(Boolean)
            .join(', ')
        : item.character;

      return {
        name,
        info,
        id,
        profilePath,
      };
    });
  });

  if (!checkIfIsData(credits.crew)) return commonCredits;

  credits.crew.forEach((item) => {
    const { department, name, id, profile_path: profilePath } = item;

    const info = item.jobs
      ? item.jobs.map((jobItem) => jobItem.job).join(', ')
      : item.job;

    if (!crew[department]) {
      crew[department] = {
        [id]: { name, info, id, profilePath },
      };

      return;
    }

    const savedDepartment = crew[department];

    if (savedDepartment[id]) {
      const savedItem = savedDepartment[id];

      savedItem.info += savedItem.info ? `, ${info}` : info;

      return;
    }

    savedDepartment[id] = { name, info, id, profilePath };
  });

  return { ...commonCredits, Team: crew };
};
