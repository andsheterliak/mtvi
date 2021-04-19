import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return {
    spacing: {
      marginBottom: '20px',
    },
  };
});

const HeaderDescription = ({ description, isSpacing = true }) => {
  const classes = useStyles();
  const classNames = [classes.title];

  if (isSpacing) classNames.push(classes.spacing);

  return (
    <Typography
      color="textPrimary"
      component="p"
      variant="body1"
      className={classNames.join(' ')}
    >
      {description}
    </Typography>
  );
};

export default HeaderDescription;
