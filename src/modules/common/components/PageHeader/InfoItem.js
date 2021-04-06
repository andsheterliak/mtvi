import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return {
    infoItem: {
      '&:not(:last-child)': {
        margin: '0 0 8px 0',
      },
    },
  };
});

const InfoItem = ({ name, value }) => {
  const classes = useStyles();

  return (
    <li className={classes.infoItem}>
      <Typography component="span" variant="body2" color="textSecondary">
        {name}:{' '}
      </Typography>

      <Typography component="span" variant="body2">
        {value}
      </Typography>
    </li>
  );
};

export default InfoItem;
