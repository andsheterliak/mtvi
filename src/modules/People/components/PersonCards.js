import { memo } from 'react';

import CardsGridItem from '../../common/components/Cards/CardsGridItem';
import PersonCard from './PersonCard';

const PersonCards = ({ cardsData, path }) => {
  const cards = cardsData.map((item) => {
    return (
      <CardsGridItem key={item.id}>
        <PersonCard
          profilePath={item.profile_path}
          name={item.name}
          knownFor={item.known_for}
          path={path}
        />
      </CardsGridItem>
    );
  });

  return cards;
};

export default memo(PersonCards);
