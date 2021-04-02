export const getCertification = (data) => {
  if (!data) return null;

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
  return genres.map((item) => item.name).join(', ');
};

export const getHyphenOrData = (value) => {
  const hyphen = '-';

  if (value === null || typeof value === 'undefined' || value === '') {
    return hyphen;
  }

  if (Array.isArray(value) && value.length === 0) {
    return hyphen;
  }

  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return hyphen;
  }

  return value;
};
