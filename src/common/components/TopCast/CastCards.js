import { ROUTE_NAMES } from '~common/constants';

import types from '~common/types';

import PersonCard from '~components/PersonCard';

const CastCards = ({ cardsData }) => {
  const cards = cardsData.map((item) => {
    return (
      <PersonCard
        key={item.id}
        profilePath={item.profile_path}
        name={item.name}
        bodyContent={item.character ?? item.roles[0].character}
        path={`${ROUTE_NAMES.person}/${item.id}`}
      />
    );
  });

  return cards;
};

CastCards.propTypes = {
  cardsData: types.specific.cardsData,
};

export default CastCards;
