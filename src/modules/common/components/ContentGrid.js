import { Grid } from '@material-ui/core';

const ContentGrid = ({ firstField, secondField }) => {
  return (
    <Grid container spacing={6}>
      {firstField && (
        <Grid container item xs={12} md={3}>
          {firstField}
        </Grid>
      )}

      <Grid container item xs={12} md={!firstField ? 12 : 9}>
        {secondField}
      </Grid>
    </Grid>
  );
};

export default ContentGrid;
