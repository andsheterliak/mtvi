import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import useFocusContainer from '~common/hooks/useFocusContainer';
import useScrollToTop from '~common/hooks/useScrollToTop';
import usePagination from '~common/hooks/usePagination';
import { checkIfIsData } from '~common/utils/getData';
import types from '~common/types';

import CardsGrid from '~components/CardsGrid';
import MainContainer from '~components/MainContainer';
import RouteHeader from '~components/RouteHeader';
import MainContent from '~components/MainContent';
import PersonCards from './components/PersonCards';
import Pagination from '~components/Pagination';

import { peopleActions } from './peopleSlice';

const People = ({ titleName }) => {
  useScrollToTop();

  const { focus, FocusableContainer } = useFocusContainer();
  const dispatch = useDispatch();
  const { pathname, page } = usePagination();

  const { data, isLoading, totalPages } = useSelector((state) => state.people);

  const changePageHandler = (e, newPage) => {
    if (page === newPage) return;

    focus();
  };

  const isData = checkIfIsData(data);

  useEffect(() => {
    dispatch(peopleActions.fetchData({ page }));
  }, [dispatch, page]);

  useEffect(() => {
    return () => {
      dispatch(peopleActions.resetState());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cards = isData ? <PersonCards cardsData={data} /> : 'Loading...';

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
          page={page}
          path={pathname}
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
