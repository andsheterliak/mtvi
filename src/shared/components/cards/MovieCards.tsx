import { IMG_BASE_URL, IMG_SIZES, MovieItems } from '~/api/tmdb';
import noImage from '~/assets/img/no-image.svg';
import { Card, CardSubInfo } from '~/shared/components/Card';
import { ROUTE_NAMES } from '~/shared/constants';
import { IsLoading } from '~/shared/types';
import { getImagePath } from '~/shared/utils';

type Props = {
  cardsData: MovieItems | undefined;
  isLoading: IsLoading;
};

export const MovieCards = ({ cardsData, isLoading }: Props) => {
  if (isLoading) {
    const cards = Array(20)
      .fill('')
      .map((_, index) => {
        return <Card key={index} isLoading={true} subData={<CardSubInfo isLoading={true} />} />;
      });

    return <>{cards}</>;
  }

  const cards = cardsData?.map((item) => {
    const imgPath = getImagePath({
      basePath: IMG_BASE_URL,
      size: IMG_SIZES.poster.w342,
      fallback: noImage,
      path: item.poster_path,
    });

    return (
      <Card
        key={item.id}
        path={`/${ROUTE_NAMES.movie}/${item.id}`}
        imgPath={imgPath}
        title={item.title}
        subData={<CardSubInfo releaseDate={item.release_date} voteAverage={item.vote_average} />}
      />
    );
  });

  return <>{cards}</>;
};
