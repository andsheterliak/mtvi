import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import useScrollToTop from '~common/hooks/useScrollToTop';
import useFocusContainer from '~common/hooks/useFocusContainer';
import { checkIfIsData } from '~common/utils/getData';
import { scrollToTop } from '~common/utils/dom';
import types from '~common/types';

import CardsGrid from '~components/CardsGrid';
import MainContainer from '~components/MainContainer';
import RouteHeader from '~components/RouteHeader';
import MainContent from '~components/MainContent';
import PersonCards from './components/PersonCards/PersonCards';

import { peopleActions } from './peopleSlice';
import Pagination from '~components/Pagination';

const People = ({ titleName }) => {
  useScrollToTop();

  const { focus, FocusableContainer } = useFocusContainer();
  const dispatch = useDispatch();

  const { people, isLoading, currentPage, totalPages } = useSelector(
    (state) => state.people
  );

  const changePageHandler = (e, page) => {
    if (currentPage === page) return;

    dispatch(peopleActions.fetchPeople({ page }));
    focus();
    scrollToTop();
  };

  const isData = checkIfIsData(people);

  useEffect(() => {
    if (isData) return;

    dispatch(peopleActions.fetchPeople({ page: currentPage }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cards = isData ? <PersonCards cardsData={people} /> : 'Loading...';

  return (
    <MainContainer>
      <RouteHeader titleName={titleName} />

      <FocusableContainer>
        <MainContent>
          <CardsGrid>{cards}</CardsGrid>
        </MainContent>
      </FocusableContainer>

      {isData && (
        <Pagination
          isLoading={isLoading}
          page={currentPage}
          totalPages={totalPages}
          changePageHandler={changePageHandler}
        />
      )}
    </MainContainer>
  );
};

People.propTypes = {
  titleName: types.pageTitle,
};

export default People;
