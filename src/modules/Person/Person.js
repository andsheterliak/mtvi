import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import MainContainer from '../common/components/MainContainer';
import PersonHeader from './PersonHeader/PersonHeader';
import Spacer from '../common/components/Spacer';
import CreditsList from './CreditsList/CreditsList';
import KnownFor from './KnownFor';
import MainContent from '../common/components/MainContent';
import Layout from '../common/components/Layout';

import useScrollToTop from '../common/hooks/useScrollToTop';
import { personActions } from './personSlice';

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
