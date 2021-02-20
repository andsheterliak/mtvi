import { Grid } from '@material-ui/core';

const CardGrid = ({ children }) => {
  return (
    <Grid container spacing={3}>
      {children}
    </Grid>
  );
};

export default CardGrid;
