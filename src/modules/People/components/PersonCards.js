import CardsGridItem from '../../common/components/Cards/CardsGridItem';
import { IMG_BASE_URL, IMG_SIZES } from '../../common/tmdb-config';
import PersonCard from './PersonCard';

const PersonCards = ({ cardsData }) => {
  const cards = cardsData.map((item) => {
    const profilePath = `${IMG_BASE_URL}${IMG_SIZES.profile}${item.profile_path}`;

    return (
      <CardsGridItem key={item.id}>
        <PersonCard
          profilePath={profilePath}
          name={item.name}
          knownFor={item.known_for}
        />
      </CardsGridItem>
    );
  });

  return cards;
};

export default PersonCards;
