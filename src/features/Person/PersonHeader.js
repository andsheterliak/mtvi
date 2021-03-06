import { createSelector } from '@reduxjs/toolkit';

import { formatDataStr, getAge } from '~common/utils/date';

import Header from './components/Header';
import { getData } from './personSelectors';
import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';
import noUserPhotoImg from '~assets/img/no-user-photo.svg';

const getGender = (gender) => {
  if (!gender) return null;

  return gender === 1 ? 'Female' : 'Male';
};

const getLifeDates = (birthday, deathday) => {
  if (deathday) {
    const { dateParts } = formatDataStr(birthday);
    const { dateObj, dateStr: deathDateStr } = formatDataStr(deathday);

    deathday = `${deathDateStr} (${getAge(dateParts, dateObj)} years old)`;
  }

  if (birthday) {
    const { dateStr, dateParts } = formatDataStr(birthday);

    birthday = deathday
      ? dateStr
      : `${dateStr} (${getAge(dateParts)} years old)`;
  }

  return { birthday, deathday };
};

const getDataList = createSelector(getData, (data) => {
  if (!data) return null;

  const dataList = [];

  const { birthday, deathday } = getLifeDates(data.birthday, data.deathday);

  dataList.push({
    name: 'Birthday',
    value: birthday,
  });

  if (deathday)
    dataList.push({
      name: 'Day of death',
      value: deathday,
    });

  dataList.push({
    name: 'Place of birth',
    value: data.place_of_birth,
  });

  dataList.push({
    name: 'Gender',
    value: getGender(data.gender),
  });

  dataList.push({
    name: 'Known for',
    value: data.known_for_department,
  });

  return dataList;
});

const PersonHeader = ({ isLoading, data }) => {
  const dataList = getDataList(data);

  return (
    <Header
      isLoading={isLoading}
      dataList={dataList}
      name={data?.name}
      biography={data?.biography}
      externalIds={data?.external_ids}
      imgData={{
        basePath: IMG_BASE_URL,
        size: IMG_SIZES.profile.h632,
        path: data?.profile_path,
        fallback: noUserPhotoImg,
      }}
    />
  );
};

export default PersonHeader;
