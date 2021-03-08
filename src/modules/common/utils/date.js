export const formatReleaseDate = (date) => {
  const [year, month, day] = date.split('-');
  const dateObj = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat([], { dateStyle: 'medium' }).format(dateObj);
};
