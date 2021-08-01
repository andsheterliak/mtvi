import { getImagePath } from '~/utils';
import { CreditCard } from './CreditCard';

export const CreditCards = ({
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
