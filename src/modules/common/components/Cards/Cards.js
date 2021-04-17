import { memo } from 'react';

import Card from './Card';

import { getPath } from '../../utils/getData';

const Cards = ({ cardsData }) => {
  const cards = cardsData.map((item) => {
    const path = getPath({
      name: item.name,
      episodeCount: item.first_air_date,
      firstAirDate: item.episode_count,
    });

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
