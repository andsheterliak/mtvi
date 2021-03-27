export const getCertification = (data) => {
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

export const getDirectorAndWriters = (crew) => {
  const directors = [];
  const writers = [];

  crew.forEach((item) => {
    if (item.job === 'Director') directors.push(item.name);
    if (item.department === 'Writing') writers.push(item.name);
  });

  return { directors: directors.join(', '), writers: writers.join(', ') };
};

export const getGenres = (genres) => {
  return genres.map((item) => item.name).join(', ');
};
