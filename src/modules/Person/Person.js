import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import MainContainer from '../common/components/MainContainer';
import PersonHeader from './components/PersonHeader/PersonHeader';
import Spacer from '../common/components/Spacer';
import CreditsList from './CreditsList/CreditsList';
import KnownFor from './components/KnownFor';
import MainContent from '../common/components/MainContent';
import Layout from '../common/components/Layout';

import useScrollToTop from '../common/hooks/useScrollToTop';
import { personActions } from './personSlice';
import { getAge, formatDataStr } from '../common/utils/date';

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
      <Spacer />

      {person ? (
        <MainContent>
          <MainContainer>
            <Layout>
              <PersonHeader
                dataList={generateDataList(person)}
                name={person.name}
                biography={person.biography}
                profilePath={person.profile_path}
                externalIds={person.external_ids}
              />

              <KnownFor
                data={{
                  movieCredits: person.movie_credits,
                  tvCredits: person.tv_credits,
                }}
              />

              <CreditsList />
            </Layout>
          </MainContainer>
        </MainContent>
      ) : (
        'Loading'
      )}
    </>
  );
};

export default Person;
