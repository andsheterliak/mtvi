import { memo } from 'react';

// This component is only for optimization. Each 'CardsComponent' component only runs if 'pageData' changes because of each 'CardsComponent' is wrapped in memo.
const CardsPage = ({ data, CardsComponent }) => {
  return data.map(({ pageData, pageNum }) => {
    return <CardsComponent key={pageNum} cardsData={pageData} />;
  });
};

export default memo(CardsPage);
