import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import useScrollToTop from '~common/hooks/useScrollToTop';
import { checkIfIsData } from '~common/utils/getData';

import FocusableContainer, { useFocus } from '~components/FocusableContainer';
import CardsGrid from '~components/grids/CardsGrid';
import MainContainer from '~components/MainContainer';
import RouteHeader from '~components/RouteHeader';
import MainContent from '~components/MainContent';
import PersonCards from './components/PersonCards';
import Pagination, { usePagination } from '~components/Pagination';

import { peopleActions } from './peopleSlice';

const People = ({ titleName }) => {
  useScrollToTop();

  const { focus, containerRef } = useFocus();
  const dispatch = useDispatch();
  const { page, changePage } = usePagination();

  const data = useSelector((state) => state.people.data);
  const isLoading = useSelector((state) => state.people.isLoading);
  const totalPages = useSelector((state) => state.people.totalPages);

  const changePageHandler = (event, newPage) => {
    if (!changePage(event, newPage)) return;
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

      <FocusableContainer containerRef={containerRef}>
        <MainContent>
          <CardsGrid>{cards}</CardsGrid>
        </MainContent>
      </FocusableContainer>

      {isData && (
        <Pagination
          isLoading={isLoading}
          page={page}
          totalPages={totalPages}
          changePageHandler={changePageHandler}
        />
      )}
    </MainContainer>
  );
};

export default People;
