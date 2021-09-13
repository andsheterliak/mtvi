import { IMG_BASE_URL, IMG_SIZES, PersonItems } from '~/api/tmdb';
import noUserImage from '~/assets/img/no-user-photo.svg';
import { Card, CardSubText } from '~/shared/components/Card';
import { ROUTE_NAMES } from '~/shared/constants';
import { IsLoading } from '~/shared/types';
import { getImagePath, getKnownFor } from '~/shared/utils';

type Props = {
  cardsData: PersonItems | undefined;
  isLoading: IsLoading;
};

export const PersonCards = ({ cardsData, isLoading }: Props) => {
  if (isLoading) {
    const cards = Array(20)
      .fill('')
      .map((_, index) => {
        return <Card key={index} isLoading={true} subData={<CardSubText isLoading={true} />} />;
      });

    return <>{cards}</>;
  }

  const cards = cardsData?.map((item) => {
    const knownFor = getKnownFor(item.known_for);

    const imgPath = getImagePath({
      basePath: IMG_BASE_URL,
      size: IMG_SIZES.profile.h632,
      fallback: noUserImage,
      path: item.profile_path,
    });

    return (
      <Card
        key={item.id}
        imgPath={imgPath}
        title={item.name}
        path={`/${ROUTE_NAMES.person}/${item.id}`}
        subData={knownFor && <CardSubText>{knownFor}</CardSubText>}
      />
    );
  });

  return <>{cards}</>;
};
