import { memo } from 'react';

// This component is only for optimization. Each 'CardsComponent' only runs if 'pageData' - (object with new data on load more action) changes because of each 'CardsComponent' is wrapped in memo.
const CardsPage = ({ data, CardsComponent, path }) => {
  return data.map(({ pageData, pageNum }) => {
    return <CardsComponent key={pageNum} cardsData={pageData} path={path} />;
  });
};

export default memo(CardsPage);
