import { getImagePath } from '~common/utils/getData';

import PersonCard from '~components/PersonCard';

const CastCards = ({ cardsData, imgData, routeName }) => {
  const cards = cardsData.map((item) => {
    const imgPath = getImagePath({ ...imgData, path: item.profile_path });

    return (
      <PersonCard
        key={item.id}
        imgPath={imgPath}
        name={item.name}
        bodyContent={item.character ?? item.roles[0].character}
        path={`/${routeName}/${item.id}`}
      />
    );
  });

  return cards;
};

export default CastCards;
