/**
 * This component is only for adding new cards in optimized way.
 * Each 'CardsComponent' won't re-render (to virtual dom) because each 'CardsComponent' is wrapped in 'memo'.
 * 'cardsData' reference remains the same as each page of cards data is appended to the previous one, so 'memo' works properly because it compares object references.
 */

const CardsPage = ({ data, CardsComponent, path }) => {
  return data.map(({ pageData, pageNum }) => {
    return <CardsComponent key={pageNum} cardsData={pageData} path={path} />;
  });
};

export default CardsPage;
