import { getImagePath } from '~common/utils/getData';
import Card, { CardSubInfo } from '~components/Card';

const TVShowCards = ({ cardsData, imgData, routeName, isLoading }) => {
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

export default TVShowCards;
