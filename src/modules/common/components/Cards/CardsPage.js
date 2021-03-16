import { memo } from 'react';
import Cards from './Cards';

// This component is only for optimization. Each 'Cards' component only runs if 'pageData' changes because of each 'Cards' is wrapped in memo.
const CardsPage = ({ data }) => {
  return data.map(({ pageData, pageNum }) => {
    return <Cards key={pageNum} cardsData={pageData} />;
  });
};

export default memo(CardsPage);
