import { getImagePath, getKnownFor } from '~common/utils/getData';
import PersonCard from '~components/PersonCard';

const PersonCards = ({ cardsData, imgData, routeName }) => {
  const cards = cardsData.map((item) => {
    const knownFor = getKnownFor(item.known_for);
    const imgPath = getImagePath({ ...imgData, path: item.profile_path });

    return (
      <PersonCard
        key={item.id}
        imgPath={imgPath}
        name={item.name}
        bodyContent={knownFor}
        path={`/${routeName}/${item.id}`}
      />
    );
  });

  return cards;
};

export default PersonCards;
