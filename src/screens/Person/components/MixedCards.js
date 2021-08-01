import { Card, CardSubInfo } from '~/components';
import { getImagePath } from '~/utils';

export const MixedCards = ({
  cardsData,
  imgData,
  routeNames,
  isLoading,
  topItemAmount,
}) => {
  if (isLoading)
    return Array(topItemAmount)
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
    const imgPath = getImagePath({ ...imgData, path: item.poster_path });

    return 'release_date' in item || 'title' in item ? (
      <Card
        key={item.id}
        path={`/${routeNames.movie}/${item.id}`}
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
        path={`/${routeNames.tvShow}/${item.id}`}
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
