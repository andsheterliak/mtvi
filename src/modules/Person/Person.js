import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import PersonHeader from './components/PersonHeader';
import Spacing from '../common/components/Spacing';

import useScrollToTop from '../common/hooks/useScrollToTop';
import { personActions } from './personSlice';
import { getAge, formatDataStr } from '../common/utils/date';

const generateDataList = (data) => {
  const isDeathday = !!data.deathday;
  let deathday;

  if (isDeathday) {
    const { dateStr, dateParts } = formatDataStr(data.deathday);
    deathday = `${dateStr} (${getAge(dateParts)} years old)`;
  }

  const { dateStr, dateParts } = formatDataStr(data.birthday);
  const birthday = !isDeathday
    ? `${dateStr} (${getAge(dateParts)} years old)`
    : dateStr;

  const dataList = [
    { name: 'Birthday', value: birthday },
    { name: 'Place of birth', value: data.place_of_birth },
    { name: 'Gender', value: data.gender === 1 ? 'Female' : 'Male' },
    { name: 'Known for', value: data.known_for_department },
  ];

  if (isDeathday) dataList.push({ name: 'Day of death', value: deathday });

  return dataList;
};

const Person = () => {
  useScrollToTop();

  const dispatch = useDispatch();
  const { id } = useParams();

  const { person } = useSelector((state) => state.person);

  useEffect(() => {
    dispatch(personActions.fetchPerson(id));

    return () => {
      dispatch(personActions.resetState());
    };
  }, [dispatch, id]);

  return (
    <>
      <Spacing />

      {person ? (
        <main>
          <PersonHeader
            dataList={generateDataList(person)}
            name={person.name}
            biography={person.biography}
            profilePath={person.profile_path}
            externalIds={person.external_ids}
          />
        </main>
      ) : (
        'Loading'
      )}
    </>
  );
};

export default Person;
