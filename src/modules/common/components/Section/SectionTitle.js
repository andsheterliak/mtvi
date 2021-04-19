import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  spacing: {
    margin: '0 0 15px 0',
  },
});

const SectionTitle = ({ title, isSpacing = true }) => {
  const classes = useStyles();
  const classNames = [classes.title];

  if (isSpacing) classNames.push(classes.spacing);

  return (
    <Typography
      color="textPrimary"
      className={classNames.join(' ')}
      variant="h5"
      component="h2"
    >
      {title}
    </Typography>
  );
};

export default SectionTitle;
