import { memo } from 'react';

import PersonCard from './PersonCard';

const PersonCards = ({ cardsData }) => {
  const cards = cardsData.map((item) => {
    const knownFor = item.known_for
      .map((el) => el.original_name || el.title)
      .join(', ');

    return (
      <PersonCard
        key={item.id}
        profilePath={item.profile_path}
        name={item.name}
        knownFor={knownFor}
        path={`/people/${item.id}`}
      />
    );
  });

  return cards;
};

export default memo(PersonCards);
