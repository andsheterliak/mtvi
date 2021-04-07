import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  title: {
    margin: '15px 0',
  },
});

const SectionTitle = ({ title }) => {
  const classes = useStyles();

  return (
    <Typography className={classes.title} variant="h5" component="h2">
      {title}
    </Typography>
  );
};

export default SectionTitle;
