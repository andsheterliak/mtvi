const dateFormatInstance = new Intl.DateTimeFormat([], {
  dateStyle: 'medium',
});

export const formatDataStr = (date) => {
  if (!date) return null;

  const [year, month, day] = date.split('-');
  const dateObj = new Date(year, month - 1, day);
  const dateStr = dateFormatInstance.format(dateObj);

  return {
    dateStr,
    dateObj,

    dateParts: {
      year: parseInt(year, 10),
      month: parseInt(month, 10),
      day: parseInt(day, 10),
    },
  };
};

export const formatMinutes = (num) => {
  if (!num) return null;

  const hours = Math.floor(num / 60);
  const minutes = num % 60;

  return `${hours}h ${minutes}m`;
};

export const formatDateToAPI = (date) => {
  // If no date return null to disable validation in DatePicker and to remove 'primary_release_date' from axios search props.
  if (!date) return null;

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedDate = [year, month, day]
    // [2021, 1, 10] => 2021-01-10
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

export const getAge = ({ year, month, day }, deathday) => {
  const today = deathday ?? new Date();
  const birthDate = new Date(year, month - 1, day);
  let age = today.getFullYear() - birthDate.getFullYear();
  month = today.getMonth() - birthDate.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};
