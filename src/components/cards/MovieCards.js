import { getImagePath } from '~/utils';
import { Card, CardSubInfo } from '~/components/Card';

export const MovieCards = ({ cardsData, imgData, routeName, isLoading }) => {
  if (isLoading) {
    return Array(20)
      .fill()
      .map((_, index) => {
        return (
          <Card
            key={index}
            isLoading={true}
            subData={<CardSubInfo isLoading={true} />}
          />
        );
      });
  }

  return cardsData.map((item) => {
    const imgPath = getImagePath({ ...imgData, path: item.poster_path });

    return (
      <Card
        key={item.id}
        path={`/${routeName}/${item.id}`}
        imgPath={imgPath}
        title={item.title}
        subData={
          <CardSubInfo
            releaseDate={item.release_date}
            voteAverage={item.vote_average}
          />
        }
      />
    );
  });
};
