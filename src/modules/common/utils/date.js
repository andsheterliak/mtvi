export const formatReleaseDate = (date) => {
  const [year, month, day] = date.split('-');
  const dateObj = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat([], { dateStyle: 'medium' }).format(dateObj);
};

export const formatDateToAPI = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedDate = [year, month, day]
    .map((item) => {
      let itemStr = item.toString();

      if (itemStr.length === 1) {
        itemStr = `0${itemStr}`;
      }

      return itemStr;
    })
    .join('-');

  return formattedDate;
};