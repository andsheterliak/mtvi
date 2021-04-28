import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import MainContainer from '~components/MainContainer';
import Layout from '~components/Layout';
import Spacer from '~components/Spacer';
import MainContent from '~components/MainContent';
import PersonHeader from './PersonHeader';
import CreditsList from './CreditsList/CreditsList';
import KnownFor from './KnownFor';

import { personActions } from './personSlice';

const Person = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data } = useSelector((state) => state.person);

  useEffect(() => {
    dispatch(personActions.fetchData(id));

    return () => {
      dispatch(personActions.resetState());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Spacer />

      {data ? (
        <MainContent>
          <MainContainer>
            <Layout>
              <PersonHeader />

              <KnownFor />

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
