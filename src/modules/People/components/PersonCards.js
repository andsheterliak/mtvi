import { memo } from 'react';

import PersonCard from './PersonCard';

const PersonCards = ({ cardsData }) => {
  const cards = cardsData.map((item) => {
    return (
      <PersonCard
        key={item.id}
        profilePath={item.profile_path}
        name={item.name}
        knownFor={item.known_for}
        path={`/people/${item.id}`}
      />
    );
  });

  return cards;
};

export default memo(PersonCards);
