import { Cast, IMG_BASE_URL, IMG_SIZES, TVShowCast } from '~/api/tmdb';
import noImage from '~/assets/img/no-image.svg';
import { Card, CardSubText } from '~/shared/components/Card';
import { ItemAmount, RouteName } from '~/shared/constants';
import { IsLoading } from '~/shared/types';
import { getImagePath } from '~/shared/utils';

const ifIsMovieCast = (cast: Cast[0] | TVShowCast[0]): cast is Cast[0] => {
  return (cast as Cast[0]).character !== undefined;
};

type Props = {
  isLoading: IsLoading;
  castData: Cast | TVShowCast | undefined;
  routeName: RouteName;
  castAmount: ItemAmount;
};

export const CastCards = ({ castData, routeName, isLoading, castAmount }: Props) => {
  if (isLoading) {
    const items = Array(castAmount)
      .fill('')
      .map((_, index) => {
        return <Card key={index} isLoading={true} subData={<CardSubText isLoading={true} />} />;
      });

    return <>{items}</>;
  }

  const items = castData?.map((item) => {
    const imgPath = getImagePath({
      basePath: IMG_BASE_URL,
      size: IMG_SIZES.profile.h632,
      fallback: noImage,
      path: item.profile_path,
    });

    const subText = ifIsMovieCast(item) ? item.character : item.roles[0].character;

    return (
      <Card
        key={`${item.id}-${subText}`}
        imgPath={imgPath}
        title={item.name}
        subData={subText && <CardSubText>{subText}</CardSubText>}
        path={`/${routeName}/${item.id}`}
      />
    );
  });

  return <>{items}</>;
};
