export const ifIsData = (data) => {
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
  if (!ifIsData(data)) return null;

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
  if (!ifIsData(genres)) return null;

  return genres.map((item) => item.name).join(', ');
};

export const getHyphenOrData = (value) => {
  const hyphen = '-';

  return ifIsData(value) ? value : hyphen;
};

export const getPath = ({ name, firstAirDate, episodeCount, routeNames }) => {
  return name || firstAirDate || episodeCount
    ? `/${routeNames.tvShow}`
    : `/${routeNames.movie}`;
};

export const getImagePath = ({ basePath, size, path, fallback }) => {
  return path ? `${basePath}${size}${path}` : fallback;
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

export const getKnownFor = (knownForData) => {
  return knownForData.map((el) => el.original_name || el.title).join(', ');
};
