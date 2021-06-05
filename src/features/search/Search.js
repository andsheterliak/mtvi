import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { checkIfIsData } from '~common/utils/getData';
import Cards from '~components/Cards';
import CardsGrid from '~components/grids/CardsGrid';
import PageGrid from '~components/grids/PageGrid';
import MainContainer from '~components/MainContainer';
import MainContent from '~components/MainContent';
import NoContent from '~components/NoContent';

import Pagination, { usePagination } from '~components/Pagination';
import SelectionBar, { useSelectionBar } from '~components/SelectionBar';
import Spacer from '~components/Spacer';
import PersonCards from '~features/people/components/PersonCards';
import { searchActions } from './searchSlice';

const createSelectionBarData = (data) => {
  const mediaTypes = { movie: 'movie', tv: 'tv', person: 'person' };

  const selectionBarData = {
    [mediaTypes.movie]: { name: 'Movies', amount: 0, data: [] },
    [mediaTypes.tv]: { name: 'TV Shows', amount: 0, data: [] },
    [mediaTypes.person]: { name: 'People', amount: 0, data: [] },
  };

  data.forEach((item) => {
    if (!mediaTypes[item.media_type]) return;

    const mapValue = selectionBarData[item.media_type];

    mapValue.amount += 1;
    mapValue.data.push(item);
  });

  return selectionBarData;
};

const Search = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { selected, setSelected } = useSelectionBar('movie');
  const { page, changePage } = usePagination();

  const isLoading = useSelector((state) => state.search.isLoading);
  const totalPages = useSelector((state) => state.search.totalPages);
  const data = useSelector((state) => state.search.data);

  let selectionBarData;
  let cards;

  if (data) {
    selectionBarData = createSelectionBarData(data);

    const CardsComponent = selected === 'person' ? PersonCards : Cards;

    cards = checkIfIsData(selectionBarData[selected].data) ? (
      <CardsGrid>
        <CardsComponent cardsData={selectionBarData[selected].data} />
      </CardsGrid>
    ) : (
      <NoContent
        message={`There are no ${selectionBarData[
          selected
        ].name.toLowerCase()} that matched your query.`}
      />
    );
  }

  useEffect(() => {
    const search = new URLSearchParams(location.search).get('query');

    if (search) {
      dispatch(searchActions.fetchData({ search, page }));
    }

    return () => {
      dispatch(searchActions.resetState());
    };
  }, [dispatch, location.search, page]);

  const changePageHandler = (event, newPage) => {
    if (!changePage(event, newPage));
  };

  const selectHandler = (e, key) => {
    setSelected(key);
  };

  return (
    <>
      <Spacer />

      {data && (
        <MainContent>
          <MainContainer>
            <PageGrid>
              <SelectionBar
                title="Search Results"
                data={selectionBarData}
                selectHandler={selectHandler}
                selected={selected}
              />

              <div>
                {cards}

                <Pagination
                  isLoading={isLoading}
                  page={page}
                  totalPages={totalPages}
                  changePageHandler={changePageHandler}
                />
              </div>
            </PageGrid>
          </MainContainer>
        </MainContent>
      )}
    </>
  );
};

export default Search;
