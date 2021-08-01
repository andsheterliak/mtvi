import { CardSubText, Card } from '~/shared/components/Card';
import { getImagePath } from '~/shared/utils';

export const CastCards = ({
  cardsData,
  imgData,
  routeName,
  isLoading,
  castAmount,
}) => {
  if (isLoading) {
    return Array(castAmount)
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

  const cards = cardsData.map((item) => {
    const imgPath = getImagePath({ ...imgData, path: item.profile_path });
    const subText = item.character ?? item.roles[0].character;

    return (
      <Card
        key={`${item.id}-${item.character}`}
        imgPath={imgPath}
        title={item.name}
        subData={subText && <CardSubText>{subText}</CardSubText>}
        path={`/${routeName}/${item.id}`}
      />
    );
  });

  return cards;
};
