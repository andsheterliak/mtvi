import { memo } from 'react';
import { IMG_BASE_URL, IMG_SIZES } from '../../tmdb-config';
import Card from './Card';
import CardsGridItem from './CardsGridItem';
import noImageImg from '../../../../assets/img/no-image.svg';

const Cards = ({ cardsData }) => {
  const cards = cardsData.map((item) => {
    const posterPath = item.poster_path
      ? `${IMG_BASE_URL}${IMG_SIZES.poster}${item.poster_path}`
      : noImageImg;

    return (
      <CardsGridItem key={item.id}>
        <Card
          posterPath={posterPath}
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
