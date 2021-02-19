import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  firstItem: {
    display: 'none',
  },
}));

const ContentGrid = ({ firstField, secondField, isFirstField }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={3} className={!isFirstField && classes.firstItem}>
        {firstField}
      </Grid>

      <Grid item xs={12} md={9}>
        {secondField}
      </Grid>
    </Grid>
  );
};

export default ContentGrid;
