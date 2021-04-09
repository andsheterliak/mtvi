import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return {
    description: {
      marginBottom: '20px',
    },
  };
});

const HeaderDescription = ({ description }) => {
  const classes = useStyles();

  return (
    <Typography
      color="textPrimary"
      component="p"
      variant="body1"
      className={classes.description}
    >
      {description}
    </Typography>
  );
};

export default HeaderDescription;
