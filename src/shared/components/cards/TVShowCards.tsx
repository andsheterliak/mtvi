import { IMG_BASE_URL, IMG_SIZES, TVShowItems } from '~/api/tmdb';
import noImage from '~/assets/img/no-image.svg';
import { Card, CardSubInfo } from '~/shared/components/Card';
import { ROUTE_NAMES } from '~/shared/constants';
import { IsLoading } from '~/shared/types';
import { getImagePath } from '~/shared/utils';

type Props = {
  cardsData: TVShowItems | undefined;
  isLoading: IsLoading;
};

export const TVShowCards = ({ cardsData, isLoading }: Props) => {
  if (isLoading) {
    const items = Array(20)
      .fill('')
      .map((_, index) => {
        return <Card key={index} isLoading={true} subData={<CardSubInfo isLoading={true} />} />;
      });

    return <>{items}</>;
  }

  const items = cardsData?.map((item) => {
    const imgPath = getImagePath({
      basePath: IMG_BASE_URL,
      size: IMG_SIZES.poster.w342,
      fallback: noImage,
      path: item.poster_path,
    });

    return (
      <Card
        key={item.id}
        path={`/${ROUTE_NAMES.tvShow}/${item.id}`}
        imgPath={imgPath}
        title={item.name}
        subData={<CardSubInfo releaseDate={item.first_air_date} voteAverage={item.vote_average} />}
      />
    );
  });

  return <>{items}</>;
};
