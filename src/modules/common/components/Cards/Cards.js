import { memo } from 'react';
import { IMG_BASE_URL, IMG_SIZES } from '../../tmdb-config';
import Card from './Card';
import CardsGridItem from './CardsGridItem';

const Cards = ({ cardsData }) => {
  const cards = cardsData.map((item) => {
    return (
      <CardsGridItem key={item.id}>
        <Card
          posterPath={`${IMG_BASE_URL}${IMG_SIZES.poster}${item.poster_path}`}
          title={item.title || item.name}
          releaseDate={item.release_date || item.first_air_date}
          voteAverage={item.vote_average}
        />
      </CardsGridItem>
    );
  });

  return cards;
};

export default memo(Cards);
