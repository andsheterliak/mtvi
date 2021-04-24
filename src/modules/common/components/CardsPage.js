import { arrayOf, exact, number, object } from 'prop-types';

import types from '~common/types';

/**
 * This component is only for adding new cards in optimized way.
 * Each 'CardsComponent' won't re-render (to virtual dom) because each 'CardsComponent' is wrapped in 'memo'.
 * 'cardsData' reference remains the same as each page of cards data is appended to the previous one, so 'memo' works properly because it compares object references.
 */

const CardsPage = ({ data, CardsComponent }) => {
  return data.map(({ pageData, pageNum }) => {
    return <CardsComponent key={pageNum} cardsData={pageData} />;
  });
};

CardsPage.propTypes = {
  data: arrayOf(
    exact({
      pageData: types.cardsData,
      pageNum: number.isRequired,
    })
  ).isRequired,

  CardsComponent: object.isRequired,
};

export default CardsPage;
