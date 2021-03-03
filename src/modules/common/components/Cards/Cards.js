import { Grid } from '@material-ui/core';

import Card from './Card';
import CardsGrid from './CardsGrid';

const Cards = ({ cardsData }) => {
  const cards = cardsData.map((item) => {
    return (
      <Grid key={item.title || item.name} item xs={6} sm={4} md={3} lg={2}>
        <Card
          posterPath={item.poster_path}
          title={item.title || item.name}
          releaseDate={item.release_date || item.first_air_date}
          voteAverage={item.vote_average}
        />
      </Grid>
    );
  });

  return <CardsGrid>{cards}</CardsGrid>;
};

export default Cards;
