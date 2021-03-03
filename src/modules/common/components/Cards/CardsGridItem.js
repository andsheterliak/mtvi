import { Grid } from '@material-ui/core';

const CardsGridItem = ({ children }) => {
  return (
    <Grid item xs={6} sm={4} md={3} lg={2}>
      {children}
    </Grid>
  );
};

export default CardsGridItem;
