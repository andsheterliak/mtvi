import { Grid } from '@material-ui/core';

const CardsGrid = ({ children }) => {
  return (
    <Grid container spacing={2}>
      {children}
    </Grid>
  );
};

export default CardsGrid;
