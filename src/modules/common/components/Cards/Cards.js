import { memo } from 'react';

import Card from './Card';

const Cards = ({ cardsData, path }) => {
  const cards = cardsData.map((item) => {
    return (
      <Card
        key={item.id}
        path={path}
        posterPath={item.poster_path}
        title={item.title || item.name}
        releaseDate={item.release_date || item.first_air_date}
        voteAverage={item.vote_average}
        id={item.id}
      />
    );
  });

  return cards;
};

export default memo(Cards);
