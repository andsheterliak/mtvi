import { getImagePath } from '~common/utils/getData';
import CreditCard from './CreditCard';

const CreditCards = ({
  data,
  routeName,
  imgData,
  isLoading,
  cardSkeltonAmount = 10,
}) => {
  if (isLoading) {
    return Array(cardSkeltonAmount)
      .fill()
      .map((_, index) => {
        return <CreditCard key={index} isLoading={true} />;
      });
  }

  return data.map(({ name, info, id, profilePath }) => {
    const imgPath = getImagePath({ ...imgData, path: profilePath });

    return (
      <CreditCard
        key={id}
        imgPath={imgPath}
        name={name}
        info={info}
        path={`/${routeName}/${id}`}
      />
    );
  });
};

export default CreditCards;
