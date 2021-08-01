import { getImagePath, getKnownFor } from '~/shared/utils';
import { Card, CardSubText } from '~/shared/components/Card';

export const PersonCards = ({ cardsData, imgData, routeName, isLoading }) => {
  if (isLoading) {
    return Array(20)
      .fill()
      .map((_, index) => {
        return (
          <Card
            key={index}
            isLoading={true}
            subData={<CardSubText isLoading={true} />}
          />
        );
      });
  }

  return cardsData.map((item) => {
    const knownFor = getKnownFor(item.known_for);
    const imgPath = getImagePath({ ...imgData, path: item.profile_path });

    return (
      <Card
        key={item.id}
        imgPath={imgPath}
        title={item.name}
        path={`/${routeName}/${item.id}`}
        subData={knownFor && <CardSubText>{knownFor}</CardSubText>}
      />
    );
  });
};
