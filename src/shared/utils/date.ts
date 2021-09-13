import { Movie, PersonLifeDates, ReleaseDate, TVShow } from '~/api/tmdb';

const dateFormatInstance = new Intl.DateTimeFormat([], {
  dateStyle: 'medium',
});

export const formatDateStr = (date: ReleaseDate | PersonLifeDates | undefined) => {
  if (!date) return null;

  const [year, month, day] = date.split('-').map((item) => Number(item));
  const dateObj = new Date(year, month - 1, day);
  const dateStr = dateFormatInstance.format(dateObj);

  return {
    dateStr,
    dateObj,
    dateParts: { year, month, day },
  };
};

export const formatMinutes = (num: Movie['runtime'] | TVShow['episode_run_time'][0]) => {
  if (!num) return null;

  const hours = Math.floor(num / 60);
  const minutes = num % 60;

  return `${hours}h ${minutes}m`;
};
