import { IMG_BASE_URL, IMG_SIZES } from '~/api/tmdb';
import noUserPhotoImg from '~/assets/img/no-user-photo.svg';
import { ItemAmount, RouteName } from '~/shared/constants';
import { IsLoading } from '~/shared/types';
import { getImagePath } from '~/shared/utils';
import { CreditCard } from './CreditCard';
import { CustomCredits } from './utils';

type Props = {
  isLoading: IsLoading | undefined;
  cardSkeltonAmount?: ItemAmount;
  routeName: RouteName | undefined;
  data: CustomCredits | undefined;
};

export const CreditCards = ({ data, routeName, isLoading, cardSkeltonAmount = 10 }: Props) => {
  if (isLoading) {
    const items = Array(cardSkeltonAmount)
      .fill('')
      .map((_, index) => {
        return <CreditCard key={index} isLoading={true} />;
      });

    return <>{items}</>;
  }

  const items = data!.map(({ name, info, id, profilePath }) => {
    const imgPath = getImagePath({
      basePath: IMG_BASE_URL,
      size: IMG_SIZES.profileFace.w90h90,
      fallback: noUserPhotoImg,
      path: profilePath,
    });

    return (
      <CreditCard key={id} imgPath={imgPath} name={name} info={info} path={`/${routeName}/${id}`} />
    );
  });

  return <>{items}</>;
};
