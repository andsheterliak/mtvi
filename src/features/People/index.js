import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import useScrollToTop from '~common/hooks/useScrollToTop';
import { ifIsData } from '~common/utils/getData';
import { ROUTE_NAMES } from '~common/constants';
import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';

import FocusableContainer, { useFocus } from '~components/FocusableContainer';
import CardsGrid from '~components/grids/CardsGrid';
import MainContainer from '~components/MainContainer';
import RouteHeader from '~components/RouteHeader';
import MainContent from '~components/MainContent';
import PersonCards from './components/PersonCards';
import Pagination, { usePagination } from '~components/Pagination';
import noImage from '~assets/img/no-image.svg';
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

  const isData = ifIsData(data);

  useEffect(() => {
    dispatch(peopleActions.fetchData({ page }));
  }, [dispatch, page]);

  useEffect(() => {
    return () => {
      dispatch(peopleActions.resetState());
    };
  }, [dispatch]);

  const cards = isData ? (
    <PersonCards
      cardsData={data}
      routeName={ROUTE_NAMES.person}
      imgData={{
        basePath: IMG_BASE_URL,
        size: IMG_SIZES.profile,
        fallback: noImage,
      }}
    />
  ) : (
    'Loading...'
  );

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

export { default as peopleReducer } from './peopleSlice';
export default People;
