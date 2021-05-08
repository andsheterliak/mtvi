import { ROUTE_NAMES } from '~common/constants';

import types from '~common/types';

import PersonCard from '~components/PersonCard';

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
        bodyContent={knownFor}
        path={`${ROUTE_NAMES.person}/${item.id}`}
      />
    );
  });

  return cards;
};

PersonCards.propTypes = {
  cardsData: types.specific.cardsData,
};

export default PersonCards;