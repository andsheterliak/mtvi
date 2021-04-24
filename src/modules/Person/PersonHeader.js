import { useSelector } from 'react-redux';

import { formatDataStr, getAge } from '~common/utils/date';

import Header from './components/Header';

const getGender = (gender) => {
  if (!gender) return null;

  return gender === 1 ? 'Female' : 'Male';
};

const getLifeDates = (birthday, deathday) => {
  if (deathday) {
    const { dateStr, dateParts } = formatDataStr(deathday);

    deathday = `${dateStr} (${getAge(dateParts)} years old)`;
  }

  if (birthday) {
    const { dateStr, dateParts } = formatDataStr(birthday);

    birthday = deathday
      ? dateStr
      : `${dateStr} (${getAge(dateParts)} years old)`;
  }

  return { birthday, deathday };
};

const generateDataList = (data) => {
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
};

const PersonHeader = () => {
  const { person } = useSelector((state) => state.person);

  const dataList = generateDataList(person);

  return (
    <Header
      dataList={dataList}
      name={person.name}
      biography={person.biography}
      profilePath={person.profile_path}
      externalIds={person.external_ids}
    />
  );
};

export default PersonHeader;
