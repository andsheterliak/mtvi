import { IMG_BASE_URL, IMG_SIZES } from '~/api/tmdb';
import noImage from '~/assets/img/no-image.svg';
import { Card, CardSubInfo } from '~/components';
import { ROUTE_NAMES, TOP_ITEM_AMOUNT } from '~/constants';
import { getImagePath } from '~/utils';

export const MixedCards = ({ cardsData, isLoading }) => {
  if (isLoading)
    return Array(TOP_ITEM_AMOUNT)
      .fill()
      .map((_, index) => {
        return (
          <Card
            isLoading={true}
            key={index}
            subData={<CardSubInfo isLoading={true} />}
          />
        );
      });

  return cardsData.map((item) => {
    const imgPath = getImagePath({
      basePath: IMG_BASE_URL,
      size: IMG_SIZES.poster.w342,
      fallback: noImage,
      path: item.poster_path,
    });

    return 'release_date' in item || 'title' in item ? (
      <Card
        key={item.id}
        path={`/${ROUTE_NAMES.movie}/${item.id}`}
        imgPath={imgPath}
        title={item.title}
        subData={
          <CardSubInfo
            releaseDate={item.release_date}
            voteAverage={item.vote_average}
          />
        }
      />
    ) : (
      <Card
        key={item.id}
        path={`/${ROUTE_NAMES.tvShow}/${item.id}`}
        imgPath={imgPath}
        title={item.name}
        subData={
          <CardSubInfo
            releaseDate={item.first_air_date}
            voteAverage={item.vote_average}
          />
        }
      />
    );
  });
};
